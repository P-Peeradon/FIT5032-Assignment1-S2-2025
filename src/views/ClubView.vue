<template>
    <div class="container">
        <h1>Club and Society</h1>
        <div class="d-flex flex-row">
            <main>
                <ClubDisplay :club="club"/>
            </main>
            <aside>
                <!-- If joined, go to discussion view. -->
                <!-- Else click to join club-->
                <div v-if="club in user.clubs">
                    <router-link :to="{ name: 'Discussion', params: {name: club.name}}" class="nav-link" active-class="active" aria-current="page">
                        <button class="blue_button">To Discussion</button>
                    </router-link>
                    <button class="btn-danger">Left the club</button>
                </div>
                <div v-else>
                    <button @click="joinClub()" class="blue_button">Join the club</button>
                </div>
            </aside>
        </div>
    </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { onMounted, ref } from 'vue';
import ClubDisplay from '../components/ClubDisplay.vue';
import db from '../firebase/init';
import { collection, getDoc, query, where, updateDoc, arrayUnion, doc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const auth = getAuth();
const currentUser = auth.currentUser;

const route = useRoute();
const name = ref(route.params.name);
const club = ref(null); //Club as object.
const user = ref(null);

const fetchUserData = async () => {
    try {

        const userQuery = query(collection(db, 'users', where('email', '===', currentUser.email)));
        const userQuerySnapshot = await getDoc(userQuery);
        const myUser = { ...userQuerySnapshot.data() };

        user.value = myUser;

    } catch (err) {

        console.log('Error fetching user:', err);

    }
}

const fetchClubData = async () => {

    try {

        const clubQuery = query(collection(db, 'clubs'), where('name', '==', name));
        const clubQuerySnapshot = await getDoc(clubQuery);

        club.value = clubQuerySnapshot.data();

    } catch (err) {

        console.error('Error fetching clubs:', err);

    }

}

const joinClub = async () => {

    if (!user.value.clubs.included(club)) {

        user.value.clubs.push(club);

        const userFK = doc(db, 'users', user.value.email);

        try {
            await updateDoc(userFK, {clubs: arrayUnion(club)});
        } catch (err) {
            console.error('Error in updating data:', err);
        } finally {
            console.log('Successfully add new member');
        }

    } 

}

onMounted(() => {
    fetchUserData();
    fetchClubData();
});

</script>

<style scoped>

</style>