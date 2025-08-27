<template>
    <main>
        <article>
            <h2>{{ article }}</h2>
            <section>
                <img :src="article.thumbnail" :alt="article.title" />
                <p>{{ article.content }}</p>
            </section>
        </article>
    </main>
</template>

<script setup>
// Include logic to fetch article with that title.


</script>

<style>

</style>