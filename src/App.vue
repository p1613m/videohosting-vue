<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Sidebar from "@/components/sidebar/Sidebar.vue";
</script>

<template>
  <main class="d-flex flex-nowrap">
    <div class="d-flex flex-column flex-shrink-0 p-3 text-bg-dark sidebar position-fixed" style="width: 280px;height: 100vh;">
      <Sidebar />
    </div>
    <div class="container pt-5" style="padding-left: 280px">
      <RouterView />
    </div>
  </main>
</template>

<style scoped>

</style>
