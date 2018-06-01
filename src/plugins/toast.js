export default function install (Vue) {
    Vue.prototype.toast = function (msg) {
        var sdk = window.cloudhub
        if (sdk && sdk.ui && sdk.ui.toast) {
            if (typeof msg === 'object') {
                msg = JSON.stringify(msg)
            }
            sdk.ui.toast({
                message: msg + ''
            })
        }
    }
}
