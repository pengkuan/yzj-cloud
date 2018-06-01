import fetch from './fetch'

/**
 * 获取头部文案相关
 * @param userId {String} wbuserId
 */
export const fetchGreetings = (userId: string): Promise<any> =>

    fetch({
        url: '/cloudwork/soulsoother/rand',
        method: 'POST',
        headers: {
            'X-Requested-userId': userId,
            'X-Requested-platform': 'pc'
        }
    })

/**
 * 获取常用应用列表
 * @param oid {String} openId
 * @param eid {String} eid
 */
// export const fetchAppList = (oid: string, eid: string): Promise<any> =>

//     fetch({
//         url: '/cardapi/third/v1/appservice/comApp/getComAppList',
//         method: 'POST',
//         data: {
//             oid,
//             eid
//         }
//     })

/**
 * 获取卡片列表
 * @param openId {String} openId
 * @param eid {String} eid
 */
export const fetchCardList = (openId: string, eid: string): Promise<any> =>

    fetch({
        url: '/cloudwork/cardinfo/getCardInfoListByOpenId.json',
        method: 'POST',
        headers: {
            'X-Requested-wbOpenid': openId,
            'X-Requested-eid': eid
        }
    })

/**
 * 获取全部应用
 * @param eid {String} eid
 */
// export const fetchAllDeskApp = (eid: string): Promise<any> =>

//     fetch({
//         url: '/openaccess/lightapp/findNewDeskApp',
//         method: 'POST',
//         data: {
//             eid: eid,
//             limit: -1,
//             appType: 1
//         },
//         serializer: 'json'
//     })
