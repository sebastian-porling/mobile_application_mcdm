<template>
	<div class="small">
		<v-btn class="mx-2" fixed fab dark color="primary" @click="help = !help">
			<v-icon dark>mdi-help</v-icon>
		</v-btn>
		<h1 class="text-center font-weight-thin">Your best choice is {{winnerChoice}}!</h1>
		<p class="text-center font-weight-thin">It is {{winPercentage1}}% better than {{looserChoice1}} and {{winPercentage2}}% better than {{looserChoice2}}</p>
		<div class="text-center font-weight-thin winner" v-if="winnerChoice == 'pwa'">
			<p>
				Functions that are not possible to implement in a pwa are: 
				<span v-for="(val, index) in functions" v-bind:key="val"> {{val}} <span v-if="index != (functions.length - 1)"> and</span></span>
			</p>
		</div>
		<div>
			<p>
				The height differences between the bars for a certain category such as “UX” is based on a set ratio between the alternative development tools. 
				Meaning that for UX, Native will always be the best alternative while PWA the worst. <br/>
				The order in which you rank the categories and the answers you gave previously are combined do determine the impact of each category on the result as a whole.<br/>	
				This result will give you the recommended development tool along with how high it ranked compared to the other tools.
			</p>
		</div>
		<br>
		<bar-chart :chart-data="datacollection" class="chart"></bar-chart>
		<v-dialog v-model="help" max-width="500px">
          <v-card>
            <v-card-text>
				<br>
				<p>text</p>
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
  import BarChart from './BarChart.vue'

  export default {
    components: {
      BarChart
    },
    data () {
      return {
		help: false,
		datacollection: null,
		functions: [],
		winnerChoice: "",
		looserChoice1: "",
		winPercentage1: 0,
		looserChoice2: "",
		winPercentage2: 0,
      }
	},
	created() {
		this.$nextTick(function () {
			this.$confetti.start()
			setTimeout(function () { this.$confetti.stop() }.bind(this), 1500)
		})
	},
    mounted () {
      this.fillData()
    },
    methods: {
		fillData () {
			this.result = this.calculateScores()
			this.datacollection = {
				labels: ["Budget", "UX", "Functions", "Reachability", "Maintenance", "Time to develop", "Performance"],
				datasets: [
					{
						label: 'pwa',
						backgroundColor: '#FFA500',
						data: this.result.pwa.data
					}, {
						label: 'native',
						backgroundColor: '#9999ff',
						data: this.result.native.data
					}, {
						label: 'react',
						backgroundColor: '#FF0000',
						data: this.result.react.data
					}
				]
			},
			this.options = {
				type: "horizontalBar"
			}
		},
		calculateScore(scoreArray, normalizedWeights){
			this.scores = scoreArray.map((score, index) => score * normalizedWeights[index])
			this.sumScore = this.scores.reduce((first, second) => first + second, 0)
			return {data: this.scores, sumScore: this.sumScore};
		},
		calculateScores(){
			this.pwa = [10, 6, 2, 10, 6, 10, 7]
			this.native = [7, 10, 10, 5, 10, 5, 10]
			this.react = [9, 8, 9, 8, 4, 7, 8.5]
			this.weights = this.addQuestionImpact(this.$store.state.rankingScores)
			this.weightSum = this.weights.reduce((weight1, weight2) => weight1 + weight2, 0);
			this.normalizedWeights = this.weights.map(weight => weight / this.weightSum)
			this.finalScore = {
				pwa: this.calculateScore(this.pwa, this.normalizedWeights), 
				native: this.calculateScore(this.native, this.normalizedWeights),
				react: this.calculateScore(this.react, this.normalizedWeights)
			}
			
			if(this.finalScore.pwa.sumScore>this.finalScore.native.sumScore && this.finalScore.pwa.sumScore>this.finalScore.react.sumScore){
				this.winnerChoice = "PWA";
				this.looserChoice1 = "Native";
				this.winPercentage1 = this.calculateWinPercentage(this.finalScore.pwa.sumScore, this.finalScore.native.sumScore)
				this.looserChoice2 = "React Native";
				this.winPercentage2 = this.calculateWinPercentage(this.finalScore.pwa.sumScore, this.finalScore.react.sumScore)
			}else if(this.finalScore.native.sumScore>this.finalScore.pwa.sumScore && this.finalScore.native.sumScore>this.finalScore.react.sumScore){
				this.winnerChoice = "Native";
				this.looserChoice1 = "PWA";
				this.winPercentage1 = this.calculateWinPercentage(this.finalScore.native.sumScore, this.finalScore.pwa.sumScore)
				this.looserChoice2 = "React Native";
				this.winPercentage2 = this.calculateWinPercentage(this.finalScore.native.sumScore, this.finalScore.react.sumScore)
			}else if(this.finalScore.react.sumScore>this.finalScore.pwa.sumScore && this.finalScore.react.sumScore>this.finalScore.native.sumScore){
				this.winnerChoice = "React Native";
				this.looserChoice1 = "PWA";
				this.winPercentage1 = this.calculateWinPercentage(this.finalScore.react.sumScore, this.finalScore.pwa.sumScore)
				this.looserChoice2 = "Native";
				this.winPercentage2 = this.calculateWinPercentage(this.finalScore.react.sumScore, this.finalScore.native.sumScore)
			}
			return this.finalScore;
		},

		addQuestionImpact(weights){
			this.form = this.$store.state.formQuestions
			if(this.form.functionsNeeded.length > 0){
				this.sumFunctions = 0;
				this.form.functionsNeeded.forEach(fn => {
					if (fn == "NFC" || fn == "Surrounding sensors" || fn == "Contacts" || fn == "Scheduling" || fn == "High accuracy GPS" || fn == "Geofencing") {
						this.sumFunctions += 2
						this.functions.push(fn)
					}else if(fn != null){
						this.sumFunctions++
						this.functions.push(fn)
					}
				})
				weights[2] = weights[2] * ((this.sumFunctions / 20) + 1);
			}
			if(this.form.questions.competence != null && this.form.questions.website != null && this.form.questions.shortLived != null){
				switch(this.form.questions.competence){
					case "web":
						weights[0] = weights[0] * 1.5
						break;
					case "native":
						weights[0] = weights[0] * 0.5
						break;
					default:

				}
				if(this.form.questions.website == "yes-exists"){
					weights[0] = weights[0] * 1.3
				}
				if (this.form.questions.shortLived == "yes-short") {
					weights[4] = weights[4] * 0.5
				}
			}
			return weights;
		},
		calculateWinPercentage(winner, looser){
			return Math.round(((winner / looser) - 1)*100);
		}
	}
}
</script>

<style>
  .small {
    max-width: 600px;
    margin:  50px auto;
	margin-top: 10pt;
  }
  .chart {
		padding: 20px;
  }
  .winner{
	padding: 10px;
  }
</style>