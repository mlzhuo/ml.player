<template>
  <div :class="['play-page flex column align-center', styleModel]">
    <div class="music-name">{{ music.musicName }}</div>
    <div class="artist-name">{{ music.artistName }}</div>
    <img class="play" :src="music.picUrl" />
    <div class="lyric"></div>
    <div class="control"></div>
  </div>
</template>

<script>
import { getCurrentInstance, inject, ref } from "vue";
import {
  GET_MUSIC_LYRIC,
  GET_MUSIC_URL,
  SAVE_CURRENT_MUSIC,
  TOGGLE_SHOW_NAVIGATION_BAR,
} from "../store/constant";
import defaultPicUrl from "../assets/images/ml-player.png";
export default {
  name: "PlayPage",
  setup() {
    const { ctx } = getCurrentInstance();
    ctx.$store.commit(TOGGLE_SHOW_NAVIGATION_BAR, false);
    const styleModel = inject("styleModel");
    const { currentMusic } = ctx.$store.state;
    const picUrl = currentMusic.al.picUrl;
    const musicName = currentMusic.name;
    const artistName = currentMusic.ar.map((v) => v.name).join(" / ");
    const music = ref({ picUrl: defaultPicUrl });
    const getMusic = async () => {
      const resMusic = await ctx.$store.dispatch(GET_MUSIC_URL, {
        id: currentMusic.id,
      });
      const resLyric = await ctx.$store.dispatch(GET_MUSIC_LYRIC, {
        id: currentMusic.id,
      });
      const { url } = resMusic.data.data;
      const { lyric } = resLyric.data.lrc;
      ctx.$store.commit(SAVE_CURRENT_MUSIC, {
        url,
        lyric,
        picUrl,
      });
      music.value = {
        picUrl,
        musicName,
        artistName,
      };
    };
    getMusic();
    return {
      music,
      styleModel,
    };
  },
};
</script>

<style lang="scss" scoped>
.play-page {
  height: 100vh;
  width: 100vw;
  padding: 20px;
  box-sizing: border-box;
  .music-name {
    font-weight: bold;
  }
  .artist-name {
    margin-bottom: 20px;
    font-size: 14px;
  }
  img {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    transform: rotate(0);
    &.play {
      animation: imgRun 60s linear infinite paused;
    }
  }
  .lyric {
    width: 100vw;
    flex: 1;
    padding: 20px 0;
    background: #666;
  }
  .control {
    width: 100vw;
    height: 100px;
    background: #ccc;
  }
}
@keyframes imgRun {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>