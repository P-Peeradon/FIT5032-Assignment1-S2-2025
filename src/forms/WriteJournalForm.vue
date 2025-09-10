<template>
    <form @submit.prevent="writeJournal()">
        <h2>What's on your mind</h2>
        <span class="category">Your Feeling</span>
        <div class="feelings g-4" @blur="validateMood(true)" @input="validateMood(false)">

            <div>
                <input type="checkbox" value="Anger" v-model="journalForm.moods" />
                <label class="form-check-label" for="Anger">Anger</label>
            </div>
            
            <div>
                <input type="checkbox" value="Anticipation" v-model="journalForm.moods" />
            <label class="form-check-label" for="Anticipation">Anticipation</label>
            </div>
            
            <div>
                <input type="checkbox" value="Joy" v-model="journalForm.moods" />
            <label class="form-check-label" for="Joy">Joy</label>
            </div>
            
            <div>
                <input type="checkbox" value="Trust" v-model="journalForm.moods" />
                <label class="form-check-label" for="Trust">Trust</label>
            </div>
           
            <div>
                <input type="checkbox" value="Fear" v-model="journalForm.moods" />
                <label class="form-check-label" for="Fear">Fear</label>
            </div>
            
            <div>
                <input type="checkbox" value="Surprise" v-model="journalForm.moods" />
            <label class="form-check-label" for="Surprise">Surprise</label>
            </div>

            <div>
                <input type="checkbox" value="Sad" v-model="journalForm.moods" />
            <label class="form-check-label" for="Sad">Sad</label>
            </div>
            
            <div>
                <input type="checkbox" value="Disgust" v-model="journalForm.moods" />
                <label class="form-check-label" for="Disgust">Disgust</label>
            </div>
        </div>

        <label for="content" class="form-label"><span class="category">Your story</span></label>
        <textarea class="form-control" id="content" row="10" v-model="journalForm.content" ></textarea>
    </form>
    <div class="journal-form">
        <button class="blue_button">Write Journal</button>
        <button class="gray_button" @click="clearForm()">Clear</button>
    </div>
</template>

<script setup>
import { reactive } from 'vue';
import { defineEmits } from 'vue';

const journalForm = reactive({
    moods: [],
    content: '',
    timestamp: new Date()
});

const clearForm = () => {
    journalForm.moods = [];
    journalForm.content = '';
    journalForm.timestamp = new Date();
}

const writeJournal = () => {
    validateMood(true);
    validateContent(true);

    clearForm()
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
@media screen and (max-width: 768px) {
    .feelings {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
    }
}


textarea {
    height: 150px;
}

.journal-form {
    width: auto;
    margin: 10px 0;
    padding: 0 20px 0 0;
    display: flex;
    flex-direction: row;
    justify-content: end;
    gap: 0 20px;
}

.feeling label {
    padding-left: 4px;
}

input {
    margin-left: 10px;
}

@media screen and (min-width: 768px) {
    .feelings {
        display: grid;
        grid-template-columns: repeat(2, 1fr); 
        grid-template-rows: repeat(4, 1fr);
        padding: 5px; 
    }
}

@media screen and (min-width: 1200px) {
    .feelings {
        display: grid;
        grid-template-columns: repeat(4, 1fr); 
        grid-template-rows: repeat(2, 1fr); 
        padding: 10px;
    }
}
</style>