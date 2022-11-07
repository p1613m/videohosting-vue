<template>
  <main class="d-flex flex-nowrap" v-if="pageLoaded">
    <div class="d-flex flex-column flex-shrink-0 p-3 text-bg-dark sidebar position-fixed" style="width: 280px;height: 100vh;">
      <Sidebar />
    </div>
    <div class="container pt-5" style="padding-left: 280px">
      <RouterView />
    </div>
  </main>
</template>

<script>
import Sidebar from "@/components/sidebar/Sidebar.vue";
import {onMounted, provide, readonly, ref} from "vue";
import {getUserProfile, setAuthToken} from "@/use/functions";
import {userLogout} from "@/router/requests";
import router from "@/router";

export default {
  components: { Sidebar },
  setup() {
    const user = ref(null)
    const pageLoaded = ref(false)

    const login = async token => {
      setAuthToken(token)
      await updateUser()
    }

    const updateUser = async () => {
      user.value = await getUserProfile()
    }

    const logout = async () => {
      await userLogout()
      user.value = null
      return router.push({ name: 'home' })
    }

    onMounted(async () => {
      await updateUser()
      pageLoaded.value = true
    })

    provide('login', login)
    provide('logout', logout)
    provide('updateUser', updateUser)
    provide('user', readonly(user))

    return { pageLoaded }
  }
}
</script>