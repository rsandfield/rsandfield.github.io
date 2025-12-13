<script lang="ts" setup>
function getImageUrl(filename: string): string {
  return new URL(`../assets/images/${filename}`, import.meta.url).href;
}

const items = [
  {
    title: 'Digital Synthesizer',
    text: 'A tool to generate and visualize wave forms of various shapes and wavelengths.',
    image: getImageUrl('synth.png'),
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
          <img si :src="item.image">
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
