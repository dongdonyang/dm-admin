<template>
  <div class="login">
    <!--    header-->
    <div>
      <img src="../assets/fullLogo.png" alt="" />
    </div>

    <!--    main-->
    <div>
      <div class="login-main">
        <div></div>

        <!--        form-->
        <div class="login-main-form">
          <h3>登录</h3>
          <Form ref="form" :model="form" :rules="formRules">
            <FormItem prop="account">
              <!--              账号-->
              <Input
                v-model="form.account"
                prefix="ios-contact"
                placeholder="Enter name"
              />
            </FormItem>
            <!--            密码-->
            <FormItem prop="password">
              <Input
                v-model="form.password"
                prefix="ios-contact"
                placeholder="Enter name"
              />
            </FormItem>
            <FormItem>记住密码 </FormItem>
            <FormItem>
              <Button class="login-main-form-but" long @click="login"
                >登录</Button
              >
            </FormItem>
          </Form>
        </div>
      </div>
    </div>

    <!--    footer-->
    <div>四维聚象后台管理系统</div>
  </div>
</template>

<script>
/**
 * 作者：杨东
 * 时间：2019/9/24/14:20
 */
import { Base64 } from "js-base64";
import md5 from "js-md5";
export default {
  name: "Login",
  data() {
    return {
      form: {},
      formRules: {}
    };
  },
  created() {},
  mounted() {},
  methods: {
    //  用户登录
    login() {
      this.$refs.form.validate(valid => {
        if (valid) {
          // 数据加密
          let f = {
            account: Base64.encodeURI(this.form.account),
            password: md5(this.form.password + this.form.account),
            isWeb: 1
          };
          axios.post(this.$API.LOGIN, f).then(res => {
            console.log(res);
          });
        }
      });
    }
  }
};
</script>

<style scoped lang="scss">
.login {
  height: 100%;
  display: flex;
  flex-direction: column;
  & > :first-child {
    line-height: 80px;
    height: 80px;
    display: flex;
    align-items: center;
    padding: 0 30px;
  }
  & > :nth-child(2) {
    background-image: url("../assets/login.png");
    background-size: 100% 100%;
    flex: 2 0 auto;
  }
  &-main {
    display: flex;
    position: relative;
    & > :first-child {
      position: absolute;
      left: 26.8%;
      top: 265px;
      height: 100px;
      width: 24.37%;
      background-image: url("../assets/login_title.png");
    }
    /*  表单*/
    &-form {
      position: absolute;
      right: 22.44%;
      top: 235px;
      background-color: #fff;
      height: 430px;
      width: 380px;
      border-radius: 10px;
      padding: 75px 65px;
      &-but {
        height: 46px;
        border-radius: 23px;
        border-width: 0;
        color: #fff;
        font-size: 18px;
        letter-spacing: 2px;
        background: linear-gradient(to right, #0d35f1, #1a8dff);
        box-shadow: 0 1px 10px 0 rgba(37, 183, 233, 0.24);
      }
    }
  }
  /*尾部*/
  & > :last-child {
    line-height: 100px;
    height: 100px;
    text-align: center;
    font-size: 14px;
    letter-spacing: 1px;
  }
}
</style>
