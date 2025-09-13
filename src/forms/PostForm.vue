<script setup>
import { reactive } from 'vue';

const emit = defineEmits(['post', 'close']);

const postData = reactive({
    title: '',
    content: ''
});

const handlePost = () => {

    if (postData.title !== '' && postData.content !== '') {
        const postLetter = postData;
        emit('post', postLetter);
    }
}

const stopPost = () => {
    emit('close');
}
</script>

<template>
    <div class="row close">
        <button @click="stopPost()" class="red_button">X</button>
    </div>
    <form @submit.prevent="handlePost()" class="container flex-column center">
        <label for="title">Title</label>
        <input type="text" placeholder="Title" v-model="postData.title" />

        <label for="title">Title</label>
        <input type="text" placeholder="Post" v-model="postData.content" />

        <button type="submit">Post</button>
    </form>
</template>

<style scoped>
form.center {
    justify-content: center;
}

div.close {
    display: flex;
    flex-direction: row;
    justify-content: end;
}

</style>
