<template>
    <div v-if="currentArticle" class="container d-flex flex-column flex-lg-row">
        <main class="d-flex col-12 col-lg-9">
            <ArticleDisplay :article="currentArticle" @bookmark="addNewBookmark(currentArticle)" />
        </main>
        <aside class="d-flex flex-column col-12 col-lg-3">
            <h2>Or, try to explore more articles.</h2>
                <div class="featuring-article">
                    <div v-for="article in featuringArticles" :key="article">
                        <ArticleCard2 :article="article" />
                    </div>
                </div>
        </aside>
    </div>
    <div v-else>
        <p>Loading Article...</p>
    </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { computed, ref, onMounted, watch } from 'vue';
import db from '@/firebase/init';
import { query, doc, getDoc, getDocs, collection, updateDoc, arrayUnion } from 'firebase/firestore';
import ArticleDisplay from '../components/ArticleDisplay.vue';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import ArticleCard2 from '../components/ArticleCard2.vue';

const route = useRoute();
const title = ref("");

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

const currentArticle = ref(null);

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

const addNewBookmark = async (article) => {

    const userRef = doc(db, 'users', uid);
    const articleRef = doc(db, 'articles', article.id);

    try {

        await updateDoc(userRef, { bookmarks: arrayUnion(articleRef) });

    } catch (err) {
        console.error("Error in adding bookmark: ", err);
    }

    alert("Successfully add new bookmark.")
}

const fetchArticles = async () => {
    try {

        const articleQuery = query(collection(db, 'articles'));
        const articleQuerySnapshot = await getDocs(articleQuery);
        const articleArray = [];
        articleQuerySnapshot.forEach((doc) => {
            articleArray.push({ id: doc.id, ...doc.data(), lastEditAt: doc.data().lastEditAt.toDate(), createdAt: doc.data().createdAt.toDate()});
        });

        articles.value = articleArray;
        findCurrentArticle(title.value);

    } catch (err) {
        console.error('Error fetching articles:', err);
    }
}

const findCurrentArticle = (title) => {
    currentArticle.value = articles.value.find((article) => {
        return article.title == title;
    });
}

watch(() => decodeURIComponent(route.params.title),
    (newTitle) => {
        findCurrentArticle(newTitle);
    },
    { immediate: true }
);

onAuthStateChanged(auth, (user) => {
    if (user) {
        uid.value = user.uid;
        fetchUserData(uid.value);
    } else {
        uid.value = "";
    }
});

onMounted(() => {
    title.value = decodeURIComponent(route.params.title);
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
