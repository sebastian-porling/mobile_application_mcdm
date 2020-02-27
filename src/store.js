import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		formQuestions: {functionsNeeded: [], questions: {competence: null, website: null, shortLived: null}},
		rankingScores: [1, 20, 40, 50, 60, 80, 100],
		result: null
	},
	mutations: {
		increment (state) {
			state.count++
		}
	}	
})