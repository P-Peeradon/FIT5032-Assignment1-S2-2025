<template>
    <div>
        <img src="../assets/news-article.png" :alt="event.title"/>
        <p class="time"></p>
        <h2 class="event-title">{{ event.title.toUpper() }}</h2>
        <p class="host"><span>by</span> {{ event.host }}</p>
        <p>@{{ event.location }}</p>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    event: {
        type: Object,
        required: true
    }
});



</script>

<style scoped>
    div {
        width: 220px;
        height: 450px;
        background-color: cornflowerblue;
        border-radius: 0 0 40px 40px;
        box-shadow: 0 10px 20px #909090;
    }
    div img {
        width: 220px;
        height: 220px;
    }
    p.time {
        color: blueviolet;
    }
    p.author {
        margin-left: 10px;
    }
</style>