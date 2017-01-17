'use strict';
/**
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 *
 * 
 */
wf.define('UI.Step', ['UI', 'logger', 'Action'], function (UI, logger, Action) {
    
    
    var role = 'step';
    /**
     * @class Menu
     */
    var Step = wf.inherit(UI, {
        
        /**
         * [data-role]
         */
        role: role,        
        
        /**
         * disabled class
         */
        disabledCls: function () {
            return this.clsName('disabled');
        },
        
        /**
         * active class
         * @param {String} name ,nav或content active
         */
        activeCls: function (name) {
            return this.clsName(name + UI.CHAIN + 'active');
        },
        
        /**
         * 设置页码为index页为当前页
         * @param {Number} index 页码
         */
        activeTo: function (index) {
            var me = this;
            $.each(['nav', 'content'], function () {
                me[this].$element
                .find(UI.CLS_PREFIX + me.clsName(this + UI.CHAIN + 'item'))
                .eq(index)
                .addClass(me.activeCls(this))
                .siblings().removeClass(me.activeCls(this));
            });
            me.content.$element.css({ 'margin-left': -(index * 100) + '%' });
        },
        
        /**
         * 注册用户自定义事件
         * @event on
         * @param {String} name 事件名称
         * @param {Function} func 事件函数
         */
        on: function (name, func) {
            if (!this.action[name]) {
                logger.error('step 无{0}事件'.format(name));
            } else {
                this.action[name].register(func);
            }
        },

        /**
         * ui初始化
         * @param {String} _base_ 父类同名方法
         * @param {String} name ui名
         * @param {Object} $element ui jquery对象
         * @param {Object} events 组件事件
         * events:{'change',function($element){}}
         */
        init: function (_base_, name, $element, events) {
            _base_(name, $element);
            var me = this;
            this.initElement([
                { selector: 'nav' },
                { selector: 'content' }
            ]);
            //初始化事件
            me.action = {
                change: new Action('change', function () {
                    var _action_ = this;
                    _action_.$target.click(function () {
                        if ($(this).hasClass(me.disabledCls()) || 
                            $(this).hasClass(me.activeCls('nav'))) {
                            return false;
                        }
                        me.activeTo($(this).index());
                        _action_.piping();
                    });
                }, this.nav.$element.find(UI.CLS_PREFIX + this.clsName('nav-item')))
            };
            this.initEvent(events);
        }
    });
    
    /**
     * dataRole
     */
    var dataRole = '[data-role="' + role + '"]';
    
    /**
     * 自动初始化
     * @param {Object} page页面容器
     */
    Step.auto = function (page) {
        
        $.each($(dataRole), function (index) {
            page.addElement(new step($(this).attr('id') || role + index, $(this)));
        });

    };
    
    return Step;

});