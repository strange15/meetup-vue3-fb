<template>
  <div>
    <Header/>
    <!-- router-view -->
    <!-- <transition>
      <router-view />
    </transition> -->
  </div>
</template>

<script>
import Header from './components/Header.vue'

export default {
  name: 'App',
  components: {
    Header
  }
}
</script>

<style>
</style>
