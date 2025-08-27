<script setup>
import UserProfile from '../components/UserProfile.vue';
import { ref } from 'vue';

const currentUser = ref({
    username: 'abcd', // String
    nickname: 'Guy', // String
    pronoun: 'He/Him',
    bio: 'Stop your mouth', // String
    career: 'International student', // String
    image: new URL('../assets/profile-avatar.png', import.meta.url).href,
    journals: [], // Array(Journal)
    readArticles: [], // Array(Article)
    bookmarks: [], // Array(Article)
    communities: [], // Array(Community)
    goals: ['Get HD in FIT5032', 'Write Google Maps Review', 'Enjoy life at Monash University', 'Get offer for second master degree at University of Melbourne']
});
</script>

<template>
    <UserProfile :user="currentUser"  />
</template>

<style>

</style>