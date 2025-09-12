<template>

</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    journals: {
        type: Array,
        required: true,
    }, 
    startDate: {
        type: Date,
        required: false,
    },
    endDate: {
        type: Date,
        required: false,
    },
})
</script>

<style>

</style>