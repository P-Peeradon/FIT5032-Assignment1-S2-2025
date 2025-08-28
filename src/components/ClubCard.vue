<template>
    <router-link :to="{ name: 'Club', params: {name: props.club.name}}" class="nav-link" active-class="active" aria-current="page">
        <div class="commuCard">
            <img v-if="logoExist()" :src="props.club.logo" :alt="props.club.name" />
            <img v-else src="../assets/community-logo.jpg" :alt="props.club.name"/>
            <h2>{{ props.community.name }} <span v-if="props.club.abbrev">({{ props.club.abbrev }})</span></h2>
        </div>
    </router-link>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    club: {
        type: Object,
        required: true
    }
});

const logoExist = () => {
    return props.club.logo && props.club.logo !== '';
}
</script>

<style scoped>
.commucard {
    width: 220px;
    height: 280px;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    box-shadow: 0px 5px 40px rgb(192, 192, 192);
    justify-content: center;
}
img {
    width: 220px;
    height: 220px;
}
h2 {
    font-size: 20px;
}
</style>