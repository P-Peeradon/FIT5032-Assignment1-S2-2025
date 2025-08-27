<template>
    <div class="container">
        <main class="d-flex col-lg-9">
            <ArticleDisplay :article="currentArticle"/>
        </main>
        <aside class="d-flex flex-column col-lg-3"></aside>
    </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { computed, ref } from 'vue';
import ArticleDisplay from '../components/ArticleDisplay.vue';

const route = useRoute();
const title = ref(route.params.title);

const articles = [
    {title: 'ABCDEFG', cover: '', author: 'Kaiba Seito', thumbnail: '../assets/mental-health-article-thumbnail.jpg', content: 'lorem'},
    {title: 'Atk Jknnd', cover: '', author: 'Yugi Muto', thumbnail: '../assets/mental-health-article-thumbnail.jpg', content: 'lorem'},
    {title: 'Khansaholic', cover: '', author: 'Jounouchi Katsuha', thumbnail: '../assets/mental-health-article-thumbnail.jpg', content: 'lorem'}
]

// Logic to fetch article by title.
// No articles with the same title.

const currentArticle = computed(() =>
    articles.find((article) => article.title === title.value)
);

</script>

<style>

</style>