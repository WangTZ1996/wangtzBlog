import Vue from 'vue'
import Router from 'vue-router'
import home from '@/pages/home'
import blog from '@/pages/blog'
import resume from '@/pages/resume'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [{
            path: '/',
            name: 'blog',
            meta: {
                keepAlive: false
            },
            component: blog
        },
        {
            path: '/resume',
            name: 'resume',
            meta: {
                keepAlive: false
            },
            component: resume
        }
    ]
}, )