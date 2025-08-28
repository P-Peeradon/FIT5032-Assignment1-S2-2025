<template>
    <div class="container d-flex flex-column">
        <h1>Community</h1>
        <div class="d-flex flex-column flex-md-row gy-2">
            <main class="col-md-9 col-xl-8">
                <h2>Select your preferred clubs.</h2>
                <div class="club-catalog">
                    <div v-for="club in clubs" :key="club.name" :value="club">
                        <CommunityCard :club="club" />
                    </div>
                </div>
            </main>
            <aside class="col-md-3 col-xl-4">
                <h2>Why youth need joining clubs?</h2>
                <blockquote class="mt-2 mb-2">
                    "Club is not only place for gathering. It is our sense of belonging, ambition and emotion."
                </blockquote>
                <p class="mt-3">
                    Youth need clubs to gain a sense of belonging and purpose, 
                    develop crucial social and emotional skills through positive 
                    peer and adult relationships, and have a safe, supportive space for fun, 
                    learning, and self-discovery away from pressures at home and school. 
                    Clubs offer diverse experiences, foster self-confidence and resilience, 
                    and can provide a vital support system, particularly for vulnerable young people.
                    (Eriksen & Seland, 2020)
                </p>
                <cite>Eriksen, I. M., & Seland, I. (2020). Conceptualizing Well-being in Youth: the Potential of Youth Clubs. YOUNG, 29(2), 110330882093757. [https://doi.org/10.1177/1103308820937571]</cite>
            </aside>
        </div>
    </div>
</template>

<script setup>
import CommunityCard from '../components/ClubCard.vue';

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
</script>

<style scoped>
@media screen and (max-width: 768px) {
    .club-catalog  {
        display: flex;
        flex-direction: column;
    }
}

@media screen and (min-width: 768px) {
    .club-catalog  {
    display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(3, 1fr);
        gap: 10px;
    }
}

@media screen and (min-width: 993px) {
    .club-catalog  {
    display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(3, 1fr);
        gap: 20px;
    }
}

</style>