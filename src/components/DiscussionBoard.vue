<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    club: {
        type: Object,
        required: true
    }
});
</script>

<template>
    <div class="container">
        <aside class="col-3">
            <input type="text" placeholder="Search" />
            <div @click="displayComment()" v-for="post in club.posts" :key="post">
                <h2>{{ post.topic }}</h2>
                <p>{{ post.owner }} {{ post.timestamp }}</p>
            </div>
        </aside>
        <main class="col-9">
            <h2>{{ post.topic }}</h2>
            <q>{{ post.owner }}</q>
            <p>{{ post.content }}</p>
            <div v-for="comment in post.comments" :key="comment">
                <p>{{ comment }}</p>
            </div>
        </main>
    </div>
</template>

<style>

</style>