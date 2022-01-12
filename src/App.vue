<template>
  <RouterView/>
</template>

<style>
:root {
  --hue: 320;
  --danger-hue: 10;
  --primary-color: hsl(var(--hue), 100%, 50%);
  --primary-border-color: hsl(var(--hue) 30% 20%);
  --focus-color: hsl(var(--hue) 60% 35%);
  --danger-color: hsl(var(--danger-hue) 100% 50%);
  --button-text-color: hsl(var(--hue), 100%, 90%);
}

* {
  box-sizing: border-box;
}

h1,
h2,
h3,
p {
  margin: 0;
}

body, #app {
  width: 100vw;
  height: 100vh;
  margin: 0;
  position: relative;
  background-color: hsl(var(--hue), 15%, 95%);
  box-sizing: content-box !important;
  display: flex;
  flex-flow: column;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 16px;
  text-align: center;
  color: #2c3e50;
}

.danger {
  background-color: hsl(20, 100%, 50%);
}

.test {
  padding: 1rem 2rem;
  display: flex;
}
</style>
