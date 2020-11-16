<template>
  <!--登录-->
  <ion-page>
    <ion-content>
      <ion-grid class="logo-container">
        <ion-row>
          <ion-col span="24">
            <img src="@/assets/logo.png" alt="logo" class="logo"/>
          </ion-col>
        </ion-row>
      </ion-grid>

      <ion-row class="login-form">
        <ion-col size="12" class="login-form-input ion-border-bottom">
          <ion-input clearInput :placeholder="!loginType ? '请输入账号' : '请输入手机号'" v-model="state.mobile"
                     v-keyboard-overlay></ion-input>
        </ion-col>
        <ion-col size="12" class="login-form-input ion-border-bottom">
          <template v-if="loginType">
            <ion-input clearInput type="tel" maxlength="4" placeholder="请输入短信验证码" v-model="state.code"
                       v-keyboard-overlay></ion-input>
            <p class="ion-no-margin">
              <ion-button fill="clear" class="getCode" v-mobile-code="sendMobileCode"></ion-button>
            </p>
          </template>

          <template v-if="!loginType">
            <ion-input clearInput v-model="state.psd" placeholder="请输入密码"
                       :type="checkPsd ? 'text' : 'password'"></ion-input>
            <p class="ion-no-margin" @click="checkPsd=!checkPsd">
              <span class="check-psd" :class="{check: checkPsd}"></span>
            </p>
          </template>
        </ion-col>
        <ion-col size="12" class="ion-no-padding ion-flex ion-align-items-center">
          <ion-checkbox v-model="state.agreeService" mode="md" class="small"></ion-checkbox>
          <p class="text" @click="state.agreeService = !state.agreeService">
            我已阅读并同意
            <span>《顺路直递用户协议》</span>
          </p>
        </ion-col>
        <ion-col size="12" class="ion-no-padding ion-margin-top" @click="loginService">
          <ion-button size="large" mode="md" expand="block">登录</ion-button>
        </ion-col>
        <ion-col size="12" class="ion-no-padding ion-margin-top login-type" @click="loginType=!loginType">
          <span>{{ !loginType ? '短信验证码登录' : '账号密码登录' }}</span>
        </ion-col>
      </ion-row>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import Login, {LoginParam} from "@/api/login";
import {defineComponent, reactive, ref} from "vue";

export default defineComponent({
  name: "Login",
  setup() {
    // 登录类型：true -- 短信登录  false -- 密码登录
    const loginType = ref(false);
    const checkPsd = ref(false);
    const state = reactive({
      psd: '',
      code: '',
      mobile: '',
      agreeService: true,
    });
    // 发送验证码
    const sendMobileCode = async (countDown: () => void) => {
      const result = await Login.sendMobileCode({
        store_type: 1,
        mobile: state.mobile,
      });
      if (result) countDown();
    }
    // 确认登录
    const loginService = async () => {
      const params: LoginParam = {
        store_type: 1,
        code: state.code,
        password: state.psd,
        mobile: state.mobile,
        agreeService: state.agreeService
      };
      await Login.login(params, loginType.value);
    }

    return {
      state,
      checkPsd,
      loginType,
      loginService,
      sendMobileCode,
    }
  }
})
</script>

<style scoped lang="scss">
.logo-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30%;

  .logo {
    width: 80px;
    height: 80px;
  }
}

.login-form {
  padding: 0 10%;

  p.text {
    font-size: 12px;
    margin-top: 13px;
  }

  .login-form-input {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 40px;
    padding: 0;

    &:first-child {
      margin-bottom: 15px;
    }

    ion-input {
      font-size: 13px;
    }

    .getCode {
      --padding-end: 0;
      --padding-start: 0;
      margin-left: 20px;
      text-align: right;
      font-size: 12px !important;

      color: var(--ion-color-primary);
    }
  }

  .check-psd {
    display: inline-block;
    width: 17px;
    height: 7px;
    background-repeat: no-repeat;
    background-image: url("../../assets/no-checkPsd.png");
    background-size: 100% 100%;

    &.check {
      height: 10px;
      background-image: url("../../assets/checkPsd.png");
      background-size: 100% 100%;
    }
  }

  .login-type > span {
    font-size: 13px !important;
    color: #616B81;
  }
}
</style>