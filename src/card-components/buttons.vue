<style lang="less" scoped>
    @import '../css/variable';

    [data-V9],
    [data-v10] {
        .card-buttons{
            position: relative;
            display: flex;
            -moz-user-select:none;
            -webkit-user-select:none;
            user-select:none;

            .card-button{
                flex: 1;
                position: relative;

                &:first-child,
                &.no-border{
                    &::before{
                        display: none;
                    }
                }
                &.fix-width{
                    flex: none;
                }
            }
        }
    }

    [data-v10][data-pc] {
        .card-buttons{
            overflow: visible;
        }
    }

    [data-v10] {
        .card-buttons{
            .px2rem(height, 35);
            width: 2.58rem;
            margin-left: auto;
            margin-right: auto;
            border-radius: 40px;
            // overflow: hidden;

            &::before{
                display: block;
                content: ' ';
                position: absolute;
                width: 200%;
                height: 200%;
                border: 1px solid rgba(212, 217, 221, 1);
                border-radius: 40px;
                transform: scale(0.5);
                transform-origin: 0 0;
            }
            
            .card-button{
                background: transparent;
                text-overflow: ellipsis;
                &::before{
                    content: '';
                    display: block;
                    background: rgba(212, 217, 221, 1);
                    height: 100%;
                    width: 1px;
                    position: absolute;
                    top: 25%;
                    left: -0.5px;
                    transform: scale(0.5);
                    transform-origin: 0 0;
                }
            }

            &[data-status="onpress"] {
                background: #f6f7f8;
            }
            &[data-status="onpress_left"] {
                background: linear-gradient(to right, #f6f7f8, #f6f7f8 50%, #FFF 50%, #FFF);
            }
            &[data-status="onpress_right"] {
                background: linear-gradient(to right, #FFF, #FFF 50%, #f6f7f8 50%, #f6f7f8);
            }
        }
    }

    // V9的按钮组强制宽度100%
    [data-v9] {
        .card-buttons{
            .px2rem(height, 40);
            width: 100%;

            &::before{
                content: '';
                display: block;
                background: #EEEFF5;
                width: 200%;
                height: 1px;
                position: absolute;
                top: 0;
                left: 0;
                transform: scale(0.5);
                transform-origin: 0;
            }

            .card-button{
                &::before{
                    content: '';
                    display: block;
                    background: #EEEFF5;
                    height: 100%;
                    width: 1px;
                    position: absolute;
                    top: 25%;
                    left: 0;
                    transform: scale(0.5);
                    transform-origin: 0 0;
                }
            }
        }
    }
</style>

<template>
    <div class="card-buttons" :data-status="status" :style="defaultStyle">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                buttonCount: 1,
                status: ''
            }
        },
        computed: {
            // 按钮组默认样式
            // 一个按钮50%；两个按钮80%
            // 可以通过style重写
            defaultStyle () {
                if (info.isV10) {
                    if (this.buttonCount === 1) {
                        return 'width: 2.58rem;'
                    } else if (this.buttonCount > 1) {
                        return 'width: 4rem;'
                    }
                }
            }
        },
        methods: {
            // 查找所有可见的按钮
            getButtons () {
                // 取得所有按钮
                let buttons = this.$el.querySelectorAll('.card-button')

                // 过滤掉不可见的按钮
                buttons = Array.prototype.filter.call(buttons, button => {
                    return button.style.display !== 'none'
                })

                // 更新按钮数量
                this.buttonCount = buttons.length

                return buttons
            },
            // 当按钮被按下时
            onButtonTouchStart (e) {
                let buttons = this.getButtons()
                
                if (buttons.length === 1) {
                    // 唯一的按钮被按下
                    this.status = 'onpress'
                } else if (buttons.length === 2) {
                    if (e.target === buttons[0]) {
                        // 左侧按钮被按下
                        this.status = 'onpress_left'
                    } else if (e.target === buttons[1]) {
                        // 右侧按钮被按下
                        this.status = 'onpress_right'
                    }
                }
            },
            // 当按钮被放开时
            onButtonTouchEnd (e) {
                this.status = ''
            }
        },
        mounted () {
            // 加载完成后检查按钮数量，以便于设置合适的默认宽度
            this.getButtons()
            
            // 点击按钮添加class（改变底色）
            this.$el.addEventListener('touchstart', e => {
                if (e.target.className.match(/(\s|^)card-button(\s|$)/)) {
                    this.onButtonTouchStart(e)
                }
            })
            this.$el.addEventListener('touchmove', e => {
                this.onButtonTouchEnd(e)
            })
            this.$el.addEventListener('touchend', e => {
                this.onButtonTouchEnd(e)
            })
        }
    }
</script>
