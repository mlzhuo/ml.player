<template>
  <div :class="['login flex column align-center', styleModel]">
    <div class="logo">
      <img src="../assets/images/ml-player.png" />
    </div>
    <div class="form flex column align-center">
      <input v-model="email" />
      <input v-model="password" type="password" />
      <button @click="login">登录</button>
    </div>
  </div>
</template>
<script>
import { getCurrentInstance, inject, ref } from 'vue';
import { SET_NAVIGATION_BAR_TITLE, LOGIN_SUCCESS } from '../store/constant';
export default {
  setup() {
    const { ctx } = getCurrentInstance();
    ctx.$store.commit(SET_NAVIGATION_BAR_TITLE, '登录');
    const styleModel = inject('styleModel');
    const $post = inject('$post');
    const email = ref('');
    const password = ref('');
    const login = async () => {
      if (!email.value || !password.value) return;
      const resLogin = await $post({
        url: 'login?timestamp=' + +new Date(),
        data: { email: email.value, password: password.value }
      });
      if (resLogin.status == 200 && resLogin.data.code == 200) {
        const { cookie, profile } = resLogin.data;
        ctx.$store.dispatch(LOGIN_SUCCESS, { cookie, ...profile });
      }
    };
    return {
      styleModel,
      email,
      password,
      login
    };
  }
};
</script>

<style lang="scss" scoped>
.login {
  height: 100vh;
  .logo {
    margin-top: 50px;
    img {
      height: 100px;
      width: 100px;
    }
  }
  .form {
    margin-top: 50px;
    input,
    button {
      width: 65vw;
      height: 35px;
      border-radius: 18px;
      border: none;
      outline-style: none;
      margin-bottom: 20px;
      padding: 0 20px;
      text-align: center;
      box-sizing: border-box;
    }
    button {
      margin-top: 50px;
    }
  }
}
</style>
