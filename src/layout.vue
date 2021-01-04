<template>
  <v-app>
    <v-main>
       <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-card :height="topHeight">
        <v-card-title>Features</v-card-title>
      </v-card>
      <v-list shaped two-line>
        <v-list-item-group>
        <v-list-item @click="switchPage('Metronome')">Metronome</v-list-item>
        <v-list-item @click="switchPage('GuitarTuner')">Guitar Tuner</v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app >
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>{{toolBarTitle}}</v-toolbar-title>
    </v-app-bar>
    <GuitarTuner v-if="currentRoute ==='GuitarTuner'">

    </GuitarTuner>
    <Metronome v-if="currentRoute==='Metronome'">

    </Metronome>
    </v-main>
  </v-app>
</template>

<script>
import GuitarTuner from './components/GuitarTuner'
import Metronome from './components/Metronome'
export default {
  name: 'layout',
  components:{
    GuitarTuner,
    Metronome
    },
  data: () => ({
    toolBarTitle:"Metronome and Guitar Tuner",
    drawer:true, //control the status of drawer,
    currentRoute:window.location.pathname
  }),
  computed:{
    topHeight: function (){
      return this.$vuetify.application.top
    }
  },
  methods:{
    switchPage:function(pageRoute) {
        this.$data.currentRoute = pageRoute
    }
  }
  }
</script>
