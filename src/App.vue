<template>
  <div :class="['app-inner-content', styleModel]">
    <router-view />
    <MusicToolBar v-show="isShowMusicBar"></MusicToolBar>
  </div>
</template>

<script>
import MusicToolBar from './components/MusicToolBar.vue';
import { computed, getCurrentInstance, inject } from 'vue';
export default {
  components: { MusicToolBar },
  setup() {
    const styleModel = inject('styleModel');
    const { ctx } = getCurrentInstance();
    ctx.$store.commit('toggleMusicBar', true);
    const isShowMusicBar = computed(() => ctx.$store.state.isShowMusicBar);
    return {
      styleModel,
      isShowMusicBar
    };
  }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100vh;
}
.app-inner-content {
  min-height: 100vh;
  width: 100vw;
}
</style>
