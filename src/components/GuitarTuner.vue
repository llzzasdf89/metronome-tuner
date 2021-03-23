<template>
  <v-container class="ma-auto fill-height overflow-hidden tuner">
    <audio id="audioPlayer"></audio>
    <v-row class="tuner-container">
      <v-col class="tuner-container-guitar_layer">
          <hr/>
      <v-img
      src="@/assets/speech-bubble.png"
      width="64px"
      height="64px"
      class="guitar_layer-dialogue"
      :style="{'transform':'translateX(' + bubbleOffset + 'px' +')'}"
      >
      <div class="guitar_layer-dialogue-content">
        {{BubbleDisplay}}
        <br/>
        {{bubbleOffset==0?"":bubbleOffset}}
      </div>
      </v-img>
        <span>

          {{noteDisplay}}<sub>{{noteDisplaySubscript}}</sub>
        </span>
      </v-col>
      <v-col class="tuner-container-guitar">
        <v-img
          src="@/assets/guitar.png"
          width="568px"
          height="620px"
          class="ma-auto guitar-animation overflow-visible"
        >
          <v-btn-toggle class="btn-toggle-layout guitar-button-animation" borderless background-color="transparent" >
            <v-btn class="btn-toggle-4th-string headline" :color="BtnActiveArr[2]?btnActiveColor:btnNoActiveColor" v-html="currentTuning.strings[2]" @click='playAudio(2)'>  </v-btn>
            <v-btn class="btn-toggle-5th-string headline" :color="BtnActiveArr[1]?btnActiveColor:btnNoActiveColor" v-html="currentTuning.strings[1]" @click='playAudio(1)'>  </v-btn>
            <v-btn class="btn-toggle-6th-string headline" :color="BtnActiveArr[0]?btnActiveColor:btnNoActiveColor" v-html="currentTuning.strings[0]" @click='playAudio(0)'>  </v-btn>
            <v-btn class="btn-toggle-3rd-string headline" :color="BtnActiveArr[3]?btnActiveColor:btnNoActiveColor" v-html="currentTuning.strings[3]" @click='playAudio(3)'>  </v-btn>
            <v-btn class="btn-toggle-2nd-string headline" :color="BtnActiveArr[4]?btnActiveColor:btnNoActiveColor" v-html="currentTuning.strings[4]" @click='playAudio(4)'>  </v-btn>
            <v-btn class="btn-toggle-1st-string headline" :color="BtnActiveArr[5]?btnActiveColor:btnNoActiveColor" v-html="currentTuning.strings[5]" @click='playAudio(5)'>  </v-btn>
          </v-btn-toggle>
        </v-img>
      </v-col>

    </v-row>
  </v-container>
</template>
<style scoped>
.tuner-container{
  position: relative;
}
.tuner-container-guitar_layer{
  position: absolute;
  left:0;
  top: 0;
  text-align: center;
  height: 40%;
  animation-name: fadein;
  animation-timing-function:ease-in;
  animation-duration: 2s;
  overflow: hidden;
  background:
      linear-gradient(to right, transparent 20px, blue 21px),
      linear-gradient(to bottom, transparent 20px, blue 21px)
      ;
  background-size: 21px 21px;
}
.tuner-container-guitar_layer>hr {
  border:1px solid red; 
  border-width:thin;
  transform:rotate(90deg);
  
}
.tuner-container-guitar_layer>span {
  line-height: 5;
  font-size:64px;
  position: absolute;
  left: 50%;
  transform:translateX(-50%);
  font-weight:bold
}
.guitar_layer-dialogue{
  margin:auto; /** adjust the position of image to the center */
  position: absolute;
  bottom:50%;
  left:49.5%;
  line-height:64px;
}
.guitar_layer-dialogue-content{
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
  line-height: normal;
}
.tuner-container-guitar {
  transform:translateY(30%)
}
.guitar-animation{
  animation-duration: 2s;
  animation-name: slidein;

}
.guitar-button-animation {
  animation-duration: 2s;
  animation-name:fadein;
  animation-timing-function: ease-in;

}
@keyframes slidein {
  from{
    transform: translateY(100%);
  }
  to{
    transform: translateY(0);
  }
}
@keyframes fadein {
  from {
    opacity: 0;
  }
  to{
    opacity: 1;
  }
}
.btn-toggle-layout {
  width: 100%;
  height: 60%;
  position: relative;
  transition-delay: 2s;
}
.btn-toggle-4th-string {
  position: absolute;
  top: 25%;
  left: 0;
  border-radius:100% !important; 
  max-width:48px;
  text-transform: none;
}
.btn-toggle-4th-string::before,.btn-toggle-5th-string::before,.btn-toggle-6th-string::before{
  border: 1px solid red !important;
  border-radius: 0;
  color:red !important;
  width:92px;
  content:"";
  left:48px; 
  /* v-btn component has a default value of width, which is 48 px, for details please visit the documentaion  
    setting the 'left' property could adjust the position of the red line besides the button,which is the 'before' element,  be on the right side of that button
  */
  top:auto;
  right:auto;
  bottom:auto;
  opacity: 1;
  z-index:-1
}
.btn-toggle-5th-string {
  position: absolute;
  top: 55%;
  left: 0;
  border-radius:100% !important;
  max-width:48px;
  text-transform: none;
}
.btn-toggle-6th-string {
  position: absolute;
  bottom: 0;
  left: 0;
  border-radius:100% !important;
  max-width:48px;
  text-transform: none;
}
.btn-toggle-3rd-string::before,.btn-toggle-2nd-string::before,.btn-toggle-1st-string::before{
  border: 1px solid red !important;
  border-radius: 0;
  color:red !important;
  width:92px;
  content:"";
  left:auto;
  top:auto;
  right:48px;
  /* v-btn component has a default value of width, which is 48 px, for details please visit the documentaion  
    setting the 'right' property could adjust the position of the red line besides the button,which is the 'before' element,  be on the left side of that button
  */
  bottom:auto;
  opacity: 1;
  z-index:-1
}
.btn-toggle-3rd-string {
  position: absolute;
  top: 25%;
  right: 0;
  border-radius:100% !important;
  max-width:48px;
  text-transform: none;
}
.btn-toggle-2nd-string {
  position: absolute;
  top: 55%;
  right: 0;
  border-radius:100% !important;
  max-width:48px;
  text-transform: none;
}
.btn-toggle-1st-string {
  position: absolute;
  bottom: 0;
  right: 0;
  border-radius:100% !important;
  max-width:48px;
  text-transform: none;
}
</style>
<script>
import tuningObjs from "@/assets/tuningObjs";
import MIDImap from '@/assets/MIDItable';
const SIXTH_STRING_INDEX  = 0,FIFTH_STRING_INDEX  = 1,FOURTH_STRING_INDEX = 2,THIRD_STRING_INDEX = 3,SECOND_STRING_INDEX = 4,FIRST_STRING_INDEX = 5
const MIDDLE_A = 440
const SEMITONE = 69

export default {
  name: "GuitarTuner",
  computed:{
    currentTuning: function (){
      const currentTuningIndex = this.currentTuningIndex
      const tuningObjs = this.tuningObjs
      return tuningObjs[currentTuningIndex]
    }
  },
  data: () => ({
    tuningObjs,
    MIDImap,
    currentTuningIndex:0,
    bubbleOffset:0,
    noteDisplay:'',
    noteDisplaySubscript:"",
    BubbleDisplay:"",
    btnNoActiveColor:"#e9e9e9",
    btnActiveColor:"red",
    BtnActiveArr:[false,false,false,false,false,false]
  }),
  mounted(){
    const mediaDevicePromise = navigator.mediaDevices.getUserMedia({
      audio:true
    })// ask and get the microphone permission from user
    mediaDevicePromise.then((stream)=>{
      const audioContext = new AudioContext()
      const audioSourceNode = audioContext.createMediaStreamSource(stream)
      const audioScriptProcessorNode = audioContext.createScriptProcessor(4096,1,1)
      audioSourceNode.connect(audioScriptProcessorNode)
      audioScriptProcessorNode.connect(audioContext.destination)
      const pitchFinder = this.$pitchfinder
      const detector = pitchFinder.YIN({
        sampleRate:audioContext.sampleRate
      })
      setInterval(this.setBacktoInitalState,5000)//set up a timer, when exceeding this time, the tuner will adjust to its inital state
      audioScriptProcessorNode.addEventListener('audioprocess',(event)=>{
          const pitchFrequency = detector(event.inputBuffer.getChannelData(0))
          if(typeof pitchFrequency === 'number' && pitchFrequency < 1400){
            /**make sure the frequency detected is valid, because the pitch detection algorithm would return undefined if nothing dectected */
             const note = this.mapFrequencytoNote(pitchFrequency)
             const centsOffset = this.getCentsOffset(pitchFrequency);
             this.displayNote(note)
             this.controlBubble(centsOffset)
             this.controlBtn(note)
          }
      })

    })
  },
  methods:{
    setBacktoInitalState:function(){
        this.$data.bubbleOffset = 0;
        this.$data.BubbleDisplay = "";
        this.$data.noteDisplaySubscript = "";
        this.$data.noteDisplay = ""
        this.$data.BtnActiveArr = [false,false,false,false,false,false]
    },
    playAudio: function(stringIndex) {
      if(!Number.isInteger(stringIndex)) return console.err('The string Index is illegal')
      const audioplayer = this.$getAudioplayer()
      if(!audioplayer) console.error('Get audioplayer error, please check whether your browser support this')
      const tuningObjs = this.tuningObjs
      const currentTuningIndex = this.currentTuningIndex
      const src = tuningObjs[currentTuningIndex].fileSrc[stringIndex]
      audioplayer.src = src
      audioplayer.load()
      audioplayer.play()
    },
    getNoteMIDI:function(frequency) {
      /**
       * Use 12 Equal Temperament to calculate MIDI code of a note corrsponding to the frequency
       */
      const noteMIDI = 12 * Math.log2(frequency/MIDDLE_A)
      return Math.round(noteMIDI) + SEMITONE
    },
    getStandardFrequency: function(note){
      return MIDDLE_A * Math.pow(2,(note-SEMITONE) / 12)
    },
    getCentsOffset: function(frequency) {
      const noteMIDI = this.getNoteMIDI(frequency)
      const standardFrequency = this.getStandardFrequency(noteMIDI)
      return Math.floor(1200 * Math.log2(frequency/standardFrequency))
    },
    mapFrequencytoNote: function(frequency){
       const noteMIDI = this.getNoteMIDI(frequency);
       return MIDImap.get(noteMIDI);
    },
    displayNote(note){
        if(note === undefined) return 
      if(note.length === 2) {
                this.$data.noteDisplay = note.charAt(0)
                this.$data.noteDisplaySubscript = note.charAt(1)
                }
                else if(note.length === 3){
                  this.$data.noteDisplay = note.substring(0,2);
                  this.$data.noteDisplaySubscript = note.charAt(2)
                }

    },
    controlBubble:function(centsOffset){
      const BubbleDisplay = centsOffset>0?"High":centsOffset ==0?"":"low"
      this.$data.BubbleDisplay = BubbleDisplay
      this.$data.bubbleOffset = centsOffset
    },
    controlBtn:function(note){
      if (note === undefined) return 
      const BtnActiveArr = this.$data.BtnActiveArr
      switch(note) {
        case "E2":
        BtnActiveArr[SIXTH_STRING_INDEX] = true
        break;
        case "A2":
        BtnActiveArr[FIFTH_STRING_INDEX] = true
        break;
        case "D3":
        BtnActiveArr[FOURTH_STRING_INDEX] = true
        break;
        case "G3":
        BtnActiveArr[THIRD_STRING_INDEX] = true;
        break;
        case "B3":
        BtnActiveArr[SECOND_STRING_INDEX] = true;
        break;
        case "E4":
        BtnActiveArr[FIRST_STRING_INDEX] = true;
        break;
        default : break;
      }
      this.$data.BtnActiveArr = BtnActiveArr;
    }
  }
};
</script>