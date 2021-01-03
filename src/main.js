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
  store.commit(INIT_STATE, JSON.parse(userData));
}

const showMusicBarPathList = ['/'];
router.beforeEach((to, from, next) => {
  const { path } = to;
  if (path == '/') {
    store.commit(TOGGLE_SHOW_NAVIGATION_BAR, false);
  } else {
    store.commit(TOGGLE_SHOW_NAVIGATION_BAR, true);
  }
  if (showMusicBarPathList.findIndex(v => v == path) !== -1) {
    store.commit(TOGGLE_SHOW_MUSIC_BAR, true);
  } else {
    store.commit(TOGGLE_SHOW_MUSIC_BAR, false);
  }
  next();
});

const setModel = () => {
  const hour = new Date().getHours();
  const styleModel = hour < 7 || hour > 18 ? 'dark-model' : 'dark-model';
  return styleModel;
};

const app = createApp(App, {});
app.provide('styleModel', setModel());
app
  .use(store)
  .use(router)
  .mount('#app');
