<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    community: {
        type: Object,
        required: true
    }
});
</script>

<template>
    <div class="container">
        <h1></h1>
        <q>{{ props.community.motto }}</q>
        
        <span class="category">Club Aims:</span>
    </div>
</template>

<style>

</style>