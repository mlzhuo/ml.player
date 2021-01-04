<template>
  <div :class="['login flex column align-center', styleModel]">
    <div class="logo">
      <img src="../assets/images/ml-player.png" />
    </div>
    <div class="form flex column align-center">
      <input v-model="email" />
      <input v-model="md5_password" type="password" />
      <button @click="login">登录</button>
    </div>
  </div>
</template>
<script>
import { getCurrentInstance, inject, ref } from "vue";
import md5 from "js-md5";
import {
  SET_NAVIGATION_BAR_TITLE,
  LOGIN,
  LOGIN_SUCCESS,
  UPDATE_LOCAL_DATA,
} from "../store/constant";
export default {
  setup() {
    const { ctx } = getCurrentInstance();
    ctx.$store.commit(SET_NAVIGATION_BAR_TITLE, "登录");
    const styleModel = inject("styleModel");
    const email = ref("lzhuo_1995@163.com");
    const md5_password = ref("");
    const login = async () => {
      if (!email.value || !md5_password.value) return;
      const res = await ctx.$store.dispatch(LOGIN, {
        data: {
          email: email.value,
          md5_password: md5(md5_password.value),
        },
      });
      const { cookie, profile } = res.data;
      ctx.$store.commit(LOGIN_SUCCESS, { cookie, ...profile });
      ctx.$store.commit(UPDATE_LOCAL_DATA);
      ctx.$router.replace("/");
    };
    return {
      styleModel,
      email,
      md5_password,
      login,
    };
  },
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
