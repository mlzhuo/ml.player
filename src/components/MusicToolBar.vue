<template>
  <div
    :class="['music-bar flex align-end content-between', $options.styleModel]"
  >
    <div class="info-view"></div>
    <div class="play-btn"><i class="iconfont ml-bofang1"></i></div>
  </div>
</template>

<script>
export default {};
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
    height: 60px;
  }
  .play-btn {
    height: 70px;
    width: 70px;
    border-radius: 10px 0px 0px 0px;
    line-height: 70px;
    text-align: center;
    .ml-bofang1 {
      font-size: 25px;
      color: #fff;
    }
  }
}
</style>