<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    club: {
        type: Object,
        required: true
    }
});

const joinClub = () => {
    //Wait for authorisation
}

</script>

<template>
    <div class="container mt-4 d-flex flex-column flex-md-row">
        <main class="col-md-9 col-xl-8">
            <h2>{{ props.club.name }}</h2>
            <q>{{ props.club.motto }}</q>
            <p>
                {{ props.club.description }}
            </p>

            <span class="category">Club Aims:</span>
            <ol>
                <li v-for="aim in club.aims" :key="aim">{{ aim }}</li>
            </ol>
        </main>
        <aside class="col-md-3 col-xl-4">
            <img :src="props.club.logo" :alt="props.club.name" />
            <button class="d-none" @click="joinClub()">Join Now</button>
            <div class="card text-white bg-info mt-5">
                <p>You need to log in before joining.</p>
            </div>
        </aside> 
    </div>
</template>

<style scoped>
img {
    width: 200px;
    height: 200px
}
</style>