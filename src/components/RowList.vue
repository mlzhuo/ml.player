<template>
  <div :class="['row-list', styleModel]">
    <section
      v-for="item in musicList"
      :key="item.id"
      class="list-item flex align-center content-between"
      @click="itemTap(item.id)"
    >
      <img :src="item.al.picUrl" />
      <div class="item-info flex column content-center">
        <text class="song-name one-lines-text">{{ item.name }}</text>
        <text class="singer-name one-lines-text"
          >{{ item.ar.map(v => v.name).join(' / ') }} 《{{
            item.al.name
          }}》</text
        >
      </div>
      <!-- <div class="play-btn">
        <i class="iconfont ml-bofang"></i>
      </div> -->
    </section>
  </div>
</template>

<script>
import { getCurrentInstance, inject } from 'vue';
import { CHECK_MUSIC } from '../store/constant';
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
    const { ctx } = getCurrentInstance();
    const styleModel = inject('styleModel');
    const itemTap = id => {
      ctx.$store.dispatch(CHECK_MUSIC, { id });
    };
    return {
      styleModel,
      itemTap
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
