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
          <p>登录</p>
          <Form ref="form" :model="form" :rules="formRules">
            <FormItem prop="account">
              <!--              账号-->
              <Input
                v-model="form.account"
                prefix="ios-contact"
                placeholder="请输入登录手机号码"
              />
            </FormItem>
            <!--            密码-->
            <FormItem prop="password">
              <Input
                type="password"
                v-model="form.password"
                prefix="ios-contact"
                placeholder="请输入密码"
              />
            </FormItem>
            <FormItem class="login-main-form-word">
              <Checkbox v-model="isRemember">记住密码</Checkbox>
              <a>忘记密码？</a>
            </FormItem>
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
      isRemember: false,
      formRules: {}
    };
  },
  created() {},
  mounted() {},
  methods: {
    //  todo 用户登录
    login() {
      this.$refs.form.validate(valid => {
        if (valid) {
          // 数据加密
          let f = {
            account: Base64.encodeURI(this.form.account),
            password: md5(this.form.password),
            loginType: 1 //1-manage 2-mkt
          };
          axios.post(this.$API.LOGIN, f).then(res => {
            if (res.success) {
              this.saveUserInfo(res.data);
              this.$router.push({
                name: "home"
              });
              this.$Message.success(`欢迎登录四维聚象后台管理系统`);
            }
          });
        }
      });
    },
    //    todo 用户信息储存
    saveUserInfo(info) {
      this.$store.commit("setToken", info.token);
      sessionStorage.setItem("token", info.token);
      if (this.isRemember) {
        //存在localStorage中，进行长期存储
      } else {
        //  存在session中，进行短期会话存储
      }
    }
  }
};
</script>

<style lang="scss">
.login {
  height: 100%;
  display: flex;
  flex-direction: column;
  /*  header*/
  & > :first-child {
    line-height: 80px;
    height: 80px;
    display: flex;
    align-items: center;
    padding: 0 30px;
    img {
      object-fit: cover;
    }
  }
  /*  main*/
  & > :nth-child(2) {
    background-image: url("../assets/login.png");
    background-size: cover;
    flex: 2 0 auto;
  }
  &-main {
    display: flex;
    position: relative;
    & > :first-child {
      position: absolute;
      left: 515px;
      top: 265px;
      height: 100px;
      width: 468px;
      background-image: url("../assets/login_title.png");
      background-size: cover;
    }
    /*  表单*/
    &-form {
      position: absolute;
      right: 431px;
      top: 235px;
      background-color: #fff;
      height: 430px;
      width: 380px;
      border-radius: 10px;
      padding: 75px 65px;
      /*登录*/
      p {
        font-size: 20px;
        margin-bottom: 50px;
        font-weight: 500;
        color: #333333;
        height: 20px;
        line-height: 20px;
      }
      form {
        & > div {
          margin-bottom: 20px;
          /*修改input框*/
          .ivu-input {
            color: #999999;
            letter-spacing: 2px;
            height: 40px;
            line-height: 40px;
            border-radius: 20px;
            border-color: #cccccc;
            &:focus {
              border-color: #0d35f1;
              box-shadow: 0 0 0 0;
            }
          }
          .ivu-input-with-prefix {
            padding-left: 58px;
          }
          /*    图标*/
          .ivu-icon {
            line-height: 40px;
            padding-left: 20px;
          }
        }
      }
      /*  记住密码*/
      &-word {
        & > div {
          line-height: 22px;
          letter-spacing: 1px;
          font-size: 14px;
          color: #999999;
          display: flex;
          justify-content: space-between;
        }
      }
      /*  提交按钮*/
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
  /*footer*/
  & > :last-child {
    line-height: 100px;
    height: 100px;
    text-align: center;
    font-size: 14px;
    letter-spacing: 1px;
  }
}

/*兼容768宽度小屏*/
@media only screen and (max-width: 768px) {
  .login-main {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    & > :nth-child(1),
    & > :nth-child(2) {
      margin: 30px 0;
      position: static;
    }
  }
}
</style>
