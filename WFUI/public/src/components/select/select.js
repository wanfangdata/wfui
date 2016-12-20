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
wf.define('UI.Select', ['logger', 'UI', 'Action'], function (logger, UI, Action) {
    
    var role = 'select';
    
    /**
     * @class Select
     */
    var Select = wf.inherit(UI, {
        
        /**
         * [data-role]
         */
        role: role,
        
        /**
         * 选中class
         */
        openCls: function () {
            return this.clsName('open');
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
        set: function () {

        },
        
        open: function () {
            this.$element.addClass(this.openCls());
            this.animation(this.options.$element, 
                this.animationCls(['slide', 'up', 'in'])
            );
        },    
        
        close: function () {
            var me = this;
            if (me.supportCss3('animation')) {
                me.animation(
                    this.options.$element,
                    this.animationCls(['slide', 'up', 'out']),
                    function () {
                        me.$element.removeClass(me.openCls());
                    }
                );
            } else {
                me.$element.removeClass(me.openCls());
            }
        },
        
        /**
         * ui初始化
         * @param {String} _base_ 父类同名方法
         * @param {String} name ui名
         * @param {Object} $element ui jquery对象
         * @param {Object} events 组件事件
         * events:{'click',function($element){}}
         */
        init: function (_base_, name, $element, events) {
            var me = this;
            _base_(name, $element);
            //初始化组件元素,为JQuery对象
            me.initElement([
                { selector: 'selection' },
                { selector: 'input' },
                { selector: 'options' }
            ]);
            //初始化选中状态
            //初始化事件
            me.action = {
                click: new Action('click', function () {
                    var _action_ = this;
                    _action_.$target.click(function () {
                        if (me.$element.hasClass(me.disabledCls())) {
                            return false;
                        }
                        me[me.$element.hasClass(me.openCls())?'close':'open']();
                        _action_.piping();
                    });
                }, this.selection.$element)
            };
            me.initEvent(events);
            //设置空白处点击关闭
            me.blankClick($([
                UI.CLS_PREFIX + me.clsName('options', role),
                UI.CLS_PREFIX + me.clsName('selection', role),
            ].join(',')), function () {
                if (me.$element.hasClass(me.openCls())) {
                    me.close();
                }
            });
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
        
        $.each($(dataRole), function (index) {
            page.addElement(new Select('testSelect', $(this)));
        });

    };
    
    return Select;

});