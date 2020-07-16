<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <router-view/>
    </keep-alive>
    <main-tabber/>
  </div>
</template>

<script>
  import MainTabber from 'components/content/mainTabber/MainTabBar'
  export default {
    name: 'App',
    components: {
      MainTabber
    }
  }
</script>

<style>
  @import "assets/css/base.css"
</style>
