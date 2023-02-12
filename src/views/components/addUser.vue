<template>
  <div>
    <el-button type="text" @click="addUserVisible = true">添加会员</el-button>
    <el-dialog title="添加会员" :visible.sync="addUserVisible" width="350px">
      <el-form :model="addUserForm" label-width="90px">
        <el-form-item label="姓名：">
          <el-input
            v-model="addUserForm.name"
            placeholder="请输入"
            maxlength="10"
          ></el-input>
        </el-form-item>
        <el-form-item label="手机号：">
          <el-input
            v-model="addUserForm.telephone"
            placeholder="请输入"
            type="number"
            maxlength="10"
          ></el-input>
        </el-form-item>
        <el-form-item label="出生日期：">
          <el-date-picker
            v-model="addUserForm.birthday"
            type="date"
            placeholder="选择日期"
            @focus="forbid"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addUserVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUserSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      addUserVisible: false,
      addUserForm: {
        name: "",
        telephone: "",
        birthday: "",
      },
    };
  },
  methods: {
    forbid() {
      //禁止软键盘弹出
      document.activeElement.blur();
    },
    addUserSubmit() {},
  },
};
</script>

<style lang="scss" scoped></style>
