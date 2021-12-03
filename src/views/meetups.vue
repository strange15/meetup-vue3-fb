<template>
  <div class="meetups p-4">
    <div
      class="
        w-full
        bg-blue-500
        shadow
        lg:w-8/12
        flex
        justify-center
        items-center
        rounded
        p-4
        mb-4
        mx-auto
      "
      v-for="item in loadedMeetups"
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
        <div
          class="
            flex
            justify-center
            items-center
            cursor-pointer
            transition
            duration-500
            transform
            hover:scale-110
          "
          @click="goToMeetup(item.id)"
        >
          <font-awesome-icon class="icon ml-4" :icon="['fas', 'arrow-right']" />
          <span class="ml-4">VIEW MEETUP</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { useRouter } from "vue-router";

export default {
  computed: mapState({
    loadedMeetups: (state) => state.loadedMeetups,
  }),
  setup() {
    // const store = useStore();
    const router = useRouter();
    // store.dispatch("loadMeetups");
    const goToMeetup = (id) => {
      router.push({ name: "Meetup", params: { id } });
    };
    return {
      goToMeetup,
    };
  },
};
</script>
