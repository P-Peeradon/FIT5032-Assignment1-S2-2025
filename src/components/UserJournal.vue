<template>
    <div>
        <div v-for="journal in journals" :key="journal.topic">
            <StickyJournal :journal="journal" />
        </div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';
import StickyJournal from './StickyJournal.vue';

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
});


</script>

<style>

</style>