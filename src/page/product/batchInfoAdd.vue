<template>
  <div class="product-edit-container">
    <div class="x-box x-row x-row-sub-l"><label class="x-cell">创建产品批次</label><div class="edit-btn">填写批次信息</div></div>
    <div class="pec-title pec-border">产品基本信息</div>
    <div class="x-box pec-first-line-top pec-base-info">
      <img src="/static/image/img_01.png" class="pec-base-img"/><label class="pec-base-label pec-font">产品名称<span class="x-require">*</span>:</label>
      <label class="pec-base-name">右边乐山大佛顶替顶替人佣兵顶号轸圆脸螺栓</label><label class="pec-base-label pec-font">产品品牌<span class="x-require">*</span>:</label>
      <label class="pec-base-name">寿光</label>
    </div>
    <div class="pec-title">批次信息</div>
    <div class="pec-hr"></div>
    <div class="x-box pec-row pec-first-line-top">
      <div class="x-box pec-cell"><label class="pec-l1 pec-font">生产批号<span class="x-require">*</span>:</label><div><input type="text" class="input pec-input"></div></div>
      <div class="x-box pec-cell"><label class="pec-l1 pec-font">生产日期<span class="x-require">*</span>:</label>
        <div class="x-box pec-batch-info-cell pec-val1"><input type="text" class="input pec-other-input"><span class="pec-batch-delete x-cursor">删除批次</span></div>
      </div>
    </div>
    <div class="x-box pec-row pec-other-line-top">
      <div class="x-box pec-cell"><label class="pec-l1 pec-font">产品数量<span class="x-require">*</span>:</label>
        <div><input type="text" class="input pec-input"></div></div>
      <div class="x-box pec-cell"><label class="pec-l1 pec-font">赋码类型<span class="x-require">*</span>:</label>
        <div class="x-box pec-val1"><select name="" class="select pec-select">
          <option value="">请选择</option>
          <option value="">一物一码</option>
        </select></div></div>
    </div>
    <div class="x-box pec-row pec-other-line-top">
      <div class="x-box pec-cell"><label class="pec-l1 pec-font">起止编号<span class="x-require">*</span>:</label>
        <div><input type="text" class="input pec-code-input"><label class="pec-code-blank">-</label><input type="text" class="input pec-code-input"></div></div>
      <div class="x-box pec-cell"><label class="pec-l1 pec-font">标签<span class="x-require">*</span>:</label>
        <div class="x-box pec-val1"><input type="text" class="input pec-other-input"></div></div>
    </div>
    <div class="pec-hr pec-hr-blank"></div>
    <div class="pec-hr"></div>
    <div class="x-box pec-row pec-first-line-top">
      <div class="x-box pec-cell"><label class="pec-l1 pec-font">生产批号<span class="x-require">*</span>:</label><div><input type="text" class="input pec-input"></div></div>
      <div class="x-box pec-cell"><label class="pec-l1 pec-font">生产日期<span class="x-require">*</span>:</label>
        <div class="x-box pec-batch-info-cell pec-val1"><input type="text" class="input pec-other-input"><span class="pec-batch-delete x-cursor">删除批次</span></div>
      </div>
    </div>
    <div class="x-box pec-row pec-other-line-top">
      <div class="x-box pec-cell"><label class="pec-l1 pec-font">产品数量<span class="x-require">*</span>:</label>
        <div><input type="text" class="input pec-input"></div></div>
      <div class="x-box pec-cell"><label class="pec-l1 pec-font">赋码类型<span class="x-require">*</span>:</label>
        <div class="x-box pec-val1"><select name="" class="select pec-select">
          <option value="">请选择</option>
          <option value="">一物一码</option>
        </select></div></div>
    </div>
    <div class="x-box pec-row pec-other-line-top">
      <div class="x-box pec-cell"><label class="pec-l1 pec-font">起止编号<span class="x-require">*</span>:</label>
        <div><input type="text" class="input pec-code-input"><label class="pec-code-blank">-</label><input type="text" class="input pec-code-input"></div></div>
      <div class="x-box pec-cell"><label class="pec-l1 pec-font">标签<span class="x-require">*</span>:</label>
        <div class="x-box pec-val1"><input type="text" class="input pec-other-input"></div></div>
    </div>
    <div class="pec-hr pec-hr-blank"></div>
    <div class="x-box pec-cert-row pec-cert-add">
      + 添加批次
    </div>
    <div class="pec-btn">
      <button type="button" class="btn submit-btn pec-bl">提交</button><button type="button" class="btn cancel-btn">取消</button>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  @import "../../style/comm/mixin";
  @import "../../style/scss/product/productedit";
</style>
