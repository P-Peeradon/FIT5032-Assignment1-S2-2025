<template>
    <nav v-if="authorised" class="d-flex flex-row">
            <p>Welcome, {{ currentUser.username }}</p>
            <button @click="logout()" class="red_button">Logout</button>
    </nav>
    <nav v-else class="d-flex flex-row">
        <router-link to="/register" class="nav-link px-2" active-class="active" aria-current="page">
            <button class="gray_button">Register</button>
        </router-link>
        <router-link to="/login" class="nav-link px-2" active-class="active" aria-current="page">
            <button class="blue_button">Login</button>
        </router-link>
    </nav>
</template>

<script setup>
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const auth = getAuth();
const authorised = ref(false);
const currentUser = ref(auth.currentUser); // Username of who is using the app.

const logout = async () => {

    try {
        await signOut(auth);
    } catch (err) {
        alert('Error signing out:', err);
    } finally {
        router.push("/");
    }
    
};

</script>

<style scoped>
nav {
    background-color: aquamarine;
    display: flex;
    flex-direction: row;
    justify-content: end;
    padding-right: 20px;
    width: 100vw;
    height: 60px;
}
</style>