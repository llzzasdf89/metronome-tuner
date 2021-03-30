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
          <span class="display-3 font-weight-light">{{bpmValue}}</span>
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
      v-model="bpmValue"
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
            Beats
        </span>
      </v-col>

      <v-col cols="6">
        <v-select
          label="Select"
          :items="beats"
          persistent-hint
          single-line
          color="black"
          item-color="black"
          v-model="beatNum"
        ></v-select>
      </v-col>
    </v-row>
  </v-container>
  <v-container fluid>
      <v-row>
          <v-col class="text-center">
            <v-icon :color="musicNotes.quarter.isActived?'red':'black'" @click="activeMusicNote('quarter')">mdi-music-note-quarter</v-icon>

          </v-col>
          <v-col class="text-center">
            <v-icon :color="musicNotes. eighth.isActived?'red':'black'" @click="activeMusicNote('eighth')">mdi-music-note-eighth</v-icon>

          </v-col>
          <v-col class="text-center">
        <v-icon :color="musicNotes.sixteenth.isActived?'red':'black'" @click="activeMusicNote('sixteenth')">mdi-music-note-sixteenth</v-icon>
          </v-col>
      </v-row>
  </v-container>
    <v-container class="fill-height">
         <v-row>
          <v-col class="text-center">
              <v-btn rounded elevation="0" width="50%"  color="info" @click="testBPM">
                  tap tempo
              </v-btn>
              <v-col v-show="tapBPM">Your current tap BPM is {{tapBPM}}</v-col>
              <v-col></v-col>
          </v-col>
      </v-row>
    </v-container>
  </v-card>

</template>
<script>
import tempoObj from '@/assets/tempos.js'
import taptempo from '@/assets/taptempo.js'
let audioCtx
let interval
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
      },
      lengthofBeatPerSeconds:function(){
          const bpm = this.bpmValue
          const beatsPerSecond = bpm/60
          const lengthofBeatPerSeconds = 1/beatsPerSecond
          if(this.currentNote === "eighth") return lengthofBeatPerSeconds/2
          if(this.currentNote === "sixteenth") return lengthofBeatPerSeconds/4
          return lengthofBeatPerSeconds
      }
  },
  data:() => ({
      isPlaying:false,
      bpmValue:0,
      tempoObj,
      taptempo,
      tapBPM:0,
      beatNum:4,
      currentBeat:0,
      currentNote:"quarter",
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
      musicNotes:{
          quarter:{
              isActived:true //default setting
          },
          eighth:{
            isActived:false
        },
        sixteenth:{
            isActived:false
        }
        }
      ,
      beats:[1,2,3,4,5,6,7,8]
  }),
  watch:{
    beatNum:function(newValue){
        const beatNum= newValue
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
        if(!this.isPlaying) {
          clearInterval(interval)
          interval = undefined
          audioCtx.close()
          audioCtx = undefined
          this.currentBeat = 0
          for(let i =0;i<this.beatNum;i++) this.circleObj[i].isActive = false
          return 
          }
        if(!audioCtx) audioCtx = new AudioContext()
        this.playsound(this.lengthofBeatPerSeconds)
        this.circleObj[this.currentBeat].isActive = true
        if(!interval) interval = setInterval(()=>{
          this.countBeat()
          this.playsound(this.lengthofBeatPerSeconds)
          }, this.lengthofBeatPerSeconds * 1000)
      },
      playsound:function (lengthofBeatPerSeconds){
        const oscillator = audioCtx.createOscillator();
        const envelope = audioCtx.createGain();
        oscillator.frequency.value = (this.currentBeat %this.beatNum == 0 )? 1000:800 //stress the first beat
        envelope.gain.value = 1;
        envelope.gain.exponentialRampToValueAtTime(1, audioCtx.currentTime + 0.001);
        envelope.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.02);
        oscillator.connect(envelope)
        envelope.connect(audioCtx.destination)
        oscillator.start()
        oscillator.stop(audioCtx.currentTime + lengthofBeatPerSeconds)
      },
      testBPM:function(){
        this.taptempo.tap()
        if(this.taptempo.timesCache.length >= 2) {
          const bpm = Math.round(this.taptempo.calculateBPM())
          return this.tapBPM = bpm 
        }
        return this.tapBPM = 0
      },
      countBeat:function(){
        //this function is used to control the display of circle
        /**
         * Notice: The meaning of 'currentBeat' is used to tell user which beat he is currently in.
         * On the other hand, this variable is corresponding to the index of circleObj, which is starting from 0 instead of 1.
         * For example, in the user interface, the first circle will turn black if currentBeat values 0.
         */

        /**beatNum is what user chose from interface 'Beats' row */
        if(this.currentBeat >= this.beatNum - 1) this.currentBeat = 0 //if currentBeat is approaching boundary, set it to the first beat, which is 0
        else ++this.currentBeat //if currentBeat is not approaching boundary, then we directly + 1
        if(this.currentBeat === 0) this.circleObj[this.beatNum-1].isActive = false //if currentBeat is 0, then its previous beat should be beatNum - 1. switch it off.
        else this.circleObj[this.currentBeat-1].isActive = false //remember to switch off its previous beat 
        this.circleObj[this.currentBeat].isActive = true
      },
      decrementBPMvalue:function(){
          this.$data.bpmValue --
      },
        incrementBPMvalue:function(){
        this.$data.bpmValue ++
        },
        activeMusicNote:function(musicNote){
            const musicNotes = this.$data.musicNotes
            let isCurrentNoteActived = false
            for(let key in musicNotes){
                if(musicNotes[key].isActived && key === musicNote) {
                    isCurrentNoteActived = true
                    break;
                    }
                musicNotes[key].isActived = false
            }
            if(isCurrentNoteActived) return
            musicNotes[musicNote].isActived = true
            this.$data.currentNote = musicNote
            this.$data.musicNotes = musicNotes
        }
  }
};
</script>