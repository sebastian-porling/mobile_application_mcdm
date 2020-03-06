<template>
  <div id="ranking">
	<v-btn class="mx-2" fixed fab dark color="primary" @click="help = !help">
		<v-icon dark>mdi-help</v-icon>
	</v-btn>
    <h1 class="font-weight-thin text-center">Ranking</h1>
    <p class="text-center">Here you rank the different criteria based on how important they are for your project. Try to seperate them as much as possible.</p>
    <vue-slider
      v-model="ranking"
      :order="false"
      :tooltip="'always'"
      :process="false"
      :dotSize="20"
      :direction="'btt'"
      :height="400"
      :min="1"
      :max="100"
      :marks="marks"
      :silent="true"
      id="slider"
    >
      <template #tooltip="{ index }">
        <div v-if="index === 0">Budget</div>
        <div v-if="index === 1">UX</div>
        <div v-if="index === 2">Functions</div>
        <div v-if="index === 3">Reachability</div>
        <div v-if="index === 4">Maintencance</div>
        <div v-if="index === 5">Time to develop</div>
        <div v-if="index === 6">Performance</div>
      </template>
    </vue-slider>
    <v-row align="center" justify="center">
      <v-btn elevation="5" x-large color="primary" id="nextButton" @click="validateRanking()">Next</v-btn>
    </v-row>
	<v-dialog v-model="help" max-width="500px">
          <v-card>
            <v-card-text>
				<br>
				<p><b>Budget</b> - How important is keeping the costs low?</p>
				<p><b>UX</b> - How important is it to have a great User Experience?</p>
				<p><b>Functions</b> - Does the application rely on a lot of functions like bluetooth, nfc, micro-transactions?</p>
				<p><b>Reachability</b> - How important is it that the application is available for as many people as possible?</p>
				<p><b>Maintenance</b> - Will the application need a lot of future maintenance and updates?</p>
				<p><b>Time to develop</b> - How narrow is the deadline?</p>
				<p><b>Performance</b> - Will the application need to do heavy calculations or advanced graphics? Like games?</p>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn text color="primary" @click="help = false">Ok</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
  </div>
</template>

<script>
import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/default.css";
export default {
  components: {
    VueSlider
  },
  data: function() {
    return {
		help: false,
      ranking: this.$store.state.rankingScores,
      marks: {
        "100": {
          label: "Most important",
          labelStyle: {
            left: "50%",
            margin: "-40px 0 0 -50px",
            top: "50%"
            //transform: 'translateY(-50%)'
          }
        },
        "0": {
          label: "Least important",
          labelStyle: {
            right: "50%",
            margin: "30px 0 0 -50px",
            top: "50%",
            size: 150
            //transform: 'translateY(-50%)'
          }
        }
      }
    };
  },
  methods: {
    validateRanking() {
      this.$store.state.rankingScores = this.ranking;
      this.$router.push("/result");
    }
  }
};
</script>

<style>
#ranking {
	padding: 10pt;
	padding-left: 5%;
	padding-right: 5%;
	overflow: hidden;
}
#slider {
	margin: 0 auto;
	z-index: 2;
	margin-top: 50pt;
}

#nextButton {
	margin-bottom: 30pt;
	margin-top: 50pt;
}
</style>