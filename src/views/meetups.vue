<template>
  <div class="meetups p-4">
    <div
      class="w-full bg-blue-500 shadow lg:w-8/12 flex justify-center items-center rounded p-4 mb-4 mx-auto"
      v-for="item in carouselList"
      :key="item.id"
    >
      <el-image
        class="w-5/12 h-3/4"
        fit="cover"
        :key="item.id"
        :src="item.imageUrl"
      ></el-image>
      <div class="info w-3/6 flex flex-col my-8 ml-5">
        <div class="title text-white">
          {{ item.title }}
        </div>
        <div class="date my-4">
          {{ item.date }}
        </div>
        <div class="flex justify-start items-center cursor-pointer">
          <font-awesome-icon class="icon ml-4" :icon="['fas', 'arrow-right']" />
          <span class="ml-4">VIEW MEETUP</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// @ is an alias to /src
import { ref } from "vue";
import dayjs from "dayjs";

export default {
  setup() {
    // TODO carouselList move to vuex
    let carouselList = [
      {
        imageUrl:
          "https://upload.wikimedia.org/wikipedia/commons/4/47/New_york_times_square-terabass.jpg",
        id: "afajfjadfaadfa323",
        title: "Meetup in New York",
        date: dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss"),
        location: "New York",
        description: "New York, New York!",
      },
      {
        imageUrl:
          "https://upload.wikimedia.org/wikipedia/commons/7/7a/Paris_-_Blick_vom_gro%C3%9Fen_Triumphbogen.jpg",
        id: "aadsfhbkhlk1241",
        title: "Meetup in Paris",
        date: dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss"),
        location: "Paris",
        description: "It's Paris!",
      },
    ];
    return {
      carouselList: ref(carouselList),
    };
  },
};
</script>
