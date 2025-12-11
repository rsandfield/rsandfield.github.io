<script lang="ts" setup>
//
</script>

<template>
  <Header />
  <v-main>
    <v-container>
      <div class="open">
        Welcome,
      </div>
      <div class="text">
        I'm a software developer who has spent the last several years working on the back end for AWS Elemental MediaConnect. During that time I implemented new customer facing features such as content quality analysis. Behind the scenes I developed a robust intagration testing system, as well as simplified and expanded infrastructure as code pipelines.
      </div>
      <div>
        This site is a place to showcase some of my personal work. As you do.
      </div>
      <div class="close">
        Regards,
      </div>
      <div class="close">
        Robert Sandfield
      </div>
    </v-container>
  </v-main>
</template>

<style scoped>
.open {
    font-size: larger;
    font-weight: bolder;
    margin-bottom: 1em;
}

.text {
    max-width: 80em;
    text-align: justify;
    margin-bottom: 1em;
}

.close {
    font-size: larger;
    font-weight: bolder;
    text-align: right;
}
</style>
