<template>
    <div class="container d-flex flex-column" :class="{darken: editForm}">
        <h1 class="mt-2">User Profile</h1>
        <div class="d-flex flex-row gx-5">
            <div class="d-flex flex-column mt-4 col-md-4 col-12">
                
                <div class="identity">
                    <div>
                        <img src="../assets/profile-avatar.png" alt="profile images" class="profile_image" />
                    </div>
                    
                    <q class="bio">{{ user.bio }}</q>
                    <p>@{{ user.username }}</p>
                    <p class="name">{{ user.nickname }} ({{ user.pronoun }})</p>
                </div>
                
                <p><span class="category">Career:</span> {{ user.career }}</p>
                <p><span class="category">Goals:</span></p>
                <ol>
                    <li v-for="goal in user.goals" :key="user.goals.indexOf(goal)" >
                        {{ goal }}
                    </li>
                </ol>

                <button class="gray_button" @click="toggleEditProfile()">Edit Profile</button>
            </div>

            <div class="d-flex flex-column mt-4 col-md-8 col-12">
                <h2>User Engage</h2>
                <div class="statistics">
                    <ul class="mt-3">
                        <li><span class="category">Journal Written:</span> {{ user.journals.length }}</li>
                        <li><span class="category">Article Read:</span> {{ user.readArticles.length }}</li>
                        <li><span class="category">Clubs joined:</span> {{ user.clubs.length }}</li>
                    </ul>
                </div>

                <div class="mt-3">
                    <h2>My Bookmark</h2>
                    <!-- if less than three, show all -->
                    <!-- else show three and show more if clicked (three by three)-->
                    <!-- for mobile, show in column -->
                    <div class="my-bookmark">
                        <div v-for="article in user.bookmarks" :key="article.title">
                            <BookmarkCard :article="article" />
                        </div>
                    </div> 
                </div>    
                <div class="mt-3">
                    <h2>My Community</h2>
                </div>
            </div>
        </div>
        <div v-if="editForm">
            <EditProfileForm @close="closeForm" />
        </div>
    </div>
</template>

<script setup>
import { defineProps, ref } from 'vue';
import BookmarkCard from './BookmarkCard.vue';
import EditProfileForm from '../forms/EditProfileForm.vue';

const props = defineProps({
    user: {
        type: Object,
        required: true
    }
});

const editForm = ref(false);

const toggleEditProfile = () => {
    editForm.value = true;
}

const closeForm = () => {
    editForm.value = false;
}

</script>

<style scoped>
    .container {
        width: 100%;
        height: 100vh;
        position: relative;
        z-index: 1;
    }
    .darken {
        filter: brightness(50%);
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
    .my-bookmark {
        display: grid;
        grid-template: repeat(3, 1fr);
        margin: 15px 10px;
        gap: 10px;
    }
</style>