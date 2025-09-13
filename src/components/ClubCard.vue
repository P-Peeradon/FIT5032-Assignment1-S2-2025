<template>
    <router-link :to="{ name: 'Club', params: {name: props.club.name}}" class="nav-link commuCard" active-class="active" aria-current="page">
        <div>
            <img src="../assets/community-logo.jpg" :alt="props.club.name"/>
            <h2>{{ props.club.name }} <span v-if="props.club.abbrev">({{ props.club.abbrev }})</span></h2>
        </div>
    </router-link>
</template>

<script setup>
const props = defineProps({
    club: {
        type: Object,
        required: true
    }
});

</script>

<style scoped>
.commuCard {
    width: 220px;
    height: 280px;
    display: flex;
    flex-direction: column;
    box-shadow: 0px 5px 40px rgb(192, 192, 192);
    justify-content: center;
    padding: 0;
}
img {
    padding: 0;
    width: 220px;
    height: 220px;
}
h2 {
    font-size: 18px;
    text-align: center;
}
</style>
