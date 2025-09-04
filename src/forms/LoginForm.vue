<script setup>
import { reactive, defineEmits } from 'vue';

const emit = defineEmits(['sendLoginCredential']);

const formData =  reactive({
    username: "",
    password: ""
});

const errors = reactive({
    userName: null,
    password: null
});

const usernameExist = () => {
    return formData.username !== "";
}

const passwordExist = () => {
    return formData.password !== "";
}

const clearLoginForm = () => {
    formData.username = "";
    formData.password = "";
}

const validateLogin = () => {
    if (!usernameExist()) {
        errors.username = "Username is empty"
    } if (!passwordExist()) {
        errors.username = "Password is empty"
    } else {
        emit('sendLoginCredential', formData);
        clearLoginForm();
    }
}

</script>

<template>
    <form @submit.prevent="validateLogin()">
        <label for="username" >Username</label>
        <input type="text" v-model="formData.userName"/>

        <label for="password" >Password</label>
        <input type="password" v-model="formData.password"/>
    </form>
    <button>Login</button>
    <button>Forgot Password</button>
</template>

<style scoped>

</style>