import Vue from 'vue'
import VueRouter from 'vue-router';
/*import StartScreen from './components/StartScreen';
import FormQuestions from './components/FormQuestions'
import Ranking from './components/Ranking';
import Result from './components/Result';*/

const StartScreen = () => import('./components/StartScreen');
const FormQuestions = () => import('./components/FormQuestions');
const Ranking = () => import('./components/Ranking');
const Result = () => import('./components/Result');

Vue.use(VueRouter);

const routes = [
  { path: '/', component: StartScreen },
  { path: '/questions', component: FormQuestions },
  { path: '/ranking', component: Ranking},
  { path: '/result', component: Result}
]

export default new VueRouter({
	mode: 'history',
	routes, // short for `routes: routes`
	scrollBehavior (to, from, savedPosition) {
		const position = {
			x: 0,
			y: 0
		};

		if (savedPosition) {
			position.x = savedPosition.x;
			position.y = savedPosition.y;
		} else {
		return new Promise(resolve => {
			this.app.$root.$once('scrollBeforeEnter', () => {
				resolve(position);
			});
		});
		}
	}
})
