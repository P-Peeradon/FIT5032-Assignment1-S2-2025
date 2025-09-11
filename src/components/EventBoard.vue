<script setup>
import CalendarInput from '../forms/CalendarInput.vue';
import { defineProps, ref } from 'vue';
import EventCard from './EventCard.vue';
import HostEventForm from '../forms/HostEventForm.vue';
import EventDescription from './EventDescription.vue';

const props = defineProps({
    club: {
        type: Object,
        required: true
    },
    role: {
        type: String,
        required: true // For role-based authentication.
    }
});

const showEventDesc = ref(false);

const toggleEventDesc = () => {
    showEventDesc.value != showEventDesc.value;
}



const isSocialWorker = () => {
    return props.role === 'social worker';
}

</script>

<template>
    <div class="container flex-column flex-xl-row">
        <aside class="col-4 col-xl-3">
            <CalendarInput />
        </aside>
        <main class="col-8 col-xl-9">
            <!-- Display the community events dynamically-->
            <div v-for="event in club.events" :key="event.title">
                <EventCard @click="toggleEventDesc()" :event="event" />
            </div>
        </main>
        <!-- As social worker who own this club, I want to add new event so that the club member can join. -->
        <HostEventForm v-if="isSocialWorker()" />
    </div>

    <EventDescription v-if="showEventDesc" :event="interactingEvent" />
</template>

<style>

</style>