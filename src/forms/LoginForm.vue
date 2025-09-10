<script setup>
import { reactive, defineEmits } from 'vue';

const emit = defineEmits(['sendLoginCredential']);

const formData =  reactive({
    email: "",
    password: ""
});

const errors = reactive({
    email: null,
    password: null
});

const emailExist = () => {
    return formData.email !== "";
}

const passwordExist = () => {
    return formData.password !== "";
}

const clearLoginForm = () => {
    formData.email = "";
    formData.password = "";
}

const validateLogin = () => {
    if (!emailExist()) {
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
        <label for="email" >Email</label>
        <input type="email" v-model="formData.email"/>

        <label for="password" >Password</label>
        <input type="password" v-model="formData.password"/>
    </form>
    <button>Login</button>
    <button>Forgot Password</button>
</template>

<style scoped>

</style>