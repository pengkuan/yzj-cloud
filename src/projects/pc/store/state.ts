/**
 * state tree
 */
import Type, { Bridge, Home } from 'pc/types'

export default class State {
    isLoading: boolean = false
    errorMsg: string = ''
    personInfo: Bridge.PersonInfo = new Type.PersonInfoClass()
    greetings: Home.Greetings = _core.storage.getJSON('greetings') || new Type.GreetingsClass()
    appList: Array<Home.AppItem> = new Array()
    cardList: Array<Home.CardDetail> = _core.storage.getJSON('cardList') || new Array()
    allDeskApp: Home.AllDeskApp = _core.storage.getJSON('allDeskApp') || new Type.AllDeskApp()
    noticeCardList: Array<any> = new Array()
}
