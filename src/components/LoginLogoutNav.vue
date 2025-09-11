<template>
    <div class="userhandler">
        <nav v-if="authorised" class="d-flex flex-row">
            <button @click="logout" class="red_button">Logout</button>
        </nav>
        <nav v-else class="d-flex flex-row">
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
import { useRouter } from 'vue-router';

const auth = getAuth();

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
.userhandler {
    background: aliceblue;
    display: flex;
    justify-content: end;
    padding-right: 20px;
    width: 100%;
    height: auto;
    padding-top: 20px;
    padding-bottom: 20px;
}
</style>