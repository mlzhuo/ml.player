<template>
  <div class="play-list-detail">
    <Musiclist :musicList="playListDetail.songs" @itemTap="itemTap"></Musiclist>
  </div>
</template>

<script>
import { getCurrentInstance, ref } from "vue";
import Musiclist from "../components/Musiclist.vue";
import {
  CHECK_MUSIC,
  GET_PLAYLIST_DETAIL,
  GET_SONG_DETAIL,
  SAVE_CURRENT_MUSIC,
  SAVE_CURRENT_PLAYLIST,
  SET_NAVIGATION_BAR_TITLE,
  UPDATE_LOCAL_DATA,
} from "../store/constant";
export default {
  name: "PlayListDetail",
  components: { Musiclist },
  setup() {
    const { ctx } = getCurrentInstance();
    let playListDetail = ref({});
    const getDetail = async () => {
      const resPlayList = await ctx.$store.dispatch(GET_PLAYLIST_DETAIL, {
        id: ctx.$router.currentRoute._value.query.id,
      });
      const { id, name, coverImgUrl, trackIds } = resPlayList.data.playlist;
      const resSongList = await ctx.$store.dispatch(GET_SONG_DETAIL, {
        ids: trackIds.map((v) => v.id).join(","),
      });
      playListDetail.value = {
        playlist: {
          id,
          name,
          coverImgUrl,
          trackIds: trackIds.map((v) => v.id),
        },
        songs: resSongList.data.songs.map((v) => {
          const { al, ar, id, name } = v;
          return { al, ar, id, name };
        }),
      };
      ctx.$store.commit(SET_NAVIGATION_BAR_TITLE, name);
    };
    getDetail();
    const itemTap = async (item) => {
      const res = await ctx.$store.dispatch(CHECK_MUSIC, { id: item.id });
      if (res) {
        ctx.$store.commit(SAVE_CURRENT_MUSIC, item);
        ctx.$store.commit(SAVE_CURRENT_PLAYLIST, playListDetail.value);
        ctx.$store.commit(UPDATE_LOCAL_DATA);
        ctx.$router.push("/playpage");
      }
    };
    return {
      playListDetail,
      itemTap,
    };
  },
};
</script>

<style></style>
