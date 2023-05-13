<template>
  <div class="page">
    <div class="box">
      <div class="top">
        <img class="logo" :src="require('@/assets/logo.png')" />
        <p class="top-title">爱尚美消费登记单</p>
      </div>
      <div class="date">
        <el-date-picker
          v-model="form.date"
          type="datetime"
          placeholder="选择日期时间"
          value-format="yyyy-MM-dd hh:mm:ss"
        >
        </el-date-picker>
      </div>
      <el-form ref="form" :model="form" label-width="90px" class="form">
        <el-row>
          <el-col :span="10">
            <el-form-item label="姓名：" prop="user">
              <select-user
                ref="user"
                :userList="userList"
                :form="form"
                :disabled="!!type"
                @userChange="userChange"
              ></select-user>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-button type="text" @click="addUserVisible = true"
              >添加会员</el-button
            >
            <add-user
              :visible="addUserVisible"
              @refresh="addUser"
              @close="addUserVisible = false"
            ></add-user>
          </el-col>
          <el-col :span="12">
            <el-col :span="24">
              <el-form-item label="手机号：">
                <el-input disabled v-model="form.telephone"></el-input>
              </el-form-item>
            </el-col>
            <!-- <el-col :span="6">
              <el-button type="text">修改手机号</el-button>
            </el-col> -->
          </el-col>
        </el-row>
        <div
          class="project-box"
          :style="projectItem.isError ? { borderColor: '#f00' } : {}"
          v-for="(projectItem, index) in projectArr"
          :key="index"
        >
          <el-row>
            <el-col :span="12">
              <el-form-item label="服务项目：" prop="project">
                <el-select v-model="projectItem.project" placeholder="请选择">
                  <el-option
                    v-for="item in projectList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="金额：">
                <el-input v-model.number="projectItem.money" type="number">
                  <template slot="append">元</template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row
            v-for="(payItem, payIndex) in projectItem.payArr"
            :key="payIndex"
          >
            <el-col :span="12">
              <el-form-item label="支付方式：" prop="payType">
                <el-select
                  v-model="payItem.payType"
                  placeholder="请选择"
                  @change="payTypeChange(payItem)"
                >
                  <el-option
                    v-for="item in payTypeList"
                    :key="item.id"
                    :label="item.name + '(余额：' + item.balance + '元)'"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-row>
                <el-col :span="payItem.payType == -1 ? 24 : 13">
                  <el-form-item label="支付金额：" class="input-append-min">
                    <el-input
                      v-model.number="payItem.money"
                      placeholder="0"
                      type="number"
                      @change="payMoneyChange(payItem)"
                      :disabled="!payItem.payType"
                    >
                      <template slot="append">元</template>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="11" v-if="payItem.payType != -1">
                  <el-form-item
                    label="实扣："
                    class="input-append-min"
                    label-width="65px"
                    disabled
                  >
                    <el-input
                      v-model.number="payItem.realMoney"
                      type="number"
                      placeholder="0"
                      @change="payRealMoneyChange(payItem)"
                      :disabled="true"
                    >
                      <template slot="append">元</template>
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="1" class="add-icon">
              <el-button type="text" @click="payAdd(projectItem)"
                ><i class="el-icon-circle-plus-outline"></i
              ></el-button>
            </el-col>
          </el-row>
          <el-row>
            <el-popconfirm
              v-if="projectArr.length > 1 && index != 0"
              title="请确认是否要删除该项目？"
              @confirm="removeProject(index)"
            >
              <el-button
                type="text"
                slot="reference"
                class="project-operate project-remove"
                >删除项目</el-button
              >
            </el-popconfirm>
            <el-button
              v-if="index == projectArr.length - 1"
              type="text"
              @click="addProject"
              class="project-operate"
              >新增项目</el-button
            >
          </el-row>
        </div>
        <el-row>
          <el-col :span="12">
            <el-form-item label="服务人：">
              <el-select v-model="form.server" filterable placeholder="请选择">
                <el-option
                  v-for="item in serverList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="备注：" prop="remark">
          <el-input
            type="textarea"
            v-model="form.remark"
            maxlength="80"
            show-word-limit
            :autosize="{ minRows: 4 }"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit">提交</el-button>
          <el-button class="btn-cancel" @click="cancelPage">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { getDate } from "../../utils/utils";
import selectUser from "../components/selectUser.vue";
import addUser from "../components/addUser.vue";
export default {
  components: { selectUser, addUser },
  data() {
    return {
      form: {
        user: "",
        server: "",
        remark: "",
        date: "",
        telephone: "",
      },
      userList: [],
      projectList: [],
      userProject: [],
      serverList: [],
      basePayType: [{ id: -1, name: "面收", balance: 0 }],
      payTypeList: [],
      projectArr: [
        {
          project: "",
          money: null,
          payArr: [{ payType: "", money: null, realMoney: null }],
        },
      ],
      type: "",
      addUserVisible: false,
      submitProject: [],
    };
  },
  created() {
    this.getUser();
    this.getProject();
    this.getServer();
    if (this.$route.query.id) {
      this.type = this.$route.query.type;
      this.getInfo(this.$route.query.id);
    } else {
      this.type = "";
      this.form.date = getDate();
    }
  },
  methods: {
    submit() {
      this.btnLoading = true;
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.validProject()) {
            if (this.submitProject.length == 0) {
              this.$message.error("没有有效的项目");
            } else {
              this.loading = true;
              // eslint-disable-next-line no-unused-vars
              const { telephone, ...info } = this.form;
              const param = {
                ...info,
                project: this.submitProject,
              };
              console.log(param);
              this.$api
                .post(
                  this.type == "edit" ? "consume/edit" : "consume/add",
                  param
                )
                .then((res) => {
                  if (res.status == 1) {
                    this.$notify.success({
                      title: "成功",
                      message:
                        this.type == "edit"
                          ? "消费登记表修改成功！"
                          : "消费登记表提交成功！",
                    });
                    if (this.type == "edit") {
                      this.cancelPage();
                    } else {
                      this.$router.replace("/");
                    }
                  }
                })
                .finally(() => {
                  this.btnLoading = false;
                  this.loading = false;
                });
            }
          } else {
            this.$message.error("部分项目金额与支付金额不相等");
          }
        } else {
          this.$message.error("请正确填写登记表信息后提交");
          this.btnLoading = false;
          return false;
        }
      });
    },
    validProject() {
      let valid = true;
      this.submitProject = [];
      this.projectArr.forEach((project) => {
        delete project.isError;
        if (project.project) {
          let payMoney = 0;
          project.payArr.forEach((pay) => {
            payMoney += Number(pay.money);
          });
          console.log(payMoney);
          console.log(project.money);
          if (Number(project.money) !== payMoney) {
            valid = false;
            project.isError = true;
          } else {
            this.submitProject.push(project);
          }
        }
      });
      return valid;
    },
    getInfo(id) {
      this.loading = true;
      this.$api
        .post("card/recharge/one", { id })
        .then((res) => {
          if (res.status == 1) {
            this.form = res.data;
            this.form.projectArr = [];
            res.data.projectData.forEach((e) => {
              this.form.projectArr.push({ projectId: e });
            });
          }
        })
        .finally(() => (this.loading = false));
    },
    getUser() {
      this.$api.post("user/list").then((res) => {
        if (res.status == 1) {
          this.userList = res.data.list;
        }
      });
    },
    getUserCard() {
      this.$api
        .post("card/userCard", { userId: this.form.user })
        .then((res) => {
          if (res.status == 1) {
            this.payTypeList = this.basePayType.concat(res.data);
          }
        });
    },
    getProject() {
      this.$api.post("project/list").then((res) => {
        if (res.status == 1) {
          this.projectList = res.data.list;
        }
      });
    },
    getServer() {
      this.$api.post("server/list").then((res) => {
        if (res.status == 1) {
          this.serverList = res.data.list;
        }
      });
    },
    addProject() {
      this.projectArr.push({
        project: "",
        money: null,
        payArr: [{ payType: "", money: null, realMoney: null }],
      });
    },
    payAdd(project) {
      project.payArr.push({ payType: "", money: null, realMoney: null });
    },
    addUserSubmit() {},
    removeProject(index) {
      this.projectArr.splice(index, 1);
    },
    cancelPage() {
      // history.go(-1);
      this.$router.back();
    },
    addUser(info) {
      this.getUser();
      this.form.user = info.id;
      this.form.telephone = info.telephone;
    },
    userChange(info) {
      this.form.telephone = info.telephone;
      this.getUserCard();
      this.getUserProject();
    },
    payTypeChange(item) {
      item.money = null;
      item.realMoney = null;
    },
    payMoneyChange(item) {
      if (item.money) {
        let discount = 1;
        if (item.payType && item.payType != -1) {
          discount = this.payTypeList.find(
            (f) => f.id == item.payType
          ).discount;
        }
        item.realMoney = parseInt(item.money * discount);
      } else {
        item.realMoney = null;
      }
    },
    getUserProject() {
      this.$api
        .post("project/userProject", { userId: this.form.user })
        .then((res) => {
          if (res.status == 1) {
            this.userProject = res.data;
          }
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.page {
  height: 100vh;
  overflow-y: auto;
  padding: 30px 50px 50px 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #a0cfff;
  // background-image: url("../../assets/login-bg.png");
}
.box {
  // border: 1px solid #000;
  padding: 15px;
  border-radius: 4px;
  width: 800px;
  background: #fff;
  border-radius: 20px;
}
.top {
  display: flex;
  text-align: center;
  justify-content: center;
  .logo {
    height: 40px;
    object-fit: cover;
  }
  .top-title {
    font-size: 20px;
    font-weight: bold;
    height: 40px;
    line-height: 40px;
    margin-left: 10px;
  }
}
.date {
  text-align: right;
  margin-top: 10px;
}
.form {
  margin-top: 20px;
  .balance {
    text-align: left;
    padding-left: 20px;
    .el-button--text {
      color: #909399;
    }
  }
  .project-box {
    padding: 10px 5px 0 5px;
    border: 1px dashed #ccc;
    margin-bottom: 10px;
    .add-icon .el-button {
      font-size: 20px;
      padding: 10px;
    }
  }
  .image-upload {
    text-align: left;
  }
  .btn-cancel {
    margin-left: 40px;
  }
}
.el-select {
  width: 100%;
}
.el-input__inner {
  -webkit-user-select: auto !important;
  -khtml-user-select: auto !important;
  -moz-user-select: auto !important;
  -ms-user-select: auto !important;
  -o-user-select: auto !important;
  user-select: auto !important;
}
.project-remove {
  color: #f56c6c !important;
}
.project-add {
  margin-left: 20px;
}
.money-tips {
  height: 40px;
  line-height: 40px;
  font-size: 14px;
}
.project-operate {
  margin: 0 10px;
}
</style>
