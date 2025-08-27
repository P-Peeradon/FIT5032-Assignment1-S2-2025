<script setup>
  import WebHeader from './components/WebHeader.vue';
</script>

<template>
  <header>
    <WebHeader />
  </header>
    <main class="view">
      <RouterView />
    </main>
</template>

<style>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

main.view {
  background-color: aquamarine;
}

h1 {
  color: blue;
  text-align: center;
  font-weight: bold;
  font-size: 36px;
}

h2 {
  color: black;
  text-align: center;
  font-weight: bold;
  font-size: 26px;
}

q {
  font-style: oblique;
  font-size: 12px;

}

p {
  font-size: 16px;
}

cite {
  color: brown;
  font-weight: 300;
}

span.category {
  font-weight: bold;
  color: rgb(16, 52, 166);
}

button.blue_button {
  background-color: blue;
  font-size: 14px;
  padding: 10px;
  box-sizing: border-box;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  box-shadow: 10px 4px 20px 10px rgba(192, 192, 192, 0.7);
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
