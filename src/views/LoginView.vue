<template>
  <h1 class="mb-5">Login</h1>
  <form action="#" @submit.prevent="sendForm()" novalidate>
    <BaseInput label="E-Mail" type="email" placeholder="Your email"
               v-model="form.email"
               :error="errors.email"
    />
    <BaseInput label="Password" type="password" placeholder="Your password"
               v-model="form.password"
               :error="errors.password"
    />

    <Submit value="Login" />
  </form>
</template>

<script>
import {inject, ref} from "vue";
import BaseInput from "@/components/form/BaseInput.vue";
import Submit from "@/components/form/Submit.vue";
import {sendLogin} from "@/router/requests";
import router from "@/router";

export default {
  name: "LoginView",
  components: {BaseInput, Submit},
  setup() {
    const form = ref({
      email: 'victor@example.org',
      password: '123'
    })
    const errors = ref({})
    const login = inject('login')
    const sendForm = async () => {
      errors.value = {};

      const { body, code } = await sendLogin(form.value)

      if(code === 200) {
        login(body.token)
        return router.push({ name: 'home' })
      }

      errors.value = body.errors
    }

    return { form, errors, sendForm }
  }
}
</script>

<style scoped>

</style>