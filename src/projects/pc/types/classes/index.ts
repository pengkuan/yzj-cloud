import * as Bridge from '../Bridge'
import * as Home from '../Home'

export class PersonInfoClass implements Bridge.PersonInfo {
    companyName: string = ''
    eid: string = ''
    email: string = ''
    gender: string = ''
    name: string = ''
    openId: string = ''
    photoUrl: string = ''
    wbNetworkId: string = ''
    wbUserId: string = ''
    wbnetworkid: string = ''
    wbuserid: string = ''
}

export class GreetingsClass implements Home.Greetings {
    activity: boolean = false
    activityCount: number = 0
    activity_0: boolean = false
    bgUrl: string = ''
    content: Home.GreetingsContent = new GreetingsContent()
    favCount: number = 0
    favorite: boolean = false
    unFavCount: number = 0
    zhongqiuActivity: boolean = false
}

export class GreetingsContent implements Home.GreetingsContent {
    activityId: string = ''
    channel: string = ''
    content: string = ''
    createTime: number = 0
    del: number = 0
    endDate: string = ''
    endTime: string = ''
    giftType: number = 0
    global: number = 0
    id: string = ''
    language: Array<string> = []
    mngrDesc: string = ''
    modelId: string = ''
    role: Array<string> = []
    startDate: string = ''
    startTime: string = ''
    statuss: number = 0
    style: string = ''
}

export class AllDeskApp implements Home.AllDeskApp {
    apps: Array<Home.AllDeskAppCategory> = [new AllDeskAppCategory()]
    count: number = 0
}

export class AllDeskAppCategory implements Home.AllDeskAppCategory {
    apps: Array<Home.AllDeskAppCategoryAppDetail> = [new AllDeskAppCategoryAppDetail()]
    categoryName: string = ''
    seq: number = 0
    size: number = 0
}

export class AllDeskAppCategoryAppDetail implements Home.AllDeskAppCategoryAppDetail {
    accessAddress: string = ''
    alias: string = ''
    categoryId: number
    categoryName: string = ''
    desc: string = ''
    icon: string = ''
    isNew: boolean = false
    mcloudAppId: number = 0
    mcloudAppSecret: string = ''
    name: string = ''
    oauth: string = ''
    seq: number = 0
    tags: Array<String> = ['']
    type: string = ''
    v: string = ''
}
