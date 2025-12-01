<template>
<v-app-bar scroll-behavior="hide">
    <v-app-bar-title>Robert Sandfield</v-app-bar-title>
    <template v-slot:append>
        <v-btn class="button" variant="tonal" to="/portfolio">Portfolio</v-btn>
        <v-btn class="button" variant="tonal" to="/about">About</v-btn>
        <v-btn class="button" variant="tonal" to="/contact">Contact</v-btn>
    </template>
</v-app-bar>
</template>

<style scoped>
.button {
    margin-left: 1em;
}
</style>