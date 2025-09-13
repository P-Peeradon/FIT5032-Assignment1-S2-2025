<template>
    <div class="container">
        <main class="d-flex col-lg-9">
            <ArticleDisplay :article="currentArticle"/>
        </main>
        <aside class="d-flex flex-column col-lg-3">
            <h2>Or, try to explore more articles.</h2>
                <div class="featuring-article">
                    <div v-for="article in featuringArticles" :key="article">
                        <ArticleCard2 :article="article" />
                    </div>
                </div>
        </aside>
    </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { computed, ref, onMounted } from 'vue';
import db from '@/firebase/init';
import { query, doc, getDoc, getDocs, collection } from 'firebase/firestore';
import ArticleDisplay from '../components/ArticleDisplay.vue';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const route = useRoute();
const title = ref(route.params.title);

const today = ref(new Date());
const fortnightAgo = ref(computed(() => new Date(today.value.getTime() - (14 * 24 * 60 * 60 * 1000))));

const articles = ref([]);
// Fetch documents which are edited fortnightly before.
const featuringArticles = computed(() => {
    return articles.value.filter((article) => article.lastEditAt.getTime() >= fortnightAgo.value.getTime()).sort((a, b) => b.lastEditAt - a.lastEditAt)
});

const auth = getAuth();
const uid = ref("");
const user = ref(null);

// Logic to fetch article by title.
// No articles with the same title.

const currentArticle = ref(computed(() =>
    articles.value.find((article) => article.title === title.value)
));

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

<style scoped>
.featuring-article {
    display: flex;
    flex-direction: column-reverse;
    justify-content: center;
    row-gap: 25px;
}
</style>
