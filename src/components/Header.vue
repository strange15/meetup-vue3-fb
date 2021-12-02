<template>
  <div class="header flex justify-between p-4 px-6 bg-red-600 text-white">
    <div class="flex justify-start items-center">
      <font-awesome-icon
        class="block cursor-pointer lg:hidden"
        @click="drawer = true"
        :icon="['fas', 'bars']"
      />
      <router-link
        class="header-title ml-8 text-xl cursor-pointer lg:ml-0"
        to="/"
      >
        DevMeetup
      </router-link>
    </div>
    <div class="hidden justify-between items-center nav lg:flex">
      <router-link
        to="/meetups"
        class="flex justify-start items-center ml-6 cursor-pointer text-sm"
        v-show="user"
      >
        <font-awesome-icon class="icon" :icon="['fas', 'user-friends']" />
        <span class="nav-item ml-4">VIEW MEETUPS</span>
      </router-link>
      <router-link
        to="/meetup/new"
        class="flex justify-start items-center ml-6 cursor-pointer text-sm"
        v-show="user"
      >
        <font-awesome-icon class="icon" :icon="['fas', 'map-marker-alt']" />
        <span class="nav-item ml-4">ORGANIZE MEETUP</span>
      </router-link>
      <!-- <div class="flex justify-start items-center ml-6 cursor-pointer text-sm">
        <font-awesome-icon class="icon" :icon="['fas', 'user']" />
        <span class="nav-item ml-4">PROFILE</span>
      </div> -->
      <router-link
        to="/signup"
        class="flex justify-start items-center ml-6 cursor-pointer text-sm"
        v-show="!user"
      >
        <font-awesome-icon class="icon" :icon="['fas', 'user-plus']" />
        <span class="nav-item ml-4">SIGN UP</span>
      </router-link>
      <router-link
        to="/signin"
        class="flex justify-start items-center ml-6 cursor-pointer text-sm"
        v-show="!user"
      >
        <font-awesome-icon class="icon" :icon="['fas', 'sign-in-alt']" />
        <span class="nav-item ml-4">SIGN IN</span>
      </router-link>
      <div
        class="flex justify-start items-center ml-6 cursor-pointer text-sm"
        @click="logout()"
        v-show="user"
      >
        <font-awesome-icon class="icon" :icon="['fas', 'sign-out-alt']" />
        <span class="nav-item ml-4">SIGN OUT</span>
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
        <router-link
          to="/meetups"
          @click="drawer = false"
          class="w-full flex justify-start items-center p-2 mb-2"
          v-show="user"
        >
          <font-awesome-icon class="icon" :icon="['fas', 'user-friends']" />
          <span class="ml-8">View Meetups</span>
        </router-link>
        <router-link
          to="/meetup/new"
          @click="drawer = false"
          class="w-full flex justify-start items-center p-2 mb-2"
          v-show="user"
        >
          <font-awesome-icon class="icon" :icon="['fas', 'map-marker-alt']" />
          <span class="ml-8">Organize Meetup</span>
        </router-link>
        <!-- <div class="w-full flex justify-start items-center p-2 mb-2">
          <font-awesome-icon class="icon" :icon="['fas', 'user']" />
          <span class="ml-8">Profile</span>
        </div> -->
        <router-link
          to="/signup"
          @click="drawer = false"
          class="w-full flex justify-start items-center p-2 mb-2"
          v-show="!user"
        >
          <font-awesome-icon class="icon" :icon="['fas', 'user-plus']" />
          <span class="ml-8">Sign up</span>
        </router-link>
        <router-link
          to="/signin"
          @click="drawer = false"
          class="w-full flex justify-start items-center p-2 mb-2"
          v-show="!user"
        >
          <font-awesome-icon class="icon" :icon="['fas', 'sign-in-alt']" />
          <span class="ml-8">Sign in</span>
        </router-link>
        <div
          @click="logout()"
          class="w-full flex justify-start items-center p-2 mb-2"
          v-show="user"
        >
          <font-awesome-icon class="icon" :icon="['fas', 'sign-out-alt']" />
          <span class="ml-8">Sign out</span>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { defineComponent, ref, computed } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const store = useStore();
    let drawer = ref(false);
    const user = computed(() => {
      return store.getters.user;
    });
    const logout = () => {
      drawer = false;
      store.dispatch("logout");
    };
    return {
      drawer,
      direction: "ltr",
      user,
      logout,
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.header {
  box-shadow: 0 2px 4px -1px rgb(0 0 0 / 20%), 0 4px 5px rgb(0 0 0 / 14%),
    0 1px 10px rgb(0 0 0 / 12%);
}
// 強制設定 font-awesome icon 寬度
.icon {
  width: 1.25rem !important;
}
</style>
