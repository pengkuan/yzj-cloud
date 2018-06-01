import Vue from 'vue'
import Router, { RouteConfig, RouterOptions } from 'vue-router'
import Pages from './pages'

Vue.use(Router)

const routes: RouteConfig[] = [
    {
        path: '/',
        name: 'Home',
        component: info.isV10 ? Pages.V10 : Pages.Home
    },
    {
        path: '/setting',
        name: 'Setting',
        component: Pages.Setting
    },
    {
        path: '/v10',
        name: 'V10',
        component: Pages.V10
    },
    {
        path: '/intro',
        name: 'Intro',
        component: info.isV10 ? Pages.IntroV10 : Pages.Intro
    },
    {
        path: '/qixi',
        name: 'Qixi',
        component: Pages.Qixi
    },
    {
        path: '/case',
        name: 'Case',
        component: Pages.Case
    },
    {
        path: '/guide',
        name: 'Guide',
        component: Pages.Case
    },
    {
        path: '/notice/:id',
        name: 'Notice',
        meta: {
            type: 'notice'
        },
        component: Pages.Notice
    },
    {
        path: '/breakdown/:id',
        name: 'Breakdown',
        meta: {
            type: 'breakdown'
        },
        component: Pages.Notice
    }
]

const Options: RouterOptions = {
    base: '/cloud-office/',
    mode: 'hash',
    routes,
    scrollBehavior (to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { x: 0, y: 0 }
        }
    }
}

export default new Router(Options)
