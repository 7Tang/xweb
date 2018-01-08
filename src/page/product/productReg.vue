<template>
  <div>
    <div class="content-cond-title"><label class="x-cell">产品注册</label></div>
    <div class="common-cond-box"><button type="button" class="createbtn" @click="createProduct">创建产品</button>
      <div class="common-cond-right">
        产品名称：<input type="text" v-model="productname" placeholder="请输入产品名称">
        创建时间：<datepicker v-model="startdate" class="date-input"></datepicker> - <datepicker v-model="enddate" class="date-input"></datepicker>
        <button type="button" class="searchbtn" @click="getProductData()">查询</button>
      </div>
    </div>
    <div class="data-list">
      <div class="list-title">
        <div class="flex-2">产品</div>
        <div class="flex-1">品牌</div>
        <div class="flex-1">线上数量</div>
        <div class="flex-1">创建时间</div>
        <div class="flex-1">类型</div>
      </div>
      <div :class="(index+1) % 2 ==0 ? 'list-content-1': 'list-content-2' " v-for="(data,index) in pageData">
        <div class="flex-2" @click="entryDetail(data.vtypeid)"><img v-if="false" :src="data.productimg" class="p-img"/><span>{{data.productname}}</span></div>
        <div class="flex-1">{{data.brand}}</div>
        <div class="flex-1">{{data.vtypecnt}}</div>
        <div class="flex-1">{{data.createtimestr | moment}}</div>
        <div class="flex-1">{{data.tagtype}}</div>
      </div>
      <div class="x-box x-pagination">
        <pagination :total="total" :number="number" @set-current="pageChange"></pagination>
      </div>
    </div>
  </div>
</template>
<script>
  import pagination from '../../components/Pagination.vue'
  import datepicker from 'vue-datepicker-local'
  import moment from 'moment'

  export default {
    created () {
      this.initdate()
      this.getProductData()
    },
    data () {
      return {
        startdate: '',
        enddate: '',
        productname: '',
        productData: [],
        pageData: [],
        total: 0,     // 记录总条数
        number: 10   // 每页显示条数
      }
    },
    components: {
      pagination,
      datepicker
    },
    methods: {
      initdate: function () {
        this.startdate = moment(new Date()).format('YYYY-MM-DD')
        this.enddate = moment(new Date()).format('YYYY-MM-DD')
      },
      pageChange: function (currentPage) {
        let _num = (currentPage - 1) * this.number
        let _len = (currentPage - 1) * this.number === 0 ? this.number : currentPage * this.number
        if (this.total < _len) {
          _len = this.total
        }
        this.pageData = []
        for (let i = _num; i < _len; i++) {
          this.pageData.push(this.productData[i])
        }
      },
      getProductData: function () {
        let _vendorid = JSON.parse(sessionStorage.getItem('userinfo')).companyid
        this.$api.api_base('v1/product/listapi', 'POST', {vendorid: _vendorid, productname: this.productname.length > 0 ? this.productname : null}, this.getProductDataSuccess, this.failure)
      },
      getProductDataSuccess: function (_res) {
        if (_res.data.result === 0) {
          this.productData = _res.data.data
          this.total = this.productData.length
          this.pageChange(1)
        } else {
          this.pageData = []
          this.total = 0
          this.$tool.toast(_res.data.message, 1000)
        }
      },
      entryDetail: function (_vtypeid) {
        this.$router.push({path: '/product/detail', query: { vtypeid: _vtypeid }})
      },
      createProduct: function () {
        this.$router.push('/product/add')
      },
      failure: function (_err) {
        this.$tool.excPrompt(_err)
        this.$router.push('/login')
      }
    }
  }
</script>
