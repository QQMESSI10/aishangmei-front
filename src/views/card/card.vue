<template>
  <div class="page">
    <div class="box">
      <div class="top">
        <img class="logo" :src="require('@/assets/logo.png')" />
        <p class="top-title">爱尚美充卡登记单</p>
      </div>
      <div class="date">
        <el-date-picker
          v-model="form.date"
          type="datetime"
          placeholder="选择日期时间"
          value-format="yyyy-MM-dd hh:mm:ss"
          :disabled="type == 'read'"
          v-loading="loading"
        >
        </el-date-picker>
      </div>
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-width="100px"
        class="form"
        v-loading="loading"
      >
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
          <el-col :span="2" v-if="type == ''">
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
        <el-form-item label="充卡类型：" prop="card">
          <el-row>
            <el-col :span="12">
              <el-select
                v-model="form.card"
                placeholder="请选择"
                :disabled="!!type"
                @change="cardChange"
              >
                <el-option
                  v-for="item in cardTypeList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="充值金额：" prop="money">
          <el-row>
            <el-col :span="12">
              <el-input
                v-model.number="form.money"
                type="number"
                :disabled="!!type"
                placeholder="请输入"
              >
                <template slot="append">元</template>
              </el-input>
            </el-col>
            <el-col
              :span="12"
              v-if="selectCard.type == 1 || selectCard.type == 3"
            >
              <span>到账余额：{{ realMoney }}元</span>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="赠送服务：">
          <el-row v-if="form.projectArr.length == 0">
            <el-col :span="16">无赠送服务</el-col>
          </el-row>
          <el-row v-for="(item, index) in form.projectArr" :key="index">
            <el-col :span="12" class="gift-col">
              <el-select
                v-model="item.projectId"
                placeholder="请选择"
                clearable
                :disabled="!!type"
              >
                <el-option
                  v-for="item in projectList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="12" class="gift-col">
              <el-date-picker
                v-model="item.expiryDate"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="使用截止日期"
                :disabled="!!type"
              >
              </el-date-picker>
            </el-col>
          </el-row>
          <el-button type="text" @click="addGift" v-if="type == ''"
            >添加赠送服务</el-button
          >
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item label="服务人：" prop="serverId">
              <el-select
                v-model="form.serverId"
                filterable
                placeholder="请选择"
                :disabled="type == 'read'"
              >
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
            maxlength="80"
            show-word-limit
            v-model="form.remark"
            :autosize="{ minRows: 4 }"
            :disabled="type == 'read'"
          ></el-input>
        </el-form-item>
        <el-form-item style="text-align: right">
          <template v-if="type == 'edit'">
            <el-button type="primary" @click="submit" v-loading="btnLoading"
              >保存</el-button
            >
            <el-button class="btn-cancel" @click="cancelPage">取消</el-button>
          </template>
          <template v-else-if="type == 'read'">
            <el-button type="primary" @click="cancelPage">关闭</el-button>
          </template>
          <template v-else>
            <el-button type="primary" @click="submit" v-loading="btnLoading"
              >提交</el-button
            >
            <el-button class="btn-cancel" @click="cancelPage">取消</el-button>
          </template>
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
      date: "",
      form: {
        date: "",
        user: "",
        telephone: "",
        card: "",
        serverId: "",
        money: null,
        projectArr: [{ projectId: "", expiryDate: "" }],
      },
      userList: [],
      cardTypeList: [],
      projectList: [],
      serverList: [],
      addUserVisible: false,
      loading: false,
      btnLoading: false,
      type: "",
      rules: {
        user: [{ required: true, message: "请选择会员", trigger: "change" }],
        card: [
          { required: true, message: "请选择充卡类型", trigger: "change" },
        ],
        money: [
          { required: true, message: "请输入充值金额", trigger: "change" },
        ],
        serverId: [
          { required: true, message: "请选择服务人", trigger: "change" },
        ],
      },
      reg: /^(\d{3})\d{4}(\d{4})$/,
      selectCard: {},
    };
  },
  created() {
    this.getUser();
    this.getCard();
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
  computed: {
    realMoney() {
      if (this.selectCard.type == 1 || this.selectCard.type == 3) {
        if (this.form.money && this.form.money >= this.selectCard.params[0]) {
          return this.form.money + this.selectCard.params[1];
        } else {
          return this.form.money;
        }
      } else if (this.selectCard.type == 4) {
        return this.selectCard.params[1];
      } else if (this.selectCard.type == 2) {
        return this.form.money;
      } else {
        return 0;
      }
    },
  },
  methods: {
    submit() {
      this.btnLoading = true;
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.loading = true;
          // eslint-disable-next-line no-unused-vars
          const { telephone, projectArr, ...info } = this.form;
          const projectData = projectArr.filter((f) => f.projectId);
          this.$api
            .post(
              this.type == "edit" ? "card/recharge/edit" : "card/recharge",
              {
                projectData,
                ...info,
                realMoney: this.realMoney,
              }
            )
            .then((res) => {
              if (res.status == 1) {
                this.$notify.success({
                  title: "成功",
                  message:
                    this.type == "edit"
                      ? "充卡登记表修改成功！"
                      : "充卡登记表提交成功！",
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
        } else {
          this.$message.error("请正确填写登记表信息后提交");
          this.btnLoading = false;
          return false;
        }
      });
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
              this.form.projectArr.push(e);
            });
          }
        })
        .finally(() => (this.loading = false));
    },
    addGift() {
      this.form.projectArr.push({ projectId: "", expiryDate: "" });
    },
    cardChange(val) {
      this.selectCard = this.cardTypeList.find((f) => f.id == val);
      this.selectCard.params = JSON.parse(this.selectCard.params);
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
          this.cardTypeList = res.data.list;
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
    addUser(info) {
      this.getUser();
      this.form.user = info.id;
      this.form.telephone = info.telephone;
    },
    userChange(info) {
      this.form.telephone = info.telephone;
    },
    cancelPage() {
      // history.go(-1);
      this.$router.back();
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
  background: #e1f3d8;
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
  .gift-col {
    margin-bottom: 10px;
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
</style>
