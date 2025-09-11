<template>
  <div class="chillax-nav">
    <nav class="d-none d-md-block">
        <ul class="large_screen">
            <li class="col-3">
                <router-link to="/profile" class="nav-link" active-class="active" aria-current="page">Profile</router-link>
            </li>
            <li class="col-3">
                <router-link to="/journal" class="nav-link" active-class="active" aria-current="page">Journal</router-link></li>
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
                <li >
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
  </div>
</template>

<script setup>
import { ref } from 'vue';

const mobileMenu = ref(false)

const toggleMenu = () => {
    mobileMenu.value = !mobileMenu.value
}

</script>

<style scoped>
    .chillax-nav {
        width: 98vw;
        height: auto;
    }
    nav {
        background-color: blue;
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