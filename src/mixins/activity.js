export default {
    data () {
        return {
        }
    },
    methods: {
        sendGiftToWorkmate (type, giftType) { // 分享到同事
            return new Promise((resolve, reject) => {
                window.XuntongJSBridge.call('selectPersons', {
                    'isMulti': true,
                    'isShowExt': true
                }, (res) => {
                    let {success, data} = res
                    if (success && data && data.persons && data.persons.length > 0) {
                        this.sendGiftRequest(data.persons, type, giftType).then((res) => {
                            resolve(res)
                        })
                    }
                })
            })
        },
        sendGiftRequest (persons, type, giftType) {
            let oids = []
            persons.forEach(person => {
                oids.push(person.openId)
            })
            return new Promise((resolve, reject) => {
                this.request({
                    method: 'post',
                    url: '/cloudwork/activity/flowers',
                    data: {
                        oids: oids.join(','),
                        userType: type || 0, // 是否匿名
                        giftType: giftType || 0
                    }
                }, res => {
                    if (res.success) {
                        // let countText = type === 1 ? '成功匿名送礼物给同事' : '成功送礼物给同事'
                        resolve(persons)
                    }
                })
            })
        },
        sendGiftToWechat (data) { // 分享到微信
            window.XuntongJSBridge.call('socialShare', {
                shareType: '3',
                shareWay: 'wechat',
                shareContent: {
                    title: data.title,
                    description: data.description,
                    thumbData: data.thumbData,
                    webpageUrl: data.webpageUrl
                }
            }, (res) => {
                let {success} = res
                if (success) {
                    console.log('成功分享礼物到微信')
                }
            })
        },
        sendGiftToMobileContact (giftType) { // 分享到手机联系人
            return new Promise((resolve, reject) => {
                window.XuntongJSBridge.call('selectMobileContact', {
                    isOnlyMobileNum: true,
                    isMulti: true, // 多选，默认false
                    min: 1, // 最少选几个,默认1
                    max: 50 // 最多选人数，默认999
                }, (res) => {
                    let {success, data} = res
                    if (success && data) {
                        this.notifySms(data.contacts, giftType).then((res) => {
                            resolve(res)
                        })
                    }
                })
            })
        },
        notifySms (contacts, giftType) { // 短信通知
            return new Promise((resolve, reject) => {
                let phones = []
                contacts.forEach(obj => {
                    phones.push(obj.phone)
                })
                this.request({
                    method: 'post',
                    url: '/cloudwork/sms/sendMsg',
                    data: {
                        phone: phones,
                        giftType: giftType
                    }
                }, res => {
                    if (res.success) {
                        console.log('成功分享礼物到手机联系人')
                        resolve(contacts)
                    }
                })
            })
        },
        reSendGiftRequest (person) { // 回送礼物
            return new Promise((resolve, reject) => {
                this.request({
                    method: 'post',
                    url: '/cloudwork/activity/reSendGift',
                    data: {
                        giftRecordId: person.id,
                        userType: 0, // 是否匿名
                        giftType: person.giftType || 0
                    }
                }, res => {
                    if (res.success) {
                        let countText = person.userType === 1 ? '匿名回送礼物给同事' : '回送礼物给同事'
                        console.log(countText)
                        resolve(person)
                    }
                }, err => {
                    console.log('error', err.error)
                    reject(err)
                })
            })
        }
    }
}
