<template>
  <v-card height="600px" width="600px" class="ma-auto flex-column d-flex pa-5" elevation="10">
    <v-container fluid>
      <v-toolbar-title>
        <span class="subheading"> Metronome </span>
      </v-toolbar-title>
      <v-spacer> </v-spacer>

    </v-container>
    <v-container fluid>
      <v-row class="mb-2" justify="space-between">
        <v-col class="text-left">
          <span class="display-3 font-weight-light">{{tempoObj.bpmValue}}</span>
          <span class="subheading font-weight-light mr-1">BPM</span>
          <v-fade-transition>
            <v-avatar class="mb-1 v-avatar--metronome" size="12"></v-avatar>
          </v-fade-transition>
        </v-col>
        <v-col class="text-right">
          <v-btn :color="sliderButtonColor" dark depressed fab @click="play">
            <v-icon large> {{isPlaying?'mdi-pause':'mdi-play'}} </v-icon>
          </v-btn>
        </v-col>
      </v-row>
        <v-row class="flex-column mb-2">
            <v-col class="title text-center">{{tempoName}}</v-col>
            <v-col class="text-center">
                <v-icon v-for="circle in circleObj" :key="circle.id" >{{circle.isActive?'mdi-circle':'mdi-circle-outline'}}</v-icon>
                </v-col>
        </v-row>

      <v-slider track-color="grey" 
      always-dirty 
      min="20" 
      max="200" 
      v-model="tempoObj.bpmValue"
      :color="sliderButtonColor"
      >
        <template v-slot:prepend>
          <v-icon
          @click="decrementBPMvalue"
          > mdi-minus </v-icon>
        </template>

        <template v-slot:append>
          <v-icon
          @click="incrementBPMvalue"> mdi-plus </v-icon>
        </template>
      </v-slider>
    </v-container>
    <v-divider></v-divider>
     <v-container fluid>
    <v-row align="center">
      <v-col cols="6">
        <span class="subheading font-weight-light mr-1">
            Time Signature
        </span>
      </v-col>

      <v-col cols="6">
        <v-select
          label="Select"
          :items="timeSignatureArr"
          persistent-hint
          single-line
          color="black"
          item-color="black"
          v-model="timeSignature"
        ></v-select>
      </v-col>
    </v-row>
  </v-container>
  <v-container fluid>
      <v-row>
          <v-col class="text-center">
            <v-icon :color="musicNotes[0].isActived?'red':'black'" @click="activeMusicNote('quarter')">mdi-music-note-quarter</v-icon>

          </v-col>
          <v-col class="text-center">
            <v-icon :color="musicNotes[1].isActived?'red':'black'" @click="activeMusicNote('eighth')">mdi-music-note-eighth</v-icon>

          </v-col>
          <v-col class="text-center">
        <v-icon :color="musicNotes[2].isActived?'red':'black'" @click="activeMusicNote('sixteenth')">mdi-music-note-sixteenth</v-icon>
          </v-col>
      </v-row>
  </v-container>
    <v-container class="fill-height">
         <v-row>
          <v-col class="text-center">
              <v-btn rounded elevation="0" width="50%"  color="info" @click="testBPM">
                  tap tempo
              </v-btn>
          </v-col>
      </v-row>
    </v-container>
  </v-card>

</template>
<script>
import tempoObj from '@/assets/tempos.js'
import taptempo from '@/assets/taptempo.js'
export default {
  name: "Metronome",
  computed:{
      sliderButtonColor:function(){
          if (this.bpmValue < 25) return 'indigo'
          if (this.bpmValue < 50) return 'teal'
          if (this.bpmValue < 100) return 'green'
          if (this.bpmValue < 200) return 'orange'
          return 'red'
      },
      tempoName: function (){
        return this.tempoObj.mapBpmToName(this.$data.bpmValue)
      }
  },
  data:() => ({
      isPlaying:false,
      tempoObj,
      taptempo,
      noteNum:4,
      beatNum:4,
      currentNote:"quarter",
      timeSignature:"4/4",
      circleObj:[{
        id:0,
        isActive:false
      },{
        id:1,
        isActive:false
      },{
        id:2,
        isActive:false
      },{
        id:3,
        isActive:false
      }],
      musicNotes:[
            {
              name:"quarter",
              isActived:true, //default setting
              correspondingNum:4
          },
          {
              name:"eighth",
            isActived:false,
            correspondingNum:8
        },
        {
            name:"sixteenth",
            isActived:false,
            correspondingNum:16
        }
      ]
      ,
      timeSignatureArr:['1/4','2/4','3/4','4/4','3/8','4/8','6/8','4/16']
  }),
  watch:{
    timeSignature:function(newSignature){
        const signatureCompound = newSignature.split('/')
        const beatNum = signatureCompound[0]
        const noteNum = signatureCompound[1]
        this.noteNum = noteNum
        this.beatNum = beatNum
        const circleObj = []
        for (let i = 0; i<beatNum;i++){
            circleObj[i] = {
              isActive:false,
              id:i
            }
        }
        return this.circleObj = circleObj
      }
  },
  methods:{
      play:function(){
        this.isPlaying = !this.isPlaying
        if(!this.isPlaying) return this.stop() 
        if(!this.tempoObj.audioCtx) this.tempoObj.audioCtx = new AudioContext()
        this.tempoObj.currentBeat = 0
        this.tempoObj.nextNoteTime = this.tempoObj.audioCtx.currentTime + 0.05
        this.tempoObj.intervalID = setInterval(()=>this.tempoObj.scheduler(),this.tempoObj.lookahead)
      },
      testBPM:function(){
        this.taptempo.tap()
        if(this.taptempo.timesCache.length >= 2) {
          const bpm = Math.round(this.taptempo.calculateBPM())
          return this.tempoObj.bpmValue = bpm 
        }
      },
      stop:function(){
        clearInterval(this.tempoObj.intervalID)
          this.tempoObj.intervalID = null
          this.tempoObj.audioCtx.close()
          this.tempoObj.audioCtx = null
          this.currentBeat = 0
          for(let i =0;i<this.beatNum;i++) this.circleObj[i].isActive = false
      },
      decrementBPMvalue:function(){
          --this.tempoObj.bpmValue
      },
        incrementBPMvalue:function(){
        ++ this.tempoObj.bpmValue
        },
        activeMusicNote:function(musicNote){
            for(let note of this.musicNotes){
                if(note.name === musicNote) {
                  note.isActived = true
                  continue
                  }
                note.isActived = false
            }
            this.currentNote = musicNote
        }
  }
};
</script>