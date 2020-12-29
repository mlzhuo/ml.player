<template>
  <div :class="['user-info', $options.styleModel]">
    <div class="inner-content flex column align-center content-center">
      <img src="" />
      <p>维持亲密关系最好的方式就是见面。</p>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.user-info {
  padding: 0 20px;
  box-sizing: border-box;
  .inner-content {
    padding: 10px 20px;
    height: 100%;
    border-radius: 10px;
    text-align: center;
    font-size: 14px;
    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      overflow: hidden;
    }
  }
}
</style>