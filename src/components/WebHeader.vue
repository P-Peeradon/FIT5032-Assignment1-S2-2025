<template>
    <header>
        <SiteBanner />
        <NavBar />
    </header>
</template>

<script setup>
import NavBar from './NavBar.vue';
import SiteBanner from './SiteBanner.vue';

</script>

<style scoped>
header {
    display: flex;

    flex-direction: column;
}

</style>