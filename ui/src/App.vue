<template>
  <div id="app">
    <h1><router-link :to="{ name: 'Home' }">SociaList</router-link></h1>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'app',
});
</script>

<style lang="scss">
@import './assets/stylesheets/app.scss';
</style>
