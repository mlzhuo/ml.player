<template>
  <div
    :class="[
      'header-search-bar flex align-center content-between',
      $options.styleModel,
    ]"
  >
    <div class="search-view flex align-center content-between">
      <i class="iconfont ml-sousuo"></i>
      <div class="placeholder">搜索</div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.header-search-bar {
  height: 56px;
  width: 100%;
  padding: 10px 20px;
  box-sizing: border-box;
  overflow: hidden;
  .search-view {
    flex: 1;
    height: 36px;
    border-radius: 18px;
    .ml-sousuo {
      margin-left: 20px;
      margin-right: 10px;
    }
    .placeholder {
      flex: 1;
      letter-spacing: 2px;
    }
  }
}
</style>