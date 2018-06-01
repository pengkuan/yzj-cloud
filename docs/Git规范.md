# 分支管理

使用 [git flow](https://www.git-tower.com/learn/git/ebook/cn/command-line/advanced-topics/git-flow) 工作流，
具体分支功能如下：

``` bash
next            ## 默认分支，最新的代码
master          ## 发布分支，dev环境
release         ## 发布分支，devtest
publish         ## 发布分支，kdtest
production      ## 发布分支，正式环境
feature         ## 功能分支，开发新功能时创建
    refactor    ## 重构
    widget      ## 插件
    xxx         ## 其他分类
fix             ## bug 修复
    data        ## 数据类 bug
    xxx         ## 其他 bug
hotfix          ## 修复正式环境 bug 的分支
```

# commit 规范

提交本地代码前，执行 `git pull origin next` 拉取最新的代码合并到本地分支（无论有无更新），
之后再提交本地的修改。

请写明每次提交具体做了哪些事情，基本提交信息如下：`type(类型)` + `:` + `content(做的事情)`。
**当完成指定 issues 时，在 commit 信息里加上对应的 issues id**。

类型分类主要有：
* **feat**：新功能（feature）
* **fix**：修补 bug
* **docs**：文档（documentation）
* **style**： 格式（不影响代码运行的变动）
* **refactor**：重构（即不是新增功能，也不是修改 bug 的代码变动）
* **test**：增加测试
* **chore**：构建过程或辅助工具的变动
* **static**：静态文件变动
* **optimize**：优化相关

# merge request 规范

1. 在 merge request 页面点击 `new merge request`
2. 在 Source branch 选择自己所需要合并的分支
3. 在 Target branch 选择 `next` 分支
4. 在 Discussion 里写明自己所修改、增加的东西
5. 在 Labels 里选择一个标签，表示属于哪类
6. 在 Milestone 里选择一个里程碑，表示属于哪个阶段
7. 在 Assignee 选择项目管理员
8. 告知管理员，请求合并
