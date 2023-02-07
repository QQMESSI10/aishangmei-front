<template>
  <div class="bg">
    <div class="box">
      <div class="logo">
        <img class="logo-image" :src="require('@/assets/logo.png')" />
      </div>
      <el-form ref="loginForm" :model="loginForm" :rules="rules" class="form">
        <el-form-item prop="account">
          <el-input
            v-model="loginForm.account"
            placeholder="请输入账号"
            maxlength="20"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            placeholder="请输入密码"
            type="password"
            maxlength="20"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="btn" type="primary" @click="onSubmit"
            >登 录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import bcryptjs from "bcryptjs";
export default {
  data() {
    return {
      loginForm: {
        account: "",
        password: "",
      },
      rules: {
        account: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  methods: {
    onSubmit() {
      const password = bcryptjs.hashSync(this.loginForm.password, 10);
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.$api
            .post("/login", { account: this.loginForm.account, password })
            .then((res) => {
              console.log(res);
            });
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.bg {
  width: 100%;
  height: 100vh;
  background-image: url("../../assets/login-bg.png");
  display: flex;
  justify-content: center;
  align-items: center;
}
.box {
  width: 50%;
  height: 55%;
  background: rgba($color: #fff, $alpha: 0.5);
  border-radius: 30px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  .logo {
    flex: 5;
    width: 100%;
    overflow: hidden;
    padding: 30px;
    .logo-image {
      height: 100%;
      object-fit: cover;
    }
  }
  .form {
    flex: 8;
    .btn {
      width: 100%;
      margin-top: 15px;
    }
  }
}
::v-deep .el-input__inner {
  background-color: rgba($color: #fff, $alpha: 0.7);
}
</style>
