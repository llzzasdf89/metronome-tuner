<template>
  <v-container class="ma-auto fill-height overflow-hidden tuner">
    <audio id="audioPlayer"></audio>
    <v-row class="tuner-container">
      <v-col class="tuner-container-guitar_layer" cols=8 ref="layer">
        <hr />
        <v-img
          src="@/assets/speech-bubble.png"
          width="64px"
          height="64px"
          :class="bubbleOffsetPercentage===0?'guitar_layer-dialogueAfter':'guitar_layer-dialogue'"
          :style="{ transform: 'translateX(' + bubbleOffsetPercentage + '%'+')' }"
          ref="bubble"
        >
          <div class="guitar_layer-dialogue-content">
            {{ BubbleDisplay }}
            <br />
            {{ bubbleOffsetPercentage == 0 ? "" : bubbleOffsetPercentage*10 }}
          </div>
        </v-img>
        <span>
          {{ noteDisplay }}<sub>{{ noteDisplaySubscript }}</sub>
        </span>
      </v-col>
      <v-col  class="tuner-container-guitar" cols=8>
        <v-img
          src="@/assets/guitar.png"
          width="568px"
          height="620px"
          class="ma-auto guitar-animation overflow-visible"
        >
          <v-btn-toggle
            class="btn-toggle-layout guitar-button-animation"
            borderless
            background-color="transparent"
          >
            <v-btn
              class="btn-toggle-4th-string headline"
              :style="{background:BtnActiveArr[2]?btnActiveColor:btnNoActiveColor}"
              v-html="currentTuning.strings[2]"
              @click="ManualControlBtn(2)"
              :disabled="isAuto"
            >
            </v-btn>
            <v-btn
              class="btn-toggle-5th-string headline"
              :style="{background:BtnActiveArr[1]?btnActiveColor:btnNoActiveColor}"
              v-html="currentTuning.strings[1]"
              @click="ManualControlBtn(1)"
              :disabled="isAuto"
            >
            </v-btn>
            <v-btn
              class="btn-toggle-6th-string headline"
              :style="{background:BtnActiveArr[0]?btnActiveColor:btnNoActiveColor}"
              v-html="currentTuning.strings[0]"
              @click="ManualControlBtn(0)"
              :disabled="isAuto"
            >
            </v-btn>
            <v-btn
              class="btn-toggle-3rd-string headline"
              :style="{background:BtnActiveArr[3]?btnActiveColor:btnNoActiveColor}"
              v-html="currentTuning.strings[3]"
              @click="ManualControlBtn(3)"
              :disabled="isAuto"
            >
            </v-btn>
            <v-btn
              class="btn-toggle-2nd-string headline"
              :style="{background:BtnActiveArr[4]?btnActiveColor:btnNoActiveColor}"
              v-html="currentTuning.strings[4]"
              @click="ManualControlBtn(4)"
              :disabled="isAuto"
            >
            </v-btn>
            <v-btn
              class="btn-toggle-1st-string headline"
              :style="{background:BtnActiveArr[5]?btnActiveColor:btnNoActiveColor}"
              v-html="currentTuning.strings[5]"
              @click="ManualControlBtn(5)"
              :disabled="isAuto"
            >
            </v-btn>
          </v-btn-toggle>
        </v-img>
      </v-col>
       <v-col  cols=4 align-self="center">
         <v-card outlined>
           <v-row>
             <v-col cols=8 class="pa-5 v-card__title">
               SELECT TUNING 
             </v-col>
             <v-col cols=4 class="d-flex justify-center">
               <v-switch messages="auto" color="green" v-model="isAuto"></v-switch>
             </v-col>
           </v-row>
          <v-list-item-group color="indigo" mandatory v-model = "currentTuningIndex">
            <TuningItem
              v-for="tuning in tuningObjs"
              :key="tuning.name"
              :TuningName="tuning.name"
              :TuningString="tuning.strings.join(' ')"
            />
          </v-list-item-group>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<style scoped>
.tuner-container {
  position: relative;
}
.tuner-container-guitar_layer {
  position: absolute;
  left: 0;
  top: 0;
  text-align: center;
  height: 40%;
  animation-name: fadein;
  animation-timing-function: ease-in;
  animation-duration: 2s;
  overflow: hidden;
  background: linear-gradient(to right, transparent 20px, blue 21px),
    linear-gradient(to bottom, transparent 20px, blue 21px);
  background-size: 21px 21px;
}
.tuner-container-guitar_layer > hr {
  border: 1px solid red;
  border-width: thin;
  transform: rotate(90deg);
}
.tuner-container-guitar_layer > span {
  line-height: 5;
  font-size: 64px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-weight: bold;
}
.guitar_layer-dialogue {
  margin: auto; /** adjust the position of image to the center */
  position: absolute;
  bottom: 50%;
  left: 49.5%;
  line-height: 64px;
  transition: all 1s;
}
.guitar_layer-dialogueAfter{
  margin: auto; /** adjust the position of image to the center */
  position: absolute;
  bottom: 50%;
  left: 49.5%;
  line-height: 64px;
  transition: all 1s;
}
.guitar_layer-dialogueAfter:after{
  content:"✅";
  width:60px;
  height:47px;
  border-radius: 100%;
  text-align: center;
  line-height: 50px;
  top:5px;
  left:1px;
  background:lightgreen;
  z-index:-100;
  position: absolute;
}
.guitar_layer-dialogue-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
  line-height: normal;
}
.tuner-container-guitar {
  transform: translateY(30%);
  
}
.guitar-animation {
  animation-duration: 2s;
  animation-name: slidein;
}
.guitar-button-animation {
  animation-duration: 2s;
  animation-name: fadein;
  animation-timing-function: ease-in;
}
@keyframes slidein {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}
@keyframes fadein {
  from {
    opacity: 0;
  }
  to {
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
  border-radius: 100% !important;
  max-width: 48px;
  text-transform: none;
  
}
.btn-toggle-4th-string::before,
.btn-toggle-5th-string::before,
.btn-toggle-6th-string::before {
  border: 1px solid red !important;
  border-radius: 0;
  color: red !important;
  width: 92px;
  content: "";
  left: 48px;

  /* v-btn component has a default value of width, which is 48 px, for details please visit the documentaion  
    setting the 'left' property could adjust the position of the red line besides the button,which is the 'before' element,  be on the right side of that button
  */
  top: auto;
  right: auto;
  bottom: auto;
  opacity: 1;
  
}
.btn-toggle-5th-string {
  position: absolute;
  top: 55%;
  left: 0;
  border-radius: 100% !important;
  max-width: 48px;
  text-transform: none;
  
}
.btn-toggle-6th-string {
  position: absolute;
  bottom: 0;
  left: 0;
  border-radius: 100% !important;
  max-width: 48px;
  text-transform: none;
  
}
.btn-toggle-3rd-string::before,
.btn-toggle-2nd-string::before,
.btn-toggle-1st-string::before {
  border: 1px solid red !important;
  border-radius: 0;
  color: red !important;
  width: 92px;
  content: "";
  left: auto;
  top: auto;
  right: 48px;
  /* v-btn component has a default value of width, which is 48 px, for details please visit the documentaion  
    setting the 'right' property could adjust the position of the red line besides the button,which is the 'before' element,  be on the left side of that button
  */
  bottom: auto;
  opacity: 1;
}
.btn-toggle-3rd-string {
  position: absolute;
  top: 25%;
  right: 0;
  border-radius: 100% !important;
  max-width: 48px;
  text-transform: none;
  
}
.btn-toggle-2nd-string {
  position: absolute;
  top: 55%;
  right: 0;
  border-radius: 100% !important;
  max-width: 48px;
  text-transform: none;
  
}
.btn-toggle-1st-string {
  position: absolute;
  bottom: 0;
  right: 0;
  border-radius: 100% !important;
  max-width: 48px;
  text-transform: none;
  
}
</style>
<script>
import tuningObjs from "@/assets/tuningObjs";
import MIDImap from "@/assets/MIDItable";
import TuningItem from "@/components/TuningItem";
const MIDDLE_A = 440;
const SEMITONE = 69;

export default {
  name: "GuitarTuner",
  components:{
    TuningItem
  },
  data: () => ({
    tuningObjs,
    isAuto:true,
    currentTuningIndex: 0,
    bubbleOffsetPercentage: 0,
    noteDisplay: "",
    noteDisplaySubscript: "",
    BubbleDisplay: "",
    btnNoActiveColor: "#e9e9e9",
    btnActiveColor: "red",
    BtnActiveArr: [false, false, false, false, false, false],
    initalStateTimer:null,
    stringIndex:-1
  }),
  computed:{
      currentTuningMIDIvalues:function(){
        const {currentTuning,mapMIDInotetoMIDIvalue} = this
        return currentTuning.MIDInotes.map((note)=>mapMIDInotetoMIDIvalue(note))
      },
      currentTuning:function(){
        const {currentTuningIndex} = this
        return tuningObjs[currentTuningIndex]
      },
      MaxoffsetPercentage:function(){
        const layerWidth = parseInt(this.$refs.layer.offsetWidth) || 0
        const bubbleWidth = parseInt(this.$refs.bubble.width) || 0
        return ((layerWidth/bubbleWidth)/2) * 100
      }
  },
  watch:{
    isAuto:function(newValue){
        const {setBacktoInitalState} = this
        setBacktoInitalState()
        clearInterval(this.initalStateTimer)
        this.initalStateTimer = null
        if(newValue) this.initalStateTimer = setInterval(()=> this.setBacktoInitalState(), 5000) //newValue is true means switch from manual mode to auto mode
        this.isAuto = newValue
    }
  },
  mounted() {
    const mediaDevicePromise = navigator.mediaDevices.getUserMedia({
      audio: true,
    }); // ask the  microphone permission from user
    mediaDevicePromise.then((stream) => {
      const audioContext = new AudioContext();
      const audioSourceNode = audioContext.createMediaStreamSource(stream);
      const audioScriptProcessorNode = audioContext.createScriptProcessor(
        4096,
        1,
        1
      );
      audioSourceNode.connect(audioScriptProcessorNode);
      audioScriptProcessorNode.connect(audioContext.destination);
      const pitchFinder = this.$pitchfinder;
      const detector = pitchFinder.YIN({
        sampleRate: audioContext.sampleRate
      });
      audioScriptProcessorNode.addEventListener("audioprocess", (event)=>{
        const pitchFrequency = detector(event.inputBuffer.getChannelData(0));
        const {isAuto,ManualComparison,AutoComparison} = this
        if(!isAuto) ManualComparison(pitchFrequency)
        else AutoComparison(pitchFrequency)
      });
      if(this.isAuto) this.initalStateTimer = setInterval (()=> this.setBacktoInitalState(), 5000) //At auto mode, every 5 seconds get the user interface to its inital state
    });
  },
  methods: {
    setBacktoInitalState: function () {
      this.bubbleOffsetPercentage = 0;
      this.BubbleDisplay = "";
      this.noteDisplaySubscript = "";
      this.noteDisplay = "";
      this.BtnActiveArr = [false, false, false, false, false, false];
    },
    playAudio: function (stringIndex) {
      if (!Number.isInteger(stringIndex))
        return console.err("The string Index is illegal");
      const audioplayer = this.$getAudioplayer();
      if (!audioplayer)
        console.error(
          "Get audioplayer error, please check whether your browser support this"
        );
      const {currentTuningIndex} = this
      const src = tuningObjs[currentTuningIndex].fileSrc[stringIndex];
      audioplayer.src = src;
      audioplayer.load();
      audioplayer.play();
    },
    ManualComparison:function(pitchFrequency){
      const {stringIndex} = this
      if(!(typeof pitchFrequency === "number" && pitchFrequency < 1400)) return 
      if(stringIndex < 0 || !stringIndex === undefined) return
          const {currentTuning,mapMIDInotetoMIDIvalue,mapFrequencyToMIDIvalue,controlBubble} = this
          //notice : MIDInote is not simply a note like 'E', 'F', it should be a subnumber follow, like 'E3','A4'
          const MIDInote = currentTuning.MIDInotes[stringIndex] //according to current stringIndex, get the corresponding MIDI note
          const MIDIvalue = mapMIDInotetoMIDIvalue(MIDInote) //According to MIDInote, find its corresponding MIDI value, like 52 -> E2
          //filter out the noise detected by dector
          const pitchMIDIvalue = mapFrequencyToMIDIvalue(pitchFrequency)
          //According to the frequency detected, transfer it to the MIDIvalue
          const cents =  (pitchMIDIvalue - MIDIvalue) * 100
          controlBubble(cents)
          //input the note to map its corresponding MIDInotes value
    },
    AutoComparison:function(pitchFrequency){
        if(!(typeof pitchFrequency === "number" && pitchFrequency < 1400)) return 
        const {mapFrequencyToMIDIvalue,currentTuning,mapMIDInotetoMIDIvalue,findMostMatchingIndex,AutocontrolBtn,displayNote,controlBubble,currentTuningMIDIvalues} = this
        const pitchMIDIvalue = mapFrequencyToMIDIvalue(pitchFrequency)
        const mostMatchingIndex = findMostMatchingIndex(currentTuningMIDIvalues,pitchMIDIvalue)
        if(mostMatchingIndex<0) return
        const mostMatchingNote = currentTuning.MIDInotes[mostMatchingIndex]
        const cents = (pitchMIDIvalue - mapMIDInotetoMIDIvalue(mostMatchingNote)) * 100
        AutocontrolBtn(mostMatchingNote)
        displayNote(mostMatchingNote)
        controlBubble(cents)
    },
    findMostMatchingIndex:function (arr,MIDIvalue){
          let difference = -1000
          let index = -1
          arr.forEach((value,i)=>{
            const diff = Math.abs(value - MIDIvalue)
            if(diff < Math.abs(difference)){
              difference = diff
              index = i
              }
        })
        return index
    },
    mapFrequencyToMIDIvalue: function (frequency) {
      /**
       * Use 12 Equal Temperament to calculate MIDInotes code of a note corrsponding to the frequency
       */
      let MIDIvalue = 12 * Math.log2(frequency / MIDDLE_A);
      MIDIvalue = Math.round(MIDIvalue) + SEMITONE
      return MIDIvalue
    },
    mapMIDInotetoMIDIvalue:function(note){
        let  MIDIvalue
        for(let [key,value] of MIDImap) if(value === note) MIDIvalue = key
        return MIDIvalue
    },
    displayNote(note) {
      if (note === undefined) return;
      if (note.length === 2) {
        this.noteDisplay = note.charAt(0);
        this.noteDisplaySubscript = note.charAt(1);
      } else if (note.length === 3) {
        this.noteDisplay = note.substring(0, 2);
        this.noteDisplaySubscript = note.charAt(2);
      }
    },
    controlBubble: function (centsOffset) {
      const {MaxoffsetPercentage} = this
      //suppose each 100 cents will cause 10% offset from origin position
      if(!MaxoffsetPercentage || MaxoffsetPercentage <0) console.error('MaxoffsetPercentage getting error')
      let offsetPercentage = centsOffset/10
      if(offsetPercentage  >= MaxoffsetPercentage || offsetPercentage  <= -MaxoffsetPercentage) offsetPercentage = MaxoffsetPercentage
      this.bubbleOffsetPercentage = offsetPercentage
      const BubbleDisplay =
        centsOffset > 0 ? "High" : centsOffset == 0 ? "" : "low";
      this.BubbleDisplay = BubbleDisplay;
    },
    AutocontrolBtn: function (note) {
      if(!note) return
      const {BtnActiveArr} = this;
      const {MIDInotes} = this.currentTuning
      for(let i=0;i<BtnActiveArr.length;i++) {
        if(MIDInotes[i] === note) {
          BtnActiveArr[i] = true
          continue
          }
        BtnActiveArr[i] = false
        }
    },
    ManualControlBtn(stringIndex){
      const {BtnActiveArr,playAudio,currentTuning,displayNote} = this
      if(stringIndex === undefined) return
      for(let i =0;i<BtnActiveArr.length;i++)  BtnActiveArr[i] = false
      //under the manual mode, be sure only one button will be actived 
      BtnActiveArr[stringIndex] = true
      displayNote(currentTuning.MIDInotes[stringIndex])
      playAudio(stringIndex)
      this.stringIndex = stringIndex
    }
  },
};
</script>