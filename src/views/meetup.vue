<template>
  <div class="meetup p-4" v-loading="loading">
    <div class="container shadow py-4 my-0 mx-auto" v-if="meetup">
      <div class="flex justify-between items-center mb-4 px-6">
        <div class="title py-4 text-red-600 text-2xl">{{ meetup.title }}</div>
        <font-awesome-icon
          v-show="canEdit"
          class="cursor-pointer fa-2x"
          :icon="['fas', 'edit']"
          @click="dialogFormVisible = true"
        />
      </div>
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
    <div v-else>
      <h1>資料有誤, 將回到首頁</h1>
    </div>

    <el-dialog v-model="dialogFormVisible" title="Edit Meetup">
      <el-form
        ref="meetupForm"
        :model="ruleForm"
        :rules="rules"
        label-width="120px"
      >
        <el-form-item label="title" prop="title">
          <el-input v-model="ruleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="description" prop="description">
          <el-input v-model="ruleForm.description" type="textarea"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm()">UPDATE</el-button>
          <el-button @click="dialogFormVisible = false">CANCEL</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { ref, reactive, computed } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";

export default {
  setup() {
    let dialogFormVisible = ref(false);
    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    const loading = computed(() => {
      return store.getters.loading;
    });
    let loadedMeetups = store.state.loadedMeetups;
    let hasMatch = false;
    hasMatch = loadedMeetups.find((item) => {
      return item.id === route.params.id;
    });
    const canEdit = route.query.isTheSameUser === "true";
    if (!hasMatch) {
      setTimeout(() => {
        router.push("/");
      }, 2000);
    }
    let meetup;
    meetup = store.getters.loadedMeetups.find((item) => {
      return item.id === route.params.id;
    });

    const meetupForm = ref();
    let ruleForm = reactive({
      title: meetup.title,
      location: "",
      imageUrl: "",
      description: meetup.description,
      creatorId: "",
    });
    let rules = ref({
      title: [
        {
          required: true,
          message: "請輸入標題",
          trigger: "blur",
        },
      ],
      description: [
        {
          required: true,
          message: "請輸入描述",
          trigger: "blur",
        },
      ],
    });
    const submitForm = () => {
      meetupForm["value"].validate((valid) => {
        if (valid) {
          ruleForm.id = route.params.id;
          ruleForm.location = meetup.location;
          ruleForm.imageUrl = meetup.imageUrl;
          ruleForm.creatorId = meetup.creatorId;
          if (!ruleForm.title) {
            ruleForm.title = meetup.title;
          }
          if (!ruleForm.description) {
            ruleForm.description = meetup.description;
          }
          store.dispatch("updateMeetupData", ruleForm);
          meetupForm["value"].resetFields();
          dialogFormVisible.value = false;
        } else {
          return false;
        }
      });
    };

    return {
      meetup,
      dialogFormVisible,
      meetupForm,
      submitForm,
      ruleForm,
      rules,
      canEdit,
      loading,
    };
  },
};
</script>
