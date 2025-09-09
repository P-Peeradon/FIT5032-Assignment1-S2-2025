<script setup>
import { ref, defineProps } from 'vue';

const props = defineProps({
    club: {
        type: Object,
        required: true
    }
});

const currentPost = ref(null);

const displayComment = (post) => {
    currentPost.value = post;
}

const query = ref('');
</script>

<template>
    <div class="container">
        <aside class="col-3">
            <input type="text" placeholder="Search" v-model="query" />
            <div class="list_post" v-for="post in club.posts" :key="post">
                <div  @click="displayComment(post)">
                    <h2>{{ post.topic }}</h2>
                    <p>{{ post.owner }} {{ post.timestamp }}</p>
                </div>
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
        </main>
    </div>
</template>

<style scoped>

</style>