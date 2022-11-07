<template>
  <h1 class="mb-5">Registration</h1>
  <form action="#" @submit.prevent="sendForm()" novalidate>
    <BaseInput label="Name" placeholder="Your name"
               v-model="form.username"
               :error="errors.username"
    />
    <BaseInput label="E-Mail" placeholder="Your email" type="email"
               v-model="form.email"
               :error="errors.email"
    />
    <BaseInput label="Password" placeholder="Your password" type="password"
               v-model="form.password"
               :error="errors.password"
    />
    <BaseInput label="Password repeat" placeholder="Your password repeat" type="password"
               v-model="form.password_confirmation"
    />
    <Submit value="Register" />
  </form>
</template>

<script>
import {ref} from "vue";
import {sendRegistration} from "@/router/requests";
import BaseInput from "@/components/form/BaseInput.vue";
import router from "@/router";
import Submit from "@/components/form/Submit.vue";

export default {
  name: "RegistrationView",
  components: {Submit, BaseInput},
  setup() {
    const form = ref({});
    const errors = ref({});

    const sendForm = async () => {
      errors.value = {};

      const { body, code } = await sendRegistration(form.value)

      if(code === 201) {
        return router.push({name: 'login'})
      }

      errors.value = body.errors
    }

    return { form, sendForm, errors }
  }
}
</script>