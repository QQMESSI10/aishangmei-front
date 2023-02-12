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
      :key="item.value"
      :label="item.label"
      :value="item.value"
    >
    </el-option>
  </el-select>
</template>

<script>
export default {
  props: ["userList", "form"],
  methods: {
    selectChange(info) {
      console.log(info);
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
