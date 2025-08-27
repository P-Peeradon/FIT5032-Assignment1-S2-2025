<template>
    <article>
        <ArticleDisplay :article="currentArticle"/>
    </article>
    <aside class="d-flex flex-column col-lg-3"></aside>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import ArticleDisplay from '../components/ArticleDisplay.vue';

const route = useRoute();
const title = route.params.title;

const articles = [
    {title: 'ABCDEFG', cover: '', author: 'Kaiba Seito', thumbnail: '../assets/mental-health-article-thumbnail.jpg', content: 'lorem'},
    {title: 'Atk Jknnd', cover: '', author: 'Yugi Muto', thumbnail: '../assets/mental-health-article-thumbnail.jpg', content: 'lorem'},
    {title: 'Khansaholic', cover: '', author: 'Jounouchi Katsuha', thumbnail: '../assets/mental-health-article-thumbnail.jpg', content: 'lorem'}
]

// Logic to fetch article, by title.
// No articles with the same title.

const currentArticle = computed(
    articles.find((article) => article.title === title)
)

</script>

<style>

</style>