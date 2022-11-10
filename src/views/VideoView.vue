<template>
  <div v-if="isLoading">
    <h1 class="mb-5">{{ video.title }}</h1>
    <div class="mb-3">
      <video :src="video.video_url" controls></video>
    </div>
    <p>Author: {{ video.user.username }}</p>
    <p>{{ video.description }}</p>
    <p>Likes: {{ video.like_count }} <button v-if="user && !video.has_like" class="btn btn-sm btn-success" @click="like()">Like!!!</button></p>
    <form action="#" class="mt-5 mb-5">
      <div class="form-group mb-3">
        <label>Comment</label>
        <textarea class="form-control" placeholder="Comment"></textarea>
      </div>
      <div class="form-group">
        <input type="submit" value="Send" class="btn btn-primary">
      </div>
    </form>
    <div class="card mb-4">
      <div class="card-body">
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium aut consectetur deserunt in iure maiores sapiente! Modi quibusdam rerum veniam. Consequatur ipsa modi quam voluptates! Beatae debitis non sequi voluptatum.</p>
        <div class="d-flex justify-content-between">
          <div class="d-flex flex-row align-items-center">
            <p class="small mb-0 fw-bold">Victor</p>
          </div>
        </div>
      </div>
    </div>
    <div class="card mb-4">
      <div class="card-body">
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium aut consectetur deserunt in iure maiores sapiente! Modi quibusdam rerum veniam. Consequatur ipsa modi quam voluptates! Beatae debitis non sequi voluptatum.</p>
        <div class="d-flex justify-content-between">
          <div class="d-flex flex-row align-items-center">
            <p class="small mb-0 fw-bold">Victor</p>
          </div>
        </div>
      </div>
    </div>
    <div class="card mb-4">
      <div class="card-body">
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium aut consectetur deserunt in iure maiores sapiente! Modi quibusdam rerum veniam. Consequatur ipsa modi quam voluptates! Beatae debitis non sequi voluptatum.</p>
        <div class="d-flex justify-content-between">
          <div class="d-flex flex-row align-items-center">
            <p class="small mb-0 fw-bold">Victor</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import {useRoute} from "vue-router";
import {inject, onMounted, ref} from "vue";
import {getVideo, likeVideo} from "@/router/requests";

export default {
  name: "VideoView",

  setup() {
    const route = useRoute()
    const videoId = route.params.id
    const video = ref({})
    const isLoading = ref(false)
    const user = inject('user')
    const like = async () => {
      await likeVideo(video.value.id)
      video.value.like_count += 1;
    }

    onMounted(async () => {
      const {body, code} = await getVideo(videoId)
      video.value = body.data

      isLoading.value = true
    })

    return { video, isLoading, user, like }
  }
}
</script>

<style scoped>

</style>