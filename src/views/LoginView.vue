<script setup>
import LoginForm from '../forms/LoginForm.vue';

// Fetch the username and password credential from firebase database

const authoriseCredential = (credential) => {
    const username = credential.username;
    const password = credential.password;
}
</script>

<template>
    <LoginForm @sendLoginCredential="authoriseCredential(credential)" />
</template>

<style scoped>

</style>