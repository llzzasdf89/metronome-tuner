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
          <v-btn :color="sliderButtonColor" dark depressed fab @click="isPlaying=!isPlaying">
            <v-icon large> {{isPlaying?'mdi-pause':'mdi-play'}} </v-icon>
          </v-btn>
        </v-col>
      </v-row>
        <v-row class="flex-column mb-2">
            <v-col class="title text-center">Largo</v-col>
            <v-col class="text-center">
                <v-icon>mdi-circle-outline</v-icon>
                <v-icon>mdi-circle</v-icon>
                </v-col>
        </v-row>

      <v-slider track-color="grey" 
      always-dirty 
      min="0" 
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
              <v-btn rounded elevation="0" width="50%"  color="info">
                  tap tempo
              </v-btn>
          </v-col>
      </v-row>
    </v-container>
  </v-card>

</template>
<script>

export default {
  name: "Metronome",
  computed:{
      sliderButtonColor:function(){
          if (this.bpmValue < 25) return 'indigo'
            if (this.bpmValue < 50) return 'teal'
            if (this.bpmValue < 100) return 'green'
            if (this.bpmValue < 200) return 'orange'
            return 'red'
      }
  },
  data:() => ({
      isPlaying:false,
      bpmValue:0,
      musicNotes:{
          quarter:{
              isActived:false
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
  methods:{
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
            this.$data.musicNotes = musicNotes
        }
  }
};
</script>