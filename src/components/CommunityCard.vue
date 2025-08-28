<template>
    <router-link :to="{ name: 'Club', params: {name: props.community.name}}" class="nav-link" active-class="active" aria-current="page">
        <div class="commuCard">
            <img v-if="logoExist()" :src="props.community.logo" :alt="props.community.name" />
            <img v-else src="props.community.logo" :alt="props.community.name"/>
            <h2>{{ props.community.name.toUppercase() }}</h2>
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
    return props.community.logo != null && props.community.logo !== '' 
}
</script>

<style scoped>
.commucard {
    width: 250px;
    height: 320px;
    box-sizing: border-box;
    box-shadow: 0px 5px 40px rgb(192, 192, 192);
}
img {
    width: 250px;
    height: 250px;
}
</style>