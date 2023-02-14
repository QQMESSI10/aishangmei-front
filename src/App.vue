<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  border: none;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.el-scrollbar .el-scrollbar__bar {
  opacity: 1 !important;
}
.margin-right20 {
  margin-right: 20px;
}
.card-cell-nopadding {
  padding: 0 !important;
}

// 设置dialog弹窗高度
.dialog-card .el-dialog__body {
  padding: 10px 20px;
}
.el-dialog {
  max-height: 70vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  .el-dialog__body {
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }
}
</style>
