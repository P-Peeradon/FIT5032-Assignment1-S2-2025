<script setup>
import ArticleCard from '../components/ArticleCard.vue';

// As a mental health specialist, I want to write article, which composes of many sections,
// so that youth can read them to understand one's mental health condition.
const articles = [
    {title: 'ABCDEFG', author: 'Kaiba Seito', thumbnail: '../assets/mental-health-article-thumbnail.jpg', content: 'lorem'},
    {title: 'Atk Jknnd', author: 'Yugi Muto', thumbnail: '../assets/mental-health-article-thumbnail.jpg', content: 'lorem'},
    {title: 'Khansaholic', author: 'Jounouchi Katsuha', thumbnail: '../assets/mental-health-article-thumbnail.jpg', content: 'lorem'}
]

</script>

<template>
    <div class="container">
        <div class="d-flex">
            <main class="col-lg-9">
                <h2>Let's explore article here.</h2>
                <div class="article-catalogue">
                    <div v-for="article in articles" :key="article.title">
                        <ArticleCard article="article"/>
                    </div>
                </div>
            </main>
            <aside class="col-lg-3"></aside>
        </div>
    </div>
</template>

<style scoped>
.article-catalogue {
    display: grid;
    grid-template-columns: repeat(3, 1fr); /* Creates three equal-width columns */
    gap: 10px; /* Space between cards */
    margin: 10px;
}

</style>