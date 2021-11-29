<template>
  <div class="header flex justify-between p-4 bg-red-600 text-white">
    <div class="flex justify-start items-center">
      <!-- TODO click show mobile menu with mask -->
      <font-awesome-icon @click="drawer = true" :icon="['fas', 'bars']" />
      <!-- TODO click to /home -->
      <div class="header-title ml-8">DevMeetup</div>
    </div>
    <!-- TODO in 1920 if no auth: only show: Sign up & Sign in -->
    <!-- <div class="flex nav">
      <span class="nav-item">VIEW </span>
      <span class="nav-item">ORGANIZE </span>
      <span class="nav-item">PROFILE </span>
      <span class="nav-item">SIGN UP</span>
      <span class="nav-item">SIGN IN</span>
    </div> -->
    <!-- Mobile Menu -->
    <el-drawer
      v-model="drawer"
      :with-header="false"
      :direction="direction"
      size="80%"
    >
      <!-- TODO if no auth: only show: Sign up & Sign in -->
      <div class="text-black flex flex-col justify-start items-start p-4">
        <div class="flex justify-start items-center p-2">
          <font-awesome-icon @click="drawer = true" :icon="['fas', 'bars']" />
          <span class="ml-8">View Meetups</span>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    return {
      drawer: ref(false),
      direction: 'ltr'
    }
  },
})

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
// .header {
//   background: #d02826;
//   color: #fff;
// }
</style>
