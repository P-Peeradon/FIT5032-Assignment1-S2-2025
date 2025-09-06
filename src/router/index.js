import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProfileView from '../views/ProfileView.vue'
import JournalView from '../views/JournalView.vue'
import EducationView from '../views/EducationView.vue'
import CommunityView from '../views/CommunityView.vue'
import ArticleView from '../views/ArticleView.vue'
import ClubView from '../views/ClubView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import MeditationView from '../views/MeditationView.vue'


const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/profile/:username',
    name: 'Profile',
    props: true,
    component: ProfileView
  },
  {
    path: '/journal',
    name: 'Journal',
    component: JournalView
  },
  {
    path: '/education',
    name: 'Education',
    component: EducationView
  },
  {
    path: '/education/article/:title',
    name: 'Article',
    props: true,
    component: ArticleView
  },
  {
    path: '/community',
    name: 'Community',
    component: CommunityView
  },
  {
    path: '/community/:name',
    name: 'Club',
    props: true,
    component: ClubView
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterView
  },
  {
    path: '/meditation',
    name: 'Meditation',
    component: MeditationView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router