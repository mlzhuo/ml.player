<template>
  <div :class="['play-page flex column align-center', styleModel]">
    <div class="music-name">{{ music.musicName }}</div>
    <div class="artist-name">{{ music.artistName }}</div>
    <img class="play" :class="isPlaying ? '' : 'stop'" :src="music.picUrl" />

    <div class="lyric">
      <!-- <div class="inner-content flex column align-center">
        <p class="flex align-center">1</p>
        <p class="flex align-center">1</p>
      </div> -->
    </div>
    <div class="control flex align-center content-center">
      <div class="l"><text class="iconfont ml-zuoyou"></text></div>
      <div class="c">
        <text
          v-if="isPlaying"
          @click="toggglePlay"
          class="iconfont ml-zanting"
        ></text>
        <text v-else @click="toggglePlay" class="iconfont ml-bofang"></text>
      </div>
      <div class="r"><text class="iconfont ml-zuoyou"></text></div>
    </div>
  </div>
</template>

<script>
import { computed, getCurrentInstance, inject, ref } from "vue";
import {
  GET_MUSIC_LYRIC,
  GET_MUSIC_URL,
  SAVE_CURRENT_MUSIC,
  TOGGLE_SHOW_NAVIGATION_BAR,
  TOGGLE_PLAY_MUSIC,
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
      const { url } = resMusic.data.data[0];
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
    ctx.$store.commit(TOGGLE_PLAY_MUSIC, true);
    const isPlaying = computed(() => ctx.$store.state.isPlaying);
    const toggglePlay = () => {
      ctx.$store.commit(TOGGLE_PLAY_MUSIC, !isPlaying.value);
    };
    return {
      music,
      styleModel,
      isPlaying,
      toggglePlay,
    };
  },
};
</script>

<style lang="scss" scoped>
.play-page {
  height: 100vh;
  width: 100vw;
  padding: 20px 20px 0;
  box-sizing: border-box;
  .music-name {
    font-size: 18px;
    font-weight: bold;
    line-height: 24px;
    min-height: 24px;
    text-align: center;
  }
  .artist-name {
    margin-top: 5px;
    margin-bottom: 50px;
    font-size: 14px;
    line-height: 20px;
    min-height: 20px;
    padding: 0 50px;
    text-align: center;
  }
  img {
    width: 250px;
    height: 250px;
    border-radius: 50%;
    transform: rotate(0);
    animation: imgRun 60s linear infinite;
    &.stop {
      animation-play-state: paused;
    }
  }
  .lyric {
    width: 100vw;
    flex: 1;
    margin: 45px;
    overflow: hidden;
    position: relative;
    .inner-content {
      position: absolute;
      width: 100%;
      top: 0;
      left: 0;
      transition: top 0.2s ease;
      overflow: hidden;
      p {
        margin: 0 0 10px;
      }
    }
  }
  .control {
    width: 100vw;
    height: 100px;
    > div {
      margin: 0 25px;
      &.l {
        .iconfont {
          font-size: 28px;
        }
      }
      &.c {
        .iconfont {
          font-size: 56px;
        }
      }
      &.r {
        .iconfont {
          font-size: 28px;
          transform: rotate(180deg);
        }
      }
    }
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