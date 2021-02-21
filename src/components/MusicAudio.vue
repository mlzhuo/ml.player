<template>
  <audio ref="audio" :src="currentMusic.url" type="audio/mp3"></audio>
</template>

<script>
import { computed, getCurrentInstance, onMounted, watchEffect } from "vue";
export default {
  setup() {
    const { ctx } = getCurrentInstance();
    const currentMusic = computed(() => ctx.$store.state.currentMusic);
    const isPlaying = computed(() => ctx.$store.state.isPlaying);
    onMounted(() => {
      const audio = ctx.$refs.audio;
      watchEffect(() => {
        if (isPlaying.value) {
          audio.play();
        } else {
          audio.pause();
        }
      });
    });
    return {
      isPlaying,
      currentMusic,
    };
  },
};
</script>

<style>
</style>