import { createStore } from 'vuex';
import {
  TOGGLE_SHOW_MUSIC_BAR,
  TOGGLE_SHOW_NAVIGATION_BAR,
  SET_NAVIGATION_BAR_TITLE,
  LOGIN_SUCCESS,
  SAVE_USERINFO
} from './constant';
export default createStore({
  state: {
    // 是否显示吸底播放控制条
    isShowMusicBar: true,
    // 是否显示导航栏
    isShowNavigationBar: true,
    navigationBarTitle: 'ML Player',
    userInfo: {}
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
    [SAVE_USERINFO]: (state, userInfo) => {
      state.userInfo = Object.assign(state.userInfo, userInfo);
    }
  },
  actions: {
    [LOGIN_SUCCESS]({ commit }, payload) {
      commit(SAVE_USERINFO, payload);
    }
  },
  modules: {}
});
