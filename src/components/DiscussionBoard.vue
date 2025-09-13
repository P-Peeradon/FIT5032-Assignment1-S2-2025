<script setup>
import { ref } from 'vue';
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
const searchQuery = ref("")
const comment = ref("")

const togglePostForm = () => {
    showPostForm.value = !showPostForm.value;
    currentPost.value = null;
}

const displayComment = (post) => {
    showPostForm.value = false;
    currentPost.value = post;
}

const addPost = (postLetter) => {
    emit('post', postLetter);
}

const commentPost = (post) => {

    if (comment.value !== "") {
        emit('comment',
            {
                id: post.id,
                text: comment.value
            }
        );
        comment.value = '';
    }
}

const formatDate = (date) => {

    if (!(date instanceof Date) || isNaN(date.getTime())) {
        console.error("Invalid date provided. Expected a Date object.");
        return null;
    }

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString(); // Months are 0-indexed
    const day = date.getDate().toString();

    return `${year}/${month}/${day}`
}

</script>

<template>
    <div class="container">
        <div class="row d-flex flex-column flex-lg-row">
            <aside class="col-12 col-lg-4 pt-2">
                <div class="threading">
                    <button @click="togglePostForm()" class="blue_button">New Post</button>
                </div>
                <input class="form-control mt-2" type="text" placeholder="Search" v-model="searchQuery" />
                <br />
                <div class="list_post" v-for="post in club.posts" :key="post">
                    <hr />
                    <div class="post" @click="displayComment(post)">
                        <h2>{{ post.topic }}</h2>
                        <p>by {{ post.username }} on {{ formatDate(post.timestamp) }}</p>
                    </div>
                </div>
            </aside>
            <main class="col-12 col-lg-8">
                <div v-if="showPostForm" class="mt-2 mt-lg-0">
                    <PostForm @post="addPost(postLetter)" @close="togglePostForm()" />
                </div>
                <div class="display mt-2 mt-lg-0" v-if="currentPost">
                    <h2>{{ currentPost.topic }}</h2>
                    <q>{{ currentPost.username }}</q>
                    <p>{{ currentPost.content }}</p>
                    <div v-for="comment in currentPost.comments" :key="comment">
                        <p>{{ comment.text }}</p>
                    </div>
                    <div class="comment line">
                        <input class="form-control" v-model="comment" type="text" placeholder="comment here" />
                        <br />

                        <button class="blue_button" @click="commentPost(currentPost)">Comment</button>
                    </div>
                </div>
            </main>
        </div>

    </div>
</template>

<style scoped>
.threading {
    display: flex;
    justify-content: end;
}
.container
{
  margin: 0;
}
aside {
    background-color: rgb(200, 162, 200);
    border: solid 2px blue;
    max-height: 95vh;
    margin: 0;
}
.list_post {
    overflow-y: scroll;
    width: 100%
}
hr {
    border: solid 2px blue;
    padding: 0;
    margin: 0;
    width: 100%;
}
.post {
  padding-top: 5px;
  height: 100px;
}
.post h2 {
  font-size: 22px;
  text-align: left;
}
.post:hover {
  cursor: pointer;
}
.display {
  min-height: 30vh;
  background-color: rgb(200, 162, 200);
  padding: 12px;
  height: auto;
}
</style>
