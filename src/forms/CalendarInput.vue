<script setup>
import { ref, computed, watch } from 'vue';

const today = ref(new Date());

const emit = defineEmits(['input-date']);

const currentMonth = ref(new Date().getMonth());
const currentYear = ref(new Date().getFullYear());

// You'll also need a way to track the start and end of the range
const startDate = ref(null);
const endDate = ref(null);

const daysInMonth = computed(() => {

    return new Date(currentYear.value, currentMonth.value + 1, 0).getDate();

});

const firstDayOfMonth = computed(() => {

    // getDay() get day of week "Monday","Tuesday" ...
    return new Date(currentYear.value, currentMonth.value, 1).getDay();

});

const calendarDays = computed(() => {

    const days = [];

    // Add placeholder days for the previous month
    for (let i = 0; i < firstDayOfMonth.value; i++) {

        days.push({ day: '', isPlaceholder: true });

    }

    // Add days of the current month
    for (let i = 1; i <= daysInMonth.value; i++) {

        days.push({ day: i, isPlaceholder: false });

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
  // Assuming 'day' is a Date() object
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
    // Now you have a complete range
  }
};

const isInRange = (day) => {
  if (!startDate.value || !endDate.value) return false;
  // Check if the current day is between the start and end dates
  return day >= startDate.value && day <= endDate.value;
};

const isSameDay = (d1, d2) => {
  if (!d1 || !d2) return false;
  return d1.getFullYear() === d2.getFullYear() &&
         d1.getMonth() === d2.getMonth() &&
         d1.getDate() === d2.getDate();
};

watch(startDate, endDate, () => {
    emit('input-date', startDate.value, endDate.value);
})

</script>

<template>
    <form>
        <nav class="calendar">
            <button class="blue_button" @click="prevMonth()">Prev</button>
            <h2>{{ currentMonth + 1 }}/{{ currentYear }}</h2>
            <button class="blue_button" @click="nextMonth()">Next</button>
        </nav>
        <div class="calendar-grid">
        <div v-for="day in calendarDays" :key="day.id" 
            :class="{
                'day': true, 
                'placeholder': day.isPlaceholder,
                'in-range': isInRange(day), 
                'start-date': isSameDay(day, startDate), 
                'end-date': isSameDay(day, endDate)
            }"
            @click="handleDayClick(day)">
            {{ day.day }}
        </div>
  </div>
    </form>
</template>

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
}
.day {
  text-align: center;
  padding: 10px;
  border: 1px solid #ddd;
  cursor: pointer;
}
.placeholder {
  visibility: hidden;
}
.isInRange {
    background-color: palegreen;
}

</style>