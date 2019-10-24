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
        <Input v-model="form.sizeWidth" placeholder="宽" />
      </FormItem>
    </Col>
    <Col :span="3" style="text-align: center;">mm *</Col>
    <Col :span="5">
      <FormItem prop="sizeHeight">
        <Input v-model="form.sizeHeight" placeholder="高" />
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
  methods: {}
};
</script>

<style scoped></style>
