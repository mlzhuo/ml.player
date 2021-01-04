<template>
  <div class="home">
    <HeadSearchBar></HeadSearchBar>
    <UserInfo></UserInfo>
    <TitleBar title="我创建的歌单" @titleTab="titleTab"></TitleBar>
    <Playlist :specialType="0"></Playlist>
    <TitleBar title="我收藏的歌单" @titleTab="titleTab"></TitleBar>
    <Playlist :specialType="100"></Playlist>
    <TitleBar title="其他歌单" @titleTab="titleTab"></TitleBar>
    <Playlist :specialType="-1"></Playlist>
    <TitleBar title="推荐歌单" @titleTab="titleTab"></TitleBar>
    <Musiclist></Musiclist>
    <div :class="['placeholder', styleModel]"></div>
  </div>
</template>

<script>
import HeadSearchBar from "@/components/HeadSearchBar.vue";
import UserInfo from "@/components/UserInfo.vue";
import TitleBar from "@/components/TitleBar.vue";
import Playlist from "@/components/Playlist.vue";
import Musiclist from "@/components/Musiclist.vue";
import { getCurrentInstance, inject } from "vue";
import { GET_USER_PLAYLIST, SAVE_USER_PLAYLIST } from "../store/constant";

export default {
  name: "Home",
  components: {
    HeadSearchBar,
    UserInfo,
    TitleBar,
    Playlist,
    Musiclist,
  },
  setup() {
    const { ctx } = getCurrentInstance();
    const titleTab = () => {
      // TODO: 点击titlebar逻辑
    };
    const styleModel = inject("styleModel");
    const getList = async () => {
      const res = await ctx.$store.dispatch(GET_USER_PLAYLIST);
      if (res) ctx.$store.commit(SAVE_USER_PLAYLIST, res.data.playlist);
    };
    getList();
    return {
      titleTab,
      styleModel,
    };
  },
};
</script>
<style lang="scss" scoped>
.placeholder {
  height: 100px;
  width: 100vw;
}
</style>
