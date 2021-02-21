<template>
  <div
    :class="['app-inner-content', styleModel]"
    :style="isShowNavigationBar ? 'padding-top:64px' : ''"
  >
    <NavigationBar
      v-if="isShowNavigationBar"
      :title="navigationBarTitle"
    ></NavigationBar>
    <router-view />
    <MusicToolBar v-show="isShowMusicBar && currentMusic.url"></MusicToolBar>
    <MusicAudio></MusicAudio>
  </div>
</template>

<script>
import NavigationBar from "./components/NavigationBar";
import MusicToolBar from "./components/MusicToolBar.vue";
import MusicAudio from "./components/MusicAudio.vue";
import { computed, getCurrentInstance, inject } from "vue";
export default {
  components: { MusicToolBar, NavigationBar, MusicAudio },
  setup() {
    const styleModel = inject("styleModel");
    const { ctx } = getCurrentInstance();
    const isShowMusicBar = computed(() => ctx.$store.state.isShowMusicBar);
    const { currentMusic } = ctx.$store.state; 
    const isShowNavigationBar = computed(
      () => ctx.$store.state.isShowNavigationBar
    );
    const navigationBarTitle = computed(
      () => ctx.$store.state.navigationBarTitle
    );
    return {
      styleModel,
      isShowMusicBar,
      currentMusic,
      isShowNavigationBar,
      navigationBarTitle,
    };
  },
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
