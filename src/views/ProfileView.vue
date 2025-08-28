<script setup>
import UserProfile from '../components/UserProfile.vue';
import { ref } from 'vue';

const currentUser = ref({
    username: 'abcd', // String
    nickname: 'Guy', // String
    pronoun: 'He/Him',
    bio: 'Stop your mouth', // String
    career: 'International student', // String
    image: new URL('../assets/profile-avatar.png', import.meta.url).href, //URL
    journals: [], // Array(Journal)
    readArticles: [
        {
            title: 'Atk Jknnd', 
            cover: new URL('../assets/zen-cover.png', import.meta.url).href, 
            author: 'Yugi Muto', 
            thumbnail: new URL('../assets/mental-health-article-thumbnail.jpg', import.meta.url).href, 
            content: 'lorem'
        }
    ], // Array(Article)
    bookmarks: [
        {
            title: 'Atk Jknnd', 
            cover: new URL('../assets/zen-cover.png', import.meta.url).href, 
            author: 'Yugi Muto', 
            thumbnail: new URL('../assets/mental-health-article-thumbnail.jpg', import.meta.url).href, 
            content: 'lorem'
        }
    ], // Array(Article)
    communities: [], // Array(Community)
    goals: ['Get HD in FIT5032', 'Write Google Maps Review', 'Enjoy life at Monash University', 'Get offer for second master degree at University of Melbourne'] // Array(String)
});
</script>

<template>
    <UserProfile :user="currentUser"  />
</template>

<style>

</style>