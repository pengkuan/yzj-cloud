import State from '../state'
import { Home } from 'pc/types'

export const setGreetings = (state: State, payload: Home.Greetings) => {
    state.greetings = payload
}

export const setAppList = (state: State, payload: Array<Home.AppItem>) => {
    state.appList = payload
}

export const setCardList = (state: State, payload: Array<Home.CardDetail>) => {
    state.cardList = payload
}

export const setAllDeskApp = (state: State, payload: Home.AllDeskApp) => {
    state.allDeskApp = payload
}
