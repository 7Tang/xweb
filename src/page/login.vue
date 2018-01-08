<template>
  <div class="login-origin">
    <div class="login-container x-box-shadow">
      <div class="login-row">
        <div class="lr-label">用&nbsp;户&nbsp;名:</div>
        <input type="text" class="login-input" name="loginName" v-model.trim="username" placeholder="请输入用户名">
      </div>
      <div class="login-row">
        <div class="lr-label">密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码:</div>
        <input type="password" class="login-input" name="password" v-model.trim="userpassword" placeholder="请输入密码">
      </div>
      <div class="x-btn"><button type="button" class="login-btn" @click="login">登录</button></div>
      <div class="x-reg"><span @click="register">企业注册	&#x27a4;</span></div>
    </div>
  </div>
</template>
<script>
  import md5 from 'crypto-js/md5'
  export default{
    data () {
      return {
        username: 'qy',
        userpassword: '123456'
      }
    },
    methods: {
      login: function () {
        let params = {username: this.username, userpassword: md5(this.userpassword).toString()}
        this.$api.api_base('v1/user/loginapi', 'POST', params, this.success, this.failure)
      },
      register: function () {
        this.$router.push('/enterprise/register')
      },
      success: function (res) {
        if (res.data.result === 0) {
          sessionStorage.setItem('token', res.headers.token)
          sessionStorage.setItem('userinfo', JSON.stringify(res.data.data))
          if (res.data.usertype === 1) {
            this.$router.push('/enterprise/audit')
          } else {
            this.$router.push('/product/register')
          }
        } else {
          if (res.data.message) {
            this.$tool.toast(res.data.message, 1000)
          }
        }
      },
      failure: function (err) {
        if (err.response) {
          this.$tool.toast('api error, HTTP CODE:' + err.response.status, 3000)
          sessionStorage.removeItem('token')
        }
        this.$router.push('/login')
      }
    }
  }
</script>
<style lang="scss">
  @import "../style/comm/base";
  .login-origin{
    display: flex;
    display: -webkit-flex;
    min-width: 450px;
    min-height: 300px;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
  }
  .login-container{
    width: 400px;
    height: 280px;
    border-radius: 5px;
    border: 1px solid #C9CDD4;
    padding: 40px 20px 10px;
  }
  .login-row {
    display: flex;
    display: -webkit-flex;
    margin: 20px;
    justify-content: center;
    align-items: center;
  }
  .x-box-shadow{
    -moz-box-shadow: 0 0 20px #dfdfdf;
    -webkit-box-shadow: 0 0 20px #dfdfdf;
    box-shadow: 0 0 20px #dfdfdf;
  }
  .lr-label{
    width: 60px;
    margin-right: 25px;
    font-size: 18px;
    color: #333333;
    text-align: right;
  }
  .login-input{
    font-size: 14px;
    color: #333333;
    border: 1px solid #3fa82e;
    border-radius: 3px;
    cursor: inherit;
    outline: none;
    width: 260px;
    height: 32px;
    padding: 2px 10px;
  }
  .x-btn{
    margin-top: 60px;
    text-align: center;
  }
  .login-btn{
    width: 360px;
    height: 42px;
    font-size: 18px;
    border-radius: 3px;
    cursor: pointer;
    text-decoration: none;
    outline: none;
    color: #ffffff;
    background-color: #3fa82e;
    border: 1px solid #3fa82e;
  }
  .x-reg{
    margin-top: 42px;
    font-size: 16px;
    color: #3fa82e;
    text-align: right;
  }
  .x-reg span{
    cursor: pointer;
  }

</style>
