import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './assets/scss/index.scss';
import { $get, $post } from './assets/utils/axios';

const showMusicBarPathList = ['/'];
router.beforeEach((to, from, next) => {
  const { path } = to;
  if (showMusicBarPathList.findIndex(v => v == path) !== -1) {
    store.commit('toggleMusicBar', true);
  } else {
    store.commit('toggleMusicBar', false);
  }
  next();
});

const setModel = () => {
  const hour = new Date().getHours();
  const styleModel = hour < 7 || hour > 18 ? 'dark-model' : 'dark-model';
  return styleModel;
};

const app = createApp(App, {});
app.provide('$get', $get);
app.provide('$post', $post);
app.provide('styleModel', setModel());
app
  .use(store)
  .use(router)
  .mount('#app');
