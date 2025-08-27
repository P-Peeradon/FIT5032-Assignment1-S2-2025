<template>
    <div class="container d-flex lg-flex-row flex-column">
        <h1>User Profile</h1>
        <div class="d-flex flex-column">
            <img v-if="user.image" :src="user.image" alt="profile images" class="profile_images" />
            <img v-else src="../assets/Profile_avatar_placeholder_large.png" alt="profile images" class="profile_images" />
            <q class="bio">{{ user.bio }}</q>
            <p>{{ user.nickname }} ({{ user.pronoun }})</p>
            <p><span class="category">Career:</span> {{ user.career }}</p>
            <ol v-for="goal in user.goals" :key="goal">
                <li>{{ user.goal }}</li>
            </ol>
        </div>
        <div class="d-flex flex-column">
            <div class="statistics">
                <ul>
                    <li><span>Journal Written:</span> {{ user.journal.length }}</li>
                    <li><span>Article Read:</span> {{ user.readArticle.length }}</li>
                    <li><span>Community joined:</span> {{ user.community.length }}</li>
                </ul>
            </div>
            <div class="bookmark">
                <!-- if less than three, show all -->
                <!-- else show three and show more if clicked (three by three)-->
                <ArticleThumbnail />
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    user: {
        type: Object,
        required: true
    }
})

const user = { ...props.user }



</script>

<style scoped>
    .container {
        width: 200px;
        height: 200px;
    }
</style>