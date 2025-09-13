<script setup>
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

<template>
    <div class="container mt-4">
        <main class="d-flex flex-column">
            <h2>{{ props.club.name }}</h2>
            <q>{{ props.club.motto }}</q>
            <p>
                {{ props.club.description }}
            </p>

            <span class="category">Club Aims:</span>
            <ol>
                <li v-for="aim in club.aims" :key="aim">{{ aim }}</li>
            </ol>
        </main>
    </div>
</template>

<style scoped>
img {
    width: 150px;
    height: 150px;
}
q {
    font-size: 14px;
}
aside {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.unauthorised-info {
    display: flex;
    text-align: center;
    align-items: center;
    margin: 10px;
    font-weight: bold;
}
</style>
