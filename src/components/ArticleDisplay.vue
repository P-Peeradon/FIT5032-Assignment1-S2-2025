<template>
    <main>
        <article>
            <h2>{{ article.title }}</h2>
            <section>
                <img :src="article.thumbnail" :alt="article.title" />
                <p>{{ article.content }}</p>
            </section>
        </article>
    </main>
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

</style>