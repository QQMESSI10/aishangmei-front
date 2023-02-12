<template>
  <div class="page card-history">
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
      <el-form-item label="服务人">
        <el-input
          class="search-input"
          v-model="searchForm.server"
          placeholder="请输入"
        ></el-input>
      </el-form-item>
      <el-form-item label="日期" label-width="50px">
        <el-date-picker
          class="search-date"
          v-model="searchForm.date"
          type="date"
          placeholder="选择日期"
          @focus="forbid"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="success">查询</el-button>
        <el-button>重置</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="tableData"
      border
      stripe
      style="width: 100%; overflow-y: auto"
    >
      <el-table-column prop="name" label="姓名" width="100"> </el-table-column>
      <el-table-column prop="telephone" label="手机号" width="130">
      </el-table-column>
      <el-table-column prop="project" label="充卡类型"></el-table-column>
      <el-table-column
        prop="money"
        label="充卡金额"
        width="100"
      ></el-table-column>
      <el-table-column
        prop="server"
        label="服务人"
        width="100"
      ></el-table-column>
      <el-table-column prop="date" label="日期" width="150"></el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-link
            class="margin-right20"
            type="primary"
            @click="toDetail(scope)"
            >详情</el-link
          >
          <el-link class="margin-right20" type="warning">修改</el-link>
          <el-link class="margin-right20" type="danger">删除</el-link>
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
    <el-button type="success" plain class="btn-home" @click="goBack"
      >返回主菜单</el-button
    >
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchForm: {
        name: "",
        telphone: "",
        server: "",
        date: "",
      },
      tableData: [
        {
          name: "王木木",
          telephone: "15194102617",
          project: "美甲",
          money: 90,
          server: "姚琳琳",
          date: "2023-2-12 08:10",
        },
        {
          name: "王木木",
          telephone: "15194102617",
          project: "美甲",
          money: 90,
          server: "姚琳琳",
          date: "2023-2-12 08:10",
        },
        {
          name: "王木木",
          telephone: "15194102617",
          project: "美甲",
          money: 90,
          server: "姚琳琳",
          date: "2023-2-12 08:10",
        },
        {
          name: "王木木",
          telephone: "15194102617",
          project: "美甲",
          money: 90,
          server: "姚琳琳",
          date: "2023-2-12 08:10",
        },
        {
          name: "王木木",
          telephone: "15194102617",
          project: "美甲",
          money: 90,
          server: "姚琳琳",
          date: "2023-2-12 08:10",
        },
        {
          name: "王木木",
          telephone: "15194102617",
          project: "美甲",
          money: 90,
          server: "姚琳琳",
          date: "2023-2-12 08:10",
        },
        {
          name: "王木木",
          telephone: "15194102617",
          project: "美甲",
          money: 90,
          server: "姚琳琳",
          date: "2023-2-12 08:10",
        },
        {
          name: "王木木",
          telephone: "15194102617",
          project: "美甲",
          money: 90,
          server: "姚琳琳",
          date: "2023-2-12 08:10",
        },
        {
          name: "王木木",
          telephone: "15194102617",
          project: "美甲",
          money: 90,
          server: "姚琳琳",
          date: "2023-2-12 08:10",
        },
        {
          name: "王木木",
          telephone: "15194102617",
          project: "美甲",
          money: 90,
          server: "姚琳琳",
          date: "2023-2-12 08:10",
        },
      ],
      total: 100,
      currentPage: 1,
    };
  },
  methods: {
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
</style>
<style>
.card-history .el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #67c23a;
  color: #fff;
}
</style>
