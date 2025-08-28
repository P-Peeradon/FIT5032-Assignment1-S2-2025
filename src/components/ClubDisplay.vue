<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    club: {
        type: Object,
        required: true
    }
});
</script>

<template>
    <div class="container">
        <h2>{{ props.club.name }}</h2>
        <q>{{ props.club.motto }}</q>
        <p>
            {{ props.club.description }}
        </p>

        <span class="category">Club Aims:</span>
        <ol>
            <li v-for="aim in club.aims" :key="aim">{{ aim }}</li>
        </ol>
    </div>
</template>

<style>

</style>