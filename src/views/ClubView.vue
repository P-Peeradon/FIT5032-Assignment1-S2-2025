<template>
    <div class="container">
        <h1>Club and Society</h1>
        <div class="d-flex flex-row">
            <main>
                <ClubDisplay :club="currentClub"/>
            </main>
            <aside></aside>
        </div>
    </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { onMounted, ref } from 'vue';
import ClubDisplay from '../components/ClubDisplay.vue';
import db from '../firebase/init';
import { collection, getDoc, query, where } from 'firebase/firestore';

const route = useRoute();
const name = ref(route.params.name);
const club = ref(null);

// Logic to fetch club by name.
// No clubs with the same title.
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

</script>

<style scoped>

</style>