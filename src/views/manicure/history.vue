<template>
  <div class="page">
    <el-form :model="searchForm" label-width="60px" inline>
      <el-form-item label="姓名" label-width="50px">
        <el-input
          class="search-input"
          v-model="searchForm.name"
          placeholder="请输入"
          @change="search"
        ></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input
          class="search-telephone"
          v-model="searchForm.telephone"
          type="number"
          placeholder="请输入"
          @change="search"
        ></el-input>
      </el-form-item>
      <el-form-item label="服务人">
        <el-select
          v-model="searchForm.server"
          filterable
          placeholder="请选择"
          @change="search"
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
          @focus="forbid"
          @change="search"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search">查询</el-button>
        <el-button @click="formReset">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="tableData"
      border
      stripe
      style="width: 100%"
      v-loading="tableLoading"
    >
      <el-table-column
        prop="user"
        label="姓名"
        width="100"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="telephone"
        label="手机号"
        width="130"
        align="center"
      >
      </el-table-column>
      <el-table-column label="项目（金额）" align="center">
        <template slot-scope="scope">
          <el-row v-for="(item, index) in scope.row.project" :key="index"
            >{{ item.name }}（{{ item.money }}）</el-row
          >
        </template>
      </el-table-column>
      <el-table-column label="总金额" align="center" width="100">
        <template slot-scope="scope">
          <span>{{ totalMoney(scope.row) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="server"
        label="服务人"
        width="100"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="date"
        label="日期"
        width="170"
        align="center"
      ></el-table-column>
      <el-table-column label="操作" width="180" align="center">
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
    <el-button type="primary" plain class="btn-home" @click="goBack"
      >返回</el-button
    >
  </div>
</template>

<script>
export default {
  name: "manicureHistory",
  data() {
    return {
      searchForm: {
        name: "",
        telephone: "",
        server: "",
        date: "",
      },
      tableData: [],
      total: 0,
      currentPage: 1,
      tableLoading: false,
      serverList: [],
    };
  },
  mounted() {
    console.log(this.$route.params);
    if (this.$route.params.telephone) {
      this.searchForm.telephone = this.$route.params.telephone;
    }
    this.search();
    this.getServer();
  },
  methods: {
    getTableData() {
      this.tableLoading = true;
      this.$api
        .post("consume/list", {
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
    formReset() {
      this.searchForm = {
        name: "",
        telephone: "",
        server: "",
        date: "",
      };
      this.search();
    },
    getServer() {
      this.$api.post("server/list").then((res) => {
        if (res.status == 1) {
          this.serverList = res.data.list;
        }
      });
    },
    handleSizeChange() {},
    handleCurrentChange() {},
    goBack() {
      history.go(-1);
    },
    totalMoney(row) {
      return row.project.reduce((prev, item) => {
        prev += item.money;
        return prev;
      }, 0);
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
