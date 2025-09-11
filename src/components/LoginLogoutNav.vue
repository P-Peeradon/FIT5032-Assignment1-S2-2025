<template>
    <nav>
        <div v-if="authorised">
            <p>Welcome, {{ currentUser }}</p>
            <button @click="logout()" class="btn-danger">Logout</button>
        </div>
        <div v-else class="d-flex flex-row">
            <router-link to="/register" class="nav-link px-2" active-class="active" aria-current="page">
                <button class="gray_button">Register</button>
            </router-link>
            <router-link to="/register" class="nav-link px-2" active-class="active" aria-current="page">
                <button class="blue_button">Login</button>
            </router-link>
        </div>
    </nav>
</template>

<script setup>
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const auth = getAuth();
const authorised = ref(false);
const currentUser = ref(null); // Username of who is using the app.

const logout = async () => {

    try {
        await signOut(auth);
    } catch (err) {
        alert('Error signing out:', err);
    } finally {
        router.push("/");
    }
    
};

onAuthStateChanged(auth, (user) => {
    if (user) {
        authorised.value = true;
        currentUser.value = user.username;
    } else {
        authorised.value = false;
    }
})

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