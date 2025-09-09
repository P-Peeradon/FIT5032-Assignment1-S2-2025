<script setup>
import { ref, computed } from 'vue';

const currentMonth = ref(new Date().getMonth());
const currentYear = ref(new Date().getFullYear());
const selectedDate = ref(null);

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
  if (!day.isPlaceholder) {
    selectedDate.value = day;
  }
};

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
            :class="{'day': true, 'placeholder': day.isPlaceholder}"
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

</style>