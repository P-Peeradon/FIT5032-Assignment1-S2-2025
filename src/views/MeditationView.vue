<script setup>

const videos = [
    {
        title: "Relaxing music Relieves stress, Anxiety and Depression",
        owner: "Relaxing Calming Music",
        videoID: "I3OJUwILelU?si=WwVltdjs4vxC8o15",
        type: "video/mp4"
    }
]

</script>

<template>
    <div class="container">
        <div class="row">
            <h1>Meditation</h1>
        </div>
        <div class="row">
            <section class="col-6">
                <h2>Benefit of Meditation</h2>
                <blockquote>
                    Because it calms the mind and lowers cortisol levels, meditation has major mental health advantages, including reduced stress, anxiety, and depression. By reducing blood pressure, strengthening the heart, and boosting sleep quality, it also enhances physical health. Additionally, by enhancing attention, concentration, and even delaying age-related changes in the brain, meditation improves cognitive function. 
                </blockquote>
                <ol>
                    <li>Alleviates depression, stress and anxiety.</li>
                    <li>Improve self awareness by bringing mind to the present.</li>
                    <li>Lower blood pressure and improve circulation</li>
                    <li>Enhance quality sleep</li>
                    <li>Help brain region responsible to surroundings</li>
                    <li>Slow age-related brain changes</li>
                </ol>
                <cite>Mayo Clinic. (2023, December 14). Meditation: A simple, fast way to reduce stress. Mayo Clinic. [https://www.mayoclinic.org/tests-procedures/meditation/in-depth/meditation/art-20045858]</cite>
            </section>
            <section class="col-6">
                <div v-for="vid in videos" :key="vid.title">
                    <div>
                        <youtube :video-id="vid.videoID"></youtube>
                        <p>{{ vid.owner }}</p>
                    </div>
                </div>
            </section>
        </div>
        
    </div>
    
</template>

<style>

</style>