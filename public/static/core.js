window.coreInit = function (callback) {
    // 避免重复执行初始化代码，在初始化完成之前的callback放入队列
    if (window.coreInit.list) {
        window.coreInit.list.push(callback)
        return
    } else {
        window.coreInit.list = [callback]
    }

    var bridge = window.XuntongJSBridge

    var jsApiList = [
        'toast',
        'request',
        'cloudoffice.request',
        'cloudoffice.showCardNotify',
        'cloudoffice.clearCardNotify',
        'cloudoffice.getRoleType',
        'cloudoffice.checkAppAuth',
        'cloudoffice.shareText', // desktop不用实现
        'cloudoffice.downloadPic', // desktop不用实现
        'cloudoffice.checkWorkbenchUpdate', // desktop不用实现
        'ui.changeNavBarStyle', // desktop不用实现
        'ui.toast',
        'runtime.jsReady', // desktop不用实现
        'cloudoffice.textShareClosed', // desktop不用实现
        'cloudoffice.dataReport', // desktop不用实现
        'ui.webViewScrollTo'
    ]

    var _core = {}

    // ns
    var namespace = function (obj, ns, value) {
        ns = ns.split('.')
        for (var i = 0; i < ns.length; i++) {
            if (i === ns.length - 1) {
                obj[ns[i]] = value
            } else {
                obj[ns[i]] = obj[ns[i]] || {}
                obj = obj[ns[i]]
            }
        }
    }

    var parse = function (val) {
        if (typeof val === 'string' && val) {
            try {
                return JSON.parse(val)
            } catch (e) {}
        }
        return val
    }

    var stringify = function (val) {
        if (typeof val !== 'string') {
            val = JSON.stringify(val)
        }
        return val
    }

    var createStorage = function (opt) {
        opt = opt || {}
        var useStorage = opt.storage || localStorage
        var prefix = opt.prefix || ''
        var storage = {
            getItem: function (name) {
                return useStorage.getItem(prefix + name)
            },
            getJSON: function (name) {
                return parse(useStorage.getItem(prefix + name))
            },
            setItem: function (name, val) {
                var set = function (name, val) {
                    useStorage.setItem(prefix + name, stringify(val))
                }
                // 记录keys
                var keys = storage.getJSON('keys') || {}
                keys[name] = 1
                set('keys', keys)
                set(name, val)
            },
            removeItem: function (name) {
                useStorage.removeItem(prefix + name)
            },
            keys: function () {
                return Object.keys(storage.getJSON('keys') || {})
            },
            clear: function () {
                var keys = storage.keys()
                keys.forEach(function (name, i) {
                    storage.removeItem(name)
                })
                storage.removeItem('keys')
            }
        }
        return storage
    }

    function initUserInfo (callback) {
        bridge.call('getPersonInfo', {}, function (e) {
            if (e.success && e.data) {
                _core.userInfo = e.data
            } else {
                _core.userInfo = {}
            }
            if (typeof callback === 'function') callback(_core.userInfo)
        })
    }

    function initStorage (userInfo, callback) {
        // 以圈子id作为storage的前缀
        var enterprisePrefix = userInfo ? ('e' + userInfo.eid + 'u' + userInfo.wbuserid) : ''
        var userPrefix = userInfo ? ('u' + userInfo.wbuserid) : ''

        // ========================
        // localStorage

        // 用户+圈的
        _core.storage = createStorage({
            prefix: enterprisePrefix
        })

        // 用户的
        _core.userStorage = createStorage({
            prefix: userPrefix
        })

        // 全局的
        _core.globalStorage = createStorage()

        // ========================
        // sessionStorage

        // 用户+圈的
        _core.session = createStorage({
            storage: sessionStorage,
            prefix: enterprisePrefix
        })

        // 用户的
        _core.userSession = createStorage({
            storage: sessionStorage,
            prefix: userPrefix
        })

        // 全局的
        _core.globalSession = createStorage({
            storage: sessionStorage
        })

        callback()
    }

    function initSDK (callback) {
        callback()
    }

    function checkSdkAndUserinfo (callback) {
        if (_core.userInfo && _core.sdkIsReady && _core.storage) {
            window._core = _core

            // 清空队列
            window.coreInit.list.forEach(function (callback) {
                if (typeof callback === 'function') callback(_core)
            })

            // 重写方法
            window.coreInit = function (callback) {
                if (typeof callback === 'function') callback(_core)
            }
        }
    }

    initSDK(function () {
        _core.sdkIsReady = true

        window.cloudhub = {}
        jsApiList.forEach(function (api) {
            namespace(window.cloudhub, api, function () {
                var args = Array.prototype.slice.call(arguments, 0)
                // 确保最后一个参数是回调函数
                if (typeof args[args.length - 1] !== 'function') {
                    args.push(function () {})
                }
                var params = args[args.length - 2] || {}
                params.success = args[args.length - 1]
                // 最后一个参数是回调函数
                // 倒数第二个参数是传入参数
                window.qing.call(api, params)
            })
        })

        // 桌面端桥兼容
        if (window.qing.isDesktop) {
            cloudhub.cloudoffice.request = function (opt, success) {
                opt.success = success
                qing.call('request', opt)
            }
            cloudhub.ui.toast = function (opt) {
                qing.call('toast', {
                    type: opt.type || '',
                    msg: opt.message,
                    duration: 3,
                    position: 'middle'
                })
            }
        }

        checkSdkAndUserinfo()
    })

    initUserInfo(function (userInfo) {
        initStorage(userInfo, checkSdkAndUserinfo)
    })
}
