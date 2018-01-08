import Vue from 'vue'
import Router from 'vue-router'
import login from '@/page/login'
import index from '@/page/index'

import enterpriseInfo from '../page/enterprise/enterpriseInfo.vue'
import editEnterprise from '../page/enterprise/editEnterprise.vue'
import enterpriseAudit from '../page/enterprise/enterpriseAudit.vue'

import productReg from '../page/product/productReg.vue'
import downloadCode from '../page/product/downloadCode.vue'
import productBatch from '../page/product/productBatch.vue'
import productAdd from '../page/product/productAdd.vue'
import productDetail from '../page/product/productDetail.vue'
import productBatchAdd from '../page/product/batchInfoAdd.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: login
    },
    {
      path: '/login',
      component: login
    },
    {
      path: '/enterprise/register',
      component: editEnterprise
    },
    {
      path: '/enterprise',
      component: index,
      children: [
        {path: '/', component: enterpriseInfo},
        {path: 'edit', component: editEnterprise},
        {path: 'audit', component: enterpriseAudit}
      ]
    },
    {
      path: '/product',
      component: index,
      children: [
        {path: 'register', component: productReg},
        {path: 'add', component: productAdd},
        {path: 'detail', component: productDetail},
        {path: 'downloadCode', component: downloadCode},
        {path: 'batch', component: productBatch},
        {path: 'batch/add', component: productBatchAdd}
      ]
    }
  ]
})
