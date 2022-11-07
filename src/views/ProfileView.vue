<template>
  <h1 class="mb-5">Profile</h1>
  <div class="alert alert-success" v-if="successUpdate">Success!</div>
  <form action="#" @submit.prevent="sendForm()">
    <BaseInput label="Name" placeholder="Your name"
               v-model="form.username"
               :error="errors.username"
    />
    <BaseInput label="E-Mail" placeholder="Your email" type="email"
               v-model="form.email"
               :error="errors.email"
    />
    <BaseInput label="Old password" placeholder="Old password" type="password"
               v-model="form.old_password"
               :error="errors.old_password"
    />
    <BaseInput label="New password" placeholder="New password" type="password"
               v-model="form.password"
               :error="errors.password"
    />
    <BaseInput label="New password repeat" placeholder="New password repeat" type="password"
               v-model="form.password_confirmation"
               :error="errors.password_confirmation"
    />

    <Submit value="Save" />
  </form>
</template>

<script>
import BaseInput from "@/components/form/BaseInput.vue";
import Submit from "@/components/form/Submit.vue";
import {inject, ref} from "vue";
import {sendProfile} from "@/router/requests";
export default {
  name: "ProfileView",
  components: {Submit, BaseInput},
  setup() {
    const user = inject('user')
    const updateUser = inject('updateUser')
    const successUpdate = ref(false)
    const form = ref({
      username: user.value.username,
      email: user.value.email
    })
    const errors = ref({})
    const sendForm = async () => {
      errors.value = {}

      const { body, code } = await sendProfile(form.value)

      if(code === 422) {
        errors.value = body.errors
      } else {
        successUpdate.value = true
        await updateUser()
      }
    }

    return { form, errors, sendForm, successUpdate }
  }
}
</script>

<style scoped>

</style>