'use strict';

/**
 * html结构：
 * <span data-role="checkbox" class="wf-checkbox">
 *      <span class="wf-checkbox-inner"></span>
 *      <input class="wf-checkbox-input" type="checkbox"/>
 *      <span class="wf-checkbox-text"></span>
 * </span>
 */
wf.define('UI.Checkbox', ['UI', 'logger'], function (UI, logger) {

    return wf.inherit(UI, {

        /**
         * [data-role]
         */
        role: 'checkbox',

        inner: {
            selector: 'inner',
            $element: null
        },

        /**
         * 实际checkbox元素
         */
        input: {
            selector: 'input',
            $element: null
        },

        /**
         * 文本元素
         */
        text: {
            selector: 'text',
            $element: null,
            action: function (instance) {
                this.$element.click(function () {
                    instance.checked();
                });
            }
        },

        /**
         * checkbox组件事件
         */
        eventMap: function () {
            var _cb_ = this;
            return {
                click: function (fire) {
                    _cb_.click(function () {
                        fire(_cb_);
                    });
                },
                change: function (fire) {
                    return fire;
                },
                checked: function (fire) {
                    return fire;
                }
            };
        },

        /**
         * 事件
         * @event on
         * @param {String} name 事件名称
         * @param {Function} fun 事件函数
         */
        on: function (name, fun) {
            this.eventMap[name] = fun;
        },

        /**
         * 设置checkbox的选中状态
         * @param {Bool||undefined} checked 是否选中
         * 如果为undefined则根据当前状态修改
         */
        checked: function (checked) {
            var $ele = this.input.$element;
            $ele.prop('checked',
                checked === undefined ?
                $ele.is(':checked') ?
                false : true :
                checked);
        },

        /**
         * ui初始化
         * @param {String} _base_ 父类同名方法
         * @param {String} name ui名
         * @param {Object} $element ui jquery对象
         * @param {Bool} checked 是否选中
         * @param {Array<Object>} events 组件事件
         */
        init: function (_base_, name, $element, checked, events) {
            _base_(name, $element);
            //初始化组件元素,为JQuery对象
            this.initElement([
                this.inner,
                this.input,
                this.text
            ]);
            this.checked(checked);
            if (events && events.length > 0) {
                this.initEvent(events);
            }
        }
    });

});