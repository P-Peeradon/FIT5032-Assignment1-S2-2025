<template>
    <div class="d-flex flex-row">
        <nav v-if="authorised">
            <p>Welcome, {{ authUser.username }}</p>
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
import { getAuth, signOut } from 'firebase/auth';
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
    authUser: {
        type: Object,
        required: false
    }
});

const auth = getAuth()

const authorised = auth.currentUser ? true : false;

const router = useRouter();

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
    background: aquamarine;
    display: flex;
    flex-direction: row;
    justify-content: end;
    padding-right: 20px;
    width: 100vw;
    height: 60px;
}
</style>