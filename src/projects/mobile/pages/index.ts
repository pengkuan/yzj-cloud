/**
 * page entery
 */

// page components
// import 在android中有问题
const Home = () => import('./Home.vue')
const Setting = () => import(/* webpackChunkName: 'static/setting' */'./setting.vue')
const V10 = () => import('./v10.vue')
const Intro = () => import(/* webpackChunkName: 'static/intro' */'./intro.vue')
const IntroV10 = () => import(/* webpackChunkName: 'static/intro' */'./v10-intro.vue')
const Qixi = () => import(/* webpackChunkName: 'static/qixi' */'./qixi.vue')
const Case = () => import(/* webpackChunkName: 'static/caseTeam' */'./caseTeam.vue')
const Notice = () => import(/* webpackChunkName: 'static/notice' */'./notice.vue')

export default {
    Home,
    Setting,
    V10,
    Intro,
    IntroV10,
    Qixi,
    Case,
    Notice
}
