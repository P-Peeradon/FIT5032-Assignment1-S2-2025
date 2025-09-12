<script setup>
import UserProfile from '../components/UserProfile.vue';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { onMounted, ref } from 'vue';
import db from '../firebase/init';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import EditProfileForm from '../forms/EditProfileForm.vue';

const auth = getAuth();
const editForm = ref(false)
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

const closeForm = () => {
    editForm.value = false;
}

const toggleEditProfile = () => {
    editForm.value = true;
}

const updateUserProfile = async (newUserData) => {
    const userData = Object.keys(newUserData).reduce((acc, key) => { 
        
        const value = newUserData[key];

        if (value !== "") {
            acc[key] = value;
        }

        return acc;

    }, {});   

    try {

        const userRef = doc(db, 'users', uid.value);
        await updateDoc(userRef, userData);

    } catch (err) {

        console.error("Error in updating profile:", err);

    }

    alert("Profile updated!");

};

onMounted(() => {
    fetchUserData(uid.value);
});

onAuthStateChanged(auth, (user) => {
    if (user) {
      uid.value = user.uid;
      fetchUserData(uid.value);
    } else {
      uid.value = "";
    }
});
</script>

<template>
    <div class="profile_view" :class="{darken: editForm}">
        <UserProfile :user="user"  @edit-form="toggleEditProfile"/>
    </div>
    <EditProfileForm v-if="editForm" @edit-profile="updateUserProfile" @close="closeForm" />
</template>

<style scoped>
.darken {
    background: aquamarine;
    filter: brightness(50%);
}
</style>