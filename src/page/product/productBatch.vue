<template>
  <div>
    <div class="content-cond-title"><label class="x-cell">产品批次</label></div>
    <div class="common-cond-box"><button type="button" class="createbtn" @click="createdProductBatch">创建批次</button>
      <div class="common-cond-right">
        产品名称：<input type="text" v-model="productname" placeholder="请输入产品名称">
        创建时间：<datepicker v-model="startdate" class="date-input"></datepicker> - <datepicker v-model="enddate" class="date-input"></datepicker>
        <button type="button" class="searchbtn" @click="getProductData()">查询</button>
      </div>
    </div>

    <div class="data-list">
      <div class="list-title">
        <div class="flex-1">批次序号</div>
        <div class="flex-1">产品名称</div>
        <div class="flex-1">产品数量</div>
        <div class="flex-1">创建日期</div>
        <div class="flex-1">生产日期</div>
        <div class="flex-1">赋码类型</div>
        <div class="flex-1">标签</div>
      </div>
      <div :class="(index+1) % 2 ==0 ? 'list-content-1': 'list-content-2' " v-for="(data,index) in pageData">
        <div class="flex-1">{{data.productname}}</div>
        <div class="flex-1">{{data.productname}}</div>
        <div class="flex-1">{{data.vtypecnt}}</div>
        <div class="flex-1">{{data.createtimestr | moment}}</div>
        <div class="flex-1">{{data.tagtype}}</div>
        <div class="flex-1">{{data.tagtype}}</div>
        <div class="flex-1">{{data.tagtype}}</div>
      </div>
      <div class="x-box x-pagination">
        <pagination :total="total" :number="number" @set-current="pageChange"></pagination>
      </div>
    </div>
    <product-modal v-if="createProductBatchFlag" @close="createProductBatchFlag = false"></product-modal>
  </div>
</template>
<script>
  import ProductModal from '../product/productModal.vue'
  import pagination from '../../components/Pagination.vue'
  import datepicker from 'vue-datepicker-local'
  import moment from 'moment'
  export default {
    created () {
      this.initdate()
    },
    data () {
      return {
        createProductBatchFlag: false,
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
      'product-modal': ProductModal,
      pagination,
      datepicker
    },
    methods: {
      initdate: function () {
        this.startdate = moment(new Date()).format('YYYY-MM-DD')
        this.enddate = moment(new Date()).format('YYYY-MM-DD')
      },
      createdProductBatch: function () {
        this.createProductBatchFlag = true
      },
      pageChange (currentPage) {
        console.log(currentPage)
      }
    }
  }
</script>
