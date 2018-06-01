// 声明全局变量

interface XuntongJSBridgeObject {
    call: (api: string, options?: object, callback?: (res: XuntongJSBridgeCallback) => any) => any
}

interface XuntongJSBridgeCallback {
    success: boolean
    error?: string
    errorCode?: number
    data: object | any
    code?: number
}

declare global {
    interface Window {
        info: any
        _core: any
        XuntongJSBridge: XuntongJSBridgeObject
        FileReader: FileReader
        coreInit: Function
        appInit: Function
        cloudhub: any
        _dataly: any
        qing: any
        getUA: Function
        datalyError: Function
        dispatchHTMLEvent: Function
    }

    namespace _core {
        const userInfo: any
        const storage: any
        const userStorage: any
        const globalStorage: any
        const session: any
        const userSession: any
        const globalSession: any
    }

    namespace info {
        const buildDate: String
        const language: String
        const clientVersion: Number
        const isV9: Boolean
        const isV10: Boolean
        const isIos: Boolean
        const isAndroid: Boolean
        const timePoints: any
        const isIphoneX: Boolean
        const statusBarHeight: Number
        const navBarHeight: Number
        const tabBarHeight: Number
        const IosHeaderHeight: Number
    }

    namespace qing {
        function call(api: string, options: object)
        function checkJsApi(options: object)
        function checkVersion (arg?: string)
        function config (options: object)
        function off()
        function on(arg1, arg2)
        function once(arg1, arg2)
        function ready (arg?: () => any)
        function error (arg?: () => any)
        function invoke()
        function isIe (arg?: number)
        const debug: boolean
        const isAndroid: boolean
        const isAndroidPhone: boolean
        const isAndroidTablet: boolean
        const isBlackberry: boolean
        const isChrome: boolean
        const isCoolpad: boolean
        const isDesktop: boolean
        const isFirefox: boolean
        const isIosd: boolean
        const isIpad: boolean
        const isIphone: boolean
        const isIpod: boolean
        const isMac: boolean
        const isMobile: boolean
        const isOpera: boolean
        const isReady: boolean
        const isSafari: boolean
        const isSupportNativeJsBridge: boolean
        const isTablet: boolean
        const isTouchDevice: boolean
        const isWX: boolean
        const isWindows: boolean
        const isWindowsPhone: boolean
        const isWindowsTablet: boolean
        const version: string
    }
}

export {}
