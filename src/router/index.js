import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    // mode: 'history',
    // base: 'wtzblog_2.0',
    routes: [
        {
            path: '/',
            name: 'index',
            meta: {
                keepAlive: false
            },
            component: resolve => require(['@/pages/index'], resolve)
        },
        {
            path: '/eassy',
            name: 'blog',
            meta: {
                keepAlive: false
            },
            component: resolve => require(['@/pages/blog'], resolve)
        },
        {
            path: '/resume',
            name: 'resume',
            meta: {
                keepAlive: false
            },
            component: resolve => require(['@/pages/resume'], resolve)
        },
        {
            path: '/item',
            name: 'item',
            meta: {
                keepAlive: false
            },
            component: resolve => require(['@/pages/item.vue'], resolve)
        },
        {
            path: '/uploadFile',
            name: 'uploadFile',
            meta: {
                keepAlive: false
            },
            component: resolve => require(['@/pages/uploadFile.vue'], resolve)
        },
        {
          path: '/download',
          name: 'download',
          meta: {
            keepAlive: false
          },
          component: resolve => require(['@/pages/download.vue'], resolve)
        },
        {
          path: '/player',
          name: 'player',
          meta: {
            keepAlive: false
          },
          component: resolve => require(['@/pages/player.vue'], resolve)
        },
    ]
}, )