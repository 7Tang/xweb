<template>
  <div class="download-code-container">
    <div class="content-cond-title">
      <label class="un-x-cell" :class="{'x-cell':openSign === 0}" @click="toggleTab(0)">商品码</label>
      <label class="un-x-cell" :class="{'x-cell':openSign === 1}" @click="toggleTab(1)">通用码</label>
      <label class="un-x-cell" :class="{'x-cell':openSign === 2}" @click="toggleTab(2)">下载记录</label>
    </div>
    <template v-if="openSign === 0">
      <div class="common-cond-box">
        <div class="common-cond-right">
          产品名称：<input type="text" v-model="productname" placeholder="请输入产品名称">
          创建时间：<datepicker v-model="startdate" class="date-input"></datepicker> - <datepicker v-model="enddate" class="date-input"></datepicker>
          <button type="button" class="searchbtn" @click="getProductData()">查询</button>
        </div>
      </div>
      <div class="data-list">
        <div class="list-title">
          <div class="flex-1">&nbsp;</div>
          <div class="flex-3">产品名称</div>
          <div class="flex-2">品牌</div>
          <div class="flex-2">线上数量</div>
          <div class="flex-2">创建时间</div>
          <div class="flex-2">类型</div>
        </div>
        <div :class="(index+1) % 2 ==0 ? 'list-content-1': 'list-content-2' " v-for="(data,index) in pageData">
          <div class="flex-1"><input name="checkradio" v-model="checkradio" type="radio" :value="data.vtypeid" @click="checkproductradio(data.barcode)"></div>
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

      <div class="dcc-footer">
        请输入您要下载码数量：
        <input placeholder="单次数量不能超过20万" type="text" class="codetext" v-model="productcodecnt"/>
        <button type="button" class="dcc-btn" @click="downloadcode(1)">一物一码</button>
        <button type="button" class="dcc-btn" @click="downloadcode(2)">一批一码</button>
        <button type="button" class="dcc-btn" @click="downloadcode(3)">一品一码</button>
      </div>
    </template>
    <template v-if="openSign === 1">
      <div class="x-box dcc-general-code">
        <label class="dcc-general-code-label">请输入您要下载的通用码数量：</label><input type="text" class="input dcc-download-number-input" v-model="codecnt"/>
        <button type="button" class="createbtn" @click="download4Xcodeapi()">下载</button><label class="dcc-download-desc">（单次数量不能超过<span class="dcc-important">20万</span>）</label>
      </div>
      <div class="dcc-questions-answers">
        <div class="dcc-questions">什么是通用码？文字待定</div>
        <div class="dcc-answers">通用编码是对于统计特性未知的信源所进行的有效编码。一类以估计信源的概率统计特性为基础；另一类以序列复杂度理论为基础</div>
        <div class="dcc-rules"><label class="dcc-rules-blank x-cursor">通用码规则</label><label class="x-cursor">通用码XXX</label></div>
      </div>
    </template>
    <template v-if="openSign === 2">
      <div class="common-cond-box">
        <div class="common-cond-right">
          产品名称：<input type="text" v-model="dlproductname" placeholder="请输入产品名称">
          创建时间：<datepicker v-model="dlstartdate" class="date-input"></datepicker> - <datepicker v-model="dlenddate" class="date-input"></datepicker>
          <button type="button" class="searchbtn" @click="getProductData()">查询</button>
        </div>
      </div>
      <div class="data-list">
        <div class="list-title">
          <div class="flex-1">产品名称</div>
          <div class="flex-1">码数</div>
          <div class="flex-1">下载时间</div>
          <div class="flex-1">赋码类型</div>
          <div class="flex-1">操作</div>
        </div>
        <div :class="(index+1) % 2 ==0 ? 'list-content-1': 'list-content-2' " v-for="(data,index) in dlPageData">
          <div class="flex-1">{{data.productname}}</div>
          <div class="flex-1">{{data.brand}}</div>
          <div class="flex-1">{{data.createtimestr | moment}}</div>
          <div class="flex-1">{{data.vtypecnt}}</div>
          <div class="flex-1"><button type="button" class="createbtn">重新下载</button></div>
        </div>
        <div class="x-box x-pagination">
          <pagination :total="dlTotal" :number="dlNumber" @set-current="dlPageChange"></pagination>
        </div>
      </div>
    </template>
    <a href="javascript:;" id="downa" style="display: none;"></a>
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
      this.getDLData()
    },
    data () {
      return {
        pageData: [],
        total: 0,     // 记录总条数
        number: 10,   // 每页显示条数
        dlPageData: [],
        dlTotal: 0,
        dlNumber: 0,
        checkradio: '',
        productname: '',
        dlproductname: '',
        barcode: '',
        productcodecnt: '',
        codecnt: '',
        openSign: 0,
        startdate: '',
        enddate: '',
        dlstartdate: '',
        dlenddate: ''
      }
    },
    components: {
      pagination,
      datepicker,
      moment
    },
    methods: {
      initdate: function () {
        this.startdate = moment(new Date()).format('YYYY-MM-DD')
        this.enddate = moment(new Date()).format('YYYY-MM-DD')
        this.dlstartdate = moment(new Date()).format('YYYY-MM-DD')
        this.dlenddate = moment(new Date()).format('YYYY-MM-DD')
      },
      pageChange: function (currentPage) {
        console.log(currentPage)
      },
      dlPageChange (currentPage) {
        console.log(currentPage)
      },
      getProductData: function () {
        let _vendorid = JSON.parse(sessionStorage.getItem('userinfo')).companyid
        this.$api.api_base('/v1/product/listapi', 'POST', {vendorid: _vendorid, productname: this.productname.length > 0 ? this.productname : null}, this.getProductDataSuccess, this.failure)
      },
      getProductDataSuccess: function (_res) {
        if (_res.data.result === 0) {
          this.pageData = _res.data.data
          this.total = _res.data.totalnum
          this.pageChange(1)
        } else {
          this.pageData = []
          this.total = 0
          this.$tool.toast(_res.data.message, 1000)
        }
      },
      getDLData () {
        let _vendorid = JSON.parse(sessionStorage.getItem('userinfo')).companyid
        this.$api.api_base('/v1/product/listapi', 'POST', {vendorid: _vendorid}, this.getDLSuccess, this.failure)
      },
      getDLSuccess (_res) {
        if (_res.data.result === 0) {
          this.dlPageData = _res.data.data
          this.dlTotal = _res.data.totalnum
          this.dlPageChange(1)
        } else {
          this.dlPageData = []
          this.dlTotal = 0
          this.$tool.toast(_res.data.message, 1000)
        }
      },
      checkproductradio: function (_barcode) {
        this.barcode = _barcode
      },
      downloadcode: function (_tagtype) {
        if (this.checkradio === '') {
          this.$tool.toast('请选择产品', 1000)
          return false
        }
        let _reg = /^\+?[1-9]\d*$/
        if (this.productcodecnt) {
          this.productcodecnt = parseInt(this.productcodecnt, 10)
        }
        if (!_reg.test(this.productcodecnt)) {
          this.$tool.toast('请输入下载码数量', 1000)
          return false
        }
        let _vendorid = JSON.parse(sessionStorage.getItem('userinfo')).companyid
        let _json = {vendorid: _vendorid, vtypeid: this.checkradio, codecnt: parseInt(this.productcodecnt, 10), tagtype: _tagtype, barcode: this.barcode}
        this.$api.api_base('/v1/xcode/download4Ccodeapi', 'POST', _json, this.downSucess, this.downFail)
      },
      download4Xcodeapi: function () {
        if (!this.codecnt || this.codecnt.length < 0) {
          this.$tool.toast('请输入下载的通用码数量', 1000)
          return false
        }
        let userinfo = JSON.parse(sessionStorage.getItem('userinfo'))
        let _json = {vendorid: userinfo.companyid, userid: userinfo.userid, codecnt: parseInt(this.codecnt, 10)}
        this.$api.api_base('/v1/xcode/download4Xcodeapi', 'POST', _json, this.downSucess, this.downFail)
      },
      toggleTab: function (_sign) {
        if (_sign === 1) {
          this.openSign = 1
        } else if (_sign === 2) {
          this.openSign = 2
        } else {
          this.openSign = 0
        }
      },
      failure: function (_err) {
        this.$tool.excPrompt(_err)
        this.$router.push('/login')
      },
      downSucess: function (_res) {
        if (_res.data.result && _res.data.result === 1) {
          this.downFail('下载失败')
        } else {
          let blob = new Blob([_res.data], {'type': 'text/plain;charset=UTF-8'})
          let a = document.querySelector('#downa')
          a.download = 'excel.txt'
          a.href = window.URL.createObjectURL(blob)
          a.click()
        }
      },
      downFail: function (_res) {
        this.$tool.toast(_res)
      }
    }
  }
</script>

<style scoped>

  .dcc-footer {
    margin: 0 25px;
    background-color: #ffffcc;
    line-height: 70px;
    text-align: center;
  }
  .dcc-footer .codetext{
    width: 150px;
    height: 36px;
    padding: 0 6px;
    border: 1px solid #dadada;
    outline: none;
  }
  .dcc-btn{
    width: 128px;
    height: 36px;
    margin: 0 0 0 10px;
    border: 1px solid #dfdfdf;
    border-radius: 5px;
    font-size: 16px;
    color: #333333;
    background-color: #ffffff;
    cursor: pointer;
    text-decoration: none;
    outline: none;
  }
  .dcc-btn:hover{
    color: #ff6633;
    border: 2px solid #ff6633;
  }


  /* 通用码 */
  .dcc-general-code{
    margin: 30px 0 30px 20px;
    align-items: center;
  }
  .dcc-general-code-label{
    color: #333333;
    margin-right: 4px;
  }
  .dcc-download-number-input{
    width: 150px;
    height: 36px;
    padding: 0 10px;
    margin: 0 10px 0 0;
    border: 1px solid #dadada;
    outline: none;
  }
  .dcc-download-desc{
    font-size: 18px;
    color: #767676;
  }
  .dcc-important{
    color: #3fa82e;
  }
  .dcc-questions-answers {
    margin: 0 15px;
    padding: 24px 24px 34px;
    background-color: #f8f8f8;
  }
  .dcc-questions{
    font-size: 18px;
    color: #333333;
    font-weight: bold;
    margin-bottom: 18px;
  }
  .dcc-answers{
    font-size: 16px;
    color: #363636;
    margin-bottom: 14px;
  }
  .dcc-rules{
    font-size: 16px;
    color: #3fa82e;
  }
  .dcc-rules-blank{
    margin-right: 30px;
  }
</style>
