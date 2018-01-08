import datepicker from 'vue-datepicker-local'

export default{
  created () {
    this.getEnterpriseRange1()
    this.vtypeid = this.$route.query.vtypeid
    if (this.vtypeid) {
      this.getdetailapi()
    }
  },
  components: {
    datepicker
  },
  verify: {
    productInfo: {
      productname: ['required']
    }
  },
  data () {
    return {
      vtypeid: null,
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
    telonInvalid () {
      alert('safdsf')
    },
    getdetailapi: function () {
      let _vendorid = JSON.parse(sessionStorage.getItem('userinfo')).companyid
      this.$api.api_base('v1/product/detailapi', 'POST', {vtypeid: this.vtypeid, vendorid: _vendorid}, this.getdetailapiSuccess, this.failure)
    },
    getdetailapiSuccess: function (_res) {
      this.productInfo = _res.data.data
    },
    getEnterpriseRange1: function () {
      this.$api.api_base('v1/category/list4cname1api', 'POST', {}, this.getEnterpriseRange1Success, this.failure)
    },
    getEnterpriseRange1Success: function (_res) {
      this.range1Data = _res.data.data
    },
    changeProductRange: function (_sign) {
      if (_sign === 1) {
        this.getEnterpriseRange2()
      } else if (_sign === 2) {
        this.getEnterpriseRange3()
      }
    },
    getEnterpriseRange2: function () {
      this.$api.api_base('v1/category/list4cname2api', 'POST', {cname1: this.cname1}, this.getEnterpriseRange2Success, this.failure)
    },
    getEnterpriseRange2Success: function (_res) {
      this.range2Data = _res.data.data
    },
    getEnterpriseRange3: function () {
      this.$api.api_base('v1/category/list4cname3api', 'POST', {cname1: this.cname1, cname2: this.cname2}, this.getEnterpriseRange3Success, this.failure)
    },
    getEnterpriseRange3Success: function (_res) {
      this.range3Data = _res.data.data
    },
    addCertInfo: function () {
      let _tempCert = {certName: ''}
      this.certInfoData.push(_tempCert)
    },
    deleteCertInfo: function (_index) {
      if (this.certInfoData && this.certInfoData.length > 1) {
        this.certInfoData.splice(_index, 1)
      }
    },
    register: function () {
      if (this.$verify.check()) {
        alert('12')
      } else {
        console.log(this.$verify.$errors.productInfo.productname)
      }
      let userinfo = JSON.parse(sessionStorage.getItem('userinfo'))
      this.productInfo.vendorid = userinfo.companyid
      this.productInfo.userid = userinfo.userid
      this.$api.api_base('v1/product/registerapi', 'POST', this.productInfo, this.registerSuccess, this.failure)
    },
    registerSuccess: function (res) {
      if (res.data.result === 0) {
        this.$router.push('/product/register')
      } else {
        if (res.data.message) {
          this.$tool.toast(res.data.message, 1000)
        }
      }
    },
    addUploadImg: function () {
      if (this.imageData && this.imageData.length <= this.imageNum) {
        let _tempData = {rate: 0}
        this.imageData.push(_tempData)
      }
    },
    deleteUploadImg: function (_index) {
      // todo 有上传居然没有删除图片的接口 =_=
    },
    // todo 关于产品图片上传，接口调用无法通过测试，不知道返回的是什么数据，理论上传文件，注册产品时将图片与产品建立相应关系(即类似中间表)
    // todo
    // 上传文件
    handleFileChange: function (_index) {
      let rFile = this.$refs.uploadPImg[_index]
      this.file = rFile.files[0]
      let tempFlag = true
      this.imageFormat.forEach(function (item) {
        if (item === rFile.files[0].type) {
          tempFlag = false
        }
      })
      if (tempFlag) {
        this.$tool.toast('请选择以gif、jpg、png为后缀的图片', 1500)
        this.$refs.uploadPImg[_index].value = ''
        return
      }
      // 将图片大小单位转为KB
      let size = Math.floor(this.file.size / 1024)
      if (size > 3 * 1024) {
        this.$tool.toast('上传的图片不能超过3M', 1500)
        return
      }
      var form = new FormData()
      form.append('file', this.file)  // file 服务端bean对应的MultipartFile类型字段
      this.$api.api_upload('v1/img/imguploadapi', form, this.uploadImgSuccess, this.failure, this.progress, _index)
    },
    uploadImgSuccess: function (res, _index) {
      this.$tool.toast('上传成功', 1500)
      console.log(res)
    },
    /**
     * 上传速度、
     * '上传速度:' + ev.loaded + '/' + ev.total + 'bytes.   ' + _rate.toFixed(2) + '%'
     * @param ev
     * @param _i
     * @param _flag
     */
    progress: function (ev, _i) {
      if (ev.lengthComputable) {
        let _rate = ev.loaded / ev.total * 100
        this.$set(this.imageData[_i], 'rate', _rate.toFixed(0) + '%')
      }
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
