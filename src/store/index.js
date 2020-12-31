import { createStore } from 'vuex';

export default createStore({
  state: {
    // 是否显示吸底播放控制条
    isShowMusicBar: true,
    userInfo: {}
  },
  mutations: {
    toggleMusicBar: (state, isShowMusicBar) => {
      state.isShowMusicBar = isShowMusicBar;
    }
  },
  actions: {},
  modules: {}
});
