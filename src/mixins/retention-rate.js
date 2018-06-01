export default {
    mounted () {
        setTimeout(() => {
            this.processRentenInfo()
        }, 5000)
    },
    methods: {
        processRentenInfo () {
            try {
                let info = this.getRentenInfo()

                // 如果已经上报过留存30天，直接退出
                if (info.d30) {
                    return
                }

                let now = new Date()
                let today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
                
                if (!info.start) {
                    // 初次记录
                    info.start = today.getTime()
                    this.setRentenInfo(info)
                    this.dataly({ event: '留存统计' })
                } else {
                    let days = (today.getTime() - info.start) / 1000 / 60 / 60 / 24
                    
                    if (days === 1) {
                        // 留存2日
                        if (info.d2 === false) {
                            info.d2 = true
                            this.reportRentenInfo(2)
                        }
                    } else if (days === 6) {
                        // 留存7日
                        if (info.d7 === false) {
                            info.d7 = true
                            this.reportRentenInfo(7)
                        }
                    } else if (days === 13) {
                        // 留存14日
                        if (info.d14 === false) {
                            info.d14 = true
                            this.reportRentenInfo(14)
                        }
                    } else if (days === 29) {
                        // 留存30日
                        if (info.d30 === false) {
                            info.d30 = true
                            this.reportRentenInfo(30)
                        }
                    }
                    
                    this.setRentenInfo(info)
                }
            } catch (e) {}
        },
        getRentenInfo () {
            let key = `retention-info`
            return this.userStorage.getJSON(key) || {
                start: null,
                d2: false,
                d7: false,
                d14: false,
                d30: false
            }
        },
        setRentenInfo (info) {
            let key = `retention-info`
            return this.userStorage.setItem(key, info)
        },
        reportRentenInfo (d) {
            this.dataly({ event: '留存' + d + '日' })
        }
    }
}
