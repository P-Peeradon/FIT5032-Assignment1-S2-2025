<template>
    <router-link :to="{ name: 'Article', params: {title: article.title}}" class="nav-link" active-class="active" aria-current="page">
        <div class="d-flex flex-row">
            <div>
                <img src="../assets/news-article.png" :alt="article.title"/>
            </div>
            <div>
                <h2 class="article-title">{{ article.title }}</h2>
                <p class="author">by @{{ article.author }}</p>
            </div>
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

</script>

<style scoped>
    div {
        width: 400px;
        height: 200px;
        background-color: rgba(245,222,179,0.8);
        box-shadow: 0 10px 20px #909090;
    }
    div img {
        width: 200px;
        height: 200px;
    }
    h2.article-title {
        color: tomato;
    }
    p.author {
        margin-left: 10px;
    }
</style>
