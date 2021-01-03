<template>
  <div class="home">
    <HeadSearchBar></HeadSearchBar>
    <UserInfo></UserInfo>
    <TitleBar title="我创建的歌单" @titleTab="titleTab"></TitleBar>
    <GirdList :specialType="0"></GirdList>
    <TitleBar title="我收藏的歌单" @titleTab="titleTab"></TitleBar>
    <GirdList :specialType="100"></GirdList>
    <TitleBar title="其他歌单" @titleTab="titleTab"></TitleBar>
    <GirdList :specialType="-1"></GirdList>
    <TitleBar title="推荐歌单" @titleTab="titleTab"></TitleBar>
    <RowList></RowList>
    <div :class="['placeholder', styleModel]"></div>
  </div>
</template>

<script>
import HeadSearchBar from '@/components/HeadSearchBar.vue';
import UserInfo from '@/components/UserInfo.vue';
import TitleBar from '@/components/TitleBar.vue';
import GirdList from '@/components/GirdList.vue';
import RowList from '@/components/RowList.vue';
import { getCurrentInstance, inject } from 'vue';
import { GET_USER_PLAYLIST } from '../store/constant';

export default {
  name: 'Home',
  components: {
    HeadSearchBar,
    UserInfo,
    TitleBar,
    GirdList,
    RowList
  },
  setup() {
    const { ctx } = getCurrentInstance();
    const titleTab = () => {
      // TODO: 点击titlebar逻辑
    };
    const styleModel = inject('styleModel');
    ctx.$store.dispatch(GET_USER_PLAYLIST, {});
    return {
      titleTab,
      styleModel
    };
  }
};
</script>
<style lang="scss" scoped>
.placeholder {
  height: 100px;
  width: 100vw;
}
</style>
