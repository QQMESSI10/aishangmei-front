<template>
  <div class="page card-history">
    <el-form :model="searchForm" label-width="60px" inline>
      <el-form-item label="姓名" label-width="50px">
        <el-input
          class="search-input"
          v-model="searchForm.name"
          @change="search"
          placeholder="请输入"
        ></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input
          class="search-telephone"
          v-model="searchForm.telephone"
          type="number"
          @change="search"
          placeholder="请输入"
        ></el-input>
      </el-form-item>
      <el-form-item label="服务人">
        <el-select
          v-model="searchForm.server"
          filterable
          @change="search"
          placeholder="请选择"
          clearable
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
      <el-form-item label="日期" label-width="50px">
        <el-date-picker
          class="search-date"
          v-model="searchForm.date"
          type="date"
          placeholder="选择日期"
          value-format="yyyy-MM-dd"
          clearable
          @change="search"
          @focus="forbid"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="search">查询</el-button>
        <el-button @click="formReset">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="tableData"
      border
      stripe
      style="width: 100%; overflow-y: auto"
      v-loading="tableLoading"
    >
      <el-table-column prop="user" label="姓名" width="90"> </el-table-column>
      <el-table-column prop="telephone" label="手机号" width="120">
      </el-table-column>
      <el-table-column prop="card" label="充卡类型"></el-table-column>
      <el-table-column
        prop="money"
        label="充卡金额"
        width="90"
      ></el-table-column>
      <el-table-column
        prop="server"
        label="服务人"
        width="90"
      ></el-table-column>
      <el-table-column prop="date" label="日期" width="170"></el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-link
            class="margin-right20"
            type="primary"
            @click="toDetail(scope.row)"
            >详情</el-link
          >
          <el-link
            class="margin-right20"
            type="warning"
            @click="toEdit(scope.row)"
            >修改</el-link
          >
          <!-- <el-link class="margin-right20" type="danger">删除</el-link> -->
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
  name: "cardHistory",
  data() {
    return {
      searchForm: {
        name: "",
        telphone: "",
        server: "",
        date: "",
      },
      tableData: [],
      total: 100,
      currentPage: 1,
      tableLoading: false,
      exitType: "",
      serverList: [],
    };
  },
  created() {
    this.search();
    this.getServer();
  },
  methods: {
    getTableData() {
      this.tableLoading = true;
      this.$api
        .post("card/recharge/list", {
          ...this.searchForm,
          offset: (this.currentPage - 1) * 10,
          limit: 10,
        })
        .then((res) => {
          if (res.status == 1) {
            this.tableData = res.data.list;
            this.total = res.data.total;
          } else {
            this.tableData = [];
            this.total = 0;
          }
        })
        .finally(() => (this.tableLoading = false));
    },
    search() {
      this.total = 0;
      this.currentPage = 1;
      this.getTableData();
    },
    getServer() {
      this.$api.post("server/list").then((res) => {
        if (res.status == 1) {
          this.serverList = res.data.list;
        }
      });
    },
    formReset() {
      this.searchForm = {
        name: "",
        telphone: "",
        server: "",
        date: "",
      };
      this.search();
    },
    toDetail(data) {
      this.$router.push({
        path: "/card",
        query: {
          id: data.id,
          type: "read",
        },
      });
    },
    toEdit(data) {
      this.$router.push({
        path: "/card",
        query: {
          id: data.id,
          type: "edit",
        },
      });
    },
    handleSizeChange() {},
    handleCurrentChange(current) {
      this.currentPage = current;
      this.getTableData();
    },
    goBack() {
      history.go(-1);
    },
    forbid() {
      //禁止软键盘弹出
      document.activeElement.blur();
    },
  },
  beforeRouteLeave(to, from, next) {
    this.exitType = to.query.type;
    next();
  },
  activated() {
    console.log(this.exitType);
    if (this.exitType == "edit") {
      this.getTableData();
    }
    if (!this.exitType) {
      this.search();
    }
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
