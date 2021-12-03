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
import { useRoute } from "vue-router";

export default {
  setup() {
    const route = useRoute();
    const store = useStore();
    let meetup;
    meetup = store.state.loadedMeetups.find((item) => {
      return item.id === route.params.id;
    });

    return {
      meetup,
    };
  },
};
</script>
