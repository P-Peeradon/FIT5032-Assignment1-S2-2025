<template>
    <router-link :to="{ name: 'Article', params: {title: article.title}}" class="nav-link" active-class="active" aria-current="page">
        <card>
            <img v-if="article.cover" :src="article.cover" :alt="article.title" />
            <img v-else src="../assets/news-article.png" :alt="article.title"/>
            <h2 class="article-title">{{ article.title }}</h2>
            <p class="author">by @{{ article.author }}</p>
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
        background-color: aliceblue;
    }
    card img {
        height: 400;
    }
</style>