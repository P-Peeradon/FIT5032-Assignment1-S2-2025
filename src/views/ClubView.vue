<template>
    <div class="container">
        <h1>Club and Society</h1>
        <div class="d-flex flex-row">
            <main>
                <ClubDisplay />
            </main>
            <aside></aside>
        </div>
    </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import ClubDisplay from '../components/ClubDisplay.vue';

</script>

<style scoped>

</style>