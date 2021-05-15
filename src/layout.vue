<template>
  <v-app>
    <v-main>
      <v-navigation-drawer v-model="drawer" app>
        <v-card :height="topHeight">
          <v-card-title>Features</v-card-title>
        </v-card>
        <v-list shaped two-line>
          <v-list-item-group>
            <v-list-item @click="switchComponent('Metronome')"
              >Metronome</v-list-item
            > <!--bind a click event, when user click button, the name of component will be passed into a function called switchComponent-->
            <v-list-item @click="switchComponent('GuitarTuner')"
              >Guitar Tuner</v-list-item
            >
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>

      <v-app-bar app>
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title>{{ toolBarTitle }}</v-toolbar-title>
      </v-app-bar>
      <v-container v-if="currentRoute === 'Metronome'" class="fill-height"> <!--Use v-if directve to bind a variable to control the display of component-->
        <Metronome> </Metronome>
      </v-container>
      <v-container class="fill-height" v-if="currentRoute === 'GuitarTuner'">
        <GuitarTuner> </GuitarTuner>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import GuitarTuner from "./views/GuitarTuner"; //import the Guitar component
import Metronome from "./views/Metronome";//import the Metronome component
export default {
  name: "layout",
  components: {
    GuitarTuner,
    Metronome,
  },
  data: () => ({
    toolBarTitle: "",
    drawer: true, //control the status of drawer,
    currentRoute: '' //control the component to be mounted and showed
  }),
  computed: {
    topHeight: function () {//interactive value, to set the position of toolbar
      return this.$vuetify.application.top;
    },
  },
  methods: {
    switchComponent: function (componentName) {//when this function is called, change the variable value
      this.currentRoute = componentName;
      this.toolBarTitle = componentName;
    },
  },
};
</script>