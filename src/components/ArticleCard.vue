<template>
    <router-link :to="{ name: 'Article', params: {title: article.title}}" class="nav-link" active-class="active" aria-current="page">
        <card>
            <img :src="article.cover" :alt="article.title" />
            <h2>{{ article.title }}</h2>
        </card>
    </router-link>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    article: {
        type: Object,
        required: true
    }
});
</script>

<style>
    card {
        width: 400px;
        height: 500px;
    }
    card img {
        height: 400;
    }
</style>