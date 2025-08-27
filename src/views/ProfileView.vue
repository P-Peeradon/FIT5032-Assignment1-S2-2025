<script setup>
import WebHeader from '../components/WebHeader.vue';
import UserProfile from '../components/UserProfile.vue';
import { ref } from 'vue';

const currentUser = ref({
    username: 'abcd',
    nickname: 'guy',
    bio: 'stop your mouth',
    archetype: 'IDK',
    journal: [],
    readArticle: [],
    goals: []
});

const errorMessage = ref('');

const handleInvalidUser = (message) => {
    errorMessage.value = message;
};

</script>

<template>
    <WebHeader />
    <UserProfile :user="currentUser" @invalid-user-data="handleInvalidUser" />
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
</template>

<style>

</style>