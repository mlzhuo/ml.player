<template>
  <div :class="['user-info', $options.styleModel]">
    <div class="inner-content"></div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.user-info {
  height: 170px;
  padding: 10px 20px;
  box-sizing: border-box;
  .inner-content {
    height: 100%;
    border-radius: 10px;
  }
}
</style>