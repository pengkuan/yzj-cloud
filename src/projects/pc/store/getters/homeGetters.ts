import State from '../state'

export const greetingText = (state: State): { text: string, isDouble: boolean} => {
    let text = state.greetings.content.content
    const isDouble = !!text.match('\n')
    text = text.replace(/^(XX|xx)/, state.personInfo.name)
               .replace('\n', '<br>')
    return {
        text,
        isDouble
    }
}

export const withoutMyappCardList = (state: State) => {
    const cardList = []
    let leftList = [], rightList = []
    state.cardList.forEach(card => {
        if (card.name !== 'myapp') {
            cardList.push(card)
        }
    })
    cardList
    .sort((a, b) => {
        if (b.showStatus === 'show') return 1
        if (a.showStatus === 'show') return -1
        if (b.q === 'fold')	return 1
	    if (a.q === 'fold')	return -1
    })
    .sort((a, b) => {
        // 置顶卡片 - 时间助手
        if (b.name === 'task') return 1
        if (a.name === 'task') return -1

        // 未读的一定比已读的在前面
        if (b.cardUnread && !a.cardUnread) return 1
        if (a.cardUnread && !b.cardUnread) return -1

        // 如果都未读，按时间排序
        if (a.cardUnread && b.cardUnread) {
            return (b.cardUpdateTime || 0) - (a.cardUpdateTime || 0)
        }
        // 如果都已读，按下面逻辑判断

        // 有修改的排前面
        if (!b.cardExpired && a.cardExpired) return 1
        if (!a.cardExpired && b.cardExpired) return -1

        // 如果都有内容，按时间排
        if (!a.cardExpired && !b.cardExpired) {
            return (b.cardUpdateTime || 0) - (a.cardUpdateTime || 0)
        }

        // 如果showType不一样，根据showType排
        if (a.showType !== b.showType) {
            return (b.showType || 0) - (a.showType || 0)
        }

        return (b.cardUpdateTime || 0) - (a.cardUpdateTime || 0)
    })
    .forEach((card, index) => {
        if (index % 2 === 0) {
            leftList.push(card)
        } else {
            rightList.push(card)
        }
    })
    return {
        list: cardList,
        colList: [leftList, rightList]
    }
}

export const commonDeskApp = (state: State) => {
    const defaultArr = ['工作汇报', '时间助手', '企业云盘', '会议通知', '审批', '智能审批', '签到统计', '公告']
    const deskAppList = []
    state.allDeskApp.apps.forEach(category => {
        category.apps.forEach(app => {
            if (defaultArr.indexOf(app.name) !== -1) {
                deskAppList.push(app)
            }
        })
    })
    return deskAppList
}
