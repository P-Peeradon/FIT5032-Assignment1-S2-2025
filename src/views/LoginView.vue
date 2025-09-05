<script setup>
import { computed, ref } from 'vue';
import LoginForm from '../forms/LoginForm.vue';

// Fetch the username and password credential from firebase database.
// Fetch password and username, then 

const errorMsg = ref('');

const authoriseCredential = (credential) => {
    const username = credential.username;
    const password = credential.password;

    const user = computed();

    if (user.value.password !== password) {
        errorMsg.value = 'Password mismatch, please try again';
    } else {
        errorMsg.value = '';
        //Authenticate using firebase auth.
        //Then direct to homepage.
    }
}

</script>

<template>
    <LoginForm @sendLoginCredential="authoriseCredential(credential)" />
    <p v-if="errorMsg !== ''" class="text-danger">{{ errorMsg }}</p>
</template>

<style scoped>

</style>