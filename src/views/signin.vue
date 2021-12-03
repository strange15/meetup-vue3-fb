<template>
  <div class="signin p-4" v-loading="loading">
    <el-form
      ref="signinForm"
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
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >SIGN IN</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const signinForm = ref();
    const loading = computed(() => {
      return store.getters.loading;
    });
    onMounted(() => {
      if (store.getters.user) {
        router.push({ name: "Home" });
      }
    });
    let ruleForm = ref({
      email: "",
      password: "",
    });
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
    });

    const submitForm = () => {
      signinForm["value"].validate((valid) => {
        if (valid) {
          store.dispatch("signUserIn", ruleForm);
        } else {
          return false;
        }
      });
    };

    return {
      signinForm,
      submitForm,
      ruleForm,
      rules,
      loading,
    };
  },
};
</script>
