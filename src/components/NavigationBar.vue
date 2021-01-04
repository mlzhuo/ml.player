<template>
  <div :class="['navigation-bar flex align-center', styleModel]">
    <div class="back-icon flex align-center" @click="back">
      <i class="iconfont ml-right"></i>
    </div>
    <div class="title one-lines-text">{{ title }}</div>
  </div>
</template>

<script>
import { getCurrentInstance, inject } from "vue";
export default {
  props: {
    title: {
      type: String,
      default: "ML PLAYER",
    },
  },
  emits: {
    title: () => true,
  },
  setup() {
    const styleModel = inject("styleModel");
    const { ctx } = getCurrentInstance();
    const back = () => {
      ctx.$router.back();
    };
    return {
      styleModel,
      back,
    };
  },
};
</script>

<style lang="scss" scoped>
.navigation-bar {
  width: 100%;
  height: 64px;
  padding: 0 10px;
  position: fixed;
  top: 0;
  left: 0;
  .back-icon {
    width: 45px;
    height: 64px;
    .ml-right {
      font-size: 24px;
      transform: rotate(180deg);
    }
  }
  .title {
    flex: 1;
    width: 100%;
    font-weight: bold;
  }
}
</style>
