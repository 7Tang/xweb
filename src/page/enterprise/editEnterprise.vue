<template>
  <div class="enterprise-edit-container">
    <div class="x-row x-row-l"><label class="x-cell">创建企业信息</label></div>
    <div class="ent-title">基本信息</div>
    <div class="x-box ent-row">
      <label class="ent-l1 ent-font">企业名称<span class="x-require">*</span>:</label>
      <div class="ent-val1"><input type="text" class="input ent-input" v-model="enterpriseInfo.vendorname"></div>
      <label class="ent-l2 ent-font">统一社会信息代码<span class="x-require">*</span>:</label>
      <div><input type="text" class="input ent-input" v-model="enterpriseInfo.vendorcode"></div>
    </div>
    <div class="x-box">
      <label class="ent-l3 ent-font">证件上传<span class="x-require">*</span>:</label>
      <div class="ent-val2"><img src="/static/image/icon/add.png"></div>
      <label class="ent-l4 ent-font">法定代表人<span class="x-require">*</span>:</label>
      <div class="ent-val3"><input type="text" class="input ent-input" v-model="enterpriseInfo.legalrepresentative"></div>
    </div>
    <div class="x-box ent-row1">
      <label class="ent-l1 ent-font">企业地址<span class="x-require">*</span>:</label>
      <div class="ent-val1"><input type="text" class="input ent-input" v-model="enterpriseInfo.address"></div>
    </div>
    <div class="x-box ent-row1">
      <label class="ent-l1 ent-font">企业类型<span class="x-require">*</span>:</label>
      <div>
        <select v-model="enterpriseInfo.vtype" class="select ent-select">
          <template v-for="type in enterpriseType">
            <option :value="type.vtype">{{type.vtext}}</option>
          </template>
        </select> </div>
    </div>
    <div class="x-box">
      <label class="ent-l3 ent-font">经营范围<span class="x-require">*</span>:</label>
      <div class="x-box ent-val4">
        <template v-for="check in currentCheckedRange">
          <div class="ent-desc">{{check}}</div>
        </template>
        <img src="/static/image/icon/add1.png" @click="getEnterpriseRange"></div>
    </div>
    <div class="ent-title">联系方式</div>
    <div class="x-box ent-row">
      <label class="ent-l1 ent-font">联系人名称<span class="x-require">*</span>:</label>
      <div class="ent-val1"><input type="text" class="input ent-input" v-model="enterpriseInfo.contact"></div>
      <label class="ent-l2 ent-font">固定电话<span class="x-require">*</span>:</label>
      <div><input type="text" class="input ent-input" v-model="enterpriseInfo.phone"></div>
    </div>
    <div class="x-box ent-row1">
      <label class="ent-l1 ent-font">手机号码<span class="x-require">*</span>:</label>
      <div class="ent-val1"><input type="text" class="input ent-input" v-model="enterpriseInfo.mobilephone"></div>
      <label class="ent-l2 ent-font">电子邮箱<span class="x-require">*</span>:</label>
      <div><input type="text" class="input ent-input" v-model="enterpriseInfo.email"></div>
    </div>
    <div class="ent-btn">
      <button type="button" class="btn submit-btn ent-bl" @click="register">提交</button><button type="button" class="btn cancel-btn" @click="goBack">取消</button>
    </div>
    <div class="enterprise-range-mask" v-if="enterpriseRangeFlag">
      <div class="enterprise-range-wrapper">
        <div class="enterprise-range-container">
          <div class="enterprise-range-top">
            <span class="enterprise-range-close" @click="enterpriseRangeFlag = false"></span>
          </div>
          <div class="enterprise-range-body">
            <div class="enterprise-range-title">经营范围</div>
            <div class="enterprise-range-content x-box">
              <template v-for="range in enterpriseRangeData">
                <span :class="range.checked? 'er-primary': 'er-default'" @click="toggleChecked(range.cname1)">{{range.cname1}}</span>
              </template>
            </div>
          </div>
          <div class="enterprise-range-footer">
              <button class="enterprise-range-primary" @click="confirm">
                确定
              </button>
              <button class="enterprise-range-default" @click="enterpriseRangeFlag = false">
               取消
              </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default{
    data () {
      return {
        enterpriseType: [{vtype: 1, vtext: '品牌型企业'}, {vtype: 2, vtext: '零售型企业'}],
        enterpriseRangeData: [],
        enterpriseRangeFlag: false,
        currentCheckedRange: [],
        enterpriseInfo: { vendorname: '1111', legalrepresentative: '微先生', certificatesimg: 'img', vendorcode: 'R232432dd3', vtype: 1, address: '余杭', cids: '日用品', contact: '张先生', phone: '0571-88888888', mobilephone: '15888885888', email: 'moro@ro.com' }
      }
    },
    methods: {
      getEnterpriseRange: function () {
        this.$api.api_base('category/list4cname1api', 'POST', {}, this.getEnterpriseRangeSuccess, this.failure)
      },
      getEnterpriseRangeSuccess: function (_res) {
        this.enterpriseRangeFlag = true
        _res.data.data.forEach(function (item) {
          item.checked = false
        })
        this.enterpriseRangeData = _res.data.data
      },
      toggleChecked: function (_cName) {
        this.enterpriseRangeData.forEach(function (item) {
          if (item.cname1 === _cName) {
            item.checked = !item.checked
          }
        })
      },
      confirm: function () {
        let _tempCategory = []
        this.enterpriseRangeData.forEach(function (item) {
          if (item.checked) {
            _tempCategory.push(item.cname1)
          }
        })
        this.currentCheckedRange = _tempCategory
        this.enterpriseRangeFlag = false
      },
      register: function () {
        this.enterpriseInfo.cids = this.currentCheckedRange.toString()
        this.$api.api_base('v1/vendor/registerapi', 'POST', this.enterpriseInfo, this.registerSuccess, this.failure)
      },
      registerSuccess: function (res) {
        if (res.data.result === 0) {
          this.$router.push('/login')
        } else {
          if (res.data.message) {
            this.$tool.toast(res.data.message, 1000)
          }
        }
      },
      getEnterpriseCategory1: function () {
        this.$api.api_base('v1/category/list4cname3api', 'POST', {cname1: '一级', cname2: '二级1'}, this.getEnterpriseCategory1Success, this.failure)
      },
      getEnterpriseCategory1Success: function (res) {
        console.log(res)
      },
      goBack: function () {
        this.$router.push('/login')
      },
      failure: function (err) {
        if (err.response) {
          this.$tool.toast('api error, HTTP CODE:' + err.response.status, 3000)
        }
        this.goBack()
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "../../style/comm/base";
  @import "../../style/scss/enterprise/enterpriseedit.scss";
</style>
