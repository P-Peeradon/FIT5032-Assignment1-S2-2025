<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import db from '../firebase/init'
import LoginForm from '../forms/LoginForm.vue';
import { collection, query, where, getDocs } from 'firebase/firestore';
import bcrypt from 'bcryptjs';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const errorMsg = ref('');
const router = useRouter();
const auth = getAuth();

// { email: "", password: "" }
const fetchUserKey = async (credential) => {
    const userEmail = credential.email;

    try {
        const userQuery = query(collection(db, 'users', where('email', '===', userEmail)));
        const querySnapshot = await getDocs(userQuery);
        const user = { ...querySnapshot.data() };

        return { email: user.email, password: user.password };

    } catch (err) {
        console.err('Error in fetching user data.');
    }
}

const authoriseUser = async (credential) => {
    const userCredential = { ...credential };
    const userKey = await fetchUserKey(userCredential);

    if (userCredential.email !== userKey.email) {
        errorMsg.value = 'User email does not exist.';
        return;
    }

    bcrypt.compare(userCredential.password, userKey.password, async (err, result) => {
        if (err) {
            errorMsg.value = 'Error in comparing password.';
            return;
        }

        if (result) {
            try {
                await signInWithEmailAndPassword(auth, userCredential.email, userCredential.password);
            } catch (err) {
                alert(err)
            } finally {
                router.push('/');
                console.log(auth.currentUser);
            }

        } else {
            errorMsg.value = 'Password incorrect, please try again.';
        }
    });
}

</script>

<template>
    <LoginForm @sendLoginCredential="authoriseUser(credential)" />
    <p v-if="errorMsg !== ''" class="text-danger">{{ errorMsg }}</p>
</template>

<style scoped>

</style>