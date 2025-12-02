<script setup lang="ts">
import Header from '@/components/Header.vue';

const items = [
    {
        "title": "Digital Synthesizer",
        "text": "A tool to generate and visualize wave forms of various shapes and wavelengths.",
        "image": "src/assets/synth.png"
    }
]
</script>

<template>
<Header />
<v-main>
<v-container>
<v-list>
    <v-card
        v-for="item in items"
    >
        <div class="d-flex flex-no-wrap justify-space-between">
            <img :src=item.image si />
            <div>
                <v-card-title>{{ item.title }}</v-card-title>
                <v-card-text>{{ item.text }}</v-card-text>
            </div>
        </div>
    </v-card>
</v-list>
</v-container>
</v-main>
</template>

<style scoped>
img {
    max-width: 30em;
}
</style>