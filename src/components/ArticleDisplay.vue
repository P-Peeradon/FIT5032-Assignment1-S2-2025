<template>
    <div class="container">
        <h1 class="mt-2">Youth Mental Health Article</h1>
        <article>
            <h2 class="mt-4">{{ props.article.title }}</h2>
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

</script>

<style>

</style>