<script setup>
import UserProfile from '../components/UserProfile.vue';
import { ref } from 'vue';

const currentUser = ref({
    username: 'abcd', // String
    nickname: 'Guy', // String
    pronoun: 'He/Him',
    bio: 'Stop your mouth', // String
    career: 'International student', // String
    image: '',
    journals: [], // Array(Journal)
    readArticle: [], // Array(Article)
    bookmark: [], // Array(Article)
    communities: [], // Array(Community)
    goals: ['Get HD in FIT5032', 'Write Google Maps Review', 'Enjoy life at Monash University']
});
</script>

<template>
    <UserProfile :user="currentUser"  />
</template>

<style>

</style>