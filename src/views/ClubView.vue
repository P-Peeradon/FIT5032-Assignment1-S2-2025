<template>
    <div class="container">
        <h1>Club and Society</h1>
        <div v-if="currentClub" class="d-flex flex-column flex-md-row gy-4">
            <main class="col-12 col-md-9 col-xl-8">
                <ClubDisplay :club="currentClub"/>
            </main>
            <aside class="col-12 col-md-3 col-xl-4 mt-4">
                <!-- If joined, go to discussion view. -->
                <!-- Else click to join club-->
                <img src="../assets/community-logo.jpg" :alt="currentClub.name" />
                <div class="mt-3">
                    <div v-if="checkMembership()">
                        <router-link :to="{ name: 'Discussion', params: {name: currentClub.name}}" class="nav-link" active-class="active" aria-current="page">
                            <button class="blue_button">To Discussion</button>
                        </router-link>
                        <button class="red_button mt-2">Left the club</button>
                    </div>
                    <div v-else class="selector">
                        <button @click.prevent="joinClub()" class="blue_button">Join the club</button>
                    </div>
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

const checkMembership = () => {
    return user.value.clubs.find((club) => club.name == currentClub.value.name) ;
}

const fetchUserData = async (uid) => {
    try {
        const userRef = doc(db, 'users', uid);
        const userSnapshot = await getDoc(userRef);
        const myUser =  userSnapshot.data() ;

        user.value = myUser;
        const myClubs = myUser.clubs;
        const myClubsSnap = await Promise.all(myClubs.map(ref => getDoc(ref)));

        user.value.clubs = myClubsSnap.map((clubSnap) => {
            return { ...clubSnap.data()}
        });
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
            clubsArray.push({ ...doc.data() });
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
    try {
        const userRef = await doc(db, 'users', uid);
        const clubRef = await doc(db, 'clubs', currentClub.value.id)

        await updateDoc(userRef, {clubs: arrayUnion(clubRef)});

        try {
            const updatedUserDoc = await getDoc(userRef);
            user.value = updatedUserDoc.data();
        } catch (err) {
            console.error("Error in update user data: ", err);
        }
    } catch (err) {
        console.error("Error in joining club.", err)
    }

    alert("You are now a member of this club.");
    console.log(user.value);
    console.log(currentClub.value);

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
img {
    width: 150px;
    height: 150px;
}
aside {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}
</style>
