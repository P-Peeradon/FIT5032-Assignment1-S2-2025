<script setup>
import { ref, defineProps, defineEmits } from 'vue';
import PostForm from '../forms/PostForm.vue';

const props = defineProps({
    club: {
        type: Object,
        required: true
    }
});

const emit = defineEmits(['comment', 'post']);

const currentPost = ref(null);

const showPostForm = ref(false);

const togglePostForm = () => {
    showPostForm.value = !showPostForm.value;
}

const displayComment = (post) => {
    currentPost.value = post;
}

const comment = ref('');

const addPost = (postLetter) => {
    emit('post', postLetter);
}

const commentPost = (post) => {
    const topic = post.topic;

    if (comment.value != "") {
        emit('comment',
            {
                post: topic,
                text: comment.value
            }
        );
        comment.value = '';
    }
}

const query = ref('');
</script>

<template>
    <div class="container">
        <aside class="col-3">
            <div>
                <button @click="togglePostForm()" class="blue_button">New Post</button>
            </div>
            <input type="text" placeholder="Search" v-model="query" />
            <div class="list_post" v-for="post in club.posts" :key="post">
                <div @click="displayComment(post)">
                    <h2>{{ post.topic }}</h2>
                    <p>{{ post.username }} {{ post.timestamp }}</p>
                </div>
            </div>
        </aside>
        <main class="col-9">
            <div v-if="showPostForm">
                <PostForm @post="addPost(postLetter)" @close="togglePostForm()" />
            </div>
            <div v-if="currentPost">
                <h2>{{ currentPost.topic }}</h2>
                <q>{{ currentPost.username }}</q>
                <p>{{ currentPost.content }}</p>
                <div v-for="comment in currentPost.comments" :key="comment">
                    <p>{{ comment }}</p>
                </div>
                <div class="comment line">
                    <input v-model="comment" type="text" placeholder="comment here" />
                    <button @click="commentPost(currentPost)">Comment</button>
                </div>
            </div>
        </main>
    </div>
</template>

<style scoped>

</style>