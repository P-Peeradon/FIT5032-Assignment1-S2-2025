<template>
    <div class="wall">
        <div v-for="journal in journals" :key="journal.topic" class="pinboard">
            <StickyJournal :journal="journal" />
        </div>
    </div>
</template>

<script setup>
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

<style scoped>
.wall {
    display: flex;
    justify-content: space-evenly;
    row-gap: 30px;
    overflow-y: scroll;
}
.pinboard {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(4, 1fr);
}

</style>
