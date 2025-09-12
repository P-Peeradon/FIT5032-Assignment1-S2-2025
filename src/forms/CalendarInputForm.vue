<template>
    <form>
        <nav class="calendar">
            <button class="blue_button" @click.prevent="prevMonth()">Prev</button>
            <h2>{{ currentMonth + 1 }}/{{ currentYear }}</h2>
            <button class="blue_button" @click.prevent="nextMonth()">Next</button>
        </nav>
		<br />
        <div class="calendar-grid">
            <div v-for="day in calendarDays" :key="day.id" 
				:class="{
                    'day': true, 
                    'placeholder': day.isPlaceholder,
                    'in_range': isInRange(day.date), 
					'select': isSelected(day.date)
                }"
                @click.prevent="handleDayClick(day.date)"
            >
				{{ day.day }}
            </div>
        </div>
    </form>
</template>

<script setup>
import { ref, computed, watch } from 'vue';

const today = ref(new Date());

const emit = defineEmits(['input-date']);

const currentMonth = ref(today.value.getUTCMonth());
const currentYear = ref(today.value.getUTCFullYear());

// You'll also need a way to track the start and end of the range
const startDate = ref(null);
const endDate = ref(null);

const daysInMonth = computed(() => {
    return new Date(currentYear.value, currentMonth.value + 1, 0).getDate();
})

const firstDayOfMonth = computed(() => {
    // getDay() get day of week "Monday","Tuesday" ...
    return new Date(currentYear.value, currentMonth.value, 1).getDay();
});

const calendarDays = computed(() => {
    const days = [];
    // Add placeholder days for the previous month
    for (let i = 0; i < firstDayOfMonth.value; i++) {

        days.push({ date: new Date(), day: 0, isPlaceholder: true });

    }

    // Add days of the current month
    for (let i = 1; i <= daysInMonth.value; i++) {

        days.push({ date: new Date(currentYear.value, currentMonth.value, i), day: i, isPlaceholder: false });

    }

    return days;
});

const nextMonth = () => {
  	if (currentMonth.value === 11) {
    	currentMonth.value = 0;
    	currentYear.value++;
  	} else {
    	currentMonth.value++;
  	}
};

const prevMonth = () => {
    if (currentMonth.value === 0) {
        currentMonth.value = 11;
        currentYear.value--;
    } else {
        currentMonth.value--;
    }
}

const handleDayClick = (day) => {
	

  	if (!(day instanceof Date)) {
		console.error("Value should be date")
		return;
  	}

  	if (!startDate.value || endDate.value) {
    	// If no start date or a range is already selected, start a new range
    	startDate.value = day;
    	endDate.value = null;
  	} else {
    	// A start date is set, so this click must be the end date
    	endDate.value = day;
    
    // Optional: Ensure the dates are in the correct order
	if (startDate.value > endDate.value) {
  		[startDate.value, endDate.value] = [endDate.value, startDate.value];
	}    
  }
};

const isInRange = (day) => {
  	if (!startDate.value || !endDate.value) return false;
  	// Check if the current day is between the start and end dates.
	return day.valueOf() >= startDate.value.valueOf() && day.valueOf() <= endDate.value.valueOf()
};

const isSelected = (day) => {
	return startDate.value === day || endDate.value === day;
}

watch(startDate, endDate, () => {
    emit('input-date', startDate.value, endDate.value);
});

</script>

<style scoped>
nav.calendar {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
}
.calendar-grid {
  	display: grid;
  	grid-template-columns: repeat(7, 1fr);
  	gap: 5px;
  	background-color: whitesmoke;
}
.day {
  	text-align: center;
  	padding: 10px;
  	border: 2px solid #0000ff;
  	cursor: pointer;
}
.placeholder {
  	visibility: hidden;
}
.in_range {
    background-color: pink;
}
.select {
    background-color: pink;
}
</style>