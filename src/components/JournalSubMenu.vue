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
        width: auto;
        height: auto;
        background-color: blue;
        position: absolute;
        z-index: 2;
        display: none;
    }
    li {
        color: white;
        font-size: 24px;
        font-weight: bold;
        list-style: none;
    }
</style>