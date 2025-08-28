<template>
    <router-link :to="{ name: 'Club', params: {name: community.name}}" class="nav-link" active-class="active" aria-current="page">
        <div class="commuCard">
            <img src="" alt="" />
        </div>
    </router-link>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps
</script>

<style scoped>

</style>