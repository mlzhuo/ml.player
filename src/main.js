import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './assets/scss/index.scss';
import {
	TOGGLE_SHOW_MUSIC_BAR,
	TOGGLE_SHOW_NAVIGATION_BAR,
	INIT_STATE
} from './store/constant';

const userData = localStorage.getItem('userData');
if (userData) {
	store.commit(INIT_STATE, {...JSON.parse(userData), isPlaying: false});
}

const noShoNavigationBarPathList = ['/', '/playpage'];
const showMusicBarPathList = ['/'];
router.beforeEach((to, from, next) => {
	const { path } = to;
	store.commit(
		TOGGLE_SHOW_NAVIGATION_BAR,
		noShoNavigationBarPathList.findIndex(v => v == path) === -1
	);

	store.commit(
		TOGGLE_SHOW_MUSIC_BAR,
		showMusicBarPathList.findIndex(v => v == path) !== -1
	);
	next();
});

const setModel = () => {
	const hour = new Date().getHours();
	const styleModel = hour < 7 || hour > 18 ? 'dark-model' : 'light-model';
	return styleModel;
};

const app = createApp(App, {});
app.provide('styleModel', setModel());
app.use(store)
	.use(router)
	.mount('#app');
