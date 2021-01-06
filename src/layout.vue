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
            >
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
      <v-container v-if="currentRoute === 'Metronome'" class="fill-height">
        <Metronome> </Metronome>
      </v-container>
      <v-container class="fill-height" v-if="currentRoute === 'GuitarTuner'">
        <GuitarTuner> </GuitarTuner>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import GuitarTuner from "./components/GuitarTuner";
import Metronome from "./components/Metronome";
export default {
  name: "layout",
  components: {
    GuitarTuner,
    Metronome,
  },
  data: () => ({
    toolBarTitle: "Metronome and Guitar Tuner",
    drawer: true, //control the status of drawer,
    currentRoute: window.location.pathname,
  }),
  computed: {
    topHeight: function () {
      return this.$vuetify.application.top;
    },
  },
  methods: {
    switchComponent: function (componentName) {
      this.$data.currentRoute = componentName;
      this.$data.toolBarTitle = componentName;
    },
  },
};
</script>