<script setup>
import RegisterForm from '../forms/RegisterForm.vue';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
import db from '../firebase/init.js';
import { useRouter } from 'vue-router';
import { addDoc, collection } from 'firebase/firestore';

const saltRound = 11;
const router = useRouter();
const auth = getAuth();

const createNewUser = async (userData) => {
    // This method handle adding new user to firestore database.
    const user = { ...userData };

    try {
        await addDoc(collection(db, 'users'), {
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
    
    // After hashing finished, store the hashed password and email.
    try {
        await createUserWithEmailAndPassword(auth, newUser.email, newUser.password);
        await createNewUser(newUser);
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