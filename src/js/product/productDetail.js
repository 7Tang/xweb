export default{
  created () {
    this.getdetailapi()
  },
  data () {
    return {
      cname1: '',
      cname2: '',
      cname3: '',
      productTradeData: [{vtext: '普通产品', vid: 1}, {vtext: '进口产品', vid: 2}, {vtext: '出口产品', vid: 3}],
      range1Data: [],
      range2Data: [],
      range3Data: [],
      certInfoData: [{certName: ''}],
      imageFormat: ['image/jpeg', 'image/png'],
      imageData: [{rate: 0}],
      imageNum: 5,
      productInfo: {cid: ''},
      startdate: '',
      enddate: ''
    }
  },
  methods: {
    entryupdate: function () {
      this.$router.push({path: '/product/add', query: {vtypeid: this.$route.query.vtypeid}})
    },
    getdetailapi: function () {
      let vtypeid = this.$route.query.vtypeid
      let _vendorid = JSON.parse(sessionStorage.getItem('userinfo')).companyid
      this.$api.api_base('v1/product/detailapi', 'POST', {vtypeid: vtypeid, vendorid: _vendorid}, this.getdetailapiSuccess, this.failure)
    },
    getdetailapiSuccess: function (_res) {
      this.productInfo = _res.data.data
    },
    goBack: function () {
      this.$router.push('/product/register')
    },
    failure: function (err) {
      if (err.response) {
        this.$tool.toast('api error, HTTP CODE:' + err.response.status, 3000)
      }
      this.$router.push('/login')
    }
  }
}
