<script setup>
import { ref, onMounted, reactive } from 'vue';
import DiscussionBoard from '../components/DiscussionBoard.vue';
import EventBoard from '../components/EventBoard.vue';
import { useRoute } from 'vue-router';
import db from '../firebase/init';
import { query, collection, where, getDoc, doc, updateDoc, arrayUnion, addDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const auth = getAuth();
const currentUser = auth.currentUser;
const route = useRoute();
const name = ref(route.params.name);
const club = reactive(null);
const user = reactive(null)

// Find club with the specific name.
const fetchClubData = async () => {

    try {

        const clubQuery = query(collection(db, 'clubs'), where('name', '==', name));
        const clubQuerySnapshot = await getDoc(clubQuery);

        club.value = clubQuerySnapshot.data();

    } catch (err) {

        console.error('Error fetching clubs:', err);

    }

}

const fetchUserData = async () => {
    try {
        const userQuery = query(collection(db, 'users', where('email', '==', currentUser.email)));
        const userQuerySnapshot = await getDoc(userQuery);
        const myUser = { ...userQuerySnapshot.data() };

        user.value = myUser;
    } catch (err) {
        console.log('Error fetching user:', err)
    }
}

onMounted(() => {
    fetchUserData()
    fetchClubData()
});


const render = ref('Forum');

const toggleForum = () => {
    render.value = 'Forum';
}

const toggleEventsRoom = () => {
    render.value = 'Events Room';
}

const recordComment = async (comment) => {
    const commentOnPost = {
        ...comment,
        username: user.username,
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
        username: user.username,
        timestamp: new Date(),
        comments: []
    };

    const clubFK = doc(db, 'clubs', club.value.name);

    try {

        await updateDoc(clubFK, { posts: arrayUnion(post) });
        await addDoc(collection(db, 'posts', {
            ...post,
            clubName: club.name
        }));

    } catch (err) {

        console.error('Error adding post:', err);

    } finally {

        console.log('Successfully post to the discussion board.');

    }

} 

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
            </div>
        </header>
        <main>
            <DiscussionBoard @post="recordPost(postLetter)" @comment="recordComment(comment)" v-if="render.value === 'Forum'" :club="club" />
            <EventBoard v-if="render.value === 'Events'" :role="user.role" :club="club" />
        </main>
    </div>
</template>

<style>

</style>