<template>
    <router-link :to="{ name: 'Club', params: {name: community.name}}" class="nav-link" active-class="active" aria-current="page">
        <div class="commuCard">
            <img :src="community.logo" :alt="community.name" />
            <h2>{{ community.name.toUppercase() }}</h2>
        </div>
    </router-link>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    community: {
        type: Object,
        required: true
    }
});
</script>

<style scoped>
.commucard {
    width: 250px;
    height: 320px;
    box-sizing: border-box;
    box-shadow: 0px 5px 40px rgb(192, 192, 192);
}

</style>