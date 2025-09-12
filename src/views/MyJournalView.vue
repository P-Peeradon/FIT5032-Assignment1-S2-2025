<template>
    <div>
        <h1>{{ user.nickname }}'s Journals</h1>
        <aside>
            <CalendarInput />
        </aside>
        <main>
            <UserJournal :journals="user.journals" :startDate="new Date()" :endDate="Date()" />
        </main>
    </div>
</template>

<script setup>
import UserJournal from '../components/UserJournal.vue';
import CalendarInput from '../forms/CalendarInputForm.vue';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import db from '../firebase/init';
import { getDoc, doc, } from 'firebase/firestore';
import { ref, onMounted } from 'vue';

const auth = getAuth();
const uid = ref("");
const user = ref(null);

const fetchUserData = async (uid) => {
    try {
        const userRef = doc(db, 'users', uid);
        const userSnapshot = await getDoc(userRef);
        const myUser =  userSnapshot.data() ;

        user.value = myUser;
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