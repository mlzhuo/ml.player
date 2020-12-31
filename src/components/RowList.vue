<template>
  <div :class="['row-list', styleModel]">
    <section class="list-item flex align-center content-between">
      <img />
      <div class="item-info flex column content-center">
        <text class="song-name one-lines-text">I Dreamt We Spoke Again</text>
        <text class="singer-name one-lines-text">Death Cab For Cutie</text>
      </div>
      <div class="play-btn">
        <i class="iconfont ml-bofang"></i>
      </div>
    </section>
  </div>
</template>

<script>
import { inject } from 'vue';
export default {
  props: {
    musicList: {
      type: Array,
      default: () => []
    }
  },
  emits: {
    musicList: () => true
  },
  setup() {
    const styleModel = inject('styleModel');
    return {
      styleModel
    };
  }
};
</script>

<style lang="scss" scoped>
.list-item {
  height: 60px;
  padding: 0 20px;
  img {
    width: 40px;
    height: 40px;
    border-radius: 10px;
  }
  .item-info {
    width: calc(100% - 80px);
    flex: 1;
    margin-left: 10px;
    text {
      flex: 1;
      width: 100%;
      &.song-name {
        font-size: 14px;
      }
      &.singer-name {
        font-size: 12px;
        margin-top: 5px;
      }
    }
  }
  .play-btn {
    width: 30px;
    text-align: right;
    .ml-bofang {
      font-size: 24px;
    }
  }
}
</style>
