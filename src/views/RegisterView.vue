<script setup>
import RegisterForm from '../forms/RegisterForm.vue';

const directNewUser = () => {
    //Direct the new user to homepage, authorised.
}
</script>

<template>
    <RegisterForm @register="directNewUser()" />
</template>

<style>

</style>