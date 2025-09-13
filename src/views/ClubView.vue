<template>
    <div class="container">
        <h1>Club and Society</h1>
        <div v-if="currentClub" class="d-flex flex-row">
            <main>
                <ClubDisplay :club="currentClub"/>
            </main>
            <aside>
                <!-- If joined, go to discussion view. -->
                <!-- Else click to join club-->
                <img src="../assets/community-logo.jpg" :alt="currentClub.name" />
                <div v-if="currentClub in user.clubs">
                    <router-link :to="{ name: 'Discussion', params: {name: currentClub.name}}" class="nav-link" active-class="active" aria-current="page">
                        <button class="blue_button">To Discussion</button>
                    </router-link>
                    <button class="btn-danger">Left the club</button>
                </div>
                <div v-else>
                    <button @click="joinClub()" class="blue_button">Join the club</button>
                </div>
            </aside>
        </div>
        <div v-else>
            <p>Loading club.</p>
        </div>
    </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { onMounted, ref } from 'vue';
import ClubDisplay from '../components/ClubDisplay.vue';
import db from '../firebase/init';
import { collection, getDoc, getDocs, query, updateDoc, arrayUnion, doc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

// Authentication
const auth = getAuth();
const uid = ref("")
const user = ref(null);

// Route parameter and fetch object by primary key.
const route = useRoute();
const name = ref("");
const clubs = ref([]);
const currentClub = ref(null); //Club as object.

const fetchUserData = async (uid) => {
    try {
        const userRef = doc(db, 'users', uid);
        const userSnapshot = await getDoc(userRef);
        const myUser =  userSnapshot.data() ;

        user.value = myUser;
    } catch (err) {
        console.error('Error fetching user:', err)
    }
}

const fetchClubs = async () => {

    try {

        const clubQuery = query(collection(db, 'clubs'));
        const clubQuerySnapshot = await getDocs(clubQuery);
        const clubsArray = [];

        clubQuerySnapshot.forEach((doc) => {
            clubsArray.push({ id: doc.id, ...doc.data() });
        });

        clubs.value = clubsArray;
        findCurrentClub(name.value)

    } catch (err) {
        console.error('Error fetching clubs:', err);
    }

};

const findCurrentClub = (name) => {
    currentClub.value = clubs.value.find((club) => {
        return club.name == name;
    });
}

const joinClub = async () => {
    const userRef = await doc(db, 'users', uid);
    const clubRef = await doc(db, 'clubs', currentClub.value.id)

    await updateDoc(userRef, {clubs: arrayUnion(clubRef)})
}

onAuthStateChanged(auth, (user) => {
    if (user) {
        uid.value = user.uid;
        fetchUserData(uid.value);
    } else {
        uid.value = "";
    }
});

onMounted(() => {
    name.value = decodeURIComponent(route.params.name);
    fetchUserData(uid.value);
    fetchClubs();
});

</script>

<style scoped>

</style>
