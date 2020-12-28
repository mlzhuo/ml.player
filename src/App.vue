<template>
  <div :class="['app-inner-content', $options.styleModel]">
    <router-view />
    <MusicToolBar></MusicToolBar>
  </div>
</template>

<script>
import MusicToolBar from './components/MusicToolBar.vue';
export default {
  components: { MusicToolBar }
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
