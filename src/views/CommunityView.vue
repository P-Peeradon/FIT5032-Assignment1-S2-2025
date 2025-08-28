<template>
    <div class="container d-flex flex-column">
        <h1>Community</h1>
        <div class="d-flex flex-column flex-lg-row">
            <main class="col-md-9 col-lg-8">
                <h2>Select your preferred community.</h2>
            </main>
            <aside class="col-md-3 col-lg-4"></aside>
        </div>
    </div>
</template>

<script setup>

const communities = [
    {
        name: 'society A', 
        abbrev: '', 
        owner: 'Kaiba Noah', 
        location: 'Melbourne', 
        licensedIn: 'Australia', 
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla a ornare dolor, vitae interdum eros. Morbi id dolor ut elit lacinia ultrices sed id neque. Nulla gravida nulla nec velit lobortis, ac aliquet quam gravida. Morbi molestie gravida eros non tempor. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Etiam suscipit volutpat pellentesque. Mauris non purus a nulla fermentum convallis. Nunc sed laoreet magna. Etiam commodo leo vitae feugiat cursus. Quisque elit sapien, convallis in justo at, suscipit iaculis augue. Nulla facilisi. Cras aliquam hendrerit mattis. Vivamus vitae pretium turpis, sit amet elementum purus. Morbi lorem ante, viverra at finibus a, ornare nec sem. Suspendisse libero nunc, facilisis quis interdum et, iaculis quis metus.'},
    {
        name: 'society B', 
        abbrev: 'BH', 
        owner: 'Hakuba Saguru', 
        location: 'Sydney', 
        licensedIn: 'Australia', 
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla a ornare dolor, vitae interdum eros. Morbi id dolor ut elit lacinia ultrices sed id neque. Nulla gravida nulla nec velit lobortis, ac aliquet quam gravida. Morbi molestie gravida eros non tempor. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Etiam suscipit volutpat pellentesque. Mauris non purus a nulla fermentum convallis. Nunc sed laoreet magna. Etiam commodo leo vitae feugiat cursus. Quisque elit sapien, convallis in justo at, suscipit iaculis augue. Nulla facilisi. Cras aliquam hendrerit mattis. Vivamus vitae pretium turpis, sit amet elementum purus. Morbi lorem ante, viverra at finibus a, ornare nec sem. Suspendisse libero nunc, facilisis quis interdum et, iaculis quis metus.'
    },
    {
        name: 'society C', 
        abbrev: 'CHD', 
        owner: 'Hakuba Saguru', 
        location: 'Melbourne', 
        licensedIn: 'Australia', 
        description: ''
    },
    {
        name: 'society D', 
        abbrev: '', 
        owner: 'Akaba Reiji', 
        location: 'Auckland', 
        licensedIn: 'New Zealand', 
        description: ''
    },
    {
        name: 'society E', 
        abbrev: '', 
        owner: 'Sambejima Hokutou', 
        location: 'Adelaide', 
        licensedIn: 'Australia', 
        description: ''
    },
    {
        name: 'society F', 
        abbrev: 'FIT', 
        owner: 'Kudo Yusaku', 
        location: 'Singapore', 
        licensedIn: 'Singapore', 
        description: ''
    } 
];
</script>

<style>

</style>