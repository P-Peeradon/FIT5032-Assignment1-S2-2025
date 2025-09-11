<script setup>
import UserProfile from '../components/UserProfile.vue';
import { getAuth } from 'firebase/auth';
import { onMounted, ref } from 'vue';
import db from '../firebase/init';
import { doc, getDoc } from 'firebase/firestore';

const auth = getAuth();

const currentUser = auth.currentUser;
const user = ref(null);

  const fetchUserData = async () => {
    try {
        const userRef = doc(db, 'users', currentUser.uid);
        const userSnapshot = await getDoc(userRef);
        const myUser =  userSnapshot.data() ;

        user.value = myUser;
    } catch (err) {
        console.log('Error fetching user:', err)
    }
};

onMounted(
    // Fetch user data.
    fetchUserData()
)
</script>

<template>
    <UserProfile :user="user"  />
</template>

<style>

</style>