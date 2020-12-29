<template>
  <div
    :class="['music-bar flex align-end content-between', $options.styleModel]"
  >
    <div class="info-view flex align-center">
      <img />
      <div class="name flex column content-center">
        <text class="song-name one-lines-text">On The Square</text>
        <text class="singer-name one-lines-text">Mac Demarco</text>
      </div>
    </div>
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
    width: calc(100% - 90px);
    height: 60px;
    padding-left: 20px;
    img {
      width: 45px;
      height: 45px;
      border-radius: 50%;
      margin-right: 15px;
    }
    .name {
      width: calc(100% - 60px);
      text {
        width: 100%;
      }
    }
    .singer-name {
      font-size: 13px;
    }
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