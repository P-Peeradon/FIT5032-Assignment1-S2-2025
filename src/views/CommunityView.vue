<template>
    <div class="container d-flex flex-column">
        <h1>Community</h1>
        <div class="d-flex flex-column flex-md-row gy-2">
            <main class="col-md-9 col-xl-8 mt-2">
                <h2>Select your preferred clubs.</h2>
                <div class="club-catalog mt-3">
                    <div v-for="club in clubs" :key="club.name" :value="club">
                        <ClubCard :club="club" />
                    </div>
                </div>
            </main>
            <aside class="col-md-3 col-xl-4 mt-2">
                <h2>Why youth need joining clubs?</h2>
                <blockquote class="mt-2 mb-2">
                    "Club is not only place for gathering. It is our sense of belonging, ambition and emotion."
                </blockquote>
                <p class="mt-3">
                    Youth need clubs to gain a sense of belonging and purpose,
                    develop crucial social and emotional skills through positive
                    peer and adult relationships, and have a safe, supportive space for fun,
                    learning, and self-discovery away from pressures at home and school.
                    Clubs offer diverse experiences, foster self-confidence and resilience,
                    and can provide a vital support system, particularly for vulnerable young people.
                    (Eriksen & Seland, 2020)
                </p>
                <cite>Eriksen, I. M., & Seland, I. (2020). Conceptualizing Well-being in Youth: the Potential of Youth Clubs. YOUNG, 29(2), 110330882093757. [https://doi.org/10.1177/1103308820937571]</cite>
            </aside>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import ClubCard from '../components/ClubCard.vue';
import db from '../firebase/init';
import { collection, getDocs, query } from 'firebase/firestore';

const clubs = ref([]);

// Algorithm to fetch all clubs.
const fetchClubs = async () => {

    try {

        const clubQuery = query(collection(db, 'clubs'));
        const clubQuerySnapshot = await getDocs(clubQuery);
        const clubsArray = [];

        clubQuerySnapshot.forEach((doc) => {
            clubsArray.push({ id: doc.id, ...doc.data() });
        });

        clubs.value = clubsArray;

    } catch (err) {
        console.error('Error fetching clubs:', err);
    }

};

onMounted(() => {
    fetchClubs()
});
</script>

<style scoped>
@media screen and (max-width: 768px) {
    .club-catalog  {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }
}

@media screen and (min-width: 768px) {
    .club-catalog  {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(3, 1fr);
        gap: 10px;
    }
}

@media screen and (min-width: 993px) {
    .club-catalog  {
    display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(3, 1fr);
        gap: 20px;
    }
}

</style>
