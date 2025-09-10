<script setup>
import WriteJournalForm from '../forms/WriteJournalForm.vue';
import { getAuth } from 'firebase/auth';
import { onMounted, ref } from 'vue';
import db from '../firebase/init';
import { addDoc, query, collection, getDoc, where, updateDoc, arrayUnion, doc } from 'firebase/firestore';

const auth = getAuth();
const currentUser = auth.currentUser;
const user = ref(null);

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

const recordJournal = async (journal) => {
    const userJournal = { ...journal };
    const userFK = doc(db, 'users', user.value.email)

    try {
        //Collect journal into user doc.
        await updateDoc(userFK, {journal: arrayUnion(userJournal)});

        //Add the journal to the db.
        await addDoc(collection(db, 'journal', {
            userJournal,
            username: user.value.username
        }));
    } catch (err) {
        console.log('Error in adding journal:', err);
    }
}

onMounted(
    // Fetch user data.
    fetchUserData()
);

</script>

<template>
    <div class="container d-flex flex-column">
        <h1 class="mt-2">Journaling</h1>
        <div class="d-flex flex-column flex-lg-row">
            <div class="mt-4 col-lg-4">
                <h2>5 Benefits of Writing Journal</h2>
                <div class="image-center mt-2 mb-2">
                    <img class="journaling" src="../assets/Writing_journal.jpg" alt="journaling"/>
                </div>
                <blockquote>
                    "Journaling offers numerous benefits for mental health, especially
                    stress reduction, emotional regulation and self-awareness.
                    Your journal is your safe space without relying on anyone else." (Sutton, 2018)<br />
                </blockquote>
                
                <ol>
                    <li>
                        <span class="category">Stress Reduction and Emotional Processing</span>
                        <p>
                            Journaling helps you understand what you are worrying about.
                        </p>
                    </li>
                    <li>
                        <span class="category">Enhanced Self-Awareness and Insight</span>
                        <p>
                            The act of writing induces self-reflection and deepen mood understanding.
                        </p>
                    </li>
                    <li>
                        <span class="category">Improved Mood and Mental Well-being</span>
                        <p>
                            By acknowledging happy and sorrow memories, journaling can help boosting happiness and avoiding sadness.
                        </p>
                    </li>
                    <li>
                        <span class="category">Increased Resilience and Coping Skills</span>
                        <p>
                            Jotting down past events understand how you deal with each events and how you learn from that incidents.
                        </p>
                    </li>
                    <li>
                        <span class="category">Relaxation</span>
                        <p>
                            After writing down your worries, you can still read your journals anytime and understand that feelings.
                            You will feel secure but realise of what happened with you.
                        </p>
                    </li>
                </ol>
                <p><span class="category">Cite:</span>
                <cite>
                    Sutton, J. (2018, May 14). 5 Benefits of Journaling for Mental Health. Positive Psychology. [https://positivepsychology.com/benefits-of-journaling/]
                </cite>
                </p>

                <br />
                <div class="image-center mt-3">
                    <router-link to="/profile/emotion" class="nav-link" active-class="active" aria-current="page">
                        <button class="gray_button">Want to inspect your emotion? Go ahead and see your journal.</button>
                    </router-link>
                </div>
                
            </div>
            <div class="mt-4 col-lg-8 mb-4">
                <WriteJournalForm @jot-down="recordJournal(journalForm)" />
                <div class="image-center mt-3">
                    <router-link to="/journal/meditation" class="nav-link" active-class="active" aria-current="page">
                        <button class="gray_button">Want to be mindful? Do meditation.</button>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    
    img.journaling {
        width: 70%;
        height: auto;
        margin: auto;
    }
    .image-center {
        text-align: center;
    }
</style>