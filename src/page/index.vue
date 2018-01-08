<template>
  <div class="index-container x-box">
    <div class="x-menu">
      <div class="x-box x-logo"><img src="/static/image/logo.png"></div>
      <template v-for="(menu,index) in menuData">
        <div class="x-box menu-row" :class="{'m-active': menu.isOpen}" @click="triggerMenu(index)">
          <img class="menuImg" :src="menu.isOpen ? '/static/image/menu/icon-'+ index +'-1.png':'/static/image/menu/icon-'+ index +'-0.png'"><span>{{menu.menuName}}</span></div>
      </template>
      <div class="x-box menu-row logout"><span @click="logout">退出</span></div>
    </div>
    <div class="x-subMenu">
      <div class="x-br">&nbsp;</div>
      <template v-for="(subMenu,_index) in subMenuData">
        <div class="subMenu-row" :class="{'s-active': subMenu.active}" @click="triggerSubMenu(_index)">{{subMenu.menuName}}</div>
      </template>
    </div>
    <div class="x-content">
      <router-view></router-view>
    </div>
    <div class="x-other">
      <div class="x-box other-header"><img src="/static/image/menu/icon-help.png" class="oh-img"><label class="oh-title">帮助和服务</label></div>
      <div class="x-box o-row o-subTitle mg-sub"><div class="o-bar o-padding-left">帮助中心</div><div class="x-cursor">进入></div></div>
      <div class="title-row">商品在出售中列表找不到？</div>
      <div class="content-row">
        商品售罄库存为0，在已售罄列表中，提醒您该添加库存了，待付款订单也会占据库存，其超时关闭后库存才会释放。
      </div>
      <div class="os-bar"></div>
      <div class="o-subTitle mg-tr x-cursor">如何创建/发布产品？</div>
      <div class="o-subTitle mg-tr x-cursor">产品销量找不到对应的订单，怎么办？</div>
      <div class="o-subTitle mg-tr x-cursor">商品二维码使用说明</div>
      <div class="o-subTitle mg-tr x-cursor">商品可以设置积分兑换吗？</div>
      <div class="o-subTitle mg-tr x-cursor">分销商品变更说明</div>
      <div class="os-bar"></div>
      <div class="x-box o-row o-subTitle mg-sub"><div class="o-bar o-padding-left">服务经理</div><div></div></div>
      <div class="x-box o-question">
        <img src="/static/image/img_02.png" class="q-img x-cursor">
        <div>
          <div class="q-name x-cursor">绯樱</div>
          <div class="q-desc x-cursor">有问题来问题我</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  let menuData = [{menuName: '产品', isOpen: true, subMenu: [{menuName: '产品注册', active: false, mUrl: '/product/register'}, {menuName: '下载码', active: false, mUrl: '/product/downloadCode'}, {menuName: '产品批次', active: false, mUrl: '/product/batch'}, {menuName: '追溯模块', active: false, mUrl: ''}, {menuName: '产品导入', active: false, mUrl: ''}]},
    {menuName: '展示', isOpen: false, subMenu: []}, {menuName: '内容', isOpen: false, subMenu: []}, {menuName: '互动', isOpen: false, subMenu: []}, {menuName: '营销', isOpen: false, subMenu: []}, {menuName: '服务', isOpen: false, subMenu: []}, {menuName: '商场', isOpen: false, subMenu: []},
    {menuName: '企业', isOpen: false, subMenu: [{menuName: '企业信息', mUrl: '/enterprise'}]}]

  export default{
    created () {
//      this.getMenuData()
//      this.getSubMenuData()
    },
    data () {
      return {
        menuData: menuData,
        subMenuData: menuData[0].subMenu
      }
    },
    methods: {
      triggerMenu: function (_index) {
        this.menuData.forEach(function (item, i) {
          if (i === _index) {
            item.isOpen = true
          } else {
            item.isOpen = false
          }
        })
        this.menuData.forEach(function (item) {
          item.subMenu.forEach(function (it) {
            it.active = false
          })
        })
        this.subMenuData = this.menuData[_index].subMenu
      },
      triggerSubMenu: function (_index) {
        this.subMenuData.forEach(function (item, _i) {
          if (_i === _index) {
            item.active = true
          } else {
            item.active = false
          }
        })
        this.$router.push(this.subMenuData[_index].mUrl)
      },
      getMenuData: function () {
        this.$api.api_base('v1/menu/list4nodelevel1api', 'POST', {}, this.getMenuDataSuccess, this.failure)
      },
      getMenuDataSuccess: function (res) {
        console.log('menu---------------------------')
        console.log(res)
        if (res.data.result === 0) {
          this.menuData = res.data.data
        } else {
          if (res.data.message) {
            this.$tool.toast(res.data.message, 1000)
          }
        }
      },
      getSubMenuData: function (_code) {
        this.$api.api_base('v1/menu/list4nodelevel2api', 'POST', {nodecode1: '010000'}, this.getSubMenuDataSuccess, this.failure)
//        this.$api.api_base('v1/menu/list4nodelevel1api', 'POST', {nodecode1: _code}, this.getSubMenuDataSuccess, this.failure)
      },
      getSubMenuDataSuccess: function (res) {
        console.log('submenu=============================')
        console.log(res)
        if (res.data.result === 0) {
          this.subMenuData = res.data.data
        } else {
          if (res.data.message) {
            this.$tool.toast(res.data.message, 1000)
          }
        }
      },
      logout: function () {
        this.$router.push('/login')
//        this.$api.api_base('v1/user/loginoutapi', 'POST', {}, this.logoutSuccess, this.failure)
      },
      logoutSuccess: function (res) {
        if (res.data.result === 0) {
          localStorage.removeItem('token')
          this.$router.push('/login')
        } else {
          if (res.data.message) {
            this.$tool.toast(res.data.message, 1000)
          }
        }
      },
      failure: function (err) {
        console.log(err)
      }
    }
  }
</script>
<style lang="scss">
  @import "../style/scss/index.scss";
</style>
