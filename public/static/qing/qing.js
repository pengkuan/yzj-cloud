/* generated @ 2018-4-28 20:30:56*/
!function(n){var e=window.qingJsonpFunction;window.qingJsonpFunction=function(t,o,r){for(var c,s,a=0,u=[];a<t.length;a++)s=t[a],i[s]&&u.push(i[s][0]),i[s]=0;for(c in o)Object.prototype.hasOwnProperty.call(o,c)&&(n[c]=o[c]);for(e&&e(t,o,r);u.length;)u.shift()()};var t={},i={4:0};function o(e){if(t[e])return t[e].exports;var i=t[e]={i:e,l:!1,exports:{}};return n[e].call(i.exports,i,i.exports,o),i.l=!0,i.exports}o.e=function(n){var e=i[n];if(0===e)return new Promise(function(n){n()});if(e)return e[2];var t=new Promise(function(t,o){e=i[n]=[t,o]});e[2]=t;var r=document.getElementsByTagName("head")[0],c=document.createElement("script");c.type="text/javascript",c.charset="utf-8",c.async=!0,c.timeout=12e4,o.nc&&c.setAttribute("nonce",o.nc),c.src=o.p+""+({0:"mobile",1:"desktop",2:"desktop-le-0.0.3"}[n]||n)+"."+{0:"bebeafcc0cbe69387f16",1:"0498400b9f0054159fdd",2:"7e98bb925cfcf4e1c960"}[n]+".js";var s=setTimeout(a,12e4);c.onerror=c.onload=a;function a(){c.onerror=c.onload=null,clearTimeout(s);var e=i[n];0!==e&&(e&&e[1](new Error("Loading chunk "+n+" failed.")),i[n]=undefined)}return r.appendChild(c),t},o.m=n,o.c=t,o.i=function(n){return n},o.d=function(n,e,t){o.o(n,e)||Object.defineProperty(n,e,{configurable:!1,enumerable:!0,get:t})},o.n=function(n){var e=n&&n.__esModule?function(){return n["default"]}:function(){return n};return o.d(e,"a",e),e},o.o=function(n,e){return Object.prototype.hasOwnProperty.call(n,e)},o.p="./static/qing/",o.oe=function(n){throw console.error(n),n},o(o.s=24)}({0:function(n,e,t){"use strict";t.d(e,"a",function(){return i}),t.d(e,"b",function(){return o});var i=function(n){console&&console.log("[Qing] "+n)},o=function(n){console&&console.warn("[Qing] "+n)}},1:function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=t(0);!function(n,e){if(!n.qing||!n.qing.version){var o=n.qing||(n.qing={});o.version="0.0.1",o.isReady=!1,o.debug=!1;var r=navigator.userAgent.toLowerCase(),c=r.match(/Qing\/(\d+(?:\.\d+)*)/i)||r.match(/App\/cloudhub \d+\/(\d+(?:\.\d+)*)/i),s=c;s&&(o.nativeJsBridgeVersion=c[1]),o.isSupportNativeJsBridge=!!s,t(6).init(o),t(7).init(o),t(9).init(o),s?o.isDesktop?parseInt(o.nativeJsBridgeVersion.replace(/\./g,""))>3?n.__hasQingDesktop||t.e(1).then(function(n){t.i(i.a)("Load Desktop"),t(4)}.bind(null,t))["catch"](t.oe):n.__hasQingDesktopLE3||t.e(2).then(function(){t.i(i.a)("Load Desktop LE 0.0.3"),t(3)}.bind(null,t))["catch"](t.oe):n.__hasQingMobile||t.e(0).then(function(){t.i(i.a)("Load Mobile"),t(5)}.bind(null,t))["catch"](t.oe):o.isWX}}(window)},24:function(n,e,t){n.exports=t(1)},6:function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.init=function(n){var e=document,c=[];n.once=function(e,t){n.on(e,function i(){n.off(e,i),t&&t()})};var s=n.ready=n._bridge?function(n){n&&n()}:function(n){e.addEventListener("QingReady",function t(){n(),e.removeEventListener("QingReady",t)})};n.config=function(e){n.debug=!!e.debug,s(function(){n._bridge.config(e)}),(e.jsEventList||[]).forEach(function(e){-1==c.indexOf(e)&&(c.push(e),n.on(e,function(n){r(e,{data:n})}))})},n.error=function(e){n.on("error",e)};var a=["call","off","on","checkJsApi","trigger"];a.forEach(function(e){n[e]=function(){var i=t.i(o.a)(arguments);s(function(){n[e].apply(n,i),i=null})}}),s(function(){t.i(i.a)("Ready"),n.isReady=!0;var e=n._bridge;a.forEach(function(t){n[t]=e[t]}),n.ready=function(n){n&&n()}}),n.error=function(e){n.on("error",e)},n.checkVersion=function(e){var t=n.nativeJsBridgeVersion;if(t==e)return!0;for(var i=t.split("."),o=e.split(""),r=Math.max(i.length,o.length),c=0;c<r;c++){var s=~~o[c],a=~~i[c];if(s<a)return!0;if(s>a)return!1}}};var i=t(0),o=t(8),r=function(n,e){var t=document.createEvent("HTMLEvents");if(e)for(var i in e)t[i]=e[i];t.initEvent(n),document.dispatchEvent(t)}},7:function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),t.d(e,"init",function(){return i});var i=function(n){var e=navigator.userAgent.toLowerCase()||"",t=navigator.vendor&&navigator.vendor.toLowerCase()||"",i=navigator.appVersion.toLowerCase()||"",o=(n.isWX=/micromessenger/i.test(e),n.isChrome=/chrome|chromium/i.test(e)&&/google inc/.test(t),n.isFirefox=/firefox/i.test(e),n.isOpera=/^Opera\//.test(e)||/\x20OPR\//.test(e),n.isSafari=/safari/i.test(e)&&/apple computer/i.test(t),n.isIe=function(n){return n?n>=11?"ActiveXObject"in window:new RegExp("msie "+n).test(e):/msie/i.test(e)||"ActiveXObject"in window},n.isIphone=/iphone/i.test(e)),r=n.isIpad=/ipad/i.test(e),c=n.isIpod=/ipod/i.test(e),s=(n.isIos=o||r||c,n.isAndroid=/android/i.test(e)),a=n.isAndroidPhone=s&&/mobile/i.test(e),u=n.isAndroidTablet=s&&!/mobile/i.test(e),f=n.isBlackberry=/blackberry/i.test(e),d=n.isCoolpad=/coolpad/i.test(e),l=(n.isMac=/mac/i.test(i),n.isWindows=/win/i.test(i)),p=n.isWindowsPhone=l&&/phone/i.test(e),v=n.isWindowsTablet=l&&!p&&/touch/i.test(e),g=n.isMobile=o||c||a||f||p||d,h=n.isTablet=r||u||v;n.isDesktop=!g&&!h,n.isTouchDevice="ontouchstart"in window||"DocumentTouch"in window&&document instanceof DocumentTouch}},8:function(n,e,t){"use strict";var i=Array.from;e.a=i||function(n){for(var e=n.length,t=[],i=0;i<e;i++)t.push(n[i]);return t}},9:function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.init=function(n){i.XuntongJSBridge={call:function(e){var t=arguments.length>1&&arguments[1]!==undefined?arguments[1]:{},i=arguments[2];i&&(t.complete=i),n.call(e,t)}}};var i=window}});