<template>
  <div class="signup p-4" v-loading="loading">
    <el-form
      ref="signupForm"
      :model="ruleForm"
      status-icon
      :rules="rules"
      label-width="120px"
    >
      <el-form-item label="Mail" prop="email">
        <el-input v-model.number="ruleForm.email"></el-input>
      </el-form-item>
      <el-form-item label="Password" prop="password">
        <el-input
          v-model="ruleForm.password"
          type="password"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="Confirm" prop="checkPass">
        <el-input
          v-model="ruleForm.checkPass"
          type="password"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >SIGN UP</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const signupForm = ref();
    let loading = store.getters.loading;
    onMounted(() => {
      if (store.getters.user) {
        router.push({ name: "Home" });
      }
    });
    let ruleForm = ref({
      email: "",
      password: "",
      checkPass: "",
    });
    const confirmPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("請再次輸入密碼！"));
      } else if (value !== ruleForm["value"].password) {
        callback(new Error("兩次密碼不相同！"));
      } else {
        callback();
      }
    };
    let rules = ref({
      email: [
        {
          required: true,
          message: "請輸入 Email",
          trigger: "blur",
        },
      ],
      password: [
        {
          required: true,
          message: "請輸入密碼",
          trigger: "blur",
        },
      ],
      checkPass: [{ validator: confirmPass, trigger: "blur" }],
    });

    const submitForm = () => {
      signupForm["value"].validate((valid) => {
        if (valid) {
          store.dispatch("signUserUp", ruleForm);
        } else {
          return false;
        }
      });
    };

    return {
      signupForm,
      submitForm,
      ruleForm,
      rules,
      loading,
    };
  },
};
</script>
