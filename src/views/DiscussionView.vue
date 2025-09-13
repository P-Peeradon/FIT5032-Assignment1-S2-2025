<script setup>
import { ref, onMounted } from 'vue';
import DiscussionBoard from '../components/DiscussionBoard.vue';
import EventBoard from '../components/EventBoard.vue';
import { useRoute } from 'vue-router';
import db from '../firebase/init';
import { query, collection, getDocs, getDoc, doc, updateDoc, arrayUnion, addDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const auth = getAuth();
const route = useRoute();
const user = ref(null);
const uid = ref('');

const name = ref("");
const clubs = ref([]);
const currentClub = ref(null);
const render = ref('Forum');

const fetchUserData = async (uid) => {
    try {
        const userRef = doc(db, 'users', uid);
        const userSnapshot = await getDoc(userRef);
        const myUser =  userSnapshot.data() ;

        user.value = myUser;
        const myClubs = myUser.clubs;
        const myClubsSnap = await Promise.all(myClubs.map(ref => getDoc(ref)));

        user.value.clubs = myClubsSnap.map((clubSnap) => {
            return { ...clubSnap.data()}
        });
    } catch (err) {
        console.error('Error fetching user:', err)
    }
}

const fetchClubs = async () => {

    try {

        const clubQuery = query(collection(db, 'clubs'));
        const clubQuerySnapshot = await getDocs(clubQuery);
        const clubsArray = [];

        clubQuerySnapshot.forEach((doc) => {
            clubsArray.push({ id: doc.id, ...doc.data()});
        });

        clubs.value = clubsArray;
        findCurrentClub(name.value);

    } catch (err) {
        console.error("Error in fetching club data: ", err);
    }
}

const fetchPosts = async () => {

    try {

        const postQuery = query(collection(db, 'clubs', currentClub.value.id, 'posts'));
        const postQuerySnapshot = await getDocs(postQuery);
        const postsArray = [];

        postQuerySnapshot.forEach((doc) => {
            postsArray.push({ id: doc.id, ...doc.data()});
        });

        currentClub.value.posts = postsArray;

    } catch (err) {
        console.error("Error in fetching club data: ", err);
    }
}



const findCurrentClub = (name) => {
    currentClub.value = clubs.value.find((club) => {
        return club.name == name;
    });
}

const toggleForum = () => {
    render.value = 'Forum';
}

const toggleEventsRoom = () => {
    render.value = 'Events';
}

const recordComment = async (comment) => {
    const commentOnPost = {
        ...comment,
        username: user.value.username,
        timestamp: new Date(),
    };

    try {

        await addDoc(db, 'comments', {
            ...commentOnPost,
            id: null
        });

    } catch (err) {

        console.error('Error adding comment:', err);

    }

}

const recordPost = async (postLetter) => {
    const post = {
        ...postLetter,
        username: user.value.username,
        timestamp: new Date(),
        comments: []
    };

    try {
        await addDoc(collection(db, "clubs", currentClub.value.id ,"posts"), post);

    } catch (err) {

        console.error("Error in adding post: ", err);

    }

    alert("Post completed.");
}

const recordEvent = async (eventData) => {
    const newEvent = {
        ...eventData,
        owner: user.value.username,
        timestamp: new Date()
    };

    const clubFK = doc(db, 'clubs', currentClub.value.name);

    try {


        await addDoc(collection(db, 'posts', {
            ...newEvent,
            clubName: currentClub.value.name
        }));

        await updateDoc(clubFK, { events: arrayUnion(newEvent) });

    } catch (err) {

        console.error('Error adding post:', err);

    }

    console.log('Successfully post to the discussion board.');
}

const isSocialWorker = () => {
    return user.value.role == "Social Worker"
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
    name.value = decodeURIComponent(route.params.name);
    fetchUserData(uid.value);
    fetchClubs();

    fetchPosts();
});
</script>

<template>
    <div v-if="currentClub" class="container">
        <h1>Discussion board</h1>
        <header class="row d-flex flex-row py-3">
            <div class="selector">
                <button class="gray_button" :class="{ active: render.value === 'Forum'}" @click="toggleForum()">Forum</button>
                <button class="gray_button" :class="{ active: render.value === 'Events'}" @click="toggleEventsRoom()">Events</button>
                <button class="gray_button" v-if="isSocialWorker()" @click="toggleCommitteeRoom()">For Committee</button>
            </div>
        </header>
        <main class="d-flex mt-4">
            <DiscussionBoard v-if="render === 'Forum'" @post="recordPost" @comment="recordComment" :club="currentClub" />
            <EventBoard v-if="render === 'Events'" :role="user.role" :club="currentClub" @host-event="recordEvent(eventData)" />
        </main>
    </div>
    <div v-else>
        <p>Loading the club...</p>
    </div>
</template>

<style scoped>
.selector {
    display: flex;
    padding-left: 10px;
    padding-top: 5px;
    padding-bottom: 5px;
    gap: 15px;
}
.active {
    box-shadow: 0 0 15px rgba(255, 0, 0, 0.7),;
}
</style>
