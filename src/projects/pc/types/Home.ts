/**
 * 首页相关
 */

// 头部文案 - 主要数据结构
export interface Greetings {
    activity: boolean
    activityCount: number
    activity_0: boolean
    bgUrl: string
    content: GreetingsContent
    favCount: number
    favorite: boolean
    unFavCount: number
    zhongqiuActivity: boolean
}

// 头部文案 - 文案内容
export interface GreetingsContent {
    activityId: string
    channel: string
    content: string
    createTime: number
    del: number
    endDate: string
    endTime: string
    giftType: number
    global: number
    id: string
    language: Array<string>
    mngrDesc: string
    modelId: string
    role: Array<string>
    startDate: string
    startTime: string
    statuss: number
    style: string
}

// 常用应用 - 单个详情
export interface AppItem {
    appId: number
    appName: string
    appType: number
    appUrl: string
    logoUrl: string
    pid: string
}

// 卡片列表 - 单张卡片详情
export interface CardDetail {
    actions: Array<CardAction>
    activeRefreshDelay: number
    appId: string
    buttons: Array<CardButtons>
    dataCacheHours: 168
    dataSourceAction: string
    delete: number
    eid: string
    enableMixins: boolean
    height: number
    icon: string
    iconBackgroundColor: string
    iconCls: string
    iconColor: string
    id: string
    internal: boolean
    minCloudofficeVersion: number
    name: string
    needTicket: boolean
    showHeader: boolean
    showTitle: boolean
    showType: number
    status: number
    template: string
    testEid: Array<string>
    thhost: string
    title: string
    mixins?: string
    style?: string
    [key: string]: any
}

// 卡片详情 - action
export interface CardAction {
    headers: string
    method: string
    name: string
    paramType: string
    params: string
    type: string
    url: string
}

// 卡片详情 - 卡片右上角
export interface CardButtons {
    title: string
    action: string
}

// 桌面版 - 全部应用
export interface AllDeskApp {
    apps: Array<AllDeskAppCategory>
    count: number
}

// 桌面版 - 全部应用_分类
export interface AllDeskAppCategory {
    apps: Array<AllDeskAppCategoryAppDetail>
    categoryName: string
    seq: number
    size: number
}

// 桌面版 - 全部应用_分类-应用详情
export interface AllDeskAppCategoryAppDetail {
    accessAddress: string
    alias: string
    categoryId: number
    categoryName: string
    desc: string
    icon: string
    isNew: boolean
    mcloudAppId: number
    mcloudAppSecret: string
    name: string
    oauth: string
    seq: number
    tags: Array<String>
    type: string
    v: string
}
