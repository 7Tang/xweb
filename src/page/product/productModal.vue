<template>
  <transition name="product-modal">
    <div class="product-modal-mask">
      <div class="product-modal-wrapper">
        <div class="product-modal-container">
          <div class="x-box product-modal-top">
            <label>选择产品(支持多选)</label><div class="pm-close" @click="$emit('close')"></div>
          </div>
          <div class="x-box product-condition-box">
            <div class="x-box p-c-row">
              <label class="p-c-l1 p-m-m">产品名称：</label><input type="text" v-model="productname" class="p-c-input product-modal-input" placeholder="请输入产品名称">
              <label class="p-c-l1 p-c-m">创建时间：</label><datepicker v-model="startdate" class="date-input"></datepicker>
              <label class="p-c-l2">-</label><datepicker v-model="enddate" class="date-input"></datepicker>
              <button type="button" class="btn product-modal-search-btn">查询</button>
            </div>
          </div>
          <div class="data-list">
            <div class="list-title">
              <div class="flex-1"><input type="checkbox" v-model="isallchecked" @click="checked=!isallchecked"/></div>
              <div class="flex-3">产品名称</div>
              <div class="flex-2">品牌</div>
              <div class="flex-2">线上数量</div>
              <div class="flex-2">创建时间</div>
              <div class="flex-2">类型</div>
            </div>
            <div :class="(index+1) % 2 ==0 ? 'list-content-1': 'list-content-2' " v-for="(data,index) in pageData">
              <div class="flex-1"><input name="checkbox" v-model="checked" type="checkbox" :value="data.vtypeid"></div>
              <div class="flex-3">{{data.productname}}</div>
              <div class="flex-2">{{data.brand}}</div>
              <div class="flex-2">{{data.vtypecnt}}</div>
              <div class="flex-2">{{data.createtimestr | moment}}</div>
              <div class="flex-2">{{data.tagtype}}</div>
            </div>
            <div class="x-box x-pagination">
              <pagination :total="total" :number="number" @set-current="pageChange"></pagination>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn product-modal-next-page-btn" @click="nextPage">下一步</button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
  import pagination from '../../components/Pagination.vue'
  import datepicker from 'vue-datepicker-local'
  import moment from 'moment'

  export default {
    created () {
      this.getProductData()
      this.initdate()
    },
    data () {
      return {
        isallchecked: false,
        checked: [],
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
      failure: function (_err) {
        this.$tool.excPrompt(_err)
        this.$router.push('/login')
      },
      nextPage: function () {
        if (this.checked.length > 0) {
          this.$router.push('/product/batch/add')
        } else {
          this.$tool.toast('至少选择一个产品')
          alert('至少选择一个产品')
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "../../style/comm/mixin";
  @import "../../style/scss/product/product-condition";
  .product-modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    display: table;
    transition: opacity .3s ease;
    .product-modal-wrapper {
      display: table-cell;
      vertical-align: middle;
    }
    .product-modal-container {
      width: 1205px;
      min-height: 768px;
      margin: 0px auto;
      background-color: #ffffff;
      border-radius: 4px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
      transition: all .3s ease;
      font-family: "Microsoft YaHei UI";
      .p-m-m{
        margin-left: 10px;
      }
      .product-modal-top{
        margin: 0 28px;
        padding: 25px 10px;
        justify-content: space-between;
        align-items: center;
        font-size: 20px;
        color: #333333;
        letter-spacing: 1px;
        border-bottom: 1px solid #dfdfdf;
        .pm-close{
          color: #333333;
          border-radius: 12px;
          text-align: center;
          margin-top: -20px;
          margin-right: -10px;
          height: 25px;
          width: 25px;
          font-size: 20px;
          cursor: pointer;
        }
        .pm-close::before {
          content: "\2716";
        }
      }
      .product-modal-input{
        @include basic_css(224px,36px);
        font-size: 16px;
      }
      .product-modal-select{
        @include basic_css(140px,36px);
        padding: 0 10px;
        border-radius: 2px;
        font-size: 16px;
        color: #333333;
        border: 1px solid #dfdfdf;
        background: url(/static/image/icon/arrow.png) center right 10px no-repeat;
      }
      .product-modal-date-input{
        @include basic_css(114px,36px);
        font-size: 18px;
      }
      .product-modal-search-btn{
        @include basic_css(74px, 36px);
        font-family: "Microsoft YaHei UI";
        color: #ffffff;
        background-color: #3fa82e;
        border: 1px solid #bdbcbe;
        margin-left: 18px;
      }
    }
    .modal-footer{
      margin: 0 25px;
      background-color: #ffffcc;
      line-height: 70px;
      text-align: center;
      .product-modal-next-page-btn{
        @include basic_css(108px, 45px);
        font-family: "Microsoft YaHei UI";
        color: #ffffff;
        background-color: #3fa82e;
        border: 1px solid #bdbcbe;
      }
    }
  }

  .modal-enter .product-modal-container,
  .modal-leave-active .product-modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
</style>
