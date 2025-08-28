<template>
    <router-link :to="{ name: 'Club', params: {name: props.community.name}}" class="nav-link" active-class="active" aria-current="page">
        <div class="commuCard">
            <img v-if="logoExist()" :src="props.community.logo" :alt="props.community.name" />
            <img v-else src="../assets/community-logo.jpg" :alt="props.community.name"/>
            <h2>{{ props.community.name }}</h2>
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

const logoExist = () => {
    return props.community.logo && props.community.logo !== '';
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
</style>