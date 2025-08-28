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
    {title: 'ABCDEFG', cover: '', author: 'Kaiba Seito', thumbnail: new URL('../assets/mental-health-article-thumbnail.jpg', import.meta.url).href, content: 'lorem'},
    {title: 'Atk Jknnd', cover: new URL('../assets/zen-cover.png', import.meta.url).href, author: 'Yugi Muto', thumbnail: new URL('../assets/mental-health-article-thumbnail.jpg', import.meta.url).href, content: 'lorem'},
    {title: 'Khansaholic', cover: '', author: 'Jounouchi Katsuha', thumbnail: new URL('../assets/mental-health-article-thumbnail.jpg', import.meta.url).href, content: 'lorem'}
]

// Logic to fetch article by title.
// No articles with the same title.

const currentArticle = computed(() =>
    articles.find((article) => article.title === title.value)
);

</script>

<style>

</style>