<template>
  <div
    :class="['title-bar flex align-center content-between', styleModel]"
    @click="$emit('titleTab', title)"
  >
    <text>{{ title }}</text>
    <text class="iconfont ml-right"></text>
  </div>
</template>

<script>
import { inject } from 'vue';
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  emits: {
    titleTab: () => {
      return true;
    }
  },
  setup() {
    const styleModel = inject('styleModel');
    return { styleModel };
  }
};
</script>

<style lang="scss" scoped>
.title-bar {
  height: 44px;
  padding: 0 20px;
  box-sizing: border-box;
}
</style>
