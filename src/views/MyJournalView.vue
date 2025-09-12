<template>
    <div class="container">
        <div class="row mt-4">
            <h1>{{ user.nickname }}'s Journals</h1>
        </div>
        <div class="row d-flex flex-col d-lg-row mt-3">
            <aside class="col-12 mt-2 col-lg-6">
                <CalendarInputForm />
            </aside>
            <main class="col-12 col-lg-6 mt-5">
                <UserJournal :journals="myJournals" :startDate="new Date()" :endDate="Date()" />
            </main>
            <br />
        </div>

    </div>
</template>

<script setup>
import UserJournal from '../components/UserJournal.vue';
import CalendarInputForm from '../forms/CalendarInputForm.vue';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import db from '../firebase/init';
import { getDoc, doc, Timestamp, } from 'firebase/firestore';
import { ref, onMounted } from 'vue';

const auth = getAuth();
const uid = ref("");
const user = ref(null);
const myJournals = ref([])

const fetchUserData = async (uid) => {
    try {
        const userRef = doc(db, 'users', uid);
        const userSnapshot = await getDoc(userRef);
        const myUser =  userSnapshot.data();

        user.value = myUser;
        const myJournalsRef = myUser.journals;
        const myJournalsSnap = await Promise.all(myJournalsRef.map(ref => getDoc(ref)));

        myJournals.value = myJournalsSnap.map((journalSnap) => {
            return { ...journalSnap.data(), timestamp: journalSnap.data().timestamp.toDate()}
        });



    } catch (err) {
        console.error('Error fetching user:', err);
    }
};

onMounted(() => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            uid.value = user.uid;
        }
    });
    fetchUserData(uid.value);
});

onAuthStateChanged(auth, (user) => {
    if (user) {
      uid.value = user.uid;
      fetchUserData(uid.value);
    } else {
      uid.value = "";
    }
});

</script>

<style>

</style>
