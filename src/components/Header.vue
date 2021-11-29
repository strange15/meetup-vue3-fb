<template>
  <div class="header flex justify-between p-4 px-6 bg-red-600 text-white">
    <div class="flex justify-start items-center">
      <font-awesome-icon class="block cursor-pointer lg:hidden" @click="drawer = true" :icon="['fas', 'bars']" />
      <router-link class="header-title ml-8 text-xl cursor-pointer lg:ml-0" to="/">
        DevMeetup
      </router-link>
    </div>
    <!-- TODO in 1920 if no auth: only show: Sign up & Sign in -->
    <div class="hidden justify-between items-center nav lg:flex">
      <div class="flex justify-start items-center ml-6 cursor-pointer text-sm">
        <font-awesome-icon class="icon" :icon="['fas', 'user-friends']" />
        <span class="nav-item ml-4">VIEW MEETUPS</span>
      </div>
      <div class="flex justify-start items-center ml-6 cursor-pointer text-sm">
        <font-awesome-icon class="icon" :icon="['fas', 'map-marker-alt']" />
        <span class="nav-item ml-4">ORGANIZE MEETUP</span>
      </div>
      <div class="flex justify-start items-center ml-6 cursor-pointer text-sm">
        <font-awesome-icon class="icon" :icon="['fas', 'user']" />
        <span class="nav-item ml-4">PROFILE</span>
      </div>
      <div class="flex justify-start items-center ml-6 cursor-pointer text-sm">
        <font-awesome-icon class="icon" :icon="['fas', 'user-plus']" />
        <span class="nav-item ml-4">SIGN UP</span>
      </div>
      <div class="flex justify-start items-center ml-6 cursor-pointer text-sm">
        <font-awesome-icon class="icon" :icon="['fas', 'sign-in-alt']" />
        <span class="nav-item ml-4">SIGN IN</span>
      </div>
    </div>
    <!-- Mobile Menu -->
    <el-drawer
      v-model="drawer"
      :with-header="false"
      :direction="direction"
      size="80%"
    >
      <div class="text-black flex flex-col justify-start items-start p-4">
        <!-- TODO 有辦法簡化相同 tailwind 的 class? -->
        <div class="flex justify-start items-center p-2 mb-2">
          <font-awesome-icon class="icon" :icon="['fas', 'user-friends']" />
          <span class="ml-8">View Meetups</span>
        </div>
        <div class="flex justify-start items-center p-2 mb-2">
          <font-awesome-icon class="icon" :icon="['fas', 'map-marker-alt']" />
          <span class="ml-8">Organize Meetup</span>
        </div>
        <div class="flex justify-start items-center p-2 mb-2">
          <font-awesome-icon class="icon" :icon="['fas', 'user']" />
          <span class="ml-8">Profile</span>
        </div>
        <!-- TODO if no auth: only show: Sign up & Sign in -->
        <div class="flex justify-start items-center p-2 mb-2">
          <font-awesome-icon class="icon" :icon="['fas', 'user-plus']" />
          <span class="ml-8">Sign up</span>
        </div>
        <div class="flex justify-start items-center p-2 mb-2">
          <font-awesome-icon class="icon" :icon="['fas', 'sign-in-alt']" />
          <span class="ml-8">Sign in</span>
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
.header {
  box-shadow: 0 2px 4px -1px rgb(0 0 0 / 20%), 0 4px 5px rgb(0 0 0 / 14%), 0 1px 10px rgb(0 0 0 / 12%);
}
// 強制設定 font-awesome icon 寬度
.icon {
  width: 1.25rem !important;
}
</style>
