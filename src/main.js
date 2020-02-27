import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import store from './store'
import VueConfetti from 'vue-confetti'

Vue.config.productionTip = false
Vue.prototype.$formQuestions = {functionsNeeded: [], questions: {competence: null, website: null, shortLived: null}};
Vue.prototype.$rankingScores = [];

Vue.use(VueConfetti)

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App),
}).$mount('#app')
