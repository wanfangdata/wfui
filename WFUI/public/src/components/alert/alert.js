'use strict';

/**
 * html结构：
 * <div class="wf-alert wf-alert-info">
 *     <span class="wf-alert-title">INFO : </span>
 *     <span class="wf-alert-message">This alert needs your attention, but it’s not important.</span>
 *     <i class="wf-icon icon-close"></i>
 * </div>
 */
wf.define('UI.Alert', ['UI', 'logger', 'Action'], function (UI, logger, Action) {
    
    var role = 'alert';
    
    /**
     * @class Alert
     */
    var Alert = wf.inherit(UI, {
        
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
                logger.error('alert 无{0}事件'.format(name));
            } else {
                this.action[name].register(func);
            }
        },
        
        /**
         * 关闭警告框
         */
        close: function () {
            this.$element.remove();
        },
        
        /**
         * ui初始化
         * @param {String} _base_ 父类同名方法
         * @param {String} name ui名
         * @param {Object} $element ui jquery对象
         * events:{'click',function($element){}}
         */
        init: function (_base_, name, $element, events) {
            var me = this;
            var ICON_CLOSE = 'icon-close';
            _base_($element, name);
            //初始化组件元素,为JQuery对象
            me.initElement([
                { selector: ICON_CLOSE }
            ]);
            //初始化事件
            me.action = {
                click: new Action('click', function () {
                    var _action_ = this;
                    _action_.$target.click(function () {
                        me.close();
                        _action_.piping();
                    });
                }, this[ICON_CLOSE].$element)
            };
            me.initEvent(events);
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
    Alert.auto = function (page) {
        $.each($(dataRole), function (index) {
            page.addElement(new Alert('alert' + index, $(this)));
        });
    };
    
    return Alert;

});