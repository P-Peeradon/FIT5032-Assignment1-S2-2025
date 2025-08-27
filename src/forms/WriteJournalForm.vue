<template>
    <form @submit.prevent="">
        <h2>What's on your mind</h2>
        <span class="your">Your Feeling</span>
        <label>
            <input type="checkbox" name="" value=""/>
            <input type="checkbox" name="" value=""/>
            <input type="checkbox" name="" value=""/>
            <input type="checkbox" name="" value=""/>
            <input type="checkbox" name="" value=""/>
            <input type="checkbox" name="" value=""/>
            <input type="checkbox" name="" value=""/>
            <input type="checkbox" name="" value=""/>
        </label>
        <label for="content" class="form-label">Your story</label>
        <textarea class="form-control" id="content" row="3" v-model="journalForm.content"/>
    </form>
</template>

<script setup>
import { ref } from 'vue';

const journalForm = ref({

    content: '',
})

</script>

<style>

</style>