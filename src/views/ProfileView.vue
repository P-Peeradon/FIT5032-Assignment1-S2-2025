<script setup>
import UserProfile from '../components/UserProfile.vue';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { onMounted, ref } from 'vue';
import db from '../firebase/init';
import { doc, getDoc } from 'firebase/firestore';

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
        console.error('Error fetching user:', err)
    }
};

onMounted(() =>

    fetchUserData(uid.value)

);

onAuthStateChanged(auth, (user) => {
    if (user) {
      uid.value = user.uid;
      fetchUserData(uid.value);
    } else {
      uid.value = "";
    }
});
</script>

<template>
    <UserProfile :user="user"  />
</template>

<style>

</style>