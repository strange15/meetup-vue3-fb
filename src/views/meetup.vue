<template>
  <div class="meetup p-4">
    <div class="container shadow py-4 my-0 mx-auto">
      <div class="title p-4 text-red-600 text-2xl mb-4">{{ meetup.title }}</div>
      <div
        class="w-full h-96"
        :style="{
          background: `url(${meetup.imageUrl}) center / cover no-repeat`,
        }"
      ></div>
      <div class="px-3 mt-2 text-blue-300 text-sm">
        {{ meetup.date }} - {{ meetup.location }}
      </div>
      <div class="px-3 text-sm">{{ meetup.description }}</div>
      <div class="w-full flex justify-end pr-4">
        <!-- TODO -->
        <el-button type="danger">REGISTER</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { ElMessage } from "element-plus";
export default {
  setup() {
    const route = useRoute();
    const store = useStore();
    const router = useRouter();
    let meetup;
    let loadedMeetups = store.state.loadedMeetups;
    let hasMatch = false;
    hasMatch = loadedMeetups.find((item) => {
      return item.id === route.params.id;
    });
    if (!hasMatch) {
      ElMessage.error("資料有誤！");
      meetup = {
        imageUrl:
          "https://upload.wikimedia.org/wikipedia/commons/4/47/New_york_times_square-terabass.jpg",
        id: "afajfjadfaadfa323",
        title: "Meetup in New York",
        date: "....",
        location: "New York",
        description: "New York, New York!",
      };

      setTimeout(() => {
        router.push("/");
      }, 2000);
    } else {
      meetup = store.state.loadedMeetups.find((item) => {
        return item.id === route.params.id;
      });
    }

    return {
      meetup,
    };
  },
};
</script>
