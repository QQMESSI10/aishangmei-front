<template>
  <div
    class="page"
    v-loading="pageLoading"
    :element-loading-text="
      '正在导入数据中，请勿离开本页面（成功：' +
      successNum +
      '条，失败：' +
      errorNum +
      '条）'
    "
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <div class="header">
      <el-button class="back" type="primary" size="small" @click="toHome"
        >返回首页</el-button
      >
      <p class="title">数据导入类型：{{ typeName[type] }}</p>
    </div>
    <el-table :data="tableData" border stripe style="width: 80%; margin: 0 10%">
      <template v-if="type == 'user'">
        <el-table-column label="姓名" align="center">
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.name"
              placeholder="请输入姓名"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column label="手机号" align="center">
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.telephone"
              placeholder="请输入手机号"
            ></el-input>
          </template>
        </el-table-column>
      </template>
      <template v-if="type == 'card'">
        <el-table-column label="卡名" align="center">
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.name"
              placeholder="请输入卡名"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column label="折扣力度" align="center">
          <template slot-scope="scope">
            <el-input
              v-model.number="scope.row.discount"
              type="number"
              placeholder="例如：0.9"
            ></el-input>
          </template>
        </el-table-column>
      </template>
      <template v-if="type == 'server'">
        <el-table-column label="服务人员姓名" align="center">
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.name"
              placeholder="请输入服务人员姓名"
            ></el-input>
          </template>
        </el-table-column>
      </template>
      <template v-if="type == 'project'">
        <el-table-column label="服务项目" align="center">
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.name"
              placeholder="请输入服务项目名称"
            ></el-input>
          </template>
        </el-table-column>
      </template>
      <template v-if="type == 'userCard'">
        <el-table-column label="会员" align="center">
          <template slot-scope="scope">
            <select-user :userList="userList" :form="scope.row"></select-user>
            <!-- <el-select v-model="scope.row.user" clearable>
              <el-option
                v-for="item in userList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select> -->
          </template>
        </el-table-column>
        <el-table-column label="卡类型" align="center">
          <template slot-scope="scope">
            <el-select v-model="scope.row.cardId" clearable>
              <el-option
                v-for="item in cardList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="余额" align="center">
          <template slot-scope="scope">
            <el-input
              v-model.number="scope.row.balance"
              type="number"
              placeholder="例如：100"
            ></el-input>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <div class="total">有效条数：{{ validData.length }}条</div>
    <div class="btn-group">
      <el-button
        :disabled="tableData.length >= 50"
        type="primary"
        class="add-btn"
        @click="addTableRows"
        >增加10条</el-button
      >
      <el-button
        type="success"
        :disabled="validData.length == 0"
        @click="submit"
        >确认导入</el-button
      >
    </div>
    <el-dialog title="" :visible="resultDialog" :show-close="false">
      <el-result
        :icon="resultDialogData.icon"
        :title="resultDialogData.title"
        :subTitle="resultDialogData.subTitle"
      >
        <template slot="extra">
          <el-button type="success" size="medium" @click="toHome"
            >返回首页</el-button
          >
          <el-button type="primary" size="medium" @click="goon"
            >继续导入</el-button
          >
        </template>
      </el-result>
    </el-dialog>
  </div>
</template>

<script>
import selectUser from "../components/selectUser.vue";
export default {
  components: { selectUser },
  data() {
    return {
      type: "",
      typeName: {
        user: "会员信息",
        card: "卡类型",
        server: "服务人员",
        userCard: "会员持卡",
        project: "服务项目",
      },
      tableData: [],
      successNum: 0,
      errorNum: 0,
      errorString: "",
      pageLoading: false,
      resultDialog: false,
      userList: [],
      cardList: [],
    };
  },
  created() {
    if (this.$route.params.type) {
      this.type = this.$route.params.type;
      this.addTableRows();
    } else {
      this.$router.replace("/");
    }
    this.getUser();
    this.getCard();
  },
  computed: {
    validData() {
      let submitData = [];
      switch (this.type) {
        case "user":
          submitData = this.tableData.filter((f) => f.name);
          break;
        case "card":
          submitData = this.tableData.filter((f) => f.name && f.discount);
          break;
        case "server":
          submitData = this.tableData.filter((f) => f.name);
          break;
        case "userCard":
          submitData = this.tableData.filter(
            (f) => f.user && f.cardId && f.balance
          );
          break;
        case "project":
          submitData = this.tableData.filter((f) => f.name);
          break;
        default:
          break;
      }
      return submitData;
    },
    resultDialogData() {
      if (this.successNum > 0 && this.errorNum == 0) {
        return {
          icon: "success",
          title: "导入成功",
          subTitle: `本次导入成功${this.successNum}条数据`,
        };
      } else if (this.successNum > 0 && this.errorNum > 0) {
        return {
          icon: "warning",
          title: "导入部分失败",
          subTitle: `本次导入成功${this.successNum}条数据，失败${this.errorNum}条数据，失败原因：${this.errorString}，请联系系统管理员尽快处理`,
        };
      } else if (this.successNum == 0 && this.errorNum > 0) {
        return {
          icon: "error",
          title: "导入失败",
          subTitle: `本次导入失败${this.errorNum}条数据，失败原因：${this.errorString}，请联系系统管理员尽快处理`,
        };
      } else {
        return {
          icon: "info",
          title: "",
          subTitle: "",
        };
      }
    },
  },
  methods: {
    submit() {
      this.$confirm(
        `请确认是否要将这${this.validData.length}条数据导入${
          this.typeName[this.type]
        }`,
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          this.pageLoading = true;
          this.successNum = 0;
          this.errorNum = 0;
          this.errorString = "";
          let promiseArr = [];
          let api = "";
          switch (this.type) {
            case "user":
              api = "user/add";
              break;
            case "card":
              api = "card/add";
              break;
            case "server":
              api = "server/add";
              break;
            case "userCard":
              api = "card/userCard/add";
              break;
            case "project":
              api = "project/add";
              break;
            default:
              break;
          }
          this.validData.forEach((e) => {
            let promise = new Promise((resolve, reject) => {
              this.$api
                .post(api, e)
                .then((res) => {
                  if (res.status == 1) {
                    this.successNum++;
                    resolve(res);
                  } else {
                    this.errorNum++;
                    reject(res.message);
                  }
                })
                .catch((err) => {
                  this.errorNum++;
                  reject(err);
                });
            });
            promiseArr.push(promise);
          });
          Promise.all(promiseArr)
            .catch((err) => {
              this.errorString = err;
            })
            .finally(() => {
              this.tableData = [];
              this.addTableRows();
              this.pageLoading = false;
              this.resultDialog = true;
            });
        })
        .catch(() => {
          return false;
        });
    },
    addTableRows() {
      for (let i = 0; i < 10; i++) {
        switch (this.type) {
          case "user":
            this.tableData.push({ name: "", telephone: "" });
            break;
          case "card":
            this.tableData.push({ name: "", discount: "" });
            break;
          case "server":
            this.tableData.push({ name: "" });
            break;
          case "userCard":
            this.tableData.push({ user: "", cardId: "", balance: null });
            break;
          case "project":
            this.tableData.push({ name: "" });
            break;
          default:
            break;
        }
      }
    },
    getUser() {
      this.$api.post("user/list").then((res) => {
        if (res.status == 1) {
          this.userList = res.data.list;
        }
      });
    },
    getCard() {
      this.$api.post("card/list").then((res) => {
        if (res.status == 1) {
          this.cardList = res.data.list;
        }
      });
    },
    goon() {
      this.resultDialog = false;
    },
    toHome() {
      this.$router.replace("/");
    },
  },
};
</script>

<style lang="scss" scoped>
.page {
  background: #ddd;
}
.header {
  padding: 15px 0;
  position: relative;
  .title {
    font-size: 18px;
    font-weight: bold;
  }
  .back {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
  }
}
.total {
  margin: 10px;
}
.btn-group {
  padding-bottom: 20px;
}
.add-btn {
  margin-right: 30px;
}
</style>
