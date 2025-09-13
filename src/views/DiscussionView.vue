<script setup>
import { ref, onMounted } from 'vue';
import DiscussionBoard from '../components/DiscussionBoard.vue';
import EventBoard from '../components/EventBoard.vue';
import { useRoute } from 'vue-router';
import db from '../firebase/init';
import { query, collection, where, getDocs, getDoc, doc, updateDoc, arrayUnion, addDoc } from 'firebase/firestore';
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
            clubsArray.push({ id: doc.id, ...doc.data() });
        });

        clubs.value = clubsArray;
        findCurrentClub(name.value)

    } catch (err) {
        console.error('Error fetching clubs:', err);
    }

};

const findCurrentClub = (name) => {
    currentClub.value = clubs.value.find((club) => {
        return club.name == name;
    });
}

const toggleForum = () => {
    render.value = 'Forum';
}

const toggleEventsRoom = () => {
    render.value = 'Events Room';
}

const recordComment = async (comment) => {
    const commentOnPost = {
        ...comment,
        username: user.value.username,
        timestamp: new Date(),
    };

    const postFK = doc(db, 'posts', where('topic', '==', comment.post));

    try {

        await addDoc(db, 'comments', {
            ...commentOnPost
        });

        await updateDoc(postFK, {comment: arrayUnion(
            {
                username: commentOnPost.username,
                timestamp: commentOnPost.timestamp,
                text: commentOnPost.text
            }
        )});

    } catch (err) {

        console.error('Error adding comment:', err);

    } finally {

        console.log('Successfully comment on the post.');

    }
}

const recordPost = async (postLetter) => {
    const post = {
        ...postLetter,
        username: user.value.username,
        timestamp: new Date(),
        comments: []
    };

    const clubRef = doc(db, "clubs", currentClub.value.id);

    try {
        await addDoc(collection(db, "posts"), {
            ...post
        });
    } catch (err) {
        console.error("Error in adding post: ", err)
    }


}

const recordEvent = async (eventData) => {
    const newEvent = {
        ...eventData,
        username: user.value.username,
        timestamp: new Date()
    };

    const clubFK = doc(db, 'clubs', club.value.name);

    try {

        await updateDoc(clubFK, { events: arrayUnion(newEvent) });
        await addDoc(collection(db, 'posts', {
            ...newEvent,
            clubName: club.value.name
        }));

    } catch (err) {

        console.error('Error adding post:', err);

    } finally {

        console.log('Successfully post to the discussion board.');

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
    name.value = decodeURIComponent(route.params.name);
    fetchUserData(uid.value);
    fetchClubs();
});
</script>

<template>
    <div class="container">
        <header>
            <div class="row">
                <h1>Discussion board</h1>
            </div>
            <div class="row">
                <button @click="toggleForum()">Forum</button>
                <button @click="toggleEventsRoom()">Events</button>
                <button v-if="isSocialWorker()" @click="toggleCommitteeRoom()">For Committee</button>
            </div>
        </header>
        <main>
            <DiscussionBoard @post="recordPost(postLetter)" @comment="recordComment(comment)" v-if="render.value === 'Forum'" :club="currentClub" />
            <EventBoard v-if="render.value === 'Events'" :role="user.role" :club="currentClub" @host-event="recordEvent(eventData)" />
        </main>
    </div>
</template>

<style>

</style>
