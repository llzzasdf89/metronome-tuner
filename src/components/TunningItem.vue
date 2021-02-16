<template>
  <div>
    <v-divider></v-divider>
    <v-list-item>
      <v-row>
        <v-col v-html="TunningName"> </v-col>
        <v-col class="text-right" v-html="TunningPitch"> </v-col>
      </v-row>
    </v-list-item>
  </div>
</template>
<script>
export default {
  name: "TunningItem",
  props: ["TunningName", "TunningPitch"],
};
</script>