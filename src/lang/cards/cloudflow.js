import langs from '../langs.js'

export default langs({
    'zh-CN': {
        'track': {
            title: '审批追踪',
            fingerPrintTips: '为保证数据安全',
            sample: {
                title: '云之家的审批追踪示例',
                flowTemplateName: '审批追踪sample',
                userName: '小云'
            },
            runningFlow: {
                rememberBtnTxt: '催办',
                rememberSuccess: '催办成功',
                nodeExcep: '节点异常',
                approving: '$$ 审批中',
                tobeApprove: '待 $$ 审批',
                approveNodeNotFound: '找不到审批人，请联系管理员处理',
                approverNotFound: '找不到审批节点，请联系管理员处理',
                unhandledError: '未知异常，请联系管理员处理',
                spend: '用时',
                days: '天',
                hours: '小时',
                minutes: '分钟',
                today: '今天',
                yesterday: '昨天'
            },
            stopedFlow: {
                tobeSubmit: '（待提交）',
                iknowBtnTxt: '我知道了',
                gotoDetailBtnTxt: '查看详情'
            },
            toNew: {
                tips: '提交的审批单都处理完啦！',
                btnTxt: '发起新的审批'
            },
            coldBoot: {
                tips: '若你提交了审批单，可利用此卡片追踪审批进度',
                btnTxt: '我知道了'
            }
        },
        'quick': {
            title: '审批助手',
            subTitle: '（$$单待办)',
            fingerPrintTips: '为保证数据安全',
            sample: {
                title: '云之家的快捷审批示例',
                serialNoLbl: '流水号',
                nameLbl: '报销名称',
                amountLbl: '报销金额',
                departLbl: '所属部门',
                dateLbl: '申请日期',
                money: '666.00元',
                costName: 'V9 发布会入场券',
                departName: '云之家'
            },
            nomore: '当前没有待审批的审批单哦',
            agreeBtnTxt: '同意',
            iknowBtnTxt: '我知道了',
            reminderBtnTxt: '催办',
            quickAgreeBtnTxt: '一键同意',
            agreedBtnTxt: '已同意',
            hasRquiredTips: '该流程有必填项，需要您进入表单进行编辑。',
            gotoDetailBtnTxt: '查看详情',
            coldBoot: {
                tips: '若有待你审批的单据，可利用此卡片进行快捷审批',
                btnTxt: '我知道了'
            }
        }
    },
    'en-US': {
        'track': {
            title: 'Approval tracking',
            fingerPrintTips: 'To ensure data security',
            sample: {
                title: 'Cloud hub approval tracking example',
                flowTemplateName: 'Approval tracking sample',
                userName: 'Mr. Cloud'
            },
            runningFlow: {
                rememberBtnTxt: 'Reminder',
                rememberSuccess: 'Prompt to succeed',
                nodeExcep: 'Abnormal',
                approving: '$$ approved',
                tobeApprove: 'To $$ approval',
                approveNodeNotFound: 'Cannot find the approver, please contact the administrator to deal with',
                approverNotFound: 'Cannot find the approval node, please contact the administrator to handle',
                unhandledError: 'Unknown exception, please contact the administrator to deal with',
                spend: 'Use',
                days: 'days',
                hours: 'hours',
                minutes: 'minutes',
                today: 'Today',
                yesterday: 'Yesterday,'
            },
            stopedFlow: {
                // tobeSubmit: '(To...d)',
                tobeSubmit: '（待提交）',
                iknowBtnTxt: 'I know',
                gotoDetailBtnTxt: 'see details'
            },
            toNew: {
                tips: 'Submit the approval orders are processed it!',
                btnTxt: 'Initiate new approval'
            },
            coldBoot: {
                tips: 'If you submit an approval order, you can use this to track approval progress',
                btnTxt: 'I know'
            }
        },
        'quick': {
            title: 'Approval assistant',
            subTitle: '（$$ to do)',
            fingerPrintTips: 'To ensure data security',
            sample: {
                title: 'Cloud Hub quick approval example',
                serialNoLbl: 'serial number',
                nameLbl: 'Reimbursement name',
                amountLbl: 'Reimbursement amount',
                departLbl: 'department',
                dateLbl: 'Application date',
                money: '￥666.00',
                costName: 'V9 tickets',
                departName: 'Cloud Hub'
            },
            nomore: 'There is no waiting list for approval',
            iknowBtnTxt: 'I know',
            reminderBtnTxt: 'Reminder',
            quickAgreeBtnTxt: 'One click confirm',
            agreedBtnTxt: 'approved',
            hasRquiredTips: 'The process is required, you need to enter the form for editing.',
            gotoDetailBtnTxt: 'see details',
            coldBoot: {
                tips: 'If you want to approve the document, you can use this card for quick approval',
                btnTxt: 'I know'
            }
        }
    }
})
