<script setup>
import { reactive, defineEmits, ref } from 'vue';

const emit = defineEmits(['edit-profile', 'close'])

// No need to validate if some value null.
// But please specify one value.
const newProfileData = ref({
    username: "",
    nickname: "",
    pronoun: "",
    career: "",
});

const errors = reactive({
    username: null,
    pronoun: null,
});

const clearForm = () => {
    newProfileData.value = {
        username: "",
        nickname: "",
        pronoun: "",
        career: "",
    };
};

const close = () => {
    emit('close');
};

const requestEdit = () => {
    validateName(true);
    validatePronoun(true);

    if (!(errors.username || errors.pronoun)) {
        emit('edit-profile', newProfileData.value)
        clearForm();
    }
}   

const validateName = (blur) => {
    const usernameMinLength = 5;

    if (newProfileData.value.username.length < usernameMinLength && newProfileData.value.username !== "") {
        if (blur) errors.username = 'Name must be at least 5 characters.';
    } else {
        newProfileData.value.username = null;
    }
}

const validatePronoun = (blur) => {
    if (!newProfileData.value.pronoun) {
        if (blur) errors.pronoun = 'Please specify your pronoun.';
    } else {
        errors.pronoun = null;
    }
}

</script>

<template>
    <form class="container" @submit.prevent="requestEdit">
        <div class="row">
            <h2>Edit Profile</h2>
        </div>
        <div class="row close">
            <button @click="close()" class="btn-danger">X</button>
        </div>
        <div>
            <label class="form-label"  for="username">Username</label>
            <input 
                class="form-control" 
                id="username" 
                type="text" 
                @blur="() => validateName(true)"
                @input="() => validateName(false)"
                v-model="newProfileData.value.username" 
            />
        </div>

        <div>
            <label class="form-label" for="nickname">Nickname</label>
            <input 
                class="form-control" 
                id="nickname" 
                type="text" 
                v-model="newProfileData.value.nickname" 
            />
        </div>

        <div>
            <label for="pronoun">Pronoun</label>
            <select
                id="pronoun"
                @blur="() => validatePronoun(true)"
                @input="() => validatePronoun(false)"
                class="form-select"
                v-model="newProfileData.value.pronoun"
            >
                    <option selected>Your Pronoun...</option>
                    <option value="He/Him">He/Him</option>
                    <option value="She/Her">She/Her</option>
                    <option value="He/Them">He/Them</option>
                    <option value="She/Them">She/Them</option>
                    <option value="They/Them">They/Them</option>
            </select>
        </div>

        <div>
            <label class="form-label" for="career">Career</label>
            <input 
                class="form-control" 
                id="career" 
                type="text" 
                v-model="newProfileData.value.career" 
            />
        </div>
        <div>
            <button type="submit">Edit Profile</button>
            <button class="gray_button" @click="clearForm">Clear</button>
        </div>
    </form>
</template>

<style scoped>

</style>