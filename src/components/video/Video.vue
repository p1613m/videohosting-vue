<template>
  <div class="col">
    <div class="card shadow-sm">
      <img :src="video.cover_url" class="bd-placeholder-img card-img-top" width="100%" height="225">

      <div class="card-body">
        <p class="card-text fw-bold">{{ video.title }}</p>
        <div class="d-flex justify-content-between align-items-center">
          <div class="btn-group">
            <RouterLink :to="{ name: 'video', params: { id: video.id } }" class="btn btn-sm btn-outline-secondary">View</RouterLink>
          </div>
          <small class="text-muted">Likes: {{ video.like_count }}</small>
        </div>
        <template v-if="forUser">
          <hr>
          Status: {{ video.status }}<br>
          <RouterLink :to="{name: 'video-edit', params: {id: video.id}}" class="btn btn-sm btn-info mb-1">Edit video</RouterLink>
          <a href="#" @click.prevent="deleteVideo(video.id)" class="btn btn-sm btn-danger">Remove video</a>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import {deleteUserVideo} from "@/router/requests";
import router from "@/router";

export default {
  name: "Video",
  props: [
      'video',
      'forUser',
  ],

  setup() {
    const deleteVideo = async id => {
      await deleteUserVideo(id)

      return router.go(router.currentRoute)
    }

    return { deleteVideo }
  }
}
</script>

<style scoped>
  .card-img-top {
    object-fit: cover;
  }
</style>