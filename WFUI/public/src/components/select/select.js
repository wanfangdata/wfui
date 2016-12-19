'use strict';

/**
 * html结构：
 * <span data-role="select" class="wf-select">
 *      <span class="wf-select-inner">
 *          <i class="wf-icon icon-select"></i>
 *      </span>
 *      <input class="wf-select-input" type="select"/>
 *      <span class="wf-select-text"></span>
 * </span>
 */
wf.define('UI.Select', ['UI', 'logger', 'Action'], function (UI, logger, Action) {
    
    var role = 'select',

    /**
     * @class Select
     */
    Select = wf.inherit(UI, {
            
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
         * disabled class
         */
        disabledCls: function () {
            return this.clsName('disabled');
        },
            
        /**
         * 注册用户自定义事件
         * @event on
         * @param {String} name 事件名称
         * @param {Function} func 事件函数
         */
        on: function (name, func) {
            if (!this.action[name]) {
                logger.error('select 无{0}事件'.format(name));
            } else {
                this.action[name].register(func);
            }
        },
            
        /**
         * 设置select的选中状态
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
         * 设置select的文本内容
         * @param {String} text 文本内容
         */
        setText: function (text) {
            this.text.$element.text(text);
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
                { selector: 'inner' },
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
                        if (me.$element.hasClass(me.disabledCls())) {
                            return false;
                        }
                        me.set(true);
                        _action_.piping();
                    });
                }, this.$element)
            };
            me.initEvent(events);
        }
    }),

    /**
     * dataRole
     */
    dataRole = '[data-role="' + role + '"]';
    
    /**
     * 自动初始化
     * @param {Object} page页面容器
     */
    Select.auto = function (page) {
    

    };
    
    return Select;

});