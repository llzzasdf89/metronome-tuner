<template>
  <v-container class="ma-auto fill-height overflow-hidden tuner">
    <audio id="audioPlayer"></audio>
    <v-row class="tuner-container">
      <v-col class="tuner-container-guitar_layer" cols="8" ref="layer">
        <hr />
        <v-img
          src="@/assets/img/speech-bubble.png"
          width="64px"
          height="64px"
          :class="
            bubble.offsetPercentage > -20 && bubble.offsetPercentage < 20
              ? 'guitar_layer-dialogueAfter'
              : 'guitar_layer-dialogue'
          "
          :style="{
            transform: 'translateX(' + bubble.offsetPercentage + '%' + ')',
          }"
          ref="bubble"
        >
          <div class="guitar_layer-dialogue-content">
            {{ bubble.text }}
            <br />
            {{ bubble.num }}
          </div>
        </v-img>
        <span>
          {{ noteDisplay }}<sub>{{ noteDisplaySubscript }}</sub>
        </span>
      </v-col>
      <v-col class="tuner-container-guitar" cols="8">
        <v-img
          src="@/assets/img/guitar.png"
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
              :style="{
                background: BtnActiveArr[2] ? btnActiveColor : btnNoActiveColor,
              }"
              v-html="currentTuning.strings[2]"
              @click="controlBtn(2)"
              
            >
            </v-btn>
            <v-btn
              class="btn-toggle-5th-string headline"
              :style="{
                background: BtnActiveArr[1] ? btnActiveColor : btnNoActiveColor,
              }"
              v-html="currentTuning.strings[1]"
              @click="controlBtn(1)"
              
            >
            </v-btn>
            <v-btn
              class="btn-toggle-6th-string headline"
              :style="{
                background: BtnActiveArr[0] ? btnActiveColor : btnNoActiveColor,
              }"
              v-html="currentTuning.strings[0]"
              @click="controlBtn(0)"
              
            >
            </v-btn>
            <v-btn
              class="btn-toggle-3rd-string headline"
              :style="{
                background: BtnActiveArr[3] ? btnActiveColor : btnNoActiveColor,
              }"
              v-html="currentTuning.strings[3]"
              @click="controlBtn(3)"
              
            >
            </v-btn>
            <v-btn
              class="btn-toggle-2nd-string headline"
              :style="{
                background: BtnActiveArr[4] ? btnActiveColor : btnNoActiveColor,
              }"
              v-html="currentTuning.strings[4]"
              @click="controlBtn(4)"
              
            >
            </v-btn>
            <v-btn
              class="btn-toggle-1st-string headline"
              :style="{
                background: BtnActiveArr[5] ? btnActiveColor : btnNoActiveColor,
              }"
              v-html="currentTuning.strings[5]"
              @click="controlBtn(5)"
              
            >
            </v-btn>
          </v-btn-toggle>
        </v-img>
      </v-col>
      <v-col cols="4" align-self="center">
        <v-card outlined>
          <v-card-title>SELECT TUNING</v-card-title>
          <v-row>
          <v-col cols=12>
            <v-list-item-group
            color="indigo"
            mandatory
            v-model="currentTuningIndex"
          >
            <TuningItem
              v-for="tuning in tuningObjs"
              :key="tuning.name"
              :TuningName="tuning.name"
              :TuningString="tuning.strings.join(' ')"
            />
          </v-list-item-group>
          </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<style scoped>
@media screen and (max-width : 1237px) {
    .btn-toggle-3rd-string::before,
  .btn-toggle-2nd-string::before,
  .btn-toggle-1st-string::before,
  .btn-toggle-4th-string::before,
  .btn-toggle-5th-string::before,
  .btn-toggle-6th-string::before {
      display:none
      }
      
  }
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
.guitar_layer-dialogueAfter {
  margin: auto; /** adjust the position of image to the center */
  position: absolute;
  bottom: 50%;
  left: 49.5%;
  line-height: 64px;
  transition: all 1s;
}
.guitar_layer-dialogueAfter:after {
  content: "✅";
  width: 60px;
  height: 47px;
  border-radius: 100%;
  text-align: center;
  line-height: 50px;
  top: 5px;
  left: 1px;
  background: lightgreen;
  z-index: -100;
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
import tuningObjs from "@/utils/constants/tuningObjs";
import TuningItem from "@/components/TuningItem";
import {updatePitchParameters} from '@/utils/pitchDetect'
import {pitchCompare} from '@/utils/pitchCompare'
import {filterPitch} from '@/utils/pitchFilter'
export default {
  name: "GuitarTuner",
  components: {
    TuningItem,
  },
  data: () => ({
    tuningObjs,
    currentTuningIndex: 0,
    noteDisplay: "",
    noteDisplaySubscript: "",
    bubble: {
      text: "",
      offsetPercentage: 0,
      num: "",
    },
    btnNoActiveColor: "#e9e9e9",
    btnActiveColor: "red",
    BtnActiveArr: [false, false, false, false, false, false],
    initalStateTimer: null,
    stringIndex: -1,
    detectedPitchObj:null
  }),
  computed: {
    currentTuning: function () {
      const { currentTuningIndex } = this;
      return tuningObjs[currentTuningIndex];
    },
    MaxoffsetPercentage: function () {
      const layerWidth = parseInt(this.$refs.layer.offsetWidth) || 0;
      const bubbleWidth = parseInt(this.$refs.bubble.width) || 0;
      const MaxoffsetPercentage = (layerWidth / bubbleWidth / 2) * 100 - 100;
      return MaxoffsetPercentage;
    },
  },
  watch: {
    detectedPitchObj:function(newdetectedPitchObj){
        //watch the incoming updated pitch
        this.detectedPitchObj = newdetectedPitchObj
        const {pitch,clarity} = newdetectedPitchObj
        const { controlBubble,currentTuning,stringIndex} = this;
        const pitchAfterFiltered = filterPitch(pitch,clarity) //pass it to filter to figure out what pitch is needed.
        if(!pitchAfterFiltered) return
        const centsOffset = pitchCompare(pitchAfterFiltered,currentTuning,stringIndex)
        if(centsOffset) controlBubble(centsOffset)
    },
    currentTuningIndex: function (newIndex) {
      const { stringIndex, controlBtn} = this;
      controlBtn(stringIndex);
      this.currentTuningIndex = newIndex;
    },
  },
  mounted() {
      const {updatePitch} = this
      updatePitch()
  },
  methods: {
    setBacktoInitalState: function () {
      const { bubble} = this;
      bubble.offsetPercentage = 0;
      bubble.BubbleDisplay = "";
      bubble.num = "";
      bubble.text = "";
      this.stringIndex = -1
      this.BtnActiveArr = [false, false, false, false, false, false];
      this.noteDisplaySubscript = "";
      this.noteDisplay = "";
    },
    updatePitch:function () {
    const {analyserNode,input,detector,sampleRate} = updatePitchParameters
    //from the pitch initazation module to obtain the parameters in need 
    requestAnimationFrame(this.updatePitch) //recursively calls function to update pitch in real-time
    analyserNode.getFloatTimeDomainData(input);
    const [pitch,clarity] = detector.findPitch(input, sampleRate);
    this.detectedPitchObj = { //send the detected pitch and clarity data to global variable
      pitch,
      clarity
    }
},
    playAudio: function (stringIndex) {
      if (!Number.isInteger(stringIndex))
        return console.err("The string Index is illegal");
      const audioplayer = this.$getAudioplayer();
      if (!audioplayer)
        console.error(
          "Get audioplayer error, please check whether your browser support this"
        );
      const { currentTuningIndex } = this;
      const src = tuningObjs[currentTuningIndex].fileSrc[stringIndex];
      audioplayer.src = src;
      audioplayer.load();
      audioplayer.play();
    },
    displayNote:function(note) {
      if (!note) return;
      if (note.length === 2) {
        this.noteDisplay = note.charAt(0);
        this.noteDisplaySubscript = note.charAt(1);
      } else if (note.length === 3) {
        this.noteDisplay = note.substring(0, 2);
        this.noteDisplaySubscript = note.charAt(2);
      }
    },
    controlBubble: function (centsOffset) {
      const { MaxoffsetPercentage, bubble } = this;
      if (!MaxoffsetPercentage || MaxoffsetPercentage < 0)
        return console.error("MaxoffsetPercentage getting error");
      let offsetPercentage = centsOffset;
      if ( offsetPercentage >= MaxoffsetPercentage )  offsetPercentage = Math.round(MaxoffsetPercentage);
      else if(offsetPercentage <= -MaxoffsetPercentage) offsetPercentage = Math.round(-MaxoffsetPercentage)
      bubble.offsetPercentage = offsetPercentage;
      bubble.text = centsOffset > 20 ? "High" : centsOffset < -20 ? "low" : "";
      bubble.num = centsOffset > 20 || centsOffset < -20 ? centsOffset : "";
    },
    controlBtn:function(stringIndex){
        const {BtnActiveArr,displayNote,playAudio,currentTuning} = this
        if (stringIndex === undefined) return;
        for (let i = 0; i < BtnActiveArr.length; i++) BtnActiveArr[i] = false;
        //be sure only one button will be actived
        BtnActiveArr[stringIndex] = true;
        displayNote(currentTuning.MIDInotes[stringIndex]);
          playAudio(stringIndex)
          this.stringIndex = stringIndex;
    }
  },
};
</script>