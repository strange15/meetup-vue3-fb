<template>
  <div class="meetups">
    <div class="w-5/6 bg-blue-600 lg:w-80 flex justify-center items-center" v-for="item in carouselList" :key="item.id">
      <el-image class="w-full h-full" fit="contain" :key="item.id" :src="item.imageUrl"></el-image>
      <div class="info flex flex-col">
        <div class="title text-white">
          {{ item.title }}
        </div>
        <div class="date">
          {{ item.date }}
        </div>
        <div class="flex justify-center items-center">
          <font-awesome-icon class="icon" :icon="['fas', 'arrow-right']" />
          <span class="ml-4">View Meetup</span>
        </div>
      </div>
    </div>
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