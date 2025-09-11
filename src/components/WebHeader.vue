<template>
    <header>
        <SiteBanner />
        <NavBar />
        <LoginLogoutNav :authUser="authUser" />
    </header>
</template>

<script setup>
import NavBar from './NavBar.vue';
import SiteBanner from './SiteBanner.vue';
import LoginLogoutNav from './LoginLogoutNav.vue';
import { defineProps } from 'vue';

const props = defineProps({
    authUser: {
        type: Object,
        required: false
    }
})

</script>

<style scoped>
header {
    display: flex;
    width: 98vw;
    flex-direction: column;
}

</style>