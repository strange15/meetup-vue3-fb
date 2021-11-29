<template>
  <div class="home">
    <div class="button-container flex flex-col lg:flex-row justify-center items-center mt-8 mb-4">
      <div><el-button type="primary">EXPLORE MEETUPS</el-button></div>
      <div class="mt-3 lg:ml-4 lg:mt-0"><el-button type="primary">ORGANIZE MEETUP</el-button></div>
    </div>
    <!-- TODO carousel -> click img to→ /meetups/meetup.id -->
    <el-carousel trigger="click" arrow="always" height="28rem" interval="5000" class="w-5/6 mx-auto my-0">
      <el-carousel-item class="relative" v-for="item in carouselList" :key="item">
        <el-image
          class="w-full h-full"
          fit="cover"
          :key="item.id"
          :src="item.imageUrl"
        ></el-image>
        <div class="absolute bottom-8 left-2/4 transform -translate-x-1/2 text-white bg-black bg-opacity-30 px-4 py-4 w-56 text-center">
          {{ item.title }}
        </div>
      </el-carousel-item>
    </el-carousel>
    <p class="text-center mt-4 text-sm">Join our awesome meetups!</p>
  </div>
</template>

<script>
// @ is an alias to /src
import { ref } from 'vue'

export default {
  setup() {
    let carouselList = [
      {
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/47/New_york_times_square-terabass.jpg',
        id: 'afajfjadfaadfa323',
        title: 'Meetup in New York',
        date: new Date(),
        location: 'New York',
        description: 'New York, New York!'
      },
      {
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/7a/Paris_-_Blick_vom_gro%C3%9Fen_Triumphbogen.jpg',
        id: 'aadsfhbkhlk1241',
        title: 'Meetup in Paris',
        date: new Date(),
        location: 'Paris',
        description: 'It\'s Paris!'
      }
    ]
    return {
      carouselList: ref(carouselList),
    }
  },
}
</script>
