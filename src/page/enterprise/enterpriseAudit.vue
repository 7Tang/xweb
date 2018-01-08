<template>
    <div>
      <div class="x-row x-row-l"><label class="x-cell">企业审核</label></div>
      <div class="enterprise-audit-list">
        <table class="enterprise-audit-table">
          <thead><tr><th>统一社会信息代码</th><th>企业名称</th><th>法定代表人</th><th>联系人</th><th>手机号码</th><th>创建日期</th><th>操作</th></tr></thead>
          <tbody>
          <tr><td>FSDF00012233</td><td class="td-w1">公发快顺仍有人倍受鼓舞 脸仍无可奈何花落去</td><td>sdfwe</td><td>sfwefwf</td><td>15111111111</td><td>2017-08-18</td><td><button type="button" class="btn audit-btn">审核</button><button type="button" class="btn modify-btn">修改</button> </td></tr>
          <tr class="both"><td>FSDF00012233</td><td class="td-w1">公发快顺仍有人倍受鼓舞 脸仍无可奈何花落去</td><td>wefwfw</td><td>wfewfw</td><td>15111111111</td><td>2017-08-18</td><td><button type="button" class="btn audit-btn">审核</button><button type="button" class="btn modify-btn">修改</button></td></tr>
          </tbody>
        </table>
        <div class="x-box x-pagination">
          <pagination :total="total" :number="number" @set-current="pageChange"></pagination>
        </div>
      </div>
    </div>
</template>

<script>
  import pagination from '../../components/Pagination.vue'
  export default {
    created () {
      this.getEnterpriseData()
    },
    data () {
      return {
        enterpriseData: [],
        pageData: [],
        total: 0,     // 记录总条数
        number: 10   // 每页显示条数
      }
    },
    components: {
      pagination
    },
    methods: {
      pageChange: function (currentPage) {
        let _num = (currentPage - 1) * this.number
        let _len = (currentPage - 1) * this.number === 0 ? this.number : currentPage * this.number
        if (this.total < _len) {
          _len = this.total
        }
        this.pageData = []
        for (let i = _num; i < _len; i++) {
          this.pageData.push(this.enterpriseData[i])
        }
      },
      getEnterpriseData: function () {
        // todo 不知道会出现什么鬼
        this.$api.api_base('v1/vendor/listapi', 'POST', {}, this.getEnterpriseDataSuccess, this.failure)
      },
      getEnterpriseDataSuccess: function (_res) {
        if (_res.data.result === 0) {
          this.enterpriseData = _res.data.data
          this.total = _res.data.data.length
          this.pageChange(1)
        } else {
          this.$tool.toast(_res.data.message, 1000)
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "../../style/scss/enterprise/enterpriseaudit";
</style>
