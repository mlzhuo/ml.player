<template>
  <div
    :class="[
      'title-bar flex align-center content-between',
      $options.styleModel,
    ]"
    @click="$emit('titleTab', title)"
  >
    <text>{{ title }}</text>
    <text class="iconfont ml-right"></text>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
  },
  emits: {
    titleTab: () => {
      return true;
    },
  },
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.title-bar {
  height: 44px;
  padding: 0 20px;
  box-sizing: border-box;
}
</style>