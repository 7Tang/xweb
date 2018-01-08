<template>
  <div>
    <div class="content-cond-title"><label class="x-cell">{{vtypeid ? '修改产品': '创建产品'}}</label></div>
    <div class="pec-title">基本信息</div>
    <div class="pec-row">
      <div class="pec-cell">
        <label class="pec-font">产品名称<span class="x-require">*</span>:</label>
        <div class="pec-val1"><input type="text" class="pec-input" v-model.trim="productInfo.productname"></div>
      </div>
      <div class="pec-cell">
        <label class="pec-font">产品别名<span class="x-require">*</span>:</label>
        <div class="pec-val1"><input type="text" class="pec-input" v-model="productInfo.alias"></div>
      </div>
    </div>
    <div class="pec-row">
      <div class="pec-cell"><label class="pec-font">产品品牌<span class="x-require">*</span>:</label><div class="pec-val1"><input type="text" class="pec-input" v-model="productInfo.brand"></div></div>
      <div class="pec-cell"><label class="pec-font">产品条码<span class="x-require">*</span>:</label><div class="pec-val1"><input type="text" class="pec-input" v-model="productInfo.barcode"></div></div>
    </div>
    <div class="pec-row">
      <label class="pec-font">产品分类<span class="x-require">*</span>:</label>
      <select v-model="cname1" class="select pec-select" @change="changeProductRange(1)">
        <option value="">请选择</option>
        <template v-for="r1 in range1Data">
          <option :value="r1.cname1">{{r1.cname1}}</option>
        </template>
      </select>
      <span class="pec-blank"></span>
      <select v-model="cname2" class="select pec-select" @change="changeProductRange(2)">
        <option value="">请选择</option>
        <template v-for="r1 in range2Data">
          <option :value="r1.cname2">{{r1.cname2}}</option>
        </template>
      </select>
      <span class="pec-blank"></span>
      <select v-model="productInfo.cid" class="select pec-select">
        <option value="">请选择</option>
        <template v-for="r1 in range3Data">
          <option :value="r1.cid">{{r1.cname3}}</option>
        </template>
      </select>
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
      <div class="flex-1">证书名称</div>
      <div class="flex-1">认证机构</div>
      <div class="flex-2">有效期</div>
      <div class="flex-1">证书</div>
      <div class="flex-1">&nbsp;</div>
    </div>
    <template v-for="(cid,index) in certInfoData">
      <div class="pec-cert-row">
        <div class="flex-1"><input type="text" class="auth-input" ></div>
        <div class="flex-1"><input type="text" class="auth-input" ></div>
        <div class="flex-2"><datepicker v-model="startdate" class="date-input"></datepicker> 至 <datepicker v-model="enddate" class="date-input"></datepicker></div>
        <div class="flex-1"><span class="x-cursor">查看</span><span class="pec-vertical-line">|</span><span class="x-cursor">更新</span></div>
        <div class="flex-1 pec-cert-delete" @click="deleteCertInfo(index)"><img src="/static/image/icon/close.png"/></div>
      </div>
    </template>
    <div class="pec-cert-row pec-cert-add">
      <span @click="addCertInfo">+ 添加证书</span>
    </div>
    <div class="pec-btn">
      <button type="button" class="btn submit-btn pec-bl" @click="register">提交</button><button type="button" class="btn cancel-btn" @click="goBack">取消</button>
    </div>
  </div>
</template>
<script src="../../js/product/productAdd.js">
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
  .pec-cert-delete{
    width: 18px;
    height: 18px;
    background: url("/static/image/icon/close1.png") center no-repeat;
    background-size: 18px 18px;
  }
  .pec-cert-delete:hover{
    background: url("/static/image/icon/close.png") center no-repeat;
  }
  .pec-btn {
    padding: 40px 0;
    text-align: center;
  }
  .pec-bl{
    margin-right: 20px;
  }
  .pec-cert-add{
    margin-top: 20px;
    margin-left: 40px;
    font-size: 16px;
    color: #3fa82e;
  }

  .auth-input{
    width: 108px;
    height: 32px;
    padding: 0 5px;
  }
</style>
