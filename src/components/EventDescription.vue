<script setup>
const props = defineProps({
    event: {
        type: Object,
        required: true
    }
});

const emit = defineEmits(['close', 'attend'])

const closeEvent = () => {
    emit('close');
}

const attendEvent = () => {

}

</script>

<template>
    <div class="container">
        <div class="row close">
            <button @click="closeEvent()" class="btn-danger">X</button>
        </div>
        <h2>{{ event.title }}</h2>
        <q>by: {{ event.host }}</q>
        <p class="event_description">{{ event.description }}</p>
        <button class="blue_button" @click="attendEvent()">
            Attend
        </button>
        <p><span class="category">FYI, contact</span>: {{ event.telephone }}</p>
    </div>
</template>

<style scoped>
.container {
    margin: 30px;
    box-sizing: border-box;
}
div.close {
    display: flex;
    flex-direction: row;
    justify-content: end;
}
p.event_description {
    text-indent: 30px;
}
</style>