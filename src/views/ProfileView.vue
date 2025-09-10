<script setup>
import UserProfile from '../components/UserProfile.vue';
import { getAuth } from 'firebase/auth';

const auth = getAuth()

// This view is locked for authorised user.
const currentUser = auth.currentUser;
</script>

<template>
    <UserProfile :user="currentUser"  />
</template>

<style>

</style>