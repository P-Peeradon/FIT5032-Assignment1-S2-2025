<script setup>
import WriteJournalForm from '@/forms/WriteJournalForm.vue';
</script>

<template>
    <div class="container d-flex flex-row">
        <div class="col-lg-4 col-12">
            <h2>5 Benefits of Writing Journal</h2>
            <blockquote>
                Journaling offers numerous benefits for mental health, especially
                stress reduction, emotional regulation and self-awareness.
                Your journal is your safe space without relying on anyone else.
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
                    </p>
                </li>
            </ol>
            <cite></cite>
        </div>
        <div class="col-lg-8 col-12">
            <WriteJournalForm />
        </div>
    </div>
</template>

<style>

</style>