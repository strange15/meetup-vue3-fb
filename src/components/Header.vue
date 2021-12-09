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
        v-for="menu in menuItems"
        :key="menu.text"
        :to="menu.path"
        class="flex justify-start items-center ml-6 cursor-pointer text-sm"
      >
        <font-awesome-icon class="icon" :icon="['fas', menu.icon]" />
        <span class="nav-item ml-4">{{ menu.text }}</span>
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
          v-for="menu in menuItems"
          :key="menu.text"
          :to="menu.path"
          @click="drawer = false"
          class="w-full flex justify-start items-center p-2 mb-2"
        >
          <font-awesome-icon class="icon" :icon="['fas', 'user-plus']" />
          <span class="ml-8">{{ menu.text }}</span>
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
    const menuItems = computed(() => {
      let menuItems = [
        {
          text: "SIGN IN",
          icon: "sign-in-alt",
          path: "/signin",
        },
        {
          text: "SIGN UP",
          icon: "user-plus",
          path: "/signup",
        },
      ];
      if (user.value) {
        menuItems = [
          {
            text: "VIEW MEETUPS",
            icon: "user-friends",
            path: "/meetups",
          },
          {
            text: "ORGANIZE MEETUP",
            icon: "map-marker-alt",
            path: "/meetup/new",
          },
        ];
      }
      return menuItems;
    });
    const logout = () => {
      drawer.value = false;
      store.dispatch("logout");
    };
    return {
      drawer,
      direction: "ltr",
      user,
      logout,
      menuItems,
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
