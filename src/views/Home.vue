<template>
  <div class="home">
    <HeadSearchBar></HeadSearchBar>
    <UserInfo></UserInfo>
    <TitleBar title="我的歌单" @titleTab="titleTab"></TitleBar>
    <GirdList></GirdList>
    <TitleBar title="推荐歌单" @titleTab="titleTab"></TitleBar>
    <RowList></RowList>
    <div :class="['placeholder', $options.styleModel]"></div>
  </div>
</template>

<script>
import HeadSearchBar from "@/components/HeadSearchBar.vue";
import UserInfo from "@/components/UserInfo.vue";
import TitleBar from "@/components/TitleBar.vue";
import GirdList from "@/components/GirdList.vue";
import RowList from "@/components/RowList.vue";

export default {
  name: "Home",
  components: {
    HeadSearchBar,
    UserInfo,
    TitleBar,
    GirdList,
    RowList,
  },
  setup() {
    const titleTab = () => {
      // TODO: 点击titlebar逻辑
    };
    return {
      titleTab,
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