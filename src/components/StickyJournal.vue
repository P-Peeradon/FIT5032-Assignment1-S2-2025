<template>
    <div class="note pt-4">
        <h2>{{ journal.topic }}</h2>
        <p class="mood">{{ journal.moods.join(', ') }}</p>
        <p class="px-2">{{ journal.content }}</p>
        <p>on <span class="time">{{ formatDate(journal.timestamp) }}</span></p>
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
    background: url('../assets/sticky_note.png');
    background-repeat: no-repeat;
    background-size: cover;
    padding: 0 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
}
h2 {
  	font-size: 20px;
    font-style: underline;
}
p.mood {
	color: blue;
}
p {
    font-size: 14px;
}
span.time {
	color: #4CC417;
	font-style: italic;
}

</style>
