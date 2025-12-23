<script lang="ts" setup>
function getImageUrl(filename: string): string {
  return new URL(`../assets/images/${filename}`, import.meta.url).href;
}

const items = [
  {
    title: 'Digital Synthesizer',
    text: 'A tool to generate and visualize wave forms of various shapes and wavelengths.',
    image: getImageUrl('synth.png'),
    link: 'https://rsandfield.github.io/audio_generator/',
  },
  {
    title: 'Custom Gravty',
    text: 'A Godot plugin to override extend gravity behavior.',
    image: getImageUrl('gravity.png'),
    link: 'https://github.com/rsandfield/gravity',
  },
]
</script>

<template>
  <v-container>
    <v-list>
      <v-card
        v-for="item in items"
        :key="item.title"
      >
        <div class="d-flex flex-no-wrap justify-space-between">
          <a :href="item.link">
            <img si :src="item.image" :alt="item.title + ' image'">
          </a>
          <div>
            <v-card-title>{{ item.title }}</v-card-title>
            <v-card-text>{{ item.text }}</v-card-text>
          </div>
        </div>
      </v-card>
    </v-list>
  </v-container>
</template>

<style scoped>
img {
    max-width: 30em;
}
</style>
