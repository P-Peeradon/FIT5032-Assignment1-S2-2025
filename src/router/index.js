import { createRouter, createWebHistory } from 'vue-router'
import { getAuth } from 'firebase/auth'
import HomeView from '../views/HomeView.vue'
import ProfileView from '../views/ProfileView.vue'
import JournalView from '../views/JournalView.vue'
import MyJournalView from '../views/MyJournalView.vue'
import EducationView from '../views/EducationView.vue'
import CommunityView from '../views/CommunityView.vue'
import ArticleView from '../views/ArticleView.vue'
import ClubView from '../views/ClubView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import MeditationView from '../views/MeditationView.vue'
import DiscussionView from '../views/DiscussionView.vue'
import EmotionView from '../views/EmotionView.vue'

const auth = getAuth();

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/profile',
    name: 'Profile',
    component: ProfileView,
    meta: { requiresAuth: true }
  },
  {
    path: '/journal',
    name: 'Journal',
    component: JournalView,
    meta: { requiresAuth: true }
  },
  {
    path: '/journal/:name',
    name: 'MyJournal',
    component: MyJournalView,
    props: true,
    meta: { requiresAuth: true }
  },
  {
    path: '/education',
    name: 'Education',
    component: EducationView,
    meta: { requiresAuth: true }
  },
  {
    path: '/education/article/:title',
    name: 'Article',
    props: true,
    component: ArticleView,
    meta: { requiresAuth: true }
  },
  {
    path: '/community',
    name: 'Community',
    component: CommunityView,
    meta: { requiresAuth: true }
  },
  {
    path: '/community/club/:name',
    name: 'Club',
    props: true,
    component: ClubView,
    meta: { requiresAuth: true }
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
    path: '/journal/meditation',
    name: 'Meditation',
    component: MeditationView,
    meta: { requiresAuth: true }
  },
  {
    path: '/community/club/discussion/:name',
    name: 'Discussion',
    props: true,
    component: DiscussionView,
    meta: { requiresAuth: true }
  },
  {
    path: '/profile/emotion',
    name: 'Emotion',
    component: EmotionView,
    meta: { requiresAuth: true }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const user = auth.currentUser; // Get the current authenticated user 

  if (requiresAuth && !user) {
    next({ name: 'Login'});
  } else if (user && (to.name === 'Login' || to.name === 'Register')) {
    next({ name: "Home"});
  } else {
    next();
  }
})

export default router;