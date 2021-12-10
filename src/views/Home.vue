<template>
  <div class="home" v-loading="loading">
    <div
      class="
        button-container
        flex flex-col
        lg:flex-row
        justify-center
        items-center
        mt-8
        mb-4
      "
    >
      <div>
        <router-link to="/meetups">
          <el-button type="primary">EXPLORE MEETUPS</el-button>
        </router-link>
      </div>
      <div class="mt-3 lg:ml-4 lg:mt-0">
        <router-link to="/meetup/new">
          <el-button type="primary">ORGANIZE MEETUP</el-button>
        </router-link>
      </div>
    </div>
    <el-carousel
      trigger="click"
      arrow="always"
      height="28rem"
      :interval="5000"
      class="w-5/6 mx-auto my-0"
      v-if="!loading"
    >
      <el-carousel-item
        class="relative"
        v-for="item in loadedMeetups"
        :key="item"
        @click="goToMeetup(item.id, item.creatorId)"
      >
        <el-image
          class="w-full h-full"
          fit="cover"
          :key="item.id"
          :src="item.imageUrl"
        ></el-image>
        <div
          class="
            absolute
            bottom-8
            left-2/4
            transform
            -translate-x-1/2
            text-white
            bg-black bg-opacity-30
            px-4
            py-4
            w-56
            text-center
          "
        >
          {{ item.title }}
        </div>
      </el-carousel-item>
    </el-carousel>
    <p class="text-center mt-4 text-sm">Join our awesome meetups!</p>
  </div>
</template>

<script>
// @ is an alias to /src
import { computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();
    const store = useStore();

    const loadedMeetups = computed(() => {
      return store.getters.loadedMeetups;
    });
    const loading = computed(() => {
      return store.getters.loading;
    });
    const goToMeetup = (id, creatorId) => {
      const isTheSameUser = localStorage.getItem("uid") === creatorId;
      router.push({ name: "Meetup", params: { id }, query: { isTheSameUser } });
    };
    return {
      goToMeetup,
      loading,
      loadedMeetups,
    };
  },
};
</script>
