<template>
    <div class="container">
        <h1 class="mt-2">Youth Mental Health Article</h1>
        <article>
            <div class="head">
                <h2 class="mt-4">{{ article.title }}</h2>
                <img src="../assets/bookmark-icon.png" alt="add to bookmark" @click="addToBookmark(props.article)"/>
            </div>

            <section>
                <p>{{ article.content }}</p>
            </section>
        </article>
    </div>
</template>

<script setup>
const props = defineProps({
    article: {
        type: Object,
        required: true
    }
});

const addToBookmark = () => {
    // Pass, waiting for authorisation system.
}

</script>

<style scoped>

.container {
    margin: 0 20px;
    text-indent: 20px;
}

.head {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-left: 20px;
}
.head img {
    width: 30px;
    height: 30px;
}

</style>
