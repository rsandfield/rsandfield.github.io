<script lang="ts" setup>
  const items = [
    {
      title: 'Digital Synthesizer',
      text: 'A tool to generate and visualize wave forms of various shapes and wavelengths.',
      image: 'app/assets/synth.png',
    },
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
            <img si :src="item.image">
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
