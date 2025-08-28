<template>
    <div class="container d-flex flex-column ">
        <h1 class="mt-2">User Profile</h1>
        <div class="d-flex flex-row gx-5">
            <div class="d-flex flex-column mt-4 col-md-4 col-12">
                
                <div class="identity">
                    <div>
                        <img v-if="imageExist()" :src="props.user.image" alt="profile images" class="profile_image" />
                        <img v-else src="../assets/profile-avatar.png" alt="profile images" class="profile_image" />
                    </div>
                    <q class="bio">{{ user.bio }}</q>
                    <p class="name">{{ user.nickname }} ({{ user.pronoun }})</p>
                </div>
                
                <p><span class="category">Career:</span> {{ user.career }}</p>
                <p><span class="category">Goals:</span></p>
                <ol>
                    <li v-for="goal in user.goals" :key="user.goals.indexOf(goal)" >
                        {{ goal }}
                    </li>
                </ol>
            </div>
            <div class="d-flex flex-column mt-4 col-md-8 col-12">
                <h2>User Engage</h2>
                <div class="statistics">
                    <ul class="mt-3">
                        <li><span class="category">Journal Written:</span> {{ user.journals.length }}</li>
                        <li><span class="category">Article Read:</span> {{ user.readArticles.length }}</li>
                        <li><span class="category">Community joined:</span> {{ user.communities.length }}</li>
                    </ul>
                </div>

                <div class="mt-3">
                    <h2>My Bookmark</h2>
                    <!-- if less than three, show all -->
                    <!-- else show three and show more if clicked (three by three)-->
                    <!-- for mobile, show in column -->
                    
                    <button v-if="user.bookmarks.length > 3" class="blue_button">Show More</button>
                </div>

                <div class="mt-3">
                    <h2>My Community</h2>
                </div>
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
});

const imageExist = () => {
    return props.user.image && props.user.image !== '';
}


</script>

<style scoped>
    .container {
        width: 100%;
        height: 100vh;
        
    }
    .profile_image {
        width: 200px;
        height: 200px;
    }
    h2 {
        text-align: center;
    }
    p.name {
        font-weight: bold;
    }
    .identity {
        text-align: center;
    }
    ul li {
        list-style: none;
    }
    ol li {
        margin-left: 5px;
    }
</style>