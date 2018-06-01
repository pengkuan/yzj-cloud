function toBase64 (url, opt) {
    opt = opt || {}
    opt.limit = opt.limit || 1024
    opt.mtype = opt.mtype || (url.match(/\.png$/) ? 'image/png' : 'image/jpeg')
    opt.quality = opt.quality || 1
    return new Promise(function (resolve, reject) {
        const img = new Image()
        const canvas = document.createElement('canvas')
        img.src = url
        img.onload = function () {
            var w = img.width
            var h = img.height
            var ctx
            var val
            canvas.width = w
            canvas.height = h
            ctx = canvas.getContext('2d')
            if (opt.bgColor) {
                ctx.fillStyle = opt.bgColor
            }
            ctx.drawImage(img, 0, 0, w, h)
            val = canvas.toDataURL(opt.mtype, opt.quality)
            if (val.length < opt.limit * 1024) {
                resolve(val)
            } else if (opt.mtype === 'image/jpeg' && (opt.quality > 0.0625)) {
                // 结果太大时，如果是image/jpeg，自动降低质量重新压缩（最低降到0.0625）
                opt.quality /= 2
                toBase64(url, opt).then(resolve).catch(reject)
            } else {
                reject(new Error(`图片体积（${parseInt(val.length / 1024)}KB，质量${opt.quality}）超过限制大小（${opt.limit}KB）：${url}`))
            }
        }
        img.onerror = function (e) {
            reject(e)
        }
    })
}

export default toBase64
