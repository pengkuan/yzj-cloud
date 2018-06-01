export default function install (Vue) {
    // 绑定
    Vue.prototype.on = function (name, fn) {
        var events = this._events = this._events || {}
        var list

        if (events[name]) {
            list = events[name]
        } else {
            // 初次绑定，开始监听该事件
            list = []
            events[name] = list
            this._listen(name)
        }

        if (!name || (typeof fn !== 'function')) return
        list.push(fn)
        list = null
    }
    
    // 绑定并只执行一次
    Vue.prototype.once = function (name, fn) {
        var handler = () => {
            fn.apply(null, arguments)
            this.off(name, handler)
        }
        this.on(name, handler)
    }

    // 取消绑定
    Vue.prototype.off = function (name, fn) {
        var events = this._events = this._events || {}
        if (!name) return

        var list = events[name]

        if (!list || !list.length) return

        if (name && (typeof fn === 'function')) {
            // 删除该事件的指定的处理函数（设为null）
            list.forEach((n, i) => {
                if (n === fn) {
                    list[i] = null
                }
            })
        } else if (name) {
            // 删除该事件的全部处理函数
            events[name] = []
        }

        list = null
    }
    
    // 触发事件
    Vue.prototype.emit = function (name, context, args) {
        var events = this._events = this._events || {}
        
        if (!Array.isArray(events[name])) return

        events[name].forEach(fn => {
            if (typeof fn === 'function') {
                fn.apply(context, args)
            }
        })
    }

    // 监听
    Vue.prototype._listen = function (name) {
        let self = this
        switch (name) {
            case 'appear':
            case 'disappear':
                document.addEventListener(name, function () {
                    self.emit(name, null, arguments)
                })
                break
        }
    }
}
