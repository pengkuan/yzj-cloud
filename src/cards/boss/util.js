/**
 * boos 卡片工具类
 */
export const getOS = () => {
    const userAgent = navigator.userAgent
    let result = ''
    if (userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
        result = 'ios'
    } else if (userAgent.match(/Android/i)) {
        result = 'android'
    } else {
        result = ''
    }
    return result
}

export function formatNumber (num) {
    if (isNaN(num)) {
        return num
    }
    num = handleDecimals(num)
    num = (num + '').split('.')
    return num[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,') + (num.length > 1 ? ('.' + num[1]) : '')
}

export const handleDecimals = (value) => {
    if (!value) {
        return value
    }
    const valueStr = value + ''
    const exp = /\.00/gi
    const exp2 = /\.[1-9]0/gi
    if (exp.test(valueStr)) {
        value = valueStr.replace(exp, '')
    } else if (exp2.test(valueStr)) {
        value = valueStr.substring(0, valueStr.length - 1)
    }
    return value
}
