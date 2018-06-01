var developHost = 'http://192.168.22.144'
var devenv = location.search.replace('?', '')

// 运行环境判断
var hostname = location.hostname

var runenv = {
    '192.168.22.144': 'dev',
    'dev.kdweibo.cn': 'dev',
    '192.168.1.49': 'devtest',
    'devtest.kdweibo.cn': 'devtest',
    'kdtest.kdweibo.cn': 'kdtest',
    'dotest.kdweibo.cn': 'kdtest',
    'www.yunzhijia.com': 'yzj',
    'do.yunzhijia.com': 'yzj'
}[hostname] || 'yzj'

if (hostname.indexOf('172.20') === 0 || hostname === 'localhost' || hostname === '127.0.0.1') {
    runenv = 'local'
}

switch (devenv) {
    case 'yzj':
        runenv = 'yzj'
        developHost = 'https://do.yunzhijia.com'
        break
    case 'kdtest':
        runenv = 'kdtest'
        developHost = 'https://dotest.kdweibo.cn'
        break
    case 'devtest':
        runenv = 'devtest'
        developHost = 'http://192.168.1.49'
        break
    default:
        developHost = 'http://192.168.22.144'
        break
}

var serverHost = {
    'local': 'http://192.168.22.144',
    'dev': 'http://192.168.22.144',
    'devtest': 'http://192.168.1.49',
    'kdtest': 'https://kdtest.kdweibo.cn',
    'yzj': 'https://www.yunzhijia.com'
}[runenv] || 'https://www.yunzhijia.com'

var ENV = {
    serverHost: serverHost + '/',
    serverRootUrl: '/',
    moduleName: 'cloudoffice',
    version: 1.09,
    environment: process.env.NODE_ENV,
    // 运行环境：local、dev、devtest、kdtest、yzj
    runenv,
    cloudofficeAppId: 101091520,
    defaultLocale: 'zh',
    apiNameSpace: 'api',
    hostEndpoint: 'cloud-office',
    apiHostEndpoint: 'cloudwork',
    // 错误追踪延时（毫秒）
    trackDelay: 0
}

// sentry服务地址
ENV.trackConfig = 'https://2414d2f4e1c74f84ad8d282d5d2acb9f@sentry.kdweibo.cn/2'

if (ENV.environment === 'development') {
    ENV.host = `${developHost}`
    ENV.baseURL = `${developHost}/${ENV.hostEndpoint}/`
    ENV.apiBaseURL = `${developHost}/${ENV.apiHostEndpoint}/`
    ENV.assetsUrl = '/static'
    ENV.serverRootUrl = `${developHost}/`
    // Raven config
}
if (ENV.environment === 'staging') {
    ENV.host = `${developHost}`
    ENV.serverRootUrl = 'http://dotest.kdweibo.cn/'
    ENV.baseURL = `${developHost}/${ENV.hostEndpoint}/`
    ENV.apiBaseURL = `${developHost}/${ENV.apiHostEndpoint}/`
    ENV.assetsUrl = '/static'
}
if (ENV.environment === 'production') {
    ENV.host = ``
    ENV.serverRootUrl = '/'
    ENV.baseURL = `/${ENV.hostEndpoint}/`
    ENV.apiBaseURL = `/${ENV.apiHostEndpoint}/`
    ENV.assetsUrl = '/cloudoffice/mobile/dist/static'
}

export default ENV
