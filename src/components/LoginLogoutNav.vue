<template>
    <nav>
        <div v-if="authorised">
            <p>Welcome, {{ username }}</p>
            <button class="btn-danger">Logout</button>
        </div>
        <div v-else>
            <router-link to="/register" class="nav-link" active-class="active" aria-current="page">
                <button class="grey_button">Register</button>
            </router-link>
            <router-link to="/register" class="nav-link" active-class="active" aria-current="page">
                <button class="blue_button">Login</button>
            </router-link>
        </div>
    </nav>
</template>

<script setup>

</script>

<style scoped>
nav {
    background-color: aquamarine;
    display: flex;
    flex-direction: row;
    justify-content: end;
    padding-right: 20px;
    width: 100vw;
    height: 250px;
}
</style>