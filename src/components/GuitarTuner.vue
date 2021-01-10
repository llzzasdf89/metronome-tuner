<template>
  <v-container class="ma-auto" >
      <v-row>

          <v-col cols='8'>
    <v-img src="@/assets/guitar.png" width="568px" height="620px" class="ma-auto">
<v-btn-toggle 
      group 
      tile
      class="btn-toggle-layout " 
      >
                  <v-btn class="btn-toggle-4th-string" >
                D
              </v-btn>
              <v-btn class="btn-toggle-5th-string">
                A
              </v-btn>
              <v-btn class="btn-toggle-6th-string">
                E
              </v-btn>
              <v-btn class="btn-toggle-3rd-string">
                G
              </v-btn>
              <v-btn class="btn-toggle-2nd-string">
                B
              </v-btn>
              <v-btn class="btn-toggle-1st-string">
                E
              </v-btn>
            </v-btn-toggle>
      </v-img>
          </v-col>
          <v-col class='justify-center flex-column d-flex'>
              <v-card outlined>      
                  <v-card-title>
                      SELECT TUNING
                  </v-card-title>
                  <v-list-item-group
                  color = "indigo">
                    <TunningItem 
                    v-for="tunning in tunnings"
                    :key = "tunning.name"
                    :TunningName = "tunning.name"
                    :TunningPitch = "tunning.pitches"
                    />
                  </v-list-item-group>
      </v-card>
          </v-col>
      </v-row>
  </v-container>
</template>
<style scoped>
.btn-toggle-layout{
    width:100%;
    height:60%;
    position:relative
}
.btn-toggle-4th-string{
  position: absolute;
  top:25%;
  left: 0;
}
.btn-toggle-5th-string{
  position: absolute;
  top:55%;
  left: 0;
}
.btn-toggle-6th-string{
  position: absolute;
  bottom:0;
  left: 0;
}
.btn-toggle-3rd-string{
  position: absolute;
  top:25%;
  right: 0;
}
.btn-toggle-2nd-string{
  position: absolute;
  top:55%;
  right: 0;
}
.btn-toggle-1st-string{
  position: absolute;
  bottom:0;
  right: 0;
}
</style>
<script>
import TunningItem from '@/components/TunningItem'
import tunnings from '@/assets/tunnings'
export default {
  name: "GuitarTuner",
  components:{
    TunningItem
  },
  data: () => ({
    tunnings
   } )
};
</script>