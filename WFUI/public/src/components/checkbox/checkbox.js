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
        set: function (checked) {
            var $ele = this.input.$element,
                result = checked === undefined ?
                $ele.is(':checked') ?
                false : true :
                checked;
            $ele.prop('checked', result);
            this.checked = result;
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
            var me = this;
            _base_(name, $element);
            //初始化组件元素,为JQuery对象
            me.initElement([
                {selector: 'inner'},
                { selector: 'input' },
                { selector: 'text' }
            ]);
            //初始化选中状态
            me.set(checked || false);
            //初始化事件
            me.action = {
                click: new Action('click', function () {
                    var _action_ = this;
                    _action_.$target.click(function () {
                        me.set();
                        _action_.piping();
                    });
                }, this.$element)
            };
            me.initEvent(events);
        }
    });

    Checkbox.auto = function (page) {
        //logger.info('checkbox auto render');
        var cb, name;
        $.each($('[data-role="' + role + '"]'), function (i) {
            cb = $(this);
            name = cb.attr('id') || role + i;
            page.setElement(
                name,
                new Checkbox(
                    name, cb, cb.hasClass('wf-checkbox-checked')
                )
            );
        });
    };

    return Checkbox;

});