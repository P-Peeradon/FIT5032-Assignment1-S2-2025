<template>
    <nav class="chillax-nav">
        <ul class="d-flex flex-col col-12 col-md-3">
            <li>
                <router-link to="/journal/myjournal" class="nav-link" active-class="active" aria-current="page">My Journal</router-link>
            </li>
        </ul>
    </nav>
</template>

<script setup>

</script>

<style scoped>
    .chillax-nav {
        width: 25vw;
        height: auto;
        background-color: blue;
        display: flex;
        position: absolute;
        z-index: 2;
        left: 25vw;
        top: 0;
    }
    li {
        color: white;
        font-size: 24px;
        font-weight: bold;
        list-style: none;
    }
</style>