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
    <el-button type="text" @click="dialogFormVisible = true"
      >open a Form nested Dialog</el-button
    >

    <el-dialog v-model="dialogFormVisible" title="Shipping address">
      <el-form :model="form">
        <el-form-item label="Promotion name" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Zones" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="Please select a zone">
            <el-option label="Zone No.1" value="shanghai"></el-option>
            <el-option label="Zone No.2" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">Cancel</el-button>
          <el-button type="primary" @click="dialogFormVisible = false"
            >Confirm</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script>
import { reactive, toRefs } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

export default {
  setup() {
    const state = reactive({
      dialogFormVisible: false,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      formLabelWidth: "120px",
    });
    const route = useRoute();
    const store = useStore();
    let meetup;
    meetup = store.state.loadedMeetups.find((item) => {
      return item.id === route.params.id;
    });

    return {
      meetup,
      ...toRefs(state),
    };
  },
};
</script>
