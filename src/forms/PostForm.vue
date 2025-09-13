<script setup>
import { reactive } from 'vue';

const emit = defineEmits(['post', 'close']);

const postData = reactive({
    topic: '',
    text: ''
});

const handlePost = () => {

    if (postData.title !== '' && postData.content !== '') {
        emit('post', postData);
    }
}

const stopPost = () => {
    emit('close');
}
</script>

<template>
    <form @submit.prevent="handlePost()" class="flex-column center">
        <div class="pt-3">
            <h2>Create Post</h2>
        </div>
        <div class="close d-flex">
            <button @click="stopPost()" class="red_button">X</button>
        </div>
        <br />
        <div class="col-6">
            <input class="form-control" type="text" placeholder="Title" v-model="postData.title" />
        </div>
        <br />
        <div>
            <textarea class="form-control" placeholder="Your Post" v-model="postData.content" rows="4"></textarea>
        </div>
        <br />
        <div class="pb-3 post_button">
            <button type="submit" class="blue_button">Post</button>
        </div>
    </form>
</template>

<style scoped>
form.center {
    justify-content: center;
    padding-left: 30px;
    padding-right: 30px;
}
form {
    width: auto;
    height: auto;
    background-color: rgb(200, 162, 200);
}
.red_button {
    width: 40px;
}
div.close {
    display: flex;
    flex-direction: row;
    justify-content: end;
}
.close {
    justify-content: end;
}
.post_button {
    display: flex;
    justify-content: center;
}
.post_button button {
    width: 75px;
    text-align: center;
}
</style>
