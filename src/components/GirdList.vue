<template>
  <div
    :class="[
      'gird-list flex align-center content-between',
      $options.styleModel,
    ]"
  >
    <section
      class="gird-item flex align-center content-between column"
      :class="item < 4 ? 'no-m-top' : ''"
      :style="itemStyle"
      v-for="item in 9"
      :key="item"
    >
      <img :style="imgStyle" />
      <text class="one-lines-text">SUMMERSUMMERSUMMER</text>
    </section>
  </div>
</template>

<script>
import { getCurrentInstance } from "vue";
export default {
  props: {
    itemHeight: {
      type: Number,
      default: 130,
    },
    column: {
      type: Number,
      default: 3,
    },
    gap: {
      type: Number,
      default: 10,
    },
  },
  emits: {
    itemHeight: () => true,
    column: () => true,
  },
  setup() {
    const { ctx } = getCurrentInstance();
    const { itemHeight, column, gap } = ctx;
    const screenWidth = document.body.clientWidth;
    const itemWidth = (screenWidth - (column - 1) * gap - 40) / column;
    const itemStyle = `height: ${itemHeight}px;width:${itemWidth}px;`;
    const imgStyle = `width:${itemWidth}px;height:${itemWidth}px;`;
    return {
      itemStyle,
      imgStyle,
    };
  },
};
</script>

<style lang="scss" scoped>
.gird-list {
  flex-wrap: wrap;
  padding: 10px 20px;
  .gird-item {
    margin-top: 16px;
    overflow: hidden;
    &.no-m-top {
      margin-top: 0;
    }
    img {
      border-radius: 10px;
    }
    text {
      width: 100%;
      flex: 1;
      align-self: start;
      margin-top: 8px;
      line-height: 14px;
      font-size: 12px;
    }
  }
}
</style>