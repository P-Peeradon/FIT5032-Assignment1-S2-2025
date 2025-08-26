<template>
  <div class="row">
    <nav class="d-none d-md-block">
        <ul class="large_screen">
            <li class="col-3">Profile</li>
            <li class="col-3">Journal</li>
            <li class="col-3">Education</li>
            <li class="col-3">Community</li>
        </ul>
    </nav>
    <nav class="d-md-none">
        <div class="col-2 hamburger">
            <img src="../../assets/hamburger-icon.png" @click="toggleMenu()" alt="menu" />
        </div>
        <div class="row">
            <ul class="mobile_screen" v-if="mobileMenu">
                <li>Profile</li>
                <li>Journal</li>
                <li>Education</li>
                <li>Community</li>
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
    nav {
        background-color: blue;
    }
    .hamburger {
        justify-self: right;
        align-items: center;
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