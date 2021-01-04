import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home
	},
	{
		path: '/login',
		name: 'Login',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () =>
			import(/* webpackChunkName: "about" */ '../views/Login.vue')
	},
	{
		path: '/playlistdetail',
		name: 'PlayListDetail',
		component: () => import('../views/PlayListDetail.vue')
	},
	{
		path: '/playpage',
		name: 'PlayPage',
		component: () => import('../views/PlayPage.vue')
	}
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
});

export default router;
