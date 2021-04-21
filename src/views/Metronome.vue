<template>
  <v-card
    height="600px"
    width="600px"
    class="ma-auto flex-column d-flex pa-5"
    elevation="10"
  >
    <v-container fluid>
      <v-toolbar-title>
        <span class="subheading"> Metronome </span>
      </v-toolbar-title>
      <v-spacer> </v-spacer>
    </v-container>
    <v-container fluid>
      <v-row class="mb-2" justify="space-between">
        <v-col class="text-left">
          <span class="display-3 font-weight-light">{{ bpmValue }}</span>
          <span class="subheading font-weight-light mr-1">BPM</span>
          <v-fade-transition>
            <v-avatar class="mb-1 v-avatar--metronome" size="12"></v-avatar>
          </v-fade-transition>
        </v-col>
        <v-col class="text-right">
          <v-btn :color="sliderButtonColor" dark depressed fab @click="play">
            <v-icon large> {{ isPlaying ? "mdi-pause" : "mdi-play" }} </v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-row class="flex-column mb-2">
        <v-col class="title text-center">{{ tempoName }}</v-col>
        <v-col class="text-center">
          <v-icon v-for="circle in circleObj" :key="circle.id">{{
            circle.isActive ? "mdi-circle" : "mdi-circle-outline"
          }}</v-icon>
        </v-col>
      </v-row>

      <v-slider
        track-color="grey"
        always-dirty
        min="20"
        max="300"
        v-model="bpmValue"
        :color="sliderButtonColor"
      >
        <template v-slot:prepend>
          <v-icon @click="decrementBPMvalue"> mdi-minus </v-icon>
        </template>

        <template v-slot:append>
          <v-icon @click="incrementBPMvalue"> mdi-plus </v-icon>
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
          <v-select
            :items="lowerNumeralArr"
            single-line
            color="black"
            item-color="black"
            v-model="lowerNumeral"
          ></v-select>
        </v-col>
      </v-row>
    </v-container>
    <v-container fluid>
      <v-row>
        <v-col cols="6" class="subheading font-weight-light mr-1"
          >subdivision</v-col
        >
        <v-col
          class="text-center"
          v-for="note in subdivisionArr"
          :key="note.id"
          @click="activeMusicNote(note)"
        >
          <v-icon :color="note.isActived ? 'red' : 'black'">{{
            note.iconName
          }}</v-icon>
        </v-col>
      </v-row>
    </v-container>
    <v-container class="fill-height">
      <v-row>
        <v-col class="text-center">
          <v-btn
            rounded
            elevation="0"
            width="50%"
            color="info"
            @click="testBPM"
          >
            tap tempo
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>
<script>
import {tap} from "@/utils/taptempo.js";
import { musicNotes } from "@/utils/constants/musicnotes.js";
import {initateScheduler,stopScheduler,beginScheduler,setUpperNum,setLowerNum,setBpmValue,setSubdivisionNote} from '@/utils/scheduleNote.js'
export default {
  name: "Metronome",
  computed: {
    sliderButtonColor: function () {
      if (this.bpmValue < 25) return "indigo";
      if (this.bpmValue < 50) return "teal";
      if (this.bpmValue < 100) return "green";
      if (this.bpmValue < 200) return "orange";
      return "red";
    },
    tempoName: function () {
      return this.mapBpmToName(this.bpmValue);
    },
  },
beforeDestroy(){
  this.stop() //if components(page) is switched, stop the audio and set back to initalState
},
mounted(){
  initateScheduler(this) 
  /** Since the value of BPM and lowerNumeral,upperNumeral are stored in Metronome component, pass the instance to scheduler to get the values */
  const {subdivisionArr,activeMusicNote} = this
  activeMusicNote(subdivisionArr[0])
},
  data: () => ({
    isPlaying: false, // whether the player is working
    upperNumeralArr: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16], //User choose a upper numeral from this data container.
    lowerNumeralArr: [1, 2, 4, 8], //User choose a lower numeral from this data container.
    bpmValue: 0, // An Interactive value, once user choose a BPM value, this variable will respond such value
    lowerNumeral: 4, //lowerNumeral of timesignature, means what note should be per beat, default is a quarter note
    upperNumeral: 4, //upperNumeral of timesignature, means how many beats in a bar, default is 4 beats per bar
    currentSubdivisionNote: musicNotes[2], //default is a quarter note with time signature 4/4
    subdivisionArr: musicNotes[2].subdivisions, //As for current music note and lowerNumeral, what subdivisions we provide?All the subdivisions are stored in musicNotes object
    circleObj: [
      {
        //Circles in the user interface
        id: 0,
        isActive: false,
      },
      {
        id: 1,
        isActive: false,
      },
      {
        id: 2,
        isActive: false,
      },
      {
        id: 3,
        isActive: false,
      },
    ],
  }),
  watch: {
    /**
     * 'Watch' property is used to observe some variables in 'data'
     * If we declare variables inside this propety, then once a variable has changed the value, the callback function would be called.
     * upperNumeral, lowerNumeral,bpmValue and subdivisionNote are quite essential for scheduler. Thus these values should be watched and once changed, pass them to scheduler.
     */
    upperNumeral: function (newUpperNumeral) {
      /**
       * supervise user's choice of beat numbers , if any change is made, update the 'circle' in the interface
       */
      this.upperNumeral = newUpperNumeral; //update global variable in 'data' property
      setUpperNum(newUpperNumeral)//inform the scheduler value of change
      this.resetCircleObj();
      /**update circleObj arr corresponding to the new upperNumeral
       * For example, the user choose value 4 as the upperNumeral,then the user interface should have 4 circles.
       * Once he changes the value to 5, then we should have 5 circles in the user interface.
       */
    },
    lowerNumeral: function (newLowerNumeral) {
      /**
       * supervise user's choice of what note per beat, if there is any change, update the subdivisions Array corresponding to the note.
       */
      this.lowerNumeral = newLowerNumeral; //get the new Lowernumeral value
      setLowerNum(newLowerNumeral)//inform the scheduler value of change
      const noteCorrespondingNum = 1 / newLowerNumeral; //the note correponding value is 1/lowernumeral. Like 4, then 1/4 means note 'quater'
      const note = musicNotes.filter(
        (note) => note.correspondingNum === noteCorrespondingNum
      )[0];
      //traverse the musicNotes array to find the corresponding note object.
      this.subdivisionArr = note.subdivisions; //through updating global variable subdivisionArr to change the UI
      this.activeMusicNote(note); //if we choose eighth note, then we should active the eighth note as default.
    },
    bpmValue:function(newValue){
      setBpmValue(newValue) //inform the scheduler value of change
    },
    currentSubdivisionNote:function(newSubdivisionNote){
      setSubdivisionNote(newSubdivisionNote) //inform the scheduler value of change
    }
  },
  methods: {
    play: function () {
      const {stop} = this
      this.isPlaying = !this.isPlaying;
      if (!this.isPlaying) return stop();
      beginScheduler()
    },
    resetCircleObj: function () {
      const { upperNumeral } = this;
      const circleObj = [];
      for (let i = 0; i < upperNumeral; i++) {
        circleObj[i] = {
          isActive: false,
          id: i,
        };
      }
      this.circleObj = circleObj;
    },
    controlCircle:function(circleIndexObj){
      /**Receive parameters from scheduler to know which circle should be highlighted and which should be turned off */
        const {circleObj} = this
        const {CircleindextobeClosed , CircleindextobeActived} = circleIndexObj
        if(CircleindextobeClosed >=0 )circleObj[CircleindextobeClosed].isActive = false
        if(CircleindextobeActived >=0 )circleObj[CircleindextobeActived].isActive = true
    },
    mapBpmToName: function (tempo = 40) {
      if (tempo < 24) return "Larghissimo";
      if (tempo < 45) return "Grave";
      if (tempo < 60) return "Largo";
      if (tempo < 66) return "Larghetto";
      if (tempo < 76) return "Adagio";
      if (tempo < 108) return "Andante";
      if (tempo < 120) return "Moderato";
      if (tempo < 156) return "Allegro";
      if (tempo < 200) return "Presto";
      return "Prestissimo";
    },
    testBPM: function () {
      const bpm = tap();
      if(bpm >0) this.bpmValue = bpm
    },
    stop: function () {
      stopScheduler()
      this.resetCircleObj();
    },
    decrementBPMvalue: function () {
      --this.bpmValue;
    },
    incrementBPMvalue: function () {
      ++this.bpmValue;
    },
    activeMusicNote: function (musicNote) {
      for (let note of musicNotes) {
        if (note === musicNote) {
          note.isActived = true;
          this.currentSubdivisionNote = note;
          continue;
        }
        note.isActived = false;
      }
    },
  },
};
</script>