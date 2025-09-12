<template>
    <router-link :to="{ name: 'Article', params: {title: article.title}}" class="nav-link" active-class="active" aria-current="page">
        <div>
            <img v-if="coverExist()" :src="article.cover" :alt="article.title" />
            <img v-else src="../assets/news-article.png" :alt="article.title"/>
            <h2 class="article-title">{{ article.title }}</h2>
        </div>
    </router-link>
</template>

<script setup>
const props = defineProps({
    article: {
        type: Object,
        required: true
    }
});

const coverExist = () => {
    return props.article.cover !== ''; 
}

</script>

<style scoped>
    div {
        width: 150px;
        height: 200px;
        background-color: aliceblue;
        border-radius: 0 0 40px 40px;
        box-shadow: 0 10px 20px #909090;
    }
    div img {
        width: 150px;
        height: 150px;
    }
    h2.article-title {
        color: tomato;
        font-size: 14px;
    }
    p.author {
        margin-left: 10px;
    }
</style>