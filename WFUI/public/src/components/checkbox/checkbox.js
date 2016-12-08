'use strict';

/**
 * html结构：
 * <span data-role="checkbox" class="wf-checkbox">
 *      <span class="wf-checkbox-inner">
 *          <i class="wf-icon icon-selected"></i>
 *      </span>
 *      <input class="wf-checkbox-input" type="checkbox"/>
 *      <span class="wf-checkbox-text"></span>
 * </span>
 */
wf.define('UI.Checkbox', ['UI', 'logger', 'Action'], function (UI, logger, Action) {

    var role = 'checkbox';

    /**
     * @class Checkbox
     */
    var Checkbox = wf.inherit(UI, {

        /**
         * [data-role]
         */
        role: role,

        /**
         * 选中class
         */
        checkedCls: function () {
            return this.clsName('checked');
        },

        /**
         * checkbox ui
         */
        inner: {
            selector: 'inner',
            $element: {}
        },

        /**
         * 实际checkbox元素
         */
        input: {
            selector: 'input',
            $element: {}
        },

        /**
         * 文本元素
         */
        text: {
            selector: 'text',
            $element: {}
        },

        /**
         * 事件处理
         */
        actionHandler: function () {
            var _cb_ = this;
            return {
                click: new Action('click', function () {
                    var _action_ = this;
                    _action_.$target.click(function () {
                        _cb_.checked();
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
            var $ele = this.input.$element,
                result = checked === undefined ?
                $ele.is(':checked') ?
                false : true :
                checked;
            $ele.prop('checked', result);
            this.$element[result ? 'addClass' : 'removeClass'](this.checkedCls());
        },

        /**
         * ui初始化
         * @param {String} _base_ 父类同名方法
         * @param {String} name ui名
         * @param {Object} $element ui jquery对象
         * @param {Bool} checked 是否选中
         * @param {Object} events 组件事件
         * events:{'click',function($element){}}
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
            this.checked(checked || false);
            //初始化事件
            this.action = this.actionHandler();
            this.initEvent(events);
        }
    });

    Checkbox.auto = function () {
        //logger.info('checkbox auto render');
        var cb;
        $.each($('[data-role="' + role + '"]'), function (i) {
            cb = $(this);
            new Checkbox(
                cb.attr('name') || role + i,
                cb,cb.hasClass('wf-checkbox-checked'));
        });
    };

    return Checkbox;

});