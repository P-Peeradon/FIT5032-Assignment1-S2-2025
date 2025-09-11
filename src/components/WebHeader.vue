<template>
    <header>
        <SiteBanner />
        <NavBar />
        <LoginLogoutNav />
    </header>
</template>

<script setup>
import NavBar from './NavBar.vue';
import SiteBanner from './SiteBanner.vue';
import LoginLogoutNav from './LoginLogoutNav.vue';

</script>

<style scoped>
header {
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: center;
}

</style>