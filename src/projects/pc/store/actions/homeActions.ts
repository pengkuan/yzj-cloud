import { ActionContext } from 'vuex'
import State from '../state'
import { Home } from 'pc/tasks'

export const getGreetings = async ({ commit, state }: ActionContext<State, State>): Promise<void> => {
    try {
        const res = await Home.fetchGreetings(state.personInfo.wbUserId)
        if (!res.success) {
            commit('setErrorMsg', '头部文案服务出错')
        } else {
            commit('setGreetings', res.data)
            _core.storage.setItem('greetings', res.data)
        }
    } catch (err) {
        commit('setErrorMsg', '获取头部文案失败')
        throw err
    }
}

// export const getAppList = async ({ commit, state }: ActionContext<State, State>): Promise<void> => {
//     try {
//         const res = await Home.fetchAppList(state.personInfo.openId, state.personInfo.eid)
//         if (!res.success) {
//             commit('setErrorMsg', '常用应用服务出错')
//         } else {
//             commit('setAppList', res.data)
//         }
//     } catch (err) {
//         commit('setErrorMsg', '获取常用应用失败')
//         throw err
//     }
// }

export const getCardList = async ({ commit, state }: ActionContext<State, State>): Promise<void> => {
    try {
        const res = await Home.fetchCardList(state.personInfo.openId, state.personInfo.eid)
        if (!res.success) {
            commit('setErrorMsg', '卡片列表服务出错')
        } else {
            commit('setCardList', res.data)
            _core.storage.setItem('cardList', res.data)
        }
    } catch (err) {
        commit('setErrorMsg', '获取卡片列表失败')
        throw err
    }
}

export const getAllDeskApp = async ({ commit, state }: ActionContext<State, State>): Promise<void> => {
    try {
        qing.on('cloudoffice.onAppsUpdate', (res) => {
            commit('setAllDeskApp', res)
            _core.storage.setItem('allDeskApp', res)
        })
        // const res = await Home.fetchAllDeskApp(state.personInfo.eid)
        // if (!res.success) {
        //     commit('setErrorMsg', '应用列表服务出错')
        // } else {
        //     commit('setAllDeskApp', res.data)
        // }
    } catch (err) {
        commit('setErrorMsg', '获取应用列表失败')
        throw err
    }
}
