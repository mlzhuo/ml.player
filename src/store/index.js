import { createStore } from 'vuex';
import { $post } from '../assets/utils/axios';
import {
  TOGGLE_SHOW_MUSIC_BAR,
  TOGGLE_SHOW_NAVIGATION_BAR,
  SET_NAVIGATION_BAR_TITLE,
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILED
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
    [LOGIN_SUCCESS](state, userInfo) {
      state.userInfo = Object.assign(state.userInfo, userInfo);
    },
    [LOGIN_FAILED](state) {
      state.userInfo = {};
    }
  },
  actions: {
    async [LOGIN]({ commit }, { data, success, failed }) {
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
    }
  },
  modules: {}
});
