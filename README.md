# 工作台 V10 - PC 与移动端

## 开发须知

  请开发者仔细阅读 [Git 规范](./docs/Git规范) 和 [代码规范](./docs/代码规范)。

  * 查看过往开发历史 [CHANGELOG](CHANGELOG.md)

  * 日常的开发过程
    * 运行 `git pull origin next` 从主分支拉取最新的代码到自己的分支上
    * 如果有冲突，先解决冲突，然后开发
    * 非业务代码只提交自己所负责的部分

## 运行项目

  * 需要 [nodejs](https://nodejs.org/en/) 与 [npm](https://www.npmjs.com/)

    ```bash
    npm run dev
    ```

    自定义端口 `PORT={端口} npm run dev`

## 在浏览器中调试

 * **设置ua**

如果要在chrome进行调试， 请打开开发者工具并设置userAgent为以下值
```
Qing/0.9.29;iOS 10.2;Apple;x86_64;deviceId:a5b5a3f7-8283-4299-8ab0-67cd0215b1d1;deviceName:joyingx%E2%80%99s%20MacBook%20Pro;clientId:10200;os:iOS 10.2;brand:Apple;model:x86_64;Mozilla/5.0 (iPhone; CPU iPhone OS 10_2 like Mac OS X) AppleWebKit/602.3.12 (KHTML, like Gecko) Mobile/14C89/chromedev
```

  * [**跨域调试**](./docs/跨域调试.md)
