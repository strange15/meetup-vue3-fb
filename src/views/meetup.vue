<template>
  <div class="meetup p-4" v-loading="loading">
    <div class="container shadow py-4 my-0 mx-auto">
      <div class="flex justify-between items-center mb-4 px-6">
        <div class="title py-4 text-red-600 text-2xl">{{ meetup?.title }}</div>
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
          background: `url(${meetup?.imageUrl}) center / cover no-repeat`,
        }"
      ></div>
      <div class="px-3 mt-2 text-blue-300 text-sm">
        {{ meetup?.date }} - {{ meetup?.location }}
      </div>
      <div class="w-full flex my-4 pl-4">
        <el-button @click="dialogDateFormVisible = true" type="primary">EDIT DATE AND TIME</el-button>
      </div>
      <div class="px-3 text-sm">{{ meetup?.description }}</div>
      <div class="w-full flex justify-end pr-4" v-show="userIsAuthenticated">
        <el-button @click="dialogRegisterConfirm = true" type="danger">
          {{ userIsRegistered ? 'UNREGISTER' : 'REGISTER' }}
        </el-button>
      </div>
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

    <el-dialog
      v-model="dialogDateFormVisible"
      title="Edit Meetup Date And Time"
    >
      <el-form
        ref="meetupDateForm"
        :model="ruleDateForm"
        :rules="rulesDate"
        label-width="120px"
      >
        <el-form-item label="Date" required>
          <el-col :span="11">
            <el-form-item prop="date1">
              <el-date-picker
                v-model="ruleDateForm.date1"
                type="date"
                placeholder="請選擇日期"
                style="width: 100%"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-form-item prop="date2">
              <el-time-picker
                v-model="ruleDateForm.date2"
                placeholder="請選擇時間"
                style="width: 100%"
              ></el-time-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitDateForm()">UPDATE</el-button>
          <el-button @click="dialogDateFormVisible = false">CANCEL</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog
      v-model="dialogRegisterConfirm"
      :title="`
        ${
          userIsRegistered ? 'Unregister from Meetup?' : 'Register from Meetup?'
        }`"
    >
      <p>You can always change your decision later on.</p>
      <el-button type="primary" @click="submitRegister(userIsRegistered)">CONFIRM</el-button>
      <el-button @click="dialogRegisterConfirm = false">CANCEL</el-button>
    </el-dialog>
  </div>
</template>
<script>
import { ref, reactive, computed } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

export default {
  setup() {
    let dialogFormVisible = ref(false);
    let dialogDateFormVisible = ref(false);
    let dialogRegisterConfirm = ref(false);
    const route = useRoute();
    const store = useStore();
    const loading = computed(() => {
      return store.getters.loading;
    });
    let userIsAuthenticated = computed(() => {
      return store.getters.user !== null && store.getters.user !== undefined;
    });
    let meetup = computed(() => {
      return store.getters.loadedMeetups.find((item) => {
        return item.id === route.params.id;
      });
    });
    let canEdit = computed(() => {
      return localStorage.getItem("uid") === meetup.value?.creatorId;
    });
    let userIsRegistered = computed(() => {
      if (!userIsAuthenticated.value) return;
      return store.getters.user.registeredMeetups.findIndex((meetupId) => {
        return meetupId === route.params.id;
      }) >= 0;
    });

    const meetupForm = ref();
    const meetupDateForm = ref();
    let ruleForm = reactive({
      title: "",
      location: "",
      imageUrl: "",
      description: "",
      creatorId: "",
    });
    let ruleDateForm = reactive({
      date1: "",
      date2: "",
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
    let rulesDate = ref({
      date1: [
        {
          type: "date",
          required: true,
          message: "請選擇日期",
          trigger: "change",
        },
      ],
      date2: [
        {
          type: "date",
          required: true,
          message: "請選擇時間",
          trigger: "change",
        },
      ],
    });
    const submitForm = () => {
      meetupForm["value"].validate((valid) => {
        if (valid) {
          ruleForm.id = route.params.id;
          ruleForm.location = meetup["value"].location;
          ruleForm.imageUrl = meetup["value"].imageUrl;
          ruleForm.creatorId = meetup["value"].creatorId;
          if (!ruleForm.title) {
            ruleForm.title = meetup["value"].title;
          }
          if (!ruleForm.description) {
            ruleForm.description = meetup["value"].description;
          }
          store.dispatch("updateMeetupData", ruleForm);
          meetupForm["value"].resetFields();
          dialogFormVisible.value = false;
        } else {
          return false;
        }
      });
    };
    const submitDateForm = () => {
      meetupDateForm["value"].validate((valid) => {
        if (valid) {
          ruleDateForm.id = route.params.id;
          ruleDateForm.location = meetup["value"].location;
          ruleDateForm.imageUrl = meetup["value"].imageUrl;
          ruleDateForm.creatorId = meetup["value"].creatorId;
          ruleDateForm.title = meetup["value"].title;
          ruleDateForm.description = meetup["value"].description;
          store.dispatch("updateMeetupData", ruleDateForm);
          meetupDateForm["value"].resetFields();
          dialogDateFormVisible.value = false;
        } else {
          return false;
        }
      });
    };
    const submitRegister = (isRegistered) => {
      dialogRegisterConfirm.value = false;
      if (isRegistered) {
        store.dispatch("unregisterUserForMeetup", route.params.id);
      } else {
        store.dispatch("registerUserForMeetup", route.params.id);

      }
    };

    return {
      meetup,
      dialogFormVisible,
      dialogDateFormVisible,
      dialogRegisterConfirm,
      meetupForm,
      meetupDateForm,
      submitForm,
      submitDateForm,
      submitRegister,
      ruleForm,
      ruleDateForm,
      rules,
      rulesDate,
      canEdit,
      userIsRegistered,
      userIsAuthenticated,
      loading,
    };
  },
};
</script>
