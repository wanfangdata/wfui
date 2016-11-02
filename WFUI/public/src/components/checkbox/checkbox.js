'use strict';

/**
 * html结构：
 * <span data-role="checkbox" class="wf-checkbox">
 *      <span class="wf-checkbox-inner"></span>
 *      <input class="wf-checkbox-input" type="checkbox"/>
 *      <span class="wf-checkbox-text"></span>
 * </span>
 */
wf.define('UI.Checkbox', ['UI', 'logger', 'Action'], function (UI, logger, Action) {

    return wf.inherit(UI, {

        /**
         * [data-role]
         */
        role: 'checkbox',

        /**
         * checkbox ui
         */
        inner: {
            selector: 'inner',
            $element: Object.empty
        },

        /**
         * 实际checkbox元素
         */
        input: {
            selector: 'input',
            $element: Object.empty
        },

        /**
         * 文本元素
         */
        text: {
            selector: 'text',
            $element: Object.empty,
            action: function (instance) {
                this.$element.click(function () {
                    instance.checked();
                });
            }
        },

        /**
         * 事件处理
         */
        actionHandler: function () {
            return {
                click: new Action('click', function () {
                    var _action_ = this;
                    $(document).on('click', _action_.$target, function () {
                        _action_.piping();
                    });
                }, this.$element)
            }
        },

        /**
         * 注册用户自定义事件
         * @event on
         * @param {String} name 事件名称
         * @param {Function} func 事件函数
         */
        on: function (name, func) {
            if (!this.action[name]) {
                logger.error('checkbox 无{0}事件'.format(name));
            } else {
                this.action[name].register(func);
            }
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
         * event:{'click',function($element){}}
         */
        init: function (_base_, name, $element, checked, events) {
            _base_(name, $element, events);
            //初始化组件元素,为JQuery对象
            this.initElement([
                this.inner,
                this.input,
                this.text
            ]);
            //初始化选中状态
            this.checked(checked);
            //初始化事件
            this.action = this.actionHandler();
        }
    });

});