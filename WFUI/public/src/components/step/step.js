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
         * @param {Object} $element ui jquery对象
         * @param {Object} events 组件事件
         * events:{'change',function($element){}}
         */
        init: function (_base_, $element, events) {
            _base_($element,name);
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
     * @param {Bool} 是否tagRender渲染方式
     */
    Step.auto = function (page, tagRender) {
        var $target = tagRender ? $(dataRole).filter(UI.AUTO_TAG) : $(dataRole);
        $.each($target.not(UI.DATA_RENDERED), function (index) {
            page.addElement(new step($(this)));
        });

    };
    
    return Step;

});