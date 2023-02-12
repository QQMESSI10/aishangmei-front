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
          <el-button
            class="btn"
            type="primary"
            @click="onSubmit"
            :loading="btnLoading"
            >登 录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
// import bcryptjs from "bcryptjs";
import { setToken } from "../../utils/user.js";
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
      btnLoading: false,
    };
  },
  methods: {
    onSubmit() {
      this.btnLoading = true;
      // const password = bcryptjs.hashSync(this.loginForm.password);
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.$api
            .post("admin/login", this.loginForm)
            .then((res) => {
              if (res.status == 1) {
                const nowDate = new Date();
                const year = nowDate.getFullYear();
                const month = nowDate.getMonth() + 1;
                const date = nowDate.getDate();
                this.$message.success(
                  `${year}年${month}月${date}日，欢迎登录爱尚美美业登记系统`
                );
                setToken(this.createToken());
                this.$router.replace("/");
              }
            })
            .finally(() => (this.btnLoading = false));
        } else {
          this.btnLoading = false;
          return false;
        }
      });
    },
    createToken() {
      const account = this.loginForm.account;
      let tokenTop = "";
      for (let e of account) {
        const random = Math.floor(Math.random() * 10);
        tokenTop = tokenTop + random + e;
      }
      console.log(tokenTop + String(new Date().getTime()));
      return tokenTop + String(new Date().getTime());
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
