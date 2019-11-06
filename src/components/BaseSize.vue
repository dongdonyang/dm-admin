<template>
  <Row>
    <Col :span="5">
      <FormItem prop="sizeLong">
        <Input
          @on-change="chan"
          type="number"
          min="0"
          v-model="form.sizeLong"
          placeholder="长"
        />
      </FormItem>
    </Col>
    <Col :span="3" style="text-align: center;">mm *</Col>
    <Col :span="5">
      <FormItem prop="sizeWidth">
        <Input
          type="number"
          min="0"
          v-model="form.sizeWidth"
          @on-change="setValue(1)"
          placeholder="宽"
        />
      </FormItem>
    </Col>
    <Col :span="3" style="text-align: center;">mm *</Col>
    <Col :span="5">
      <FormItem prop="sizeHeight">
        <Input
          type="number"
          min="0"
          v-model="form.sizeHeight"
          @on-change="setValue(0)"
          placeholder="高"
        />
      </FormItem>
    </Col>
    <Col :span="3" style="text-align: center;">mm</Col>
  </Row>
</template>

<script>
/**
 * 作者：杨东
 * 时间：2019/10/22/15:39
 */
export default {
  name: "BaseSize",
  props: {
    form: {}
  },
  data() {
    return {
      CheckIntegerOrPointNumber: (rule, value, callback) => {
        // let regExp = /^\d+(\.\d{1,2})?$/;
        let regExp = /^([1-9]\d*|0)(\.\d{1,2})?$/;
        if (value == "") {
          callback();
        } else if (!regExp.test(value)) {
          callback(new Error("正整数或两位小数"));
        } else {
          callback();
        }
      }
    };
  },
  created() {},
  mounted() {},
  methods: {
    chan() {
      this.form.sizeLong = Math.ceil(this.form.sizeLong);
      if (this.form.sizeLong < 0) {
        this.form.sizeLong = Math.ceil(1);
      }
    },
    setValue(val) {
      let a = null;
      let regExp = /^\+?[1-9][0-9]*$/;
      if (val) {
        a = Number(this.form.sizeWidth);
        if (!regExp.test(a)) {
          this.form.sizeWidth = 0;
          if (a < 1) {
            this.form.sizeWidth = Math.ceil(a);
            if (a < 0) {
              this.form.sizeWidth = Math.ceil(1);
            }
          }
        }
      } else {
        a = Number(this.form.sizeHeight);
        if (!regExp.test(a)) {
          this.form.sizeHeight = 0;
          if (a < 1) {
            this.form.sizeHeight = Math.ceil(a);
            if (a < 0) {
              this.form.sizeHeight = Math.ceil(1);
            }
          }
        }
      }
      console.log(Math.ceil(0.1));
    }
  }
};
</script>

<style>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
input[type="number"] {
  -moz-appearance: textfield;
}
</style>
