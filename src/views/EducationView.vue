<script setup>
import { computed, onMounted, ref } from 'vue';
import ArticleCard from '../components/ArticleCard.vue';
import { collection, getDocs, query, doc, getDoc } from 'firebase/firestore';
import db from '../firebase/init';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

// As a mental health specialist, I want to write article, which composes of many sections,
// so that youth can read them to understand one's mental health condition.
const today = ref(new Date());
const fortnightAgo = ref(computed(() => new Date(today.value.getTime() - (14 * 24 * 60 * 60 * 1000)))) // Fortnight means two weeks.
// dateObj.getTime() return time in millisecond from 1 January 1970 00:00:00UTC as numeric
// For this reason, we can use plus or minus to add more time, but it has to be converted into milliseconds before doing so.
// This means, we want the Date of two weeks before today, we must convert dateObj represent today's Date by getTime(), and minus two weeks (converted to millisecond).
// Therefore, 2 weeks must be converted to 14 days * (24 hours/1 day) * (60 minutes/1 hour) * (60 seconds/1 minutes) * (1000 milliseconds/1 seconds)


const articles = ref([]);

// Fetch documents which are edited fortnightly before.
const featuringArticles = computed(() => {
    return articles.value.filter((article) => article.lastEditAt.getTime() >= fortnightAgo.value.getTime())
});

const auth = getAuth();
const uid = ref("");
const user = ref(null);

const fetchUserData = async (uid) => {
    try {
        const userRef = doc(db, 'users', uid);
        const userSnapshot = await getDoc(userRef);
        const myUser =  userSnapshot.data() ;

        user.value = myUser;
    } catch (err) {
        console.error('Error fetching user:', err)
    }
};

const fetchArticles = async () => {
    try {

        const educationQuery = query(collection(db, 'articles'));
        const educationQuerySnapshot = await getDocs(educationQuery);
        const articleArray = [];
        educationQuerySnapshot.forEach((doc) => {
            articleArray.push({ ...doc.data(), lastEditAt: doc.data().lastEditAt.toDate(), createdAt: doc.data().createdAt.toDate()});
        }); // We convert Firestore timestamp into JavaScript Date() right after fetching, since Firestore timestamp data has the format which is hard to use in JS.

        articles.value = articleArray;

    } catch (err) {
        console.error('Error fetching articles:', err);
    }
}

onAuthStateChanged(auth, (user) => {
        if (user) {
            uid.value = user.uid;
            fetchUserData(uid.value);
        } else {
            uid.value = "";
        }
    });

onMounted(() => {
    fetchUserData(uid.value);
    fetchArticles();
});

</script>

<template>
    <div class="container d-flex flex-column">
        <h1 class="mt-2">Mental Education for Youth</h1>
        <div class="d-flex mt-4">
            <main class="col-lg-9">
                <h2>Let's explore article here.</h2>
                <div class="article-catalogue">
                    <div v-for="article in articles" :key="article">
                        <ArticleCard :article="article" />
                    </div>
                </div>
            </main>
            <aside class="col-lg-3">
              <div v-for="article in featuringArticles" :key="article">
                        <ArticleCard :article="article" />
                    </div>
            </aside>
        </div>
    </div>
</template>

<style scoped>

.article-catalogue {
    display: flex;
    flex-direction: column;
    gap: 20px; /* Space between cards */
    margin: 10px;
}

@media screen and (min-width: 992px) {
    .article-catalogue {
    display: grid;
    grid-template-columns: repeat(3, 1fr); /* Creates three equal-width columns */
    gap: 20px; /* Space between cards */
    margin: 10px;
    }
}




</style>
