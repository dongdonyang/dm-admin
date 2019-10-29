<template>
  <Row>
    <Col :span="5">
      <FormItem prop="sizeLong">
        <Input v-model="form.sizeLong" placeholder="长" />
      </FormItem>
    </Col>
    <Col :span="3" style="text-align: center;">mm *</Col>
    <Col :span="5">
      <FormItem prop="sizeWidth">
        <Input
          type="number"
          :min="0"
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
          :max="0"
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
    return {};
  },
  created() {},
  mounted() {},
  methods: {
    setValue(val) {
      let a = null;
      if (val) {
        a = Number(this.form.sizeWidth);
        if(a<0){
          this.form.sizeWidth=0
        }
      } else {
        a = Number(this.form.sizeHeight);
        if(a<0){
          this.form.sizeHeight=0
        }
      }
    }
  }
};
</script>

<style scoped></style>
