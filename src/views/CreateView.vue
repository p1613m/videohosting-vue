<template>
  <div v-if="isLoading">
    <h1 class="mb-5" v-if="isEdit">Edit video</h1>
    <h1 class="mb-5" v-else>Add video</h1>
    <form action="#" @submit.prevent="sendForm()">
      <BaseInput placeholder="Video name" input-class="form-control-lg"
                 v-model="form.title"
                 :error="errors.title"
      />
      <BaseInput label="Description" placeholder="Video description" type="textarea"
                 v-model="form.description"
                 :error="errors.description"
      />
      <BaseInput label="Cover image" type="file"
                 v-model="form.cover_file"
                 :error="errors.cover_file"
      />
      <template v-if="isEdit">
        <img :src="form.cover_url" alt="" style="width: 200px;display: block">
      </template>
      <BaseInput label="Video file" type="file"
                 v-model="form.video_file"
                 :error="errors.video_file"
      />
      <template v-if="isEdit">
        <video :src="form.video_url" style="width: 200px;display: block" controls></video>
      </template>
      <Submit :value="isEdit ? 'Edit' : 'Add'" class="mt-1" />
    </form>
  </div>
</template>

<script>
import {inject, onMounted, ref} from "vue";
import BaseInput from "@/components/form/BaseInput.vue";
import Submit from "@/components/form/Submit.vue";
import {getVideo, sendVideo, updateVideo} from "@/router/requests";
import router from "@/router";
import {useRoute} from "vue-router";

export default {
  name: "CreateView",
  components: {Submit, BaseInput},
  setup() {
    const route = useRoute()
    const videoId = route.params.id
    const isLoading = ref(false)
    const user = inject('user')
    const isEdit = ref(false)
    const form = ref({});
    const errors = ref({});
    const sendForm = async () => {
      errors.value = {}

      const {body, code} = isEdit.value ? await updateVideo(videoId, form.value) : await sendVideo(form.value)

      if(code === 204) {
        return router.push({
          name: isEdit.value ? 'my-videos' : 'home'
        })
      }

      errors.value = body.errors
    }

    onMounted(async () => {
      if(videoId) {
        console.log('123');
        const { body, code } = await getVideo(videoId)

        if(code === 200) {
          if(body.data.user.id === user.value.id) {
            isEdit.value = true
            form.value = body.data
          }
        }
      }

      isLoading.value = true
    })

    return { form, errors, sendForm, isLoading, isEdit }
  }
}
</script>
