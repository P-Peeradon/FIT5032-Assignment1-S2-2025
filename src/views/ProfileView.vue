<script setup>
import WebHeader from '../components/WebHeader.vue';
import UserProfile from '../components/UserProfile.vue';
import { ref } from 'vue';

const currentUser = ref({
    username: 'abcd',
    nickname: 'guy',
    bio: 'stop your mouth',
    images: '',
    archetype: 'IDK',
    journal: [],
    readArticle: [],
    bookmark: [],
    goals: []
});

const errorMessage = ref('');

const handleInvalidUser = (message) => {
    errorMessage.value = message;
};

</script>

<template>
    <UserProfile :user="currentUser"  />
</template>

<style>

</style>