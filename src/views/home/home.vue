<template>
  <div class="page">
    <div class="logo">
      <img class="logo-image" :src="require('@/assets/logo.png')" />
    </div>
    <div class="box-group">
      <div class="box">
        <el-button
          type="primary"
          plain
          class="box-btn"
          @click="toPage('manicure')"
          >消费登记</el-button
        >
        <el-link
          type="primary"
          class="history"
          @click="toPage('manicure/history')"
          >历史记录</el-link
        >
      </div>
      <div class="box">
        <el-button type="success" plain class="box-btn" @click="toPage('card')"
          >充卡登记</el-button
        >
        <el-link type="success" class="history" @click="toPage('card/history')"
          >历史记录</el-link
        >
      </div>
      <div class="box">
        <el-button type="warning" plain class="box-btn" @click="toPage('user')"
          >会员查询</el-button
        >
        <!-- <el-link type="warning" class="history">历史记录</el-link> -->
      </div>
      <div class="box">
        <el-button type="danger" plain class="box-btn" @click="exit"
          >退出系统</el-button
        >
        <!-- <el-button type="danger" plain class="box-btn" @click="showData"
          >数据统计</el-button
        >
        <el-link type="danger" class="history" @click="exit">退出系统</el-link> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    exit() {
      this.$confirm("请确认是否要退出爱尚美美业系统?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$router.replace("/login");
        })
        .catch();
    },
    toPage(page) {
      this.$router.push("/" + page);
    },
    showData() {
      this.$alert("数据统计模块正在开发中，尽请期待...", "功能开发中", {
        confirmButtonText: "确定",
        callback: () => {},
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.page {
  min-height: 100vh;
  padding: 80px 50px 80px 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #eee;
  // background-image: url("../../assets/login-bg.png");
}
.logo {
  text-align: center;
  .logo-image {
    width: 130px;
    object-fit: cover;
  }
}
.box-group {
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  padding-top: 50px;
  width: 100%;
  .box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 50%;
    padding: 6% 7%;
    .box-btn {
      width: 100%;
      height: 70px;
      // height: 100%;
      font-size: 25px;
      border-radius: 30px;
      margin-bottom: 10px;
    }
  }
}
.history {
  font-size: 17px;
  text-decoration: underline;
  padding-top: 10px;
}
</style>
