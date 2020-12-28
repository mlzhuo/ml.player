import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import mixins from './assets/mixins';
import './assets/scss/index.scss';
const config = {
	errorHandler: () => {},
	warnHandler: () => {},
	globalProperties: {}
};
const app = createApp(App, config);
app.mixin(mixins);
app.use(store)
	.use(router)
	.mount('#app');
