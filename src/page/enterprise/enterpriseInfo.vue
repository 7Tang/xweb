<template>
  <div class="enterprise-container">
    <div class="x-row x-row-l"><label class="x-cell">企业信息</label></div>
    <div class="ent-title">基本信息</div>
    <div class="x-box">
      <label class="ent-l1 ent-font">企业名称<span class="x-require">*</span>:</label><div class="ent-val1 ent-font1">{{enterpriseInfo.vendorname}}</div>
      <label class="ent-l2 ent-font">统一社会信息代码<span class="x-require">*</span>:</label><div class="ent-val1 ent-font1">{{enterpriseInfo.vendorcode}}</div>
    </div>
    <div class="x-box">
      <label class="ent-l1 ent-font">证件上传<span class="x-require">*</span>:</label><div class="ent-val2 ent-font1"><img src="/static/image/c.png"> </div>
      <label class="ent-l2 ent-font">法定代表人<span class="x-require">*</span>:</label><div class="ent-val1 ent-font1">{{enterpriseInfo.legalrepresentative}}</div>
    </div>
    <div class="x-box">
      <label class="ent-l3 ent-font">企业地址<span class="x-require">*</span>:</label><div class="ent-val3 ent-font1">{{enterpriseInfo.address}}</div>
    </div>
    <div class="x-box">
      <label class="ent-l1 ent-font">企业类型<span class="x-require">*</span>:</label><div class="ent-val1 ent-font1">{{enterpriseInfo.vtype}}</div>
    </div>
    <div class="x-box">
      <label class="ent-l1 ent-font">创建日期<span class="x-require">*</span>:</label><div class="ent-val1 ent-font1">{{enterpriseInfo.vendorname}}</div>
    </div>
    <div class="x-box">
      <label class="ent-l1 ent-font">经营范围<span class="x-require">*</span>:</label><div class="x-box ent-val4"><div class="ent-desc">日用百货</div><div class="ent-desc">针纺织品</div></div>
    </div>
    <div class="ent-title">付费信息</div>
    <div class="x-box">
      <label class="ent-l1 ent-font">最近付费日期<span class="x-require">*</span>:</label><div class="ent-val1 ent-font1"></div>
      <label class="ent-l2 ent-font">付费有效期<span class="x-require">*</span>:</label><div class="ent-val1 ent-font1"></div>
    </div>
    <div class="x-box">
      <label class="ent-l1 ent-font">状态<span class="x-require">*</span>:</label><div class="ent-val1 ent-font1"><input type="radio" id="r1" name="ent_status" value="1"><label for="r1" class="ent-interval">正常</label><input type="radio" id="r2" name="ent_status" value="2"><label for="r2" class="ent-interval">试用</label><input type="radio" id="r3" name="ent_status" value="3"><label for="r3">到期</label></div>
    </div>
    <div class="ent-title">联系方式</div>
    <div class="x-box">
      <label class="ent-l1 ent-font">联系人名称<span class="x-require">*</span>:</label><div class="ent-val1 ent-font1">{{enterpriseInfo.contact}}</div>
      <label class="ent-l2 ent-font">固定电话<span class="x-require">*</span>:</label><div class="ent-val1 ent-font1">{{enterpriseInfo.phone}}</div>
    </div>
    <div class="x-box ent-blank">
      <label class="ent-l1 ent-font">手机号码<span class="x-require">*</span>:</label><div class="ent-val1 ent-font1">{{enterpriseInfo.mobilephone}}</div>
      <label class="ent-l2 ent-font">电子邮箱<span class="x-require">*</span>:</label><div class="ent-val1 ent-font1">{{enterpriseInfo.email}}</div>
    </div>
  </div>
</template>
<script>
  export default{
    created () {
      this.getEnterpriseInfo()
    },
    data () {
      return {
        enterpriseInfo: {}
      }
    },
    methods: {
      getEnterpriseInfo: function () {
        let _companyid = JSON.parse(sessionStorage.getItem('userinfo')).companyid
        this.$api.api_base('v1/vendor/detailapi', 'POST', {vendorid: _companyid}, this.enterpriseInfoSuccess, this.failure)
      },
      enterpriseInfoSuccess: function (res) {
        if (res.data.result === 0) {
          // todo 没数据看不出什么跟什么 =_=
          this.enterpriseInfo = res.data.data
        } else {
          if (res.data.message) {
            this.$tool.toast(res.data.message, 1000)
          }
        }
      },
      failure: function (err) {
        if (err.response) {
          this.$tool.toast('api error, HTTP CODE:' + err.response.status, 3000)
        }
        this.$router.push('/login')
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "../../style/scss/enterprise/enterprise.scss";
</style>
