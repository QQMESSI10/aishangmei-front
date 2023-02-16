<template>
  <el-select
    v-model="form.user"
    filterable
    placeholder="请选择"
    ref="userSelect"
    @change="selectChange"
    @hook:mounted="cancalReadOnly"
    @visible-change="cancalReadOnly"
  >
    <el-option
      v-for="item in userList"
      :key="item.id"
      :label="item.label"
      :value="item.id"
    >
    </el-option>
  </el-select>
</template>

<script>
export default {
  props: ["userList", "form"],
  data() {
    return {
      list: [],
      reg: /^(\d{3})\d{4}(\d{4})$/,
    };
  },
  watch: {
    userList: {
      handler(newVal) {
        this.list = newVal.map((m) => {
          const telephone = m.telephone;
          m.label =
            m.name + "（" + telephone.replace(this.reg, "$1****$2") + "）";
        });
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    selectChange(id) {
      const info = this.userList.find((f) => f.id == id);
      this.$emit("userChange", info);
    },
    cancalReadOnly(onOff) {
      this.$nextTick(() => {
        if (!onOff) {
          const Selects = this.$refs;
          // 如果只有1个下拉框，这段就足够了---start
          if (Selects.userSelect) {
            const input =
              Selects.userSelect.$el.querySelector(".el-input__inner");
            input.removeAttribute("readonly");
          }
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
