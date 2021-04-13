<template>
  <div>
    <v-divider></v-divider>
    <v-list-item>
      <v-row>
        <v-col v-html="TuningName"> </v-col>
        <v-col class="text-right" v-html="TuningString"> </v-col>
      </v-row>
    </v-list-item>
  </div>
</template>
<script>
export default {
  name: "TuningItem",
  props: ["TuningName", "TuningString"],
};
</script>