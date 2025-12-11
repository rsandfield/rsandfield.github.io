<template>
  <v-app-bar scroll-behavior="hide">
    <v-app-bar-title>Robert Sandfield</v-app-bar-title>
    <template #append>
      <v-btn class="button" to="/portfolio" variant="tonal">Portfolio</v-btn>
      <v-btn class="button" to="/about" variant="tonal">About</v-btn>
      <v-btn class="button" to="/contact" variant="tonal">Contact</v-btn>
    </template>
  </v-app-bar>
</template>

<style scoped>
.button {
    margin-left: 1em;
}
</style>
