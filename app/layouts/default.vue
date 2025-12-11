<script setup lang="ts">
import type AppHeaderVue from '~/components/AppHeader.vue';

</script>

<template>
  <v-app>
    <AppHeader />
    <v-main>
      <slot />
    </v-main>
  </v-app>
</template>
