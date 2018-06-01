import Vue from 'vue'
import Router, { RouteConfig, RouterOptions } from 'vue-router'
import Pages from './pages'

Vue.use(Router)

const routes: RouteConfig[] = [{
    path: '/',
    name: 'Home',
    component: Pages.Home
}]

const Options: RouterOptions = {
    base: '/cloud-office/pc/',
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
