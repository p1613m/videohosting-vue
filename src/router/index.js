import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegistrationView from "@/views/RegistrationView.vue";
import LoginView from "@/views/LoginView.vue";
import CreateView from "@/views/CreateView.vue";
import ProfileView from "@/views/ProfileView.vue";
import VideoView from "@/views/VideoView.vue";
import {getUserProfile} from "@/use/functions";
import MyVideosView from "@/views/MyVideosView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/registration',
      name: 'registration',
      component: RegistrationView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/create',
      name: 'create',
      component: CreateView,
      meta: {
        requiredAuth: true
      }
    },
    {
      path: '/video/:id/edit',
      name: 'video-edit',
      component: CreateView,
      meta: {
        requiredAuth: true
      }
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
      meta: {
        requiredAuth: true
      }
    },
    {
      path: '/video/:id',
      name: 'video',
      component: VideoView
    },
    {
      path: '/my-videos',
      name: 'my-videos',
      component: MyVideosView,
      meta: {
        requiredAuth: true
      }
    }
  ]
})

router.beforeEach(async to => {
  const user = await getUserProfile()

  if(to.meta.requiredAuth && !user) {
    return {
      name: 'login'
    }
  }
})

export default router
