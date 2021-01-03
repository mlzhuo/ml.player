<template>
  <div class="play-list-detail">
    <RowList :musicList="playListDetail.songs"></RowList>
  </div>
</template>

<script>
import { getCurrentInstance, ref } from 'vue';
import RowList from '../components/RowList.vue';
import {
  GET_PLAYLIST_DETAIL,
  GET_SONG_DETAIL,
  SET_NAVIGATION_BAR_TITLE
} from '../store/constant';
export default {
  name: 'PlayListDetail',
  components: { RowList },
  setup() {
    const { ctx } = getCurrentInstance();
    const { id } = ctx.$router.currentRoute._value.query;
    let playListDetail = ref({});
    ctx.$store.dispatch(GET_PLAYLIST_DETAIL, {
      id,
      success: resPlayList => {
        ctx.$store.dispatch(GET_SONG_DETAIL, {
          ids: resPlayList.playlist.trackIds.map(v => v.id).join(','),
          success: res => {
            playListDetail.value = {
              playlist: resPlayList.playlist,
              songs: res
            };
            ctx.$store.commit(
              SET_NAVIGATION_BAR_TITLE,
              resPlayList.playlist.name
            );
          }
        });
      }
    });

    return {
      playListDetail
    };
  }
};
</script>

<style></style>
