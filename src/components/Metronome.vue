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
import taptempo from "@/assets/taptempo.js";
import { musicNotes } from "@/assets/musicnotes.js";
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
  data: () => ({
    taptempo, //tapTempo feature objects, encapsulates all the functions related to tapTempo.
    isPlaying: false, // whether the player is working
    upperNumeralArr: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16], //User choose a upper numeral from this data container.
    lowerNumeralArr: [1, 2, 4, 8], //User choose a lower numeral from this data container.
    notesInQueue: [], //Record each note to be played
    lookahead: 25, //how soon a set Interval function to call scheduler
    scheduleAheadTime: 0.1, //how long should our scheduler plan the next note ahead
    nextNoteTime: 0, //used to record how long a note should be playing, such things would be done in scheduler function
    audioCtx: null, //used to store audioContext object
    bpmValue: 0, // An Interactive value, once user choose a BPM value, this variable will respond such value
    currentBeat: 0, //Once the player is working, we should notice which beat it is currently in
    intervalID: null, //record the setInterval function ID, in case user stops the player and clear the timer.
    lowerNumeral: 4, //lowerNumeral of timesignature, means what note should be per beat, default is a quarter note
    upperNumeral: 4, //upperNumeral of timesignature, means how many beats in a bar, default is 4 beats per bar
    currentSubdivisionNote: musicNotes[2], //default is a quarter note with time signature 4/4
    hitTime: 0, // if there are subdivisions, this variable will be trigered,
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
     * If we declare variables inside this propety, then once a variable has changed the value, the callback function after declaration would be called.
     */
    upperNumeral: function (newUpperNumeral) {
      /**
       * supervise user's choice of beat numbers , if any change is made, update the 'circle' in the interface
       */
      this.upperNumeral = newUpperNumeral; //update global variable in 'data' property
      this.resetCircleObj();
      /**update circleObj arr corresponding to the new upperNumeral
       * For example, the user choose value 4 as the upperNumeral,then the user interface should have 4 circles.
       * Once he changes the value to 5, then we should have 5 circles in the user interface.
       */
      this.currentBeat = 0; //each time when upperNumeral is changed, change current beat to the first beat
    },
    lowerNumeral: function (newLowerNumeral) {
      /**
       * supervise user's choice of what note per beat, if there is any change, update the subdivisions Array corresponding to the note.
       */
      this.lowerNumeral = newLowerNumeral; //get the new Lowernumeral value
      const noteCorrespondingNum = 1 / newLowerNumeral; //the note correponding value is 1/lowernumeral. Like 4, then 1/4 means note 'quater'
      const note = musicNotes.filter(
        (note) => note.correspondingNum === noteCorrespondingNum
      )[0];
      //traverse the musicNotes array to find the corresponding note object.
      this.subdivisionArr = note.subdivisions; //through updating global variable subdivisionArr to change the UI
      this.activeMusicNote(note); //if we choose eighth note, then we should active the eighth note as default.
    },
  },
  methods: {
    play: function () {
      this.isPlaying = !this.isPlaying;
      if (!this.isPlaying) return this.stop();
      if (!this.audioCtx) this.audioCtx = new AudioContext();
      this.currentBeat = 0; // each time playing begins, count the beat from the first beat, but remember the first beat is 0, which is convinent as index for circleObj
      this.intervalID = setInterval(() => this.scheduler(), this.lookahead);
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
    countBeat: function () {
      //this function is used to control the display of circle and count the beat which is playing
      /**
       * Notice: The meaning of 'currentBeat' is used to tell user which beat he is currently in.
       * On the other hand, this variable is corresponding to the index of circleObj, which is starting from 0 instead of 1.
       * For example, in the user interface, the first circle will turn black if currentBeat values 0.
       */

      /**'upperNumeral' means how many beats per bar */
      //if there is only one beat in a bar, we need to control only 1 circle displaying
      const { hitTime, upperNumeral, currentBeat } = this;
      if (hitTime !== 1) return; //used to estimate whether there is division, if not its value should be 1.
      if (upperNumeral === 1)
        return (this.circleObj[this.currentBeat].isActive = true); //if there is only 1 beat in a bar, we need to control only 1 circle in interface

      if (currentBeat === 0) {
        this.circleObj[this.upperNumeral - 1].isActive = false;
        this.circleObj[this.currentBeat].isActive = true;
        ++this.currentBeat;
        //if currentBeat is 0, then its previous beat should be upperNumeral - 1. switch it off.
      } else if (currentBeat >= upperNumeral - 1) {
        this.circleObj[this.currentBeat - 1].isActive = false;
        this.circleObj[this.currentBeat].isActive = true;
        this.currentBeat = 0;
        //if currentBeat is approaching upper boundary of array, set it to the first beat, which is 0
      } else {
        this.circleObj[this.currentBeat - 1].isActive = false;
        this.circleObj[this.currentBeat].isActive = true;
        ++this.currentBeat;
        //if currentBeat is not approaching boundary, then we directly + 1
      }
      this.hitTime = 0; //each time we count a beat, reset the subdivision record
    },
    nextNote: function () {
      const { bpmValue, getSubdivisionHitTime, countBeat } = this;
      const secondsPerBeat = 60.0 / bpmValue; // Notice this picks up the CURRENT tempo value to calculate beat length.
      //According to the time signature, calculate the next Note time
      this.nextNoteTime += secondsPerBeat * getSubdivisionHitTime();
      countBeat();
    },
    scheduleNote: function (beatNumber, time) {
      const { audioCtx, getSubdivisionHitTime } = this;
      this.notesInQueue.push({ note: beatNumber, time });
      const osc = audioCtx.createOscillator();
      const envelope = audioCtx.createGain();
      envelope.gain.value = 1;
      envelope.gain.exponentialRampToValueAtTime(1, time + 0.001);
      envelope.gain.exponentialRampToValueAtTime(0.001, time + 0.02);
      /**
       * Subdivision time is equal to lowerNum * noteCorrespondingNum
       * For example, in time signature 4/4, a quarter's subdivision time is 4 * 1/4 = 1
       * Our hitTime will be accmulated from 0 to 1 to record which subdivision beat it is in
       * If its value is 1/2, then we are currently in the first of subdivision beat
       * If its value is 1, then it shows our subdivision beat is done, go to next beat of current bar.
       */
      const SubdivisionHitTime = getSubdivisionHitTime();
      osc.frequency.value = this.hitTime === 0 ? 440 : 1000;
      this.hitTime += SubdivisionHitTime;
      if (this.hitTime > 1) this.hitTime = 0;
      //in case user switches from small notes to large notes, for example 8th -> 4th
      osc.connect(envelope);
      envelope.connect(audioCtx.destination);
      osc.start(time);
      osc.stop(time + 0.03);
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
    getSubdivisionHitTime: function () {
      const { correspondingNum } = this.currentSubdivisionNote;
      const { lowerNumeral } = this;
      return correspondingNum * lowerNumeral;
    },
    scheduler: function () {
      while (
        this.nextNoteTime <
        this.audioCtx.currentTime + this.scheduleAheadTime
      ) {
        this.scheduleNote(this.currentBeat, this.nextNoteTime);
        this.nextNote();
      }
    },
    testBPM: function () {
      this.taptempo.tap();
      if (this.taptempo.timesCache.length >= 2) {
        const bpm = Math.round(this.taptempo.calculateBPM());
        return (this.bpmValue = bpm);
      }
    },
    stop: function () {
      clearInterval(this.intervalID);
      this.intervalID = null;
      this.currentBeat = 0;
      this.nextNoteTime = 0;
      if(this.audioCtx) {
        this.audioCtx.close();
        this.audioCtx = null;
        }
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