<template>
    <form @submit.prevent="writeJournal()">
        <h2>What's on your mind</h2>
        <span class="category">Your Feeling</span>
        <div class="feelings" @blur="validateMood(true)" @input="validateMood(false)">

            <input type="checkbox" value="" v-model="journalForm.moods" />
            <label class="form-check-label" for=""></label>
               
        </div>

        <label for="content" class="form-label"><span class="category">Your story</span></label>
        <textarea class="form-control" id="content" row="3" v-model="journalForm.content" ></textarea>
    </form>
</template>

<script setup>
import { reactive } from 'vue';

const journalForm = reactive({
    moods: [],
    content: '',
    timestamp: Date()
});

const writeJournal = () => {
    validateMood(true);
    validateContent(true);
}

const errors = {
    moods: null,
    content: null
}

const validateMood = (blur) => {
    if (journalForm.moods.length == 0) {
        if (blur) errors.moods = 'Please specify what do you feel.';
    } else {
        errors.moods = null;
    }      
}

const validateContent = (blur) => {
    if (journalForm.content.length == 0) {
        if (blur) errors.content = 'Please write your journal.';
    } else if (journalForm.content.length > 100) {
        if (blur) errors.content = 'The journal length is too long. (Maximum = 100 characters)';
    } else {
        errors.content = null;
    } 
}

</script>

<style scoped>
.feeling {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
}

@media (min-width: 768px) {
    .feeling {
        display: grid;
        grid-template-columns: repeat(2, 1fr); 
        grid-template-rows: repeat(4, 1fr); 
    }
}

@media (min-width: 1200px) {
    .feeling {
        display: grid;
        grid-template-columns: repeat(2, 1fr); 
        grid-template-rows: repeat(4, 1fr); 
    }
}
</style>