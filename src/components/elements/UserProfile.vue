<template>
    <main>
        <div class="row">
            <h1 class="mt-5">User Profile</h1>
            <q class="mt-2">{{ user.bio }}</q>
        </div>
        <div class="row">
            <div class="col-9 mt-5 profile">
                <p>Nickname: {{ user.nickname }}</p>
                <p>Archetype: {{ user.archetype }}</p>
                <p>Journal written: {{ user.journal.length }}</p>
                <p>Journal written: {{ user.readArticle.length }}</p>
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
</style>