// 1. 上报数据格式：
//      pageId: string（页面id）
//      CommonTimePont: {
//        platform: number(平台),
//        networkType: string（网络类型）,
//        yzjVersion: string（终端版本）,
//        isOnline: boolean（是否走混合应用）,
//        nativeStage: number（终端耗时）,
//        networkStage: number(网络耗时)
//      },
//      BusinessTimePont: Array(自定义各阶段耗时)

// 2. clickPoint: 用户点击轻应用或者主Tab（UTC time）

// 3. requestPoint: 终端发起网络请求(UTC time​)

// 4. 自定义耗时阶段例如：css下载解析耗时，业务js解析执行耗时，发起首屏数据耗时，返回首屏数据耗时等自定义业务埋点
(function (context, factory) {
    if (typeof exports === 'object' && typeof module !== 'undefined') {
        module.exports = factory()
    }
    else if (typeof define === 'function' && (define.amd || define.cmd)) {
        define(factory)
    }
    else {
        context.speedSdk = factory()
    }
})(this, function () {
    var speedSdk = {
        pid: '',
        once: 0,
        init: function (id) {
            this.pid = id || ''
            this.autoReport()
        },
        getBtp: function (timePoint) {
            var btp = ''
            if (!Array.isArray(timePoint)) {
                return btp
            }
            for (var i = 0; i < timePoint.length; i++) {
                btp += '&pointStage' + i + '=' + timePoint[i]
            }
            return btp
        },
        report: function (timePoint) {
            var that = this
            if (!this.once) {
                this.once += 1
            } else {
                return
            }

            var ua = window.navigator.userAgent
            var platform = (ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) ? 2 : (ua.match(/Android/i) ? 1 : 0)
            var yzjVersion, networkType, isOnline, nativeStage, networkStage, firstPageVisible

            window.cloudhub && window.cloudhub.cloudoffice && window.cloudhub.cloudoffice.dataReport && window.cloudhub.cloudoffice.dataReport(function (res) {
                if (res && res.success === 'true' && res.data) {
                    yzjVersion = res.data.yzjVersion
                    networkType = res.data.networkType
                    isOnline = !res.data.isHybrid
                    nativeStage = res.data.requestPoint - res.data.clickPoint
                    networkStage = info.timePoints && info.timePoints['htmlStart'] && (info.timePoints['htmlStart'] - res.data.requestPoint)
                    firstPageVisible = info.timePoints && info.timePoints['firstPageVisible'] && (info.timePoints['firstPageVisible'] - info.timePoints['htmlStart'])
                    var xhr = new XMLHttpRequest()
                    var params = 'pid=' + that.pid + '&platform=' + platform + '&networkType=' + networkType + '&yzjVersion=' + yzjVersion + '&isOnline=' + isOnline + '&nativeStage=' + nativeStage + that.getBtp(timePoint)
                    networkStage && (params += '&networkStage=' + networkStage)
                    firstPageVisible && (params += '&firstPageVisible=' + firstPageVisible)
                    xhr.open('POST', '/speed/report', true)
                    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded;charset=UTF-8')
                    xhr.send(params)
                    xhr.onreadystatechange = function () {}
                }
            })
        },
        autoReport: function () {
            var that = this
            setTimeout(function () {
                that.report([])
            }, 8000)
        }
    }
    return speedSdk
})