import { createStore } from 'vuex';
import { $get, $post } from '../assets/utils/axios';
import {
	TOGGLE_SHOW_MUSIC_BAR,
	TOGGLE_SHOW_NAVIGATION_BAR,
	SET_NAVIGATION_BAR_TITLE,
	LOGIN,
	LOGIN_SUCCESS,
	LOGIN_FAILED,
	UPDATE_LOCAL_DATA,
	INIT_STATE,
	GET_USER_PLAYLIST,
	SAVE_USER_PLAYLIST,
	FILTER_USER_PLAYLIST,
	GET_PLAYLIST_DETAIL,
	GET_SONG_DETAIL,
	CHECK_MUSIC,
	GET_MUSIC_URL,
	GET_MUSIC_LYRIC,
	SAVE_CURRENT_MUSIC,
	SAVE_CURRENT_PLAYLIST,
	TOGGLE_PLAY_MUSIC
} from './constant';

const resFormat = res => {
	return new Promise((resolve, reject) => {
		if (res.status == 200 && (res.data.code == 200 || res.data.success)) {
			resolve(res);
		} else {
			reject();
		}
	});
};

export default createStore({
	state: {
		// 是否显示吸底播放控制条
		isShowMusicBar: true,
		// 是否显示导航栏
		isShowNavigationBar: true,
		navigationBarTitle: 'ML Player',
		userInfo: {},
		playList: [],
		currentMusic: {},
		currentPlayList: {
			playlist: {},
			songs: []
		},
		isPlaying: false
	},
	mutations: {
		[TOGGLE_SHOW_MUSIC_BAR]: (state, isShowMusicBar) => {
			state.isShowMusicBar = isShowMusicBar;
		},
		[TOGGLE_SHOW_NAVIGATION_BAR]: (state, isShowNavigationBar) => {
			state.isShowNavigationBar = isShowNavigationBar;
		},
		[SET_NAVIGATION_BAR_TITLE]: (state, navigationBarTitle) => {
			state.navigationBarTitle = navigationBarTitle;
		},
		[LOGIN_SUCCESS](state, userInfo) {
			state.userInfo = Object.assign(state.userInfo, userInfo);
		},
		[LOGIN_FAILED](state) {
			state.userInfo = {};
		},
		[UPDATE_LOCAL_DATA](state) {
			localStorage.setItem('userData', JSON.stringify(state));
		},
		[INIT_STATE](state, payload) {
			state = Object.assign(state, payload);
		},
		[SAVE_USER_PLAYLIST](state, playList) {
			state.playList = playList;
		},
		[SAVE_CURRENT_MUSIC](state, music) {
			state.currentMusic = Object.assign(state.currentMusic, music);
		},
		[SAVE_CURRENT_PLAYLIST](state, playList) {
			state.currentPlayList = playList;
		},
		[TOGGLE_PLAY_MUSIC](state, isPlaying) {
			state.isPlaying = isPlaying;
		}
	},
	actions: {
		[LOGIN]: async (context, { data }) => {
			const { email, md5_password } = data;
			const res = await $post({
				url: `login`,
				data: { email, md5_password }
			});
			return resFormat(res);
		},
		[GET_USER_PLAYLIST]: async ({ state }) => {
			if (!state.userInfo.userId) return;
			const res = await $get({
				url: `user/playlist?uid=${state.userInfo.userId}`
			});
			return resFormat(res);
		},
		[GET_PLAYLIST_DETAIL]: async (context, { id }) => {
			const res = await $get({ url: `playlist/detail?id=${id}` });
			return resFormat(res);
		},
		[GET_SONG_DETAIL]: async (context, { ids }) => {
			const res = await $get({ url: `song/detail?ids=${ids}` });
			return resFormat(res);
		},
		[CHECK_MUSIC]: async (context, { id }) => {
			const res = await $get({ url: `check/music?id=${id}` });
			return resFormat(res);
		},
		[GET_MUSIC_URL]: async (context, { id, ids }) => {
			const res = await $get({
				url: id ? `song/url?id=${id}` : `song/url?ids=${ids}`
			});
			return resFormat(res);
		},
		[GET_MUSIC_LYRIC]: async (context, { id }) => {
			const res = await $get({ url: `lyric?id=${id}` });
			return resFormat(res);
		}
	},
	getters: {
		[FILTER_USER_PLAYLIST]: state => type => {
			if (type == 0) {
				// 我喜欢 && 我创建
				return state.playList.filter(
					v => v.specialType == 0 || v.specialType == 5
				);
			}
			if (type == -1) {
				// 其他
				return state.playList.filter(
					v =>
						v.specialType != 0 &&
						v.specialType != 5 &&
						v.specialType != 100
				);
			}
			// 收藏
			return state.playList.filter(v => v.specialType == type);
		}
	},
	modules: {}
});
