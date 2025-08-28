import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProfileView from '../views/ProfileView.vue'
import JournalView from '../views/JournalView.vue'
import EducationView from '../views/EducationView.vue'
import CommunityView from '../views/CommunityView.vue'
import ArticleView from '../views/ArticleView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/profile',
    name: 'Profile',
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
  }
  {
    path: '/community/:socialName',
    name: 'Social',
    props: true,
    component: SocialView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router