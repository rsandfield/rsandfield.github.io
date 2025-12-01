<script setup lang="ts">
import Header from '@/components/Header.vue';

const items = [
    {
        icon: 'github',
        value: 'rsandfield',
        link: 'https://github.com/rsandfield'
    },
    {
        icon: 'discord',
        value: 'Roburrito',
        link: 'https://discord.com/users/roburrito_'
    },
    {
        icon: 'google',
        value: 'robert.f.sandfield@gmail.com',
        link: 'mailto:robert.f.sandfield@gmail.com'
    },
]
</script>

<template>
<Header />
<v-main>
<v-container>
<v-data-table
  :items="items"
  :headers="[{value: 'icon'}, {value: 'link'}]"
  class="data-table"
  hide-default-header
  hide-default-footer
>
    <template v-slot:item.icon="{ item }">
        <font-awesome-icon class="icon" :icon="['brands', item.icon]" />
    </template>

    <template v-slot:item.link="{ item }">
        <a :href='item.link'>{{ item.value }}</a>
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