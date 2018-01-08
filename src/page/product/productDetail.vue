<template>
  <div>
    <div class="content-cond-title"><label class="x-cell">产品详情</label></div>
    <div class="pec-title">基本信息</div>
    <div class="pec-row">
      <div class="pec-cell"><label class="pec-font">产品名称<span class="x-require">*</span>:</label><div class="pec-val1">{{productInfo.productname}}</div></div>
      <div class="pec-cell"><label class="pec-font">产品别名<span class="x-require">*</span>:</label><div class="pec-val1">{{productInfo.alias}}</div></div>
    </div>
    <div class="pec-row">
      <div class="pec-cell"><label class="pec-font">产品品牌<span class="x-require">*</span>:</label><div class="pec-val1">{{productInfo.brand}}</div></div>
      <div class="pec-cell"><label class="pec-font">产品条码<span class="x-require">*</span>:</label><div class="pec-val1">{{productInfo.barcode}}</div></div>
    </div>
    <div class="pec-row">
      <label class="pec-font">产品分类<span class="x-require">*</span>:</label>
      <div class="pec-val1">{{productInfo.cname1}} - {{productInfo.cname2}} - {{productInfo.cname3}}</div>
    </div>
    <div class="x-box">
      <label class="pec-l1 pec-img-top pec-font">产品图片<span class="x-require">*</span>:</label>
      <div class="x-box pec-val2">
        <template v-for="(ig,index) in imageData">
          <div v-if="false" class="image-box"><img src=""/></div>
          <label :for="'uploadPImg'+index"><div class="image-box"></div></label>
          <input type="file" class="upload-input" :id="'uploadPImg'+index" ref="uploadPImg" @change="handleFileChange(index)"/>
        </template>
      </div>
    </div>
    <div class="pec-img-desc">仅支持JPG、GIF、PNG三种格式，大小不超过3M</div>
    <div class="pec-title">扩展信息</div>
    <div class="pec-row">
      <div class="pec-cell"><label class="pec-font">原产地<span class="x-require">*</span>:</label><div class="pec-val1"><input type="text" class="pec-input" ></div></div>
      <div class="pec-cell"><label class="pec-font">生产企业<span class="x-require">*</span>:</label><div class="pec-val1"><input type="text" class="pec-input" ></div></div>
    </div>
    <div class="pec-row">
      <div class="pec-cell"><label class="pec-font">保持期<span class="x-require">*</span>:</label><div class="pec-val1"><input type="text" class="pec-input"></div></div>
      <div class="pec-cell"><label class="pec-font">产品规格<span class="x-require">*</span>:</label><div class="pec-val1"><input type="text" class="pec-input" ></div></div>
    </div>
    <div class="pec-row">
      <div class="pec-cell"><label class="pec-font">贸易类别<span class="x-require">*</span>:</label>
        <div class="pec-val1">
          <select class="select pec-select">
            <option value="">请选择</option>
            <template v-for="r1 in productTradeData">
              <option :value="r1.vid">{{r1.vtext}}</option>
            </template>
          </select>
        </div>
      </div>
      <div class="pec-cell"><label class="pec-font">海关编码<span class="x-require">*</span>:</label><div class="pec-val1"><input type="text" class="pec-input" ></div></div>
    </div>
    <div class="pec-title">认证信息</div>
    <div class="pec-cert-row">
      <div class="flex-2">证书名称</div>
      <div class="flex-2">认证机构</div>
      <div class="flex-2">有效期</div>
      <div class="flex-1">证书</div>
    </div>
    <template v-for="(cid,index) in certInfoData">
    <div class="pec-cert-row">
      <div class="flex-2">123123</div>
      <div class="flex-2">213132</div>
      <div class="flex-2">2017-12-12 至 2019-12-12</div>
      <div class="flex-1"><span class="x-cursor">查看</span></div>
    </div>
    </template>
    <div class="pec-btn">
      <button type="button" class="btn submit-btn pec-bl" @click="entryupdate">修改</button><button type="button" class="btn cancel-btn" @click="goBack">取消</button>
    </div>
  </div>
</template>
<script src="../../js/product/productDetail.js">
</script>

<style scoped>
  .pec-img-top{
    margin-top: 24px;
    font-size: 16px;
  }
  .pec-l1 {
    margin-left: 38px;
  }
  .pec-val2 {
    margin-top: 24px;
  }
  .image-box{
    width: 50px;
    height: 50px;
    margin-right: 20px;
    background: url("/static/image/icon/add.png") no-repeat;
    background-size: 50px 50px;
    cursor: pointer;
  }
  .upload-input{
    display: none;
  }
  .pec-img-desc{
    margin: 10px 0 0 186px;
    font-size: 14px;
    color: #767676;
  }
  .pec-cert-row{
    display: flex;
    display: -webkit-flex;
    margin-top: 20px;
    align-items: center;
    font-size: 16px;
  }
  .pec-btn {
    padding: 40px 0;
    text-align: center;
  }
  .pec-bl{
    margin-right: 20px;
  }
</style>
