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

</script>

<style>

</style>