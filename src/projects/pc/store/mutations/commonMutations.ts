import State from '../state'
import { Bridge } from 'pc/types'

export const setErrorMsg = (state: State, payload: string) => {
    state.errorMsg = payload
}

export const setPersonInfo = (state: State, payload: Bridge.PersonInfo): void => {
    state.personInfo = payload
}

export const setCardNotice = (state: State, payload: Array<any>): void => {
    state.noticeCardList = payload
}

export const setUpdateState = (state: State, payload: {stateName: string, newData: any}): void => {
    state[payload.stateName] = payload.newData
}
