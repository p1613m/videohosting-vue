<template>
  <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
    <i class="fa-solid fa-video me-2"></i>
    <span class="fs-4">VideoHosting</span>
  </a>
  <hr>
  <ul class="nav nav-pills flex-column mb-auto">
    <li class="nav-item">
      <RouterLink :to="{name: 'home'}" class="nav-link active">
        <i class="fa-solid fa-home"></i>
        Home
      </RouterLink>
    </li>
    <li v-if="user">
      <RouterLink :to="{name: 'my-videos'}" class="nav-link text-white">
        <i class="fa-solid fa-video"></i>
        My videos
      </RouterLink>
    </li>
    <li v-if="user">
      <RouterLink :to="{name: 'profile'}" class="nav-link text-white">
        <i class="fa-solid fa-user"></i>
        My Profile
      </RouterLink>
    </li>
    <li v-if="user">
      <RouterLink :to="{name: 'create'}" class="nav-link text-white">
        <i class="fa-solid fa-plus"></i>
        Add video
      </RouterLink>
    </li>
    <li v-if="user">
      <a href="#" @click.prevent="logout()" class="nav-link text-white">
        <i class="fa-solid fa-right-from-bracket"></i>
        Logout
      </a>
    </li>
    <li v-if="!user">
      <RouterLink :to="{name: 'login'}" class="nav-link text-white">
        <i class="fa-solid fa-user"></i>
        Login
      </RouterLink>
    </li>
    <li v-if="!user">
      <RouterLink :to="{name: 'registration'}" class="nav-link text-white">
        <i class="fa-solid fa-user"></i>
        Register
      </RouterLink>
    </li>
  </ul>
</template>

<script>
import {inject} from "vue";

export default {
  name: "Sidebar",

  setup() {
    const user = inject('user')
    const logout = inject('logout')

    return { user, logout }
  }
}
</script>