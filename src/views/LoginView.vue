<script setup>
import { useRouter } from 'vue-router';
import LoginForm from '../forms/LoginForm.vue';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const router = useRouter();
const auth = getAuth();

const authoriseUser = async (credential) => {

    try {
        await signInWithEmailAndPassword(auth, credential.email, credential.password);
    } catch (err) {
        console.error('Error in log in:', err);
        return;
    } finally {
        alert('Login Success');
        router.push('/');
    }
    
}

</script>

<template>
    <LoginForm @sendLoginCredential="authoriseUser" />
</template>

<style scoped>

</style>