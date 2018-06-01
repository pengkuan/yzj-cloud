// url参数提取为对象
export function params2object (url) {
    var params = {}
    if (typeof url === 'object') {
        return url
    } else if (typeof url === 'string') {
        url.replace(/^.*\?|#.*$/g, '').split('&').forEach(n => {
            n = n.split('=')
            if (n.length === 2) {
                params[n[0]] = n[1]
            }
        })
    }
    return params
}

// 把 url 和 params 拼起来
export function urlAddParams (url, params) {
    if (typeof url === 'string') {
        if (url.match(/\?/)) {
            url = url.replace(/\?/, '?' + params + '&')
        } else if (url) {
            url = url + '?' + params
        } else {
            url = params
        }
    }
    
    return url
}
