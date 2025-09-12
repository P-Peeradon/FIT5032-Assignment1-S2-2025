<template>
    <div class="note">
        <h2>{{ journal.topic }}</h2>
        <p>{{ journal.moods }}</p>
        <p>{{ journal.content }}</p>
        <p>on</p>
    </div>
</template>

<script setup>
const props = defineProps({
    journal: {
        type: Object,
        required: true
    }
});

const formatDate = (date) => {

    if (!(date instanceof Date) || isNaN(date.getTime())) {
        console.error("Invalid date provided. Expected a Date object.");
        return null; 
    }

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString(); // Months are 0-indexed
    const day = date.getDate().toString();

    return `${year}/${month}/${day}`
}

</script>

<style scoped>
div.note {
    width: 250px;
    height: 250px;
    background-color: white;
}

</style>