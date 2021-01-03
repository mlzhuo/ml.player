<template>
  <div :class="['gird-list flex content-between', styleModel]">
    <section
      class="gird-item flex align-center content-between column"
      :class="index < column ? 'no-m-top' : ''"
      :style="itemStyle"
      v-for="(item, index) in listData"
      :key="index"
      @click="itemTap(item.id)"
    >
      <img :style="imgStyle" :src="item.coverImgUrl" v-if="item.coverImgUrl" />
      <div :class="['add-new', styleModel]" :style="imgStyle" v-if="item.add">
        <div class="flex align-center content-center">
          <i class="iconfont ml-add"></i>
        </div>
      </div>
      <text class="item-title two-lines-text" v-if="item.name">{{
        item.name
      }}</text>
    </section>
  </div>
</template>

<script>
import { computed, getCurrentInstance, inject } from 'vue';
import _ from 'lodash';
import { FILTER_USER_PLAYLIST } from '../store/constant';
export default {
  props: {
    itemHeight: {
      type: Number
    },
    column: {
      type: Number,
      default: 3
    },
    gap: {
      type: Number,
      default: 10
    },
    specialType: {
      type: Number,
      required: true
    }
  },
  emits: {
    itemHeight: () => true,
    gap: () => true,
    column: () => true,
    specialType: () => true
  },
  setup() {
    const styleModel = inject('styleModel');
    const { ctx } = getCurrentInstance();
    const { itemHeight, column, gap, specialType } = ctx;
    const screenWidth = document.body.clientWidth;
    const itemWidth = (screenWidth - (column - 1) * gap - 40) / column;
    const itemStyle = `height: ${itemHeight}px;width:${itemWidth}px;`;
    const imgStyle = `width:${itemWidth}px;height:${itemWidth}px;`;
    const playList = computed(() =>
      ctx.$store.getters[FILTER_USER_PLAYLIST](specialType)
    );
    const listData = computed(() => {
      const tempList =
        specialType == 0
          ? [...playList.value, { add: true }]
          : [...playList.value];
      const last = tempList.length % column;
      if (last !== 0) {
        tempList.push(..._.fill(Array(column - last), {}));
      }
      return tempList;
    });

    const itemTap = id => ctx.$router.push(`/playlistdetail?id=${id}`);

    return {
      styleModel,
      itemStyle,
      imgStyle,
      listData,
      itemTap
    };
  }
};
</script>

<style lang="scss" scoped>
.gird-list {
  flex-wrap: wrap;
  padding: 0 20px 10px;
  .gird-item {
    margin-top: 16px;
    overflow: hidden;
    &.no-m-top {
      margin-top: 0;
    }
    img {
      border-radius: 10px;
    }
    .item-title {
      width: 100%;
      flex: 1;
      align-self: start;
      margin-top: 8px;
      line-height: 14px;
      font-size: 12px;
    }
    .add-new {
      border-radius: 10px;
      overflow: hidden;
      > div {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
