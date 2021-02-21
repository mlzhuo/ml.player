<template>
  <div
    :class="['music-bar flex align-end content-between', styleModel]"
    @click="goPlayPage"
  >
    <div class="info-view flex align-center">
      <img :src="currentMusic.al.picUrl || defaultAvatarUrl" />
      <div class="name flex column content-center">
        <text class="song-name one-lines-text">{{ currentMusic.name }}</text>
        <text class="singer-name one-lines-text">{{
          currentMusic.ar.map((v) => v.name).join(" / ")
        }}</text>
      </div>
    </div>
    <div class="play-btn" @click.stop="toggglePlay">
      <i v-if="!isPlaying" class="iconfont ml-bofang1"></i>
      <i v-else class="iconfont ml-stop"></i>
    </div>
  </div>
</template>

<script>
import { computed, getCurrentInstance, inject } from "vue";
import { TOGGLE_PLAY_MUSIC } from "../store/constant";
import defaultAvatarUrl from '../assets/images/ml-player.png';
export default {
  setup() {
    const { ctx } = getCurrentInstance();
    const styleModel = inject("styleModel");
    const isPlaying = computed(() => ctx.$store.state.isPlaying);
    const currentMusic = computed(() => ctx.$store.state.currentMusic);
    const toggglePlay = () => {
      ctx.$store.commit(TOGGLE_PLAY_MUSIC, !isPlaying.value);
    };
    const goPlayPage = () => {
      ctx.$router.push("/playpage");
    };
    return {
      defaultAvatarUrl,
      styleModel,
      isPlaying,
      toggglePlay,
      currentMusic,
      goPlayPage,
    };
  },
};
</script>

<style lang="scss" scoped>
.music-bar {
  width: 100vw;
  height: 70px;
  position: fixed;
  bottom: 0;
  z-index: 999;
  .info-view {
    flex: 1;
    width: calc(100% - 90px);
    height: 60px;
    padding-left: 20px;
    img {
      width: 45px;
      height: 45px;
      border-radius: 50%;
      margin-right: 15px;
    }
    .name {
      width: calc(100% - 60px);
      text {
        width: 100%;
      }
    }
    .singer-name {
      font-size: 13px;
    }
  }
  .play-btn {
    height: 70px;
    width: 70px;
    border-radius: 10px 0px 0px 0px;
    line-height: 70px;
    text-align: center;
    .iconfont {
      font-size: 25px;
      color: #fff;
    }
  }
}
</style>
