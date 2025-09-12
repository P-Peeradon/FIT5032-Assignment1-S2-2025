<script setup>
  import WebHeader from './components/WebHeader.vue';
  import db from './firebase/init';
  import { ref } from 'vue';
  import { getAuth, onAuthStateChanged } from 'firebase/auth';
  import { doc, getDoc } from 'firebase/firestore';

  const auth = getAuth();
  const user = ref(null);
  const currentUser = auth.currentUser;

  const fetchUserData = async () => {
    try {
        const userRef = doc(db, 'users', currentUser.uid);
        const userSnapshot = await getDoc(userRef);
        const myUser =  userSnapshot.data() ;

        user.value = myUser;
    } catch (err) {
        console.log('Error fetching user:', err)
    }
};

  onAuthStateChanged(auth, (user) => {
    if (user) {
      fetchUserData()
    } else {
      user.value = null;
    }
  });

</script>

<template>
  <div class="d-flex flex-column bg">
    <header>
      <WebHeader />
    </header>
    <main class="view">
      <RouterView />
    </main>
  </div>
 
</template>

<style>
header {
  line-height: 2;
}

.bg {
  background-color: aquamarine;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

main.view {
  min-width: 100vw;
  min-height: 100vh;
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

p.author {
  font-size: 14px;
  font-style: oblique;
}

cite {
  color: brown;
  font-weight: 300;
}

blockquote {
        font-size: 20px;
        font-family: cursive;
        font-style: italic;
        margin: 20px 0;
        padding: 0 10px;
        text-align: center;
        color: brown;
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

button.gray_button {
  background-color: #cccccc;
  font-size: 14px;
  padding: 10px;
  box-sizing: border-box;
  color: blue;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  box-shadow: 10px 4px 20px 10px rgba(192, 192, 192, 0.7);
}

button.red_button {
  background-color: red;
  font-size: 14px;
  padding: 10px;
  box-sizing: border-box;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  height: 40px;
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
