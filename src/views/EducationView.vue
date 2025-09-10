<script setup>
import { onMounted, ref } from 'vue';
import ArticleCard from '../components/ArticleCard.vue';
import { collection, getDocs, query } from 'firebase/firestore';
import db from '../firebase/init';

// As a mental health specialist, I want to write article, which composes of many sections,
// so that youth can read them to understand one's mental health condition.
const articles = ref([]);

const fetchArticles = async () => {
    try {

        const educationQuery = query(collection(db, 'articles'));
        const educationQuerySnapshot = await getDocs(educationQuery);
        const articleArray = [];
        educationQuerySnapshot.forEach((doc) => {
            articleArray.push({ ...doc.data()})
        });

        articles.value = articleArray;
    
    } catch (err) {
        console.error('Error fetching articles:', err);
    }
}

onMounted(() => {
    fetchArticles()
});

</script>

<template>
    <div class="container d-flex flex-column">
        <h1 class="mt-2">Mental Education for Youth</h1>
        <div class="d-flex mt-4">
            <main class="col-lg-9">
                <h2>Let's explore article here.</h2>
                <div class="article-catalogue">
                    <div v-for="article in articles" :key="article">
                        <ArticleCard :article="article" />
                    </div>
                </div>
            </main>
            <aside class="col-lg-3"></aside>
        </div>
    </div>
</template>

<style scoped>

.article-catalogue {
    display: flex;
    flex-direction: column;
    gap: 20px; /* Space between cards */
    margin: 10px;
} 

@media screen and (min-width: 992px) {
    .article-catalogue {
    display: grid;
    grid-template-columns: repeat(3, 1fr); /* Creates three equal-width columns */
    gap: 20px; /* Space between cards */
    margin: 10px;
    } 
}




</style>