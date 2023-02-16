<template>
  <div>
    <el-dialog
      title="添加会员"
      :visible="visible"
      width="350px"
      @close="closeDialog"
    >
      <el-form
        ref="form"
        :model="addUserForm"
        :rules="rules"
        label-width="90px"
      >
        <el-form-item label="姓名：" prop="name">
          <el-input
            v-model="addUserForm.name"
            placeholder="请输入"
            maxlength="10"
          ></el-input>
        </el-form-item>
        <el-form-item label="手机号：" prop="telephone">
          <el-input
            v-model="addUserForm.telephone"
            placeholder="请输入"
            type="number"
            maxlength="11"
          ></el-input>
        </el-form-item>
        <el-form-item label="出生日期：">
          <el-date-picker
            v-model="addUserForm.birthday"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
            @focus="forbid"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="userSubmit" :loading="btnLoading"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: "add",
    },
    userInfo: {
      type: Object,
      default: function () {
        return {
          name: "",
          telephone: "",
          birthday: "",
        };
      },
    },
  },
  data() {
    let checkPhone = (rule, value, callback) => {
      let reg = /^1[345789]\d{9}$/;
      if (!reg.test(value)) {
        callback(new Error("请输入11位手机号"));
      } else {
        callback();
      }
    };
    return {
      addUserForm: {
        name: "",
        telephone: "",
        birthday: "",
      },
      rules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        telephone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            type: "number",
            validator: checkPhone,
            message: "请输入正确的手机号",
            trigger: "blur",
          },
        ],
      },
      btnLoading: false,
    };
  },
  mounted() {},
  watch: {
    userInfo: {
      handler(newVal) {
        this.addUserForm = Object.assign({}, newVal);
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    closeDialog() {
      this.$emit("close");
    },
    formReset() {
      this.addUserForm = {
        name: "",
        telephone: "",
        birthday: "",
      };
    },
    forbid() {
      //禁止软键盘弹出
      document.activeElement.blur();
    },
    userSubmit() {
      this.btnLoading = true;
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$api
            .post(`user/${this.type}`, this.addUserForm)
            .then((res) => {
              if (res.status == 1) {
                this.$notify.success({
                  title: "成功",
                  message: this.type == "add" ? "添加会员成功" : "修改会员成功",
                });
                this.closeDialog();
                this.formReset();
                this.$emit("refresh", res.data);
              }
            })
            .finally(() => (this.btnLoading = false));
        } else {
          this.btnLoading = false;
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
