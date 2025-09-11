<script setup>
import { reactive, defineEmits } from 'vue';
import { useRouter } from 'vue-router';

const emit = defineEmits(['register'])

const router = useRouter();

const registerFormData = reactive({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    pronoun: '',
    role: ''
});

const errors = reactive({
    username: null,
    email: null,
    password: null,
    confirmPassword: null,
    pronoun: null,
    role: null
});

const clearForm = () => {
    registerFormData.value = {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        pronoun: '',
        role: ''
    }
}

const registerNewUser = () => {
    validateName(true);
    validateEmail(true);
    validatePassword(true);
    validateConfirmPassword(true);
    validatePronoun(true);
    validateRole(true);
    if (!(errors.username && 
        errors.email && 
        errors.password &&
        errors.confirmPassword &&
        errors.pronoun &&
        errors.role
    )) {
        // New user is registered.
        emit('register', registerFormData);
        clearForm();
    }
};

const validatePronoun = (blur) => {
    if (!registerFormData.pronoun) {
        if (blur) errors.pronoun = 'Please specify your pronoun.';
    } else {
        errors.pronoun = null;
    }
};

const validateName = (blur) => {
    const usernameMinLength = 5;

    if (registerFormData.username.length < usernameMinLength) {
        if (blur) errors.username = 'Name must be at least 5 characters.';
    } else {
        errors.username = null;
    }
}

const validateEmail = (blur) => {
    const email = registerFormData.email;
    const isEmail =  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!isEmail) {
        if (blur) errors.email = 'Your email format is incorrect';
    } else {
        errors.email = null;
    }
}

const validateConfirmPassword = (blur) => {
    if (registerFormData.password !== registerFormData.confirmPassword) {
        if (blur) errors.confirmPassword = 'Passwords do not match.'
    } else {
        errors.confirmPassword = null
    }
}

const validatePassword = (blur) => {

    const password = registerFormData.password
    const minLength = 12
    const hasUppercase = /[A-Z]/.test(password)
    const hasLowercase = /[a-z]/.test(password)
    const hasNumber = /\d/.test(password)
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>"]/.test(password)

    if (password.length < minLength) {
        if (blur) errors.password = `Password must be at least ${minLength} characters.`
    } else if (!hasUppercase) {
        if (blur) errors.password = 'Password must contain at least one uppercase letter.'
    } else if (!hasLowercase) {
        if (blur) errors.password = 'Password must contain at least one lowercase letter.'
    } else if (!hasNumber) {
        if (blur) errors.password = 'Password must contain at least one number.'
    } else if (!hasSpecialChar) {
        if (blur) errors.password = 'Password must contain at least one special character.'
    } else {
        errors.password = null;
    }

};

const validateRole = (blur) => {
    if (!registerFormData.role) {
        if (blur) errors.role = 'Please specify your role.';
    } else {
        errors.role = null;
    }
};

const toLogin = () => {
    router.push('/login')
}
</script>

<template>
    <div class="row mt-3">
        <h1>Register to Chillax Corner</h1>
    </div>
    <form class="container mt-5" @submit.prevent="registerNewUser">
        <div class="row">
            <div class="col-6">
                <label for="username" class="form-label">Username</label>
                <input 
                    id="username" 
                    @blur="() => validateName(true)"
                    @input="() => validateName(false)" 
                    type="text" 
                    class="form-control" 
                    v-model="registerFormData.username"
                    required 
                />
                <p class="text-danger">{{ errors.username }}</p>
            </div>
            <div class="col-6">
                <label for="email" class="form-label">Email</label>
                <input 
                    id="email"
                    @blur="() => validateEmail(true)"
                    @input="() => validateEmail(false)" 
                    type="email" 
                    class="form-control" 
                    v-model="registerFormData.email" 
                    required 
                />
                <p class="text-danger">{{ errors.email }}</p>
            </div>
        </div>
        
        <div class="row">
            <div class="col-6">
                <label for="password" class="form-label">Password</label>
                <input 
                    id="password"
                    @blur="() => validatePassword(true)"
                    @input="() => validatePassword(false)"
                    type="password" 
                    class="form-control" 
                    v-model="registerFormData.password"  
                    required 
                />
                <p class="text-danger">{{ errors.password }}</p>
            </div>
            <div class="col-6">
                <label for="confirmPassword" class="form-label">Confirm Password</label>
                <input 
                    id="confirmPassword"
                    @blur="() => validateConfirmPassword(true)"
                    @input="() => validateConfirmPassword(false)"
                    type="password" 
                    class="form-control" 
                    v-model="registerFormData.confirmPassword" 
                    required 
                />
                <p class="text-danger">{{ errors.confirmPassword }}</p>
            </div>
        </div>
        
        <div class="row">
            <div class="col-6">
                <label for="pronoun" class="form-label">Pronoun</label><br />
                <select
                    id="pronoun"
                    @blur="() => validatePronoun(true)"
                    @input="() => validatePronoun(false)"
                    class="form-select"
                    v-model="registerFormData.pronoun"
                >
                    <option selected>Your Pronoun...</option>
                    <option value="He/Him">He/Him</option>
                    <option value="She/Her">She/Her</option>
                    <option value="He/Them">He/Them</option>
                    <option value="She/Them">She/Them</option>
                    <option value="They/Them">They/Them</option>
                </select>
                <p class="text-danger">{{ errors.pronoun }}</p>
            </div>
            <div class="col-6">
                <label for="role" class="form-label">Role</label><br />
                <select
                    id="role"
                    @blur="() => validateRole(true)"
                    @input="() => validateRole(false)"
                    class="form-select"
                    v-model="registerFormData.role"
                >
                    <option value="user">User</option>
                    <option value="practitioner">Practitioner</option>
                    <option value="social worker">Social Worker</option>
                </select>
                <p class="text-danger">{{ errors.role }}</p>
            </div>
        </div>        
    
        <div class="mt-3 d-flex flex-row reg_menu">
            <button type="submit" class="blue_button">Register</button>
            <button class="gray_button" @click="toLogin">To Login</button>
        </div>
    </form>
</template>

<style scoped>
form {
    width: 92%;
    height: auto;
    background: palegreen;
    padding: 20px;
}
.reg_menu {
    justify-content: center;
    gap: 15px;
}


</style>