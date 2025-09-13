<script setup>
import { reactive, ref } from 'vue';

const emit = defineEmits(['edit-profile', 'close'])

// No need to validate if some value null.
// But please specify one value.
const newProfileData = ref({
    username: "",
    nickname: "",
    pronoun: "",
    career: "",
    bio: ""
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
        bio: ""
    };
};

const close = () => {
    emit('close');
};

const requestEdit = () => {
    validateName(true);
    validatePronoun(true);

    if (!(errors.username || errors.pronoun)) {
        emit('edit-profile', newProfileData.value);
        clearForm();
        emit('close');
    }
}

const validateName = (blur) => {
    const usernameMinLength = 5;

    if (newProfileData.value.username.length < usernameMinLength && newProfileData.value.username !== "") {
        if (blur) errors.username = 'Name must be at least 5 characters.';
    } else {
        errors.username = null;
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
        <div class="row mt-3">
            <h2>Edit Profile</h2>
        </div>
        <div class="d-flex close">
            <button @click="close()" class="red_button">X</button>
        </div>
        <div class="row">
            <div class="col-6">
                <label class="form-label"  for="username">Username</label>
                <input
                    class="form-control"
                    id="username"
                    type="text"
                    @blur="() => validateName(true)"
                    @input="() => validateName(false)"
                    v-model="newProfileData.username"
                />
            </div>

            <div class="col-6">
                <label class="form-label" for="nickname">Nickname</label>
                    <input
                    class="form-control"
                    id="nickname"
                    type="text"
                    v-model="newProfileData.nickname"
                    />
            </div>
        </div>

        <div class="row">
            <div class="col-6">
                <label for="pronoun">Pronoun</label>
                <select
                    id="pronoun"
                    @blur="() => validatePronoun(true)"
                    @input="() => validatePronoun(false)"
                    class="form-select"
                    v-model="newProfileData.pronoun"
                >
                    <option selected>Your Pronoun...</option>
                    <option value="He/Him">He/Him</option>
                    <option value="She/Her">She/Her</option>
                    <option value="He/Them">He/Them</option>
                    <option value="She/Them">She/Them</option>
                    <option value="They/Them">They/Them</option>
                </select>
            </div>
            <div class="col-6">
                <label class="form-label" for="career">Career</label>
                <input
                    class="form-control"
                    id="career"
                    type="text"
                    v-model="newProfileData.career"
                />
            </div>
        </div>

        <div class="row">
            <div class="col-12">
                <label class="form-label" for="bio">Bio</label>
                <input
                    class="form-control"
                    id="bio"
                    type="text"
                    v-model="newProfileData.bio"
                />
            </div>
        </div>

        <div class="d-flex flex-row reg_menu mt-2 mb-3">
            <button type="submit" class="blue_button">Edit Profile</button>
            <button class="gray_button" @click="clearForm">Clear</button>
        </div>
    </form>
</template>

<style scoped>
form.container {
    width: 55%;
    height: auto;
    position: absolute;
    z-index: 2;
    top: 30vh;
    left: 25vw;
    background-color: bisque;
}
.red_button {
    width: 40px;
}
.close {
    justify-content: end;
}
.reg_menu {
    justify-content: center;
    gap: 15px;
}
</style>
