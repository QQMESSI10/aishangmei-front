<template>
  <div class="page user-page">
    <el-form :model="searchForm" label-width="60px" inline>
      <el-form-item label="姓名" label-width="50px">
        <el-input
          class="search-input"
          v-model="searchForm.name"
          placeholder="请输入"
        ></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input
          class="search-telephone"
          v-model="searchForm.telephone"
          type="number"
          placeholder="请输入"
        ></el-input>
      </el-form-item>
      <el-form-item label="生日" label-width="50px">
        <el-date-picker
          class="search-date"
          v-model="searchForm.birthday"
          type="date"
          placeholder="选择日期"
          @focus="forbid"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="warning">查询</el-button>
        <el-button>重置</el-button>
        <el-button type="warning" class="btn-add">新增会员</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="tableData"
      border
      stripe
      style="width: 100%; overflow-y: auto"
    >
      <el-table-column prop="name" label="姓名" width="120"> </el-table-column>
      <el-table-column prop="telephone" label="手机号" width="150">
      </el-table-column>
      <el-table-column
        prop="birthday"
        label="生日"
        width="170"
      ></el-table-column>
      <el-table-column label="持卡详情">
        <template slot-scope="scope">
          <el-link
            class="margin-right20"
            type="success"
            @click="showCard(scope)"
            >持卡详情</el-link
          >
        </template>
      </el-table-column>
      <el-table-column label="赠送项目详情">
        <template slot-scope="scope">
          <el-link
            class="margin-right20"
            type="success"
            @click="showProject(scope)"
            >赠送项目详情</el-link
          >
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-link
            class="margin-right20"
            type="primary"
            @click="toDetail(scope)"
            >消费记录</el-link
          >
          <el-link class="margin-right20" type="warning">修改信息</el-link>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
    <el-button type="warning" plain class="btn-home" @click="goBack"
      >返回主菜单</el-button
    >
    <el-dialog
      title="王木木 - 持卡详情"
      :visible.sync="cardVisible"
      width="550px"
      class="dialog-card"
    >
      <!-- <p class="title">王木木 - 15194102617</p> -->
      <el-table
        :data="cardData"
        border
        stripe
        height="100%"
        cell-class-name="card-cell-nopadding"
        style="width: 100%"
      >
        <el-table-column label="卡类型" prop="card"></el-table-column>
        <el-table-column label="余额" width="80" prop="money"></el-table-column>
        <el-table-column label="明细" width="100">
          <template slot-scope="scope">
            <el-button type="text" @click="cardDetail(scope.row)"
              >查看明细</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="cardVisible = false">关 闭</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="王木木 - 赠送项目"
      :visible.sync="projectVisible"
      width="550px"
      class="dialog-card"
    >
      <!-- <p class="title">王木木 - 15194102617</p> -->
      <el-table
        :data="projectData"
        border
        stripe
        height="100%"
        cell-class-name="card-cell-nopadding"
        style="width: 100%"
      >
        <el-table-column label="项目名称" prop="project"></el-table-column>
        <el-table-column label="获得日期" width="120">
          <template slot-scope="scope">
            <el-button type="text" @click="cardDetail(scope.row)"
              >2023-2-14</el-button
            >
          </template>
        </el-table-column>
        <el-table-column label="消费日期" width="120">
          <template slot-scope="scope">
            <el-button type="text" @click="cardDetail(scope.row)"
              >2023-2-15</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="projectVisible = false"
          >关 闭</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchForm: {
        name: "",
        telphone: "",
        birthday: "",
      },
      tableData: [
        {
          name: "王木木",
          telephone: "15194102617",
          project: "美甲",
          money: 90,
          server: "姚琳琳",
          birthday: "2023-2-12",
        },
        {
          name: "王木木",
          telephone: "15194102617",
          project: "美甲",
          money: 90,
          server: "姚琳琳",
          birthday: "2023-2-12",
        },
        {
          name: "王木木",
          telephone: "15194102617",
          project: "美甲",
          money: 90,
          server: "姚琳琳",
          birthday: "2023-2-12",
        },
        {
          name: "王木木",
          telephone: "15194102617",
          project: "美甲",
          money: 90,
          server: "姚琳琳",
          birthday: "2023-2-12",
        },
        {
          name: "王木木",
          telephone: "15194102617",
          project: "美甲",
          money: 90,
          server: "姚琳琳",
          birthday: "2023-2-12",
        },
        {
          name: "王木木",
          telephone: "15194102617",
          project: "美甲",
          money: 90,
          server: "姚琳琳",
          birthday: "2023-2-12",
        },
        {
          name: "王木木",
          telephone: "15194102617",
          project: "美甲",
          money: 90,
          server: "姚琳琳",
          birthday: "2023-2-12",
        },
        {
          name: "王木木",
          telephone: "15194102617",
          project: "美甲",
          money: 90,
          server: "姚琳琳",
          birthday: "2023-2-12",
        },
        {
          name: "王木木",
          telephone: "15194102617",
          project: "美甲",
          money: 90,
          server: "姚琳琳",
          birthday: "2023-2-12",
        },
        {
          name: "王木木",
          telephone: "15194102617",
          project: "美甲",
          money: 90,
          server: "姚琳琳",
          birthday: "2023-2-12",
        },
      ],
      total: 100,
      currentPage: 1,
      cardVisible: false,
      cardData: [
        { card: "七折优惠卡", money: 50 },
        { card: "七折优惠卡", money: 200 },
        { card: "七折优惠卡", money: 200 },
        { card: "七折优惠卡", money: 200 },
        { card: "七折优惠卡", money: 200 },
        { card: "七折优惠卡", money: 200 },
        { card: "七折优惠卡", money: 200 },
        { card: "七折优惠卡", money: 200 },
        { card: "七折优惠卡", money: 200 },
        { card: "七折优惠卡", money: 200 },
        { card: "七折优惠卡", money: 200 },
        { card: "七折优惠卡", money: 200 },
        { card: "七折优惠卡", money: 200 },
        { card: "七折优惠卡", money: 800 },
      ],
      projectVisible: false,
      projectData: [{ project: "价值99元美甲" }],
    };
  },
  methods: {
    showCard() {
      this.cardVisible = true;
    },
    cardDetail() {},
    showProject() {
      this.projectVisible = true;
    },
    handleSizeChange() {},
    handleCurrentChange() {},
    goBack() {
      history.go(-1);
    },
    forbid() {
      //禁止软键盘弹出
      document.activeElement.blur();
    },
  },
};
</script>

<style lang="scss" scoped>
.page {
  height: 100vh;
  overflow-y: auto;
  padding: 40px 50px 50px 50px;
  display: flex;
  flex-direction: column;
  align-items: start;
  // background: #a0cfff;
}
.search-input {
  width: 100px;
}
.search-telephone {
  width: 130px;
}
.search-date {
  width: 160px !important;
}
.btn-add {
  margin-left: 30px !important;
}
.el-pagination {
  align-self: flex-end;
  margin-top: 10px;
}
.el-table--border::after,
.el-table--group::after,
.el-table::before {
  background: none;
}
.btn-home {
  margin-top: 15px;
  align-self: center;
}
.dialog-card {
  .title {
    padding-bottom: 10px;
  }
}
</style>
<style>
.user-page .el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #e6a23c;
  color: #fff;
}
</style>
