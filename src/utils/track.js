import Vue from 'vue'

export default function track (path, delay) {
    if (!path) return

    // 延时执行
    setTimeout(function () {
        // 异步加载
        require.ensure([], function () {
            let Raven = require('raven-js')
            let RavenVue = require('raven-js/plugins/vue')
            Raven.config(path, {
                ignoreErrors: [
                    'fb_xd_fragment'
                ],
                ignoreUrls: [
                    /(http)?:\/\/localhost/,
                    /(http)?:\/\/192.168.22.144/
                ],
                includePaths: [
                    /(http|https)?:\/\/(static\.|www\.)?yunzhijia\.com/,
                    /(http|https)?:\/\/(static\.|www\.)?kdtest\.(com|cn)/
                ],
                // A sampling rate to apply to events. A value of 0.0 will send no events, and a value of 1.0 will send all events (default).
                sampleRate: 1,
                // By default, Raven.js attempts to suppress duplicate captured errors and messages that occur back-to-back.
                allowDuplicates: false,
                // If set to true, Raven.js outputs some light debugging information onto the console.
                debug: true
            })
            .addPlugin(RavenVue, Vue)
            .install()
        })
    }, delay || 0)
}
