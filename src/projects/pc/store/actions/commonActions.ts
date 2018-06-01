import { ActionContext } from 'vuex'
import State from '../state'

export const getErrorMsg = ({ commit }: ActionContext<State, State>, msg: string): void => {
    commit('setErrorMsg', msg)
}

export const getPersonInfoByBridge = ({ commit }: ActionContext<State, State>): void => {
    try {
        qing.call('getPersonInfo', {
            success: res => {
                commit('setPersonInfo', res.data)
            },
            error: res => {
                commit('setErrorMsg', '获取用户信息出错')
            }
        })
    } catch (err) {
        commit('setErrorMsg', '获取用户信息失败')
        throw err
    }
}

export const getCardNotice = ({ commit, state }: ActionContext<State, State>, noticeId: any): void => {
    const arr = state.noticeCardList
    if (arr.indexOf(noticeId) === -1) {
        arr.push(noticeId)
        commit('setCardNotice', arr)
    }
}

export const removeNoticeById = ({ commit, state }: ActionContext<State, State>, noticeId: any): void => {
    const arr = state.noticeCardList
    const removeIndex = arr.indexOf(noticeId)
    if (removeIndex !== -1) {
        arr.splice(removeIndex, 1)
        commit('setCardNotice', arr)
    }
}

export const getUpdateStateByKey = ({ commit }: ActionContext<State, State>, payload: {stateName: string, newData: any}): void => {
    commit('setUpdateState', payload)
}
