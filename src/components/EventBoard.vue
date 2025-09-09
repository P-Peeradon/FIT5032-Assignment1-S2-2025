<script setup>
import CalendarInput from '../forms/CalendarInput.vue';
import { defineProps } from 'vue';

const props = defineProps({
    club: {
        type: Object,
        required: true
    }
});
</script>

<template>
    <div class="container">
        <aside class="col-4 col-xl-3">
            <CalendarInput />
        </aside>
        <main class="col-8 col-xl-9">
            <!-- Display the community events dynamically-->
            <div v-for="event in club.events" :key="event.title"></div>
        </main>
        <!-- As social worker who own this club, I want to add new event so that the club member can join. -->
    </div>
</template>

<style>

</style>