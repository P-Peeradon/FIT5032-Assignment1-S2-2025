<template>
    <main>
        <div class="row profile_header">
            <h1 class="mt-3">User Profile</h1>
        </div>
        <div class="row">
            <div class="col-1"></div>
            <div class="col-8">
                <p><span>{{ user.username }}</span></p>
            </div>
            
        </div>
        <div class="row">
            <div class="col-1"></div>
            <div class="col-8 profile">
                <p><span>Nickname:</span> {{ user.nickname }}</p>
                <q>{{ user.bio }}</q>
                <p><span>Archetype:</span> {{ user.archetype }}</p>
                <p><span>Journal written:</span> {{ user.journal.length }}</p>
                <p><span>Article read:</span> {{ user.readArticle.length }}</p>
                <p>Goals: </p>
                <ol v-for="goal in goals" :key="goal">
                    <li>{{ goal }}</li>
                </ol>
            </div>
            <div class="col-3">
                <img src="" alt="profile_picture" />
            </div>
        </div>
    </main>
</template>

<script setup>
import { defineProps, defineEmits, ref, watch } from 'vue';

const props = defineProps({
    user: {
        type: Object,
        require: true
    }
});

const emit = defineEmits(['invalid-user-data'])

const isValidUser = ref(true);

watch(() => props.user, (newValue) => {
    if (newValue.bio && newValue.nickname && newValue.username) {
        isValidUser.value = true;
    } else {
        isValidUser.value = false;
        emit('invalid-user-data', 'incorrect user data format');
    }
})

</script>

<style scoped>
main {
    background-color: mediumspringgreen;
}
h1 {
    color: blue;
    font-weight: bold;
}
.profile_header {
    margin-left: 22px;
}
.profile {
    display: flex;
    flex-direction: column;
}
</style>