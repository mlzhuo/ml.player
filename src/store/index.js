import { createStore } from 'vuex';
import { $get, $post } from '../assets/utils/axios';
import {
  TOGGLE_SHOW_MUSIC_BAR,
  TOGGLE_SHOW_NAVIGATION_BAR,
  SET_NAVIGATION_BAR_TITLE,
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  INIT_STATE,
  GET_USER_PLAYLIST,
  SAVE_USER_PLAYLIST,
  FILTER_USER_PLAYLIST,
  GET_PLAYLIST_DETAIL,
  GET_SONG_DETAIL
} from './constant';
export default createStore({
  state: {
    // 是否显示吸底播放控制条
    isShowMusicBar: true,
    // 是否显示导航栏
    isShowNavigationBar: true,
    navigationBarTitle: 'ML Player',
    userInfo: {},
    playList: []
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
    [INIT_STATE](state, payload) {
      state = Object.assign(state, payload);
    },
    [SAVE_USER_PLAYLIST](state, playList) {
      state.playList = playList;
    }
  },
  actions: {
    [LOGIN]: async ({ commit }, { data, success, failed }) => {
      const { email, md5_password } = data;
      const res = await $post({
        url: `login?timestamp=${+new Date()}`,
        data: { email, md5_password }
      });
      if (res.status == 200 && res.data.code == 200) {
        const { cookie, profile } = res.data;
        commit(LOGIN_SUCCESS, { cookie, ...profile });
        success && success({ cookie, ...profile });
      } else {
        const { message } = res.data;
        commit(LOGIN_FAILED);
        failed && failed(message);
      }
    },
    [GET_USER_PLAYLIST]: async ({ commit, state }, { success, failed }) => {
      if (!state.userInfo.userId) return;
      const res = await $get({
        url: `/user/playlist?timestamp=${+new Date()}&uid=${
          state.userInfo.userId
        }`
      });
      if (res.status == 200 && res.data.code == 200) {
        commit(SAVE_USER_PLAYLIST, res.data.playlist);
        success && success();
      } else {
        const { message } = res.data;
        failed && failed(message);
      }
    },
    [GET_PLAYLIST_DETAIL]: async ({ dispatch }, { id, success, failed }) => {
      const res = await $get({ url: `/playlist/detail?id=${id}` });
      if (res.status == 200 && res.data.code == 200) {
        dispatch(GET_SONG_DETAIL, {
          ids: res.data.playlist.trackIds.map(v => v.id).join(','),
          success,
          failed
        });
      } else {
        const { message } = res.data;
        failed && failed(message);
      }
    },
    [GET_SONG_DETAIL]: async (context, { ids, success, failed }) => {
      const res = await $get({ url: `song/detail?ids=${ids}` });
      if (res.status == 200 && res.data.code == 200) {
        success && success(res.data.songs);
      } else {
        const { message } = res.data;
        failed && failed(message);
      }
    }
  },
  getters: {
    [FILTER_USER_PLAYLIST]: state => type => {
      if (type == -1) {
        // 其他
        return state.playList.filter(
          v => v.specialType != 0 && v.specialType != 5 && v.specialType != 100
        );
      }
      if (type == 0) {
        // 我喜欢 && 我创建
        return state.playList.filter(
          v => v.specialType == 0 || v.specialType == 5
        );
      }
      // 收藏
      return state.playList.filter(v => v.specialType == type);
    }
  },
  modules: {}
});
