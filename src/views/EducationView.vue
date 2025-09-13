<script setup>
import { computed, onMounted, ref } from 'vue';
import ArticleCard from '../components/ArticleCard.vue';
import { collection, getDocs, query, doc, getDoc } from 'firebase/firestore';
import db from '../firebase/init';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import ArticleCard2 from '@/components/ArticleCard2.vue';

// As a mental health specialist, I want to write article, which composes of many sections,
// so that youth can read them to understand one's mental health condition.
const today = ref(new Date());
const fortnightAgo = ref(computed(() => new Date(today.value.getTime() - (14 * 24 * 60 * 60 * 1000)))); // Fortnight means two weeks.
// dateObj.getTime() return time in millisecond from 1 January 1970 00:00:00UTC as numeric
// For this reason, we can use plus or minus to add more time, but it has to be converted into milliseconds before doing so.
// This means, we want the Date of two weeks before today, we must convert dateObj represent today's Date by getTime(), and minus two weeks (converted to millisecond).
// Therefore, 2 weeks must be converted to 14 days * (24 hours/1 day) * (60 minutes/1 hour) * (60 seconds/1 minutes) * (1000 milliseconds/1 seconds)

// Authentication state
const auth = getAuth();
const uid = ref("");
const user = ref(null);

const articles = ref([]);

// Fetch documents which are edited fortnightly before.
const featuringArticles = computed(() => {
    return articles.value.filter((article) => article.lastEditAt.getTime() >= fortnightAgo.value.getTime()).sort((a, b) => b.lastEditAt - a.lastEditAt)
});

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

        const articleQuery = query(collection(db, 'articles'));
        const articleQuerySnapshot = await getDocs(articleQuery);
        const articleArray = [];
        articleQuerySnapshot.forEach((doc) => {
            articleArray.push({ id: doc.id, ...doc.data(), lastEditAt: doc.data().lastEditAt.toDate(), createdAt: doc.data().createdAt.toDate()});
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
    <div class="container">
        <h1 class="mt-2">Mental Education for Youth</h1>
        <div class="d-flex flex-column flex-lg-row mt-4">
            <main class="col-12 col-lg-9 mt-3">
                <h2>Let's explore article here.</h2>
                <div class="article-catalogue">
                    <div v-for="article in articles" :key="article">
                        <ArticleCard :article="article" />
                    </div>
                </div>
            </main>
            <aside class="col-12 col-lg-3 mt-3">
                <h2>Want to read new articles? Check here</h2>
                <div class="featuring-article">
                    <div v-for="article in featuringArticles" :key="article">
                        <ArticleCard2 :article="article" />
                    </div>
                </div>
            </aside>
        </div>
    </div>
    <br />
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
.featuring-article {
    display: flex;
    flex-direction: column-reverse;
    justify-content: center;
    row-gap: 25px;
}
</style>
