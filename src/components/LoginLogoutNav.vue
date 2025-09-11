<template>
    <div class="d-flex flex-row">
        <nav v-if="authorised">
            <p>Welcome, {{ currentUser.username }}</p>
            <button @click="logout()" class="red_button">Logout</button>
        </nav>
        <nav v-else>
            <router-link to="/register" class="nav-link px-2" active-class="active" aria-current="page">
                <button class="gray_button">Register</button>
            </router-link>
            <router-link to="/login" class="nav-link px-2" active-class="active" aria-current="page">
                <button class="blue_button">Login</button>
            </router-link>
        </nav>
    </div>
</template>

<script setup>
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import db from '../firebase/init';
import { collection, query, where, getDoc } from 'firebase/firestore';

const router = useRouter();
const auth = getAuth();
const authorised = ref(false);
const currentUser = ref(null); // Username of who is using the app.
const user = ref(null); // User object fetched from the database.

const logout = async () => {

    try {
        await signOut(auth);
    } catch (err) {
        alert('Error signing out:', err);
    } finally {
        router.push("/");
    }
    
};

const fetchUserData = async () => {
    try {
        const profileQuery = query(collection(db, 'users', where('email', '==', currentUser.value.email)));
        const profileQuerySnapshot = await getDoc(profileQuery);
        const myUser = { ...profileQuerySnapshot.data() };

        user.value = myUser;
    } catch (err) {
        console.log('Error fetching user:', err)
    }
}

onAuthStateChanged(auth, (user) => {
    if (user) {
        currentUser.value = user;
        authorised.value = true;
        fetchUserData();
    } else {
        currentUser.value = null;
        authorised.value = false;
    }
});


</script>

<style scoped>
nav {
    background: aquamarine;
    display: flex;
    flex-direction: row;
    justify-content: end;
    padding-right: 20px;
    width: 100vw;
    height: 60px;
}
</style>