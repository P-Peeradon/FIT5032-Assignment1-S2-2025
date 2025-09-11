<template>
    <!-- This form host an event for club -->
    <!-- You should be a social worker to host an event. -->
    <form @submit.prevent="hostEvent()">
        <div>
            <label for="title">Event Title</label>
            <input 
                id="title" 
                type="text" 
                @blur="() => validateEventTitle(true)" 
                @input="() => validateEventTitle(false)"
                v-model="eventFormData.title" 
            />
            <p class="text-danger">{{ errors.title }}</p>
        </div>
        
        <div>
            <label for="description">Description</label>
            <input 
                id="description" 
                type="text" 
                @blur="() => validateDescription(true)" 
                @input="() => validateDescription(false)"
                v-model="eventFormData.description" 
            />
            <p class="text-danger">{{ errors.description }}</p>
        </div>

        <div>
            <label for="host">Name of event host.</label>
            <input 
                id="host" 
                type="text" 
                @blur="() => validateHost(true)" 
                @input="() => validateHost(false)"
                v-model="eventFormData.host" 
            />
            <p class="text-danger">{{ errors.host }}</p>
            <div class="d-flex flex-row">
                <span class="category">Telephone</span>
                <select 
                    v-model="countryCode" 
                    @blur="() => validateTelNumber(true)" 
                    @input="() => validateTelNumber(false)"
                >
                    <option value="+61">Australia</option>
                    <option value="+64">New Zealand</option>
                    <option value="+65">Singapore</option>
                </select> 
                <input 
                    type="text" 
                    @blur="() => validateTelNumber(true)" 
                    @input="() => validateTelNumber(false)"
                    placeholder="Your number without 0" 
                />
            </div>
            
        </div>

        <div>
            <label for="location">Location for the event</label>
            <input 
                id="location" 
                type="text" 
                @blur="() => validateLocation(true)" 
                @input="() => validateLocation(false)"
                v-model="eventFormData.location" 
            />
            <p class="text-danger">{{ errors.location }}</p>
            <label for="address">Address</label>
            <input 
                id="address" 
                type="text" 
                @blur="() => validateAddress(true)" 
                @input="() => validateAddress(false)"
                v-model="eventFormData.address" 
            />
            <p class="text-danger">{{ errors.address }}</p>
        </div>

        <div>
            <label for="datetime">Date and Time</label>
            <input 
                id="datetime" 
                type="date" 
                @blur="() => validateEventTitle(true)" 
                @input="() => validateEventTitle(false)" 
                v-model="eventFormData.date" 
            />
            <input 
                id="datetime" 
                type="time" 
                @blur="() => validateEventTitle(true)" 
                @input="() => validateEventTitle(false)" 
                v-model="eventFormData.time" 
            />
            <p class="text-danger">{{ errors.datetime }}</p>
        </div>
        
        <button type="submit" class="blue_button">Host Event</button>
    </form>
</template>

<script setup>
import { computed, reactive, ref, defineEmits } from 'vue';

const emit = defineEmits(['host-event']);

const countryCode = ref('');

const eventFormData = reactive({
    title: '',
    description: '',
    host: '',
    telephone: '',
    location: '',
    address: '',
    date: null,
    time: null
});

const errors = reactive({
    title: null,
    description: null,
    host: null,
    telephone: null,
    location: null,
    address: null,
    datetime: null
});

const clearForm = () => {
    eventFormData.title = '';
    eventFormData.description = '';
    eventFormData.host = '';
    eventFormData.telephone = '';
    eventFormData.location = '';
    eventFormData.address = '';
    eventFormData.date = null;
    eventFormData.time = null;

}

const concatTelNumber = () => {
    return countryCode.value + ' ' + eventFormData.telephone;
}

const hostEvent = () => {
    validateEventTitle(true);
    validateDescription(true);
    validateHost(true);
    validateTelNumber(true);
    validateLocation(true);
    validateAddress(true);
    validateDateTime(true);
    if (!(errors.title &&
        errors.description &&
        errors.host &&
        errors.telephone &&
        errors.location &&
        errors.address &&
        errors.datetime
    )) {
        eventFormData.telephone = concatTelNumber();

        emit('host-event', eventFormData);

        clearForm();
    }
}


const validateEventTitle = (blur) => {

    if (eventFormData.title.length < 4)
        if (blur) errors.title = 'Event name is invalid. It should contains more than 4 characters';
    else 
        errors.title = null;

}

const validateDescription = (blur) => {
    
    if (eventFormData.description.length < 20)
        if (blur) errors.description = 'Event description is too short. It should contains more than 20 characters';
    else if (eventFormData.description.length > 80) 
        if (blur) errors.description = 'Event description is too long.';
    else 
        errors.description = null;

}

const validateHost = (blur) => {

    const isAlpha = str => /^[a-zA-Z]*$/.test(str);

    if (!isAlpha(eventFormData.host)) {
        if (blur) errors.host = 'The name of host should contain only alphabet';
    } else if (eventFormData.host.length > 15 || eventFormData.host.length === '') {
        if (blur) errors.host = 'The name of host should be less than 15 characters long and must not be empty.';
    } else {
        errors.host = null;
    }

}

const validateLocation = (blur) => {

    if (eventFormData.location === '') 
        if (blur) errors.location = 'The location should not be empty';
    else 
        errors.location = null;

}

const validateAddress = (blur) => {

    if (eventFormData.address === '') 
        if (blur) errors.address = 'The address should not be empty';
    else 
        errors.address = null;

}

const validateTelNumber = (blur) => {
    if (countryCode.value === '') {
        if (blur) errors.telephone = 'You should specify your country code.';
    } else if (eventFormData.telephone.length != 9) {
        if (blur) errors.telephone = 'Standard telephone number should contain 9 digits, exclude the leading zero.'
    } else {
        errors.telephone = null;
    }
}

const validateDateTime = (blur) => {
    if (!eventFormData.date || !eventFormData.time) {
        if (blur) errors.datetime = 'Please specify date and time.';
    } else {
        errors.datetime = null;
    }
}

</script>

<style scoped>

</style>