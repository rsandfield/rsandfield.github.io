<script lang="ts" setup>
import { Display } from '~/assets/scripts/particles/display';

onMounted(() => {
  const display = new Display(
    document.getElementById('display') as HTMLCanvasElement, 
    document.getElementById("container") as HTMLElement
  );
  const resizeObserver = new ResizeObserver(display.resize.bind(display));
  resizeObserver.observe(display.container);
});
</script>

<template>
  <div id="container" class="container">
    <canvas id="display"></canvas>
    <h1>Software Engineer</h1>
  </div>
</template>

<style scoped>
body {
  padding: 0;
  margin: 0;
}
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

h1 {
  text-align: center;
}

#display {
  position: absolute;
}
</style>