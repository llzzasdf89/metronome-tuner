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
                <v-icon v-for="circle in tempoObj.circleObj" :key="circle.id" >{{circle.isActive?'mdi-circle':'mdi-circle-outline'}}</v-icon>
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

      <v-col cols="6" class="d-flex align-center">
        <v-select
          :items="upperNumeralArr"
          persistent-hint
          single-line
          color="black"
          item-color="black"
          v-model="upperNumeral"
        ></v-select>
        <v-col>/</v-col>
        <v-select :items="lowerNumeralArr" single-line color="black"
          item-color="black"
          v-model="lowerNumeral"
          ></v-select>
      </v-col>
    </v-row>
  </v-container>
  <v-container fluid>
      <v-row>
          <v-col cols="6" class="subheading font-weight-light mr-1">subdivision</v-col>
          <v-col class="text-center">
            <v-icon :color="tempoObj.musicNotes[0].isActived?'red':'black'" @click="activeMusicNote('off')">off</v-icon>

          </v-col>
          <v-col class="text-center">
            <v-icon :color="tempoObj.musicNotes[1].isActived?'red':'black'" @click="activeMusicNote('eighth')">mdi-music-note-eighth</v-icon>

          </v-col>
          <v-col class="text-center">
        <v-icon :color="tempoObj.musicNotes[2].isActived?'red':'black'" @click="activeMusicNote('sixteenth')">mdi-music-note-sixteenth</v-icon>
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
        return this.tempoObj.mapBpmToName(this.tempoObj.bpmValue)
      }
  },
  data:() => ({
      isPlaying:false,
      tempoObj,
      taptempo,
      upperNumeralArr:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16],
      lowerNumeralArr:[1,2,4,8,16],
      upperNumeral:4,
      lowerNumeral:4
  }),
  watch:{
    upperNumeral:function(newUpperNumeral){
      /**
       * supervise user's choice of beat numbers , if any change is made, update the 'circle image' in the interface
       */
        const circleObj = []
        for (let i = 0; i<newUpperNumeral;i++){
            circleObj[i] = {
              isActive:false,
              id:i
            }
        }
        this.tempoObj.currentBeat = 0 //each time when number of beats is changed, modify current beat to the first beat
        this.tempoObj.upperNumeral = newUpperNumeral
        this.tempoObj.lowerNumeral = this.lowerNumeral
        return this.tempoObj.circleObj = circleObj
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
          this.tempoObj.currentBeat = 0
          for(let i =0;i<this.tempoObj.upperNumeral;i++) this.tempoObj.circleObj[i].isActive = false
      },
      decrementBPMvalue:function(){
          --this.tempoObj.bpmValue
      },
        incrementBPMvalue:function(){
          ++this.tempoObj.bpmValue
        },
        activeMusicNote:function(musicNote){
            for(let note of this.tempoObj.musicNotes){
                if(note.name === musicNote) {
                  note.isActived = true
                  continue
                  }
                note.isActived = false
            }
            this.tempoObj.currentNote = musicNote
        }
  }
};
</script>