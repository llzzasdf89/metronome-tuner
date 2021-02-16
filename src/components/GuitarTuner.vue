<template>
  <v-container class="ma-auto fill-height overflow-hidden tuner">
    <v-row class="tuner-container">
      <v-col cols='8' class="tuner-container-guitar_layer">
          <hr/>
      <v-img
      src="@/assets/speech-bubble.png"
      width="64px"
      height="64px"
      style="line-height:64px"
      class="guitar_layer-dialogue"

      >
      <span>low</span>
      </v-img>
        <span>

          B<sub>4</sub>
        </span>
      </v-col>
      <v-col cols="8" class="tuner-container-guitar">
        <v-img
          src="@/assets/guitar.png"
          width="568px"
          height="620px"
          class="ma-auto guitar-animation overflow-visible"
        >
          <v-btn-toggle class="btn-toggle-layout guitar-button-animation" borderless background-color="transparent" >
            <v-btn class="btn-toggle-4th-string headline" color="#e9e9e9"> D </v-btn>
            <v-btn class="btn-toggle-5th-string headline" color="#e9e9e9"> A </v-btn>
            <v-btn class="btn-toggle-6th-string headline" color="#e9e9e9"> E </v-btn>
            <v-btn class="btn-toggle-3rd-string headline" color="#e9e9e9"> G </v-btn>
            <v-btn class="btn-toggle-2nd-string headline" color="#e9e9e9"> B </v-btn>
            <v-btn class="btn-toggle-1st-string headline" color="#e9e9e9"> E </v-btn>
          </v-btn-toggle>
        </v-img>
      </v-col>
      <v-col cols ='4' class="justify-center flex-column d-flex tuner-container-tuninglist">
        <v-card outlined>
          <v-card-title> SELECT TUNING </v-card-title>
          <v-list-item-group color="indigo" mandatory>
            <TunningItem
              v-for="tunning in tunnings"
              :key="tunning.name"
              :TunningName="tunning.name"
              :TunningPitch="tunning.pitches"
            />
          </v-list-item-group>
        </v-card>
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
  left:51%;
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
}
.btn-toggle-5th-string {
  position: absolute;
  top: 55%;
  left: 0;
  border-radius:100% !important;
}
.btn-toggle-6th-string {
  position: absolute;
  bottom: 0;
  left: 0;
  border-radius:100% !important;
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
}
.btn-toggle-3rd-string {
  position: absolute;
  top: 25%;
  right: 0;
  border-radius:100% !important;
}
.btn-toggle-2nd-string {
  position: absolute;
  top: 55%;
  right: 0;
  border-radius:100% !important;
}
.btn-toggle-1st-string {
  position: absolute;
  bottom: 0;
  right: 0;
  border-radius:100% !important;
}
</style>
<script>
import TunningItem from "@/components/TunningItem";
import tunnings from "@/assets/tunnings";
export default {
  name: "GuitarTuner",
  components: {
    TunningItem,
  },
  data: () => ({
    tunnings,
  }),
};
</script>