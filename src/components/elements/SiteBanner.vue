<template>
  <div class="container">
    <img :src="bannerPath" alt="Chillax Corner" />
  </div>
</template>

<script>
import { ref } from 'vue';

const bannerPath = ref('../assets/WebBanner_PC.jpg');

const windowSize = window.innerWidth;


const responsiveBanner = () => {
    if (windowSize <= 576) {
        bannerPath.value = '../assets/WebBanner_Mobile.jpg';
    } else if (windowSize <= 992) {
        bannerPath.value = '../assets/WebBanner_Tablet.jpg';
    } else {
        bannerPath.value = '../assets/WebBanner_PC.jpg';
    }
}

window.addEventListener('resize', responsiveBanner());

</script>

<style scoped>

</style>