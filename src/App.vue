<template>
  <div>
    <Header/>
    <!-- router-view -->
    <router-view v-slot="{ Component }">
      <transition>
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Home from './views/Home.vue'

export default {
  name: 'App',
  components: {
    Header,
    Home
  }
}
</script>

<style>
</style>
