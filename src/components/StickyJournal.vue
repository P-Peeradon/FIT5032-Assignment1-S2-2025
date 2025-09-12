<template>
    <div class="note">
        <h2>{{ journal.topic }}</h2>
        <ul v-for="mood in journal.moods" :key="mood">
            <li>{{ mood }}</li>
        </ul>
        <p>{{ journal.content }}</p>
        <q>{{ formatDate(journal.timestamp) }}</q>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    journal: {
        type: Object,
        required: true
    }
});

const formatDate = (date) => {

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString(); // Months are 0-indexed
    const day = date.getDate().toString();

    return `${year}/${month}/${day}`
}

</script>

<style scoped>
div.note {
    width: 180px;
    height: 180px;
}

</style>