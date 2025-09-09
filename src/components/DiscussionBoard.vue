<script setup>
import { ref, defineProps } from 'vue';

const props = defineProps({
    club: {
        type: Object,
        required: true
    }
});

const currentPost = ref(null);

const displayComment = () => {
    // Get post.topic and post.owner
    // Fetch Post object which 
}
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
            <div v-if="currentPost">
                <h2>{{ post.topic }}</h2>
                <q>{{ post.owner }}</q>
                <p>{{ post.content }}</p>
                <div v-for="comment in post.comments" :key="comment">
                    <p>{{ comment }}</p>
                </div>
            </div>
            <div v-else>

            </div>
        </main>
    </div>
</template>

<style>

</style>