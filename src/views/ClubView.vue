<template>
    <div class="container">
        <h1>Club and Society</h1>
        <div class="d-flex flex-row">
            <main>
                <ClubDisplay :club="currentClub"/>
            </main>
            <aside></aside>
        </div>
    </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { ref, computed } from 'vue';
import ClubDisplay from '../components/ClubDisplay.vue';

const route = useRoute();
const name = ref(route.params.name);

const clubs = [
    {
        name: 'society A', 
        abbrev: '', 
        owner: 'Kaiba Noah', 
        location: 'Melbourne', 
        licensedIn: 'Australia', 
        motto: 'Motto A',
        aims: [],
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla a ornare dolor, vitae interdum eros. Morbi id dolor ut elit lacinia ultrices sed id neque. Nulla gravida nulla nec velit lobortis, ac aliquet quam gravida. Morbi molestie gravida eros non tempor. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Etiam suscipit volutpat pellentesque. Mauris non purus a nulla fermentum convallis. Nunc sed laoreet magna. Etiam commodo leo vitae feugiat cursus. Quisque elit sapien, convallis in justo at, suscipit iaculis augue. Nulla facilisi. Cras aliquam hendrerit mattis. Vivamus vitae pretium turpis, sit amet elementum purus. Morbi lorem ante, viverra at finibus a, ornare nec sem. Suspendisse libero nunc, facilisis quis interdum et, iaculis quis metus.'
    },
    {
        name: 'society B', 
        abbrev: 'BH', 
        owner: 'Hakuba Saguru', 
        location: 'Sydney', 
        licensedIn: 'Australia', 
        motto: 'Motto B',
        aims: [],
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla a ornare dolor, vitae interdum eros. Morbi id dolor ut elit lacinia ultrices sed id neque. Nulla gravida nulla nec velit lobortis, ac aliquet quam gravida. Morbi molestie gravida eros non tempor. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Etiam suscipit volutpat pellentesque. Mauris non purus a nulla fermentum convallis. Nunc sed laoreet magna. Etiam commodo leo vitae feugiat cursus. Quisque elit sapien, convallis in justo at, suscipit iaculis augue. Nulla facilisi. Cras aliquam hendrerit mattis. Vivamus vitae pretium turpis, sit amet elementum purus. Morbi lorem ante, viverra at finibus a, ornare nec sem. Suspendisse libero nunc, facilisis quis interdum et, iaculis quis metus.'
    },
    {
        name: 'society C', 
        abbrev: 'CHD', 
        owner: 'Hakuba Saguru', 
        location: 'Melbourne', 
        licensedIn: 'Australia', 
        motto: 'Motto C',
        aims: [],
        description: ''
    },
    {
        name: 'society D', 
        abbrev: '', 
        logo: new URL('../assets/logo-for-auckland-vector-31288838.webp', import.meta.url).href,
        owner: 'Akaba Reiji', 
        location: 'Auckland', 
        licensedIn: 'New Zealand', 
        motto: 'Motto D',
        aims: [],
        description: ''
    },
    {
        name: 'society E', 
        abbrev: '', 
        owner: 'Sambejima Hokutou', 
        location: 'Adelaide', 
        licensedIn: 'Australia',
        motto: 'Motto E', 
        aims: [],
        description: ''
    },
    {
        name: 'society F', 
        abbrev: 'FIT', 
        owner: 'Kudo Yusaku', 
        location: 'Singapore', 
        licensedIn: 'Singapore', 
        motto: 'Motto F',
        aims: [],
        description: ''
    } 
];

// Logic to fetch article by title.
// No articles with the same title.

const currentClub = computed(() =>
    clubs.find((club) => club.name === name.value)
);

</script>

<style scoped>

</style>