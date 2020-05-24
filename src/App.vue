<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" :key="$route.fullPath"/>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" :key="$route.fullPath"/>
  </div>
</template>

<script>

export default {
  name: 'App',
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  width: 100%;
  height: 100%;
  box-sizing: border-box!important;
}
html,body {
  margin: 0;
  padding: 0;
}
</style>
