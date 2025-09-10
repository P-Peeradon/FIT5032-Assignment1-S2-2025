<script setup>
import UserProfile from '../components/UserProfile.vue';
import { getAuth } from 'firebase/auth';
import { onMounted, ref } from 'vue';
import db from '../firebase/init';
import { collection,where, query, getDoc } from 'firebase/firestore';

const auth = getAuth()

// This view is locked for authorised user.
const currentUser = auth.currentUser;
const user = ref(null);

const fetchUserData = async () => {
    try {
        const profileQuery = query(collection(db, 'users', where('email', '===', currentUser.email)));
        const profileQuerySnapshot = await getDoc(profileQuery);
        const myUser = { ...profileQuerySnapshot.data() };

        user.value = myUser;
    } catch (err) {
        console.log('Error fetching user:', err)
    }
}

onMounted(
    // Fetch user data.
    fetchUserData()
)
</script>

<template>
    <UserProfile :user="currentUser"  />
</template>

<style>

</style>