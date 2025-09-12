<template>
  <div class="chillax-nav">
    <nav class="d-none d-md-block">
        <ul class="large_screen">
            <li class="col-3">
                <router-link to="/profile" class="nav-link" active-class="active" aria-current="page">Profile</router-link>
            </li>
            <li class="col-3" @mouseover="showJournalSub()" @mouseleave="hideJournalSub()">
                <router-link to="/journal" class="nav-link" active-class="active" aria-current="page">Journal</router-link>
            </li>
            <li class="col-3">
                <router-link to="/education" class="nav-link" active-class="active" aria-current="page">Education</router-link>
            </li>
            <li class="col-3">
                <router-link to="/community" class="nav-link" active-class="active" aria-current="page">Community</router-link>
            </li>
        </ul>
    </nav>
    <nav class="d-md-none">
        <div class="col-2 hamburger">
            <img src="../assets/hamburger-icon.png" @click="toggleMenu()" alt="menu" />
        </div>
        <div class="row">
            <ul class="mobile_screen" v-if="mobileMenu">
                <li>
                    <router-link to="/profile" class="nav-link" active-class="active" aria-current="page">Profile</router-link>
                </li>
                <li @mouseover="showJournalSub()" @mouseleave="hideJournalSub()">
                    <router-link to="/journal" class="nav-link" active-class="active" aria-current="page">Journal</router-link>
                </li>
                <li>
                    <router-link to="/education" class="nav-link" active-class="active" aria-current="page">Education</router-link>
                </li>
                <li>
                    <router-link to="/community" class="nav-link" active-class="active" aria-current="page">Community</router-link>
                </li>
            </ul>
        </div>
    </nav>
    <JournalSubMenu v-if="journalSub" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import JournalSubMenu from './JournalSubMenu.vue';

const mobileMenu = ref(false);
const journalSub = ref(false);

const toggleMenu = () => {
    mobileMenu.value = !mobileMenu.value;
};

const showJournalSub = () => {
    journalSub.value = true;
};

const hideJournalSub = () => setTimeout(() => {
    journalSub.value = false;
}, 3000);

</script>

<style scoped>
    .chillax-nav {
        width: 100%;
        height: auto;
        background-color: blue;
        position: relative;
        z-index: 1;
    }
    .hamburger {
        justify-self: right;
        width: 50px;
        height: 50px;
        align-items: center;
    }
    .hamburger img {
            width: 40px;
            height: 50px;
    }
    .hamburger:hover {
        cursor: pointer;
    }
    .submenu {
        position: absolute;
        z-index: 2;
    }
    ul.large_screen {
        display: flex;
        flex-direction: row;
        justify-content: center;
        text-align: center;
    }
    ul.mobile_screen {
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: center;
    }
    li {
        color: white;
        font-size: 24px;
        font-weight: bold;
        list-style: none;
    }
</style>