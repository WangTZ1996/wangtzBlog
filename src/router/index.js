import Vue from 'vue'
import Router from 'vue-router'
import home from '@/pages/home'
import blog from '@/pages/blog'
import resume from '@/pages/resume'
import indexPage from '@/pages/index'

Vue.use(Router)

export default new Router({
    // mode: 'history',
    routes: [{
            path: '/',
            name: 'home',
            meta: {
                keepAlive: true
            },
            component: resolve => require(['@/pages/home'], resolve)
        },
        {
            path: '/blogTable',
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
    ]
}, )