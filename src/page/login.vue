<template>
  <div class="x-box login-origin">
    <div class="login-container x-box-shadow">
      <div class="x-box login-row"><div class="lr-label x-rg">用&nbsp;户&nbsp;名:</div><input type="text" class="input login-input" name="loginName" v-model.trim="username" placeholder="请输入用户名"></div>
      <div class="x-box login-row"><div class="lr-label x-rg">密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码:</div><input type="password" class="input login-input" name="password" v-model.trim="userpassword" placeholder="请输入密码"></div>
      <div class="x-btn"><button type="button" class="btn login-btn" @click="login">登录</button></div>
      <div class="x-reg"><span class="x-cursor" @click="register">企业注册	&#x27a4;</span></div>
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
        // this.success({data: {result: 0, data: {usertype: 2}}, headers: {token: '12132'}})
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
  @import "../style/scss/login.scss";
  @import "../style/comm/base";
</style>
