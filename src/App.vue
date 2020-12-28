<template>
  <router-view />
  <MusicToolBar></MusicToolBar>
</template>

<script>
import MusicToolBar from "./components/MusicToolBar.vue";
export default {
  components: { MusicToolBar },
  setup() {
    const hour = new Date().getHours();
    const model = hour > 6 && hour < 20 ? "" : "dark-model";
    return {
      model,
    };
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
