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
              ></select-user>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-button type="text" @click="addUserVisible = true"
              >添加会员</el-button
            >
            <add-user
              :visible="addUserVisible"
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
          v-for="(projectItem, index) in projectArr"
          :key="index"
        >
          <el-row>
            <el-col :span="12">
              <el-form-item label="服务项目：" prop="project">
                <el-select v-model="projectItem.project" placeholder="请选择">
                  <el-option
                    v-for="item in projectList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="金额：">
                <el-input v-model="projectItem.money">
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
                <el-select v-model="payItem.payType" placeholder="请选择">
                  <el-option
                    v-for="item in payTypeList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="9" class="balance" v-if="payItem.payType > 0">
              <el-button type="text">某某卡支付后余额：888元</el-button>
            </el-col>
            <el-col :span="9" v-if="payItem.payType == -1">
              <el-form-item label="面收金额：">
                <el-input v-model="payItem.money">
                  <template slot="append">元</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="3" class="add-icon">
              <el-button type="text" @click="payAdd(projectItem)"
                ><i class="el-icon-circle-plus-outline"></i
              ></el-button>
            </el-col>
          </el-row>
          <el-row>
            <!-- <el-button
              v-if="projectArr.length > 1"
              type="text"
              @click="removeProject"
              class="project-remove"
              >删除项目</el-button
            > -->
            <el-button
              v-if="index == projectArr.length - 1"
              type="text"
              @click="addProject"
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
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
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
          <el-button type="primary">提交</el-button>
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
        project: "",
        payType: "",
        money: "",
        server: "",
        remark: "",
        date: "",
        telephone: "15194102617",
      },
      userList: [
        { label: "姚琳琳(4589)", value: 1 },
        { label: "姚琳琳(1234)", value: 2 },
        { label: "秦祥(2617)", value: 3 },
      ],
      projectList: [
        { label: "美甲", value: 1 },
        { label: "美甲", value: 2 },
        { label: "美甲", value: 3 },
        { label: "美甲", value: 4 },
        { label: "美甲", value: 5 },
        { label: "美甲", value: 6 },
        { label: "美甲", value: 7 },
        { label: "美甲", value: 8 },
        { label: "美甲", value: 9 },
        { label: "美甲", value: 10 },
        { label: "美甲", value: 11 },
        { label: "美甲", value: 12 },
        { label: "美甲", value: 13 },
        { label: "美甲", value: 14 },
        { label: "美甲", value: 15 },
        { label: "美甲", value: 16 },
        { label: "美甲", value: 17 },
        { label: "美甲", value: 18 },
        { label: "美甲", value: 19 },
        { label: "美甲", value: 20 },
        { label: "美甲", value: 21 },
      ],
      serverList: [
        { label: "赵总", value: 1 },
        { label: "贝贝", value: 2 },
      ],
      payTypeList: [
        { label: "面收", value: -1 },
        { label: "各种卡...", value: 1 },
      ],
      projectArr: [
        {
          project: "",
          money: "",
          payArr: [{ type: "" }],
        },
      ],
      addUserVisible: false,
    };
  },
  created() {
    this.form.date = getDate();
  },
  methods: {
    addProject() {
      this.projectArr.push({
        project: "",
        money: "",
        payArr: [{ type: "" }],
      });
    },
    payAdd(project) {
      project.payArr.push({ type: "" });
    },
    addUserSubmit() {},
    removeProject() {},
    cancelPage() {
      history.go(-1);
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
</style>
