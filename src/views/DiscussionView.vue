<script setup>
import { ref, onMounted } from 'vue';
import DiscussionBoard from '../components/DiscussionBoard.vue';
import EventBoard from '../components/EventBoard.vue';
import { useRoute } from 'vue-router';
import db from '../firebase/init';
import { query, collection, where, getDoc } from 'firebase/firestore';

const route = useRoute();
const name = ref(route.params.name);
const club = ref(null);

// Find club with the specific name.
const fetchClubData = async () => {

    try {

        const clubQuery = query(collection(db, 'clubs'), where('name', '==', name));
        const clubQuerySnapshot = await getDoc(clubQuery);

        club.value = clubQuerySnapshot.data();

    } catch (err) {

        console.error('Error fetching clubs:', err);

    }

}

onMounted(() => {
    fetchClubData()
});


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
            <DiscussionBoard v-if="render.value === 'Forum'" :club="club" />
            <EventBoard v-if="render.value === 'Events'" :club="club" />
        </main>
    </div>
</template>

<style>

</style>