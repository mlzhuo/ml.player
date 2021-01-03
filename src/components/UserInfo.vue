<template>
  <div :class="['user-info', styleModel]">
    <div
      class="inner-content flex column align-center content-center"
      :style="style"
    >
      <img :src="avatarUrl" @click="loginAction" />
      <p class="nickname">{{ nickname }}</p>
      <p class="signature">{{ signature }}</p>
    </div>
  </div>
</template>

<script>
import { getCurrentInstance, inject } from 'vue';
import defaultAvatarUrl from '../assets/images/ml-player.png';
export default {
  setup() {
    const styleModel = inject('styleModel');
    const { ctx } = getCurrentInstance();
    const userInfo = ctx.$store.state.userInfo;
    const {
      userId,
      signature = '维持亲密关系最好的方式就是见面。',
      nickname = 'ML',
      backgroundUrl,
      avatarUrl = defaultAvatarUrl
    } = userInfo;
    const style = backgroundUrl
      ? `background: url(${backgroundUrl}) no-repeat center;background-size: cover;`
      : '';
    const loginAction = () => {
      if (userId) return;
      ctx.$router.push('/login');
    };

    return {
      styleModel,
      loginAction,
      userId,
      signature,
      nickname,
      backgroundUrl,
      avatarUrl,
      style
    };
  }
};
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
      width: 60px;
      height: 60px;
      border-radius: 50%;
      overflow: hidden;
    }
    .nickname {
      margin-bottom: 5px;
    }
    .signature {
      margin-top: 0;
    }
  }
}
</style>
