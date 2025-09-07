<script setup>
import { ref } from 'vue';
import DiscussionBoard from '../components/DiscussionBoard.vue';
import EventBoard from '../components/EventBoard.vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const name = ref(route.params.name);

// Find club with the specific name.

const render = ref('Forum');

const toggleForum = () => {
    render.value = 'Forum';
}

const toggleEventsRoom = () => {
    render.value = 'Events Room';
}

</script>

<template>
    <div class="container">
        <header>
            <div class="row">
                <h1>Discussion board</h1>
            </div>
            <div class="row">
                <button @click="toggleForum()">Forum</button>
                <button @click="toggleEventsRoom()">Events</button>
            </div>
        </header>
        <main>
            <DiscussionBoard v-if="render.value === 'Forum'" :club="" />
            <EventBoard v-if="render.value === 'Events'" :club="" />
        </main>
    </div>
</template>

<style>

</style>