export function formatDate (d, fmt) {
    var o = {
        'M+': d.getMonth() + 1, // 月份
        'd+': d.getDate(), // 日
        'h+': d.getHours(), // 小时
        'H+': d.getHours(), // 小时
        'm+': d.getMinutes(), // 分
        's+': d.getSeconds(), // 秒
        'q+': Math.floor((d.getMonth() + 3) / 3), // 季度
        'S': d.getMilliseconds() // 毫秒
    }
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (d.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    for (var k in o) {
        const reg = new RegExp(`(${k})`)
        if (reg.test(fmt)) {
            const matcher = RegExp.$1
            const result = (matcher.length === 1) ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
            fmt = fmt.replace(matcher, result)
        }
    }
    return fmt
}

export function isValidDate (d) {
    const toString = Object.prototype.toString
    const dateTypeString = '[object date]'
    if (toString.call(d).toLowerCase() === dateTypeString) {
        if (isNaN(d.getTime())) {
            return true
        }
        return false
    }
    return false
}
export function nativeValidate (options) {
    window.XuntongJSBridge.call('validate', {
        type: options.type || 'touchID',
        lightAppId: options.lightAppId,
        prompt: options.prompt || '为保证数据安全'
    }, (res) => {
        if (res.success === true || res.success === 'true') {
            options.callback && options.callback()
        }
    })
}

export function isPlainObject (o) {
    return Object.prototype.toString.call(o) === '[object Object]'
}

export function objectKeySort (obj) {
    if (Array.isArray(obj)) {
        // 数组处理
        return obj.map(n => {
            return objectKeySort(n)
        })
    } else if (isPlainObject(obj)) {
        // 对象处理
        let result = {}
        Object.keys(obj).sort().forEach(key => {
            result[key] = objectKeySort(obj[key])
        })
        return result
    } else {
        // 其它类型直接返回
        return obj
    }
}

export function px2rem (px) {
    return px / 50
}

// 向url中插入query
export function urlInsertQuery (url, key, value) {
    let [fullpath, hash] = url.split('#')
    let [path, query] = fullpath.split('?')
    let str = key + '=' + value
    if (query) {
        query = str + '&' + query
    } else {
        query = str
    }

    return path + '?' + query + (hash ? ('#' + hash) : '')
}

// 字符串替换
export function substitute (s, o) {
    var SUBREGEX = /\{\s*([^|}]+?)\s*(?:\|([^}]*))?\s*\}/g
    return s.replace ? s.replace(SUBREGEX, function (match, key) {
        return (typeof o[key] === 'undefined') ? match : o[key]
    }) : s
}

// 普通字符串转对象
export function str2Object (str) {
    if (!str) return str
    
    var id = 'temp' + parseInt(Math.random() * 10000000)
    var code = 'window.' + id + '=(' + str + ')'
    var obj = null
    try {
        eval(code)
        obj = window[id]
    } finally {
        delete window[id]
    }

    return obj
}
