<script setup lang="ts">
  import Header from '@/components/Header.vue'

  const items = [
    {
      icon: 'github',
      value: 'rsandfield',
      link: 'https://github.com/rsandfield',
    },
    {
      icon: 'discord',
      value: 'Roburrito',
      link: 'https://discord.com/users/roburrito_',
    },
    {
      icon: 'google',
      value: 'robert.f.sandfield@gmail.com',
      link: 'mailto:robert.f.sandfield@gmail.com',
    },
  ]
</script>

<template>
  <Header />
  <v-main>
    <v-container>
      <v-data-table
        class="data-table"
        :headers="[{value: 'icon'}, {value: 'link'}]"
        hide-default-footer
        hide-default-header
        :items="items"
      >
        <template #item.icon="{ item }">
          <font-awesome-icon class="icon" :icon="['brands', item.icon]" />
        </template>

        <template #item.link="{ item }">
          <a :href="item.link">{{ item.value }}</a>
        </template>
      </v-data-table>
    </v-container>
  </v-main>
</template>

<style scoped>
.data-table {
    font-size: larger;
    align-self: center;
}

.icon {
    display: inline-block;
    width: 2em;
    height: 2em;
}
</style>
