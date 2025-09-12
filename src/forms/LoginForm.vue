<script setup>
import { reactive } from 'vue';

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
    <div class="row mt-3">
        <h1>Login to Chillax Corder</h1>
    </div>
    <form class=" container mt-4 d-flex flex-column" @submit.prevent="validateLogin">
        <div class="row">
            <div class="col-12">
                <label class="form-label" for="email" >Email</label>
                <input class="form-control" type="email" v-model="formData.email"/>
                <p class="text-danger">{{ errors.email }}</p>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <label class="form-label" for="password" >Password</label>
                <input class="form-control" type="password" v-model="formData.password"/>
                <p class="text-danger">{{ errors.password }}</p>
            </div>
        </div>

        <div class="mt-3 d-flex flex-row reg_menu">
            <button class="blue_button" type="submit">Login</button>
            <button class="gray_button">Forgot Password</button>
        </div>
        
        
    </form>
    
</template>

<style scoped>
form {
    width: 92%;
    height: auto;
    background: palegreen;
    padding: 20px;
    justify-content: center;
}
label, input {
    width: 80%;
}
.reg_menu {
    justify-content: center;
    gap: 15px;
}
</style>