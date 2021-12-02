<template>
  <div class="organize p-8">
    <el-form
      ref="meetupForm"
      :model="ruleForm"
      :rules="rules"
      label-width="120px"
    >
      <el-form-item label="title" prop="title">
        <el-input v-model="ruleForm.title"></el-input>
      </el-form-item>
      <el-form-item label="location" prop="location">
        <el-input v-model="ruleForm.location"></el-input>
      </el-form-item>
      <el-form-item label="image url" prop="imageUrl">
        <el-input v-model="ruleForm.imageUrl"></el-input>
      </el-form-item>
      <el-form-item>
        <div class="image-preview w-2/5" v-show="ruleForm.imageUrl">
          <img :src="ruleForm.imageUrl" />
        </div>
      </el-form-item>
      <el-form-item label="Date" required>
        <el-col :span="11">
          <el-form-item prop="date1">
            <el-date-picker
              v-model="ruleForm.date1"
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
              v-model="ruleForm.date2"
              placeholder="請選擇時間"
              style="width: 100%"
            ></el-time-picker>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="description" prop="description">
        <el-input v-model="ruleForm.description" type="textarea"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm()">CREATE</el-button>
        <el-button @click="resetForm()">Reset</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { ref } from "vue";
import { useStore } from "vuex";
import { ElMessage } from 'element-plus'
import { useRouter } from "vue-router";

export default {
  setup() {
    const meetupForm = ref();
    const store = useStore();
    const router = useRouter();
    let ruleForm = ref({
      title: "",
      location: "",
      date1: "",
      date2: "",
      imageUrl: "",
      description: "",
    });
    let rules = ref({
      title: [
        {
          required: true,
          message: "請輸入標題",
          trigger: "blur",
        },
      ],
      location: [
        {
          required: true,
          message: "請輸入地點",
          trigger: "blur",
        },
      ],
      imageUrl: [
        {
          required: true,
          message: "請輸入圖片網址",
          trigger: "blur",
        },
      ],
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
          store.dispatch("createMeetup", ruleForm);
          ElMessage({
            message: '新增成功！',
            type: 'success',
          })
          setTimeout(() => {
            router.push({ name: "Meetups" });
          }, 1500)
        } else {
          return false;
        }
      });
    };
    const resetForm = () => {
      meetupForm["value"].resetFields();
    };

    return {
      meetupForm,
      submitForm,
      resetForm,
      ruleForm,
      rules
    };
  },
};
</script>
