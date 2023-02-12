<template>
  <div class="page">
    <div class="box">
      <div class="top">
        <img class="logo" :src="require('@/assets/logo.png')" />
        <p class="top-title">爱尚美充卡登记单</p>
      </div>
      <div class="date">{{ date }}</div>
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
            <add-user></add-user>
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
        <el-form-item label="充卡类型：">
          <el-row>
            <el-col :span="12">
              <el-select v-model="form.cardType" placeholder="请选择">
                <el-option
                  v-for="item in cardTypeList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="充值金额：">
          <el-row>
            <el-col :span="12">
              <el-input v-model="form.money">
                <template slot="append">元</template>
              </el-input>
            </el-col>
            <el-col :span="12">
              <span>充值后卡内余额：9999元</span>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="赠送服务：">
          <el-row v-for="(item, index) in form.giftArr" :key="index">
            <el-col :span="16" class="gift-col">
              <el-select v-model="item.projectId" placeholder="请选择">
                <el-option
                  v-for="item in projectList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-col>
          </el-row>
          <el-button type="text" @click="addGift">添加赠送服务</el-button>
        </el-form-item>
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
      date: "",
      form: {
        giftArr: [{ projectId: "" }],
      },
      userList: [],
      cardTypeList: [],
      projectList: [],
    };
  },
  create() {
    this.date = getDate();
  },
  methods: {
    addGift() {
      this.form.giftArr.push({ projectId: "" });
    },
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
