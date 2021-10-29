<template>
  <div id="app">
    <Navbar/>
    <router-view/>
  </div>
</template>

<script>
import Navbar from "@/components/tools/Navbar.vue"
export default {
  components:{
    Navbar
  },
}
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  margin-inline: auto;
  min-width: 1500px;
  min-height: 100vh;
  background-color: rgb(245,250,250);
}
</style>
