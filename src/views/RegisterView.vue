<script setup>
import RegisterForm from '../forms/RegisterForm.vue';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
import db from '../firebase/init.js';
import { useRouter } from 'vue-router';
import { setDoc, doc } from 'firebase/firestore';

const router = useRouter();
const auth = getAuth();

const createNewUser = async (userData, uid) => {
    // This method handle adding new user to firestore database.
    const user = { ...userData };
    const userDocRef = doc(db, "users", uid);

    try {
        await setDoc(userDocRef, {
            username: user.username,
            email: user.email,
            nickname: '',
            pronoun: user.pronoun,
            role: user.role,
            bio: '',
            career: '',
            journals: [],
            readArticles: [],
            bookmarks: [],
            clubs: [],
            goals: []
        });
    } catch (err) {
        console.error('Error in creating new user:', err);
        return;
    } finally {
        alert('Create user successfully');
    }

}

const registerNewUser = async (userData) => {
    //Direct the new user to homepage, authorised.
    const newUser = { ...userData };

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, newUser.email, newUser.password);
        await createNewUser(newUser, userCredential.user.uid);
    } catch (err) {
        alert(err.code);
        return;
    } finally {
        alert('Registration processes complete');
        router.push('/');
    }

}

</script>

<template>
    <RegisterForm @register="registerNewUser" />
</template>

<style>

</style>