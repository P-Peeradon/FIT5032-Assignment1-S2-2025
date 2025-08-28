<template>
    <div class="container">
        <h1 class="mt-2">Youth Mental Health Article</h1>
        <article>
            <div class="head">
                <h2 class="mt-4">{{ props.article.title }}</h2>
                <img src="../assets/bookmark-icon.png" alt="add to bookmark" @click="addToBookmark(props.article)"/>
            </div>
            
            <section>
                <img v-if="thumbnailExist()" :src="props.article.thumbnail" :alt="article.title" />
                <img v-else src="../assets/mental-health-article-thumbnail.jpg" :alt="article.title" />
                <p>{{ props.article.content }}</p>
            </section>
        </article>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    article: {
        type: Object,
        required: true
    }
});

const thumbnailExist = () => {
    return props.article.thumbnail !== ''; 
}

const addToBookmark = () => {
    // Pass, waiting for authorisation system.
}

</script>

<style scoped>

.container {
    margin: 0 20px;
    text-indent: 20px;
}

.head {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-left: 20px;
}
.head img {
    width: 30px;
    height: 30px;
}

</style>