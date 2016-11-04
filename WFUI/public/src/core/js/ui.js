'use strict';
/**
 * UI组件
 */
wf.define('UI', ['logger'], function (logger) {
    
    /**
     * UI组件命名规则
     */
    var _WF_ = 'wf',

        CHAIN = '-',

        CLS_PREFIX = '.',

        UI = wf.inherit({
            /**
             * 组件实例名
             */
            name: String.empty,
            
            /**
             * 组件是否激活
             */
            active: true,
            
            /**
             * 组件实例JQuery对象
             */
            $element: {},   
            
            /**
             * 事件对象
             */
            action: {},  
            
            /**
             * 显示
             */
            show: function () {
                this.$element.show();
            },
            
            /**
             * 隐藏
             */
            hide: function () {
                this.$element.hide();
            },
            
            /**
             * 移除当前组件实例
             */
            remove: function () {
                this.$element.remove();
            },
            
            clsName: function (name) {
                return [_WF_, this.role, name].join(CHAIN);
            },
            
            /**
             * 单个组件实例查找结构元素
             * @param {String} 元素名（按照组件命名规则）
             * @return {JQuery} 返回结构元素
             */
            find: function (name) {
                return this.$element.find(CLS_PREFIX + this.clsName(name));
            },
            
            /**
             * 初始化组件内部元素
             * @param {String} elements 组件内部元素
             */
            initElement: function (elements) {
                var _ui_ = this;
                $.each(elements, function () {
                    this.$element = _ui_.find(this.selector);
                    if (this.action && $.isFunction(this.action)) {
                        this.action(_ui_);
                    }
                });
            },
            
            /**
             * 初始化组件内部元素
             * @param {Object} events 组件事件
             */
            initEvent: function (events) {
                for (var key in events) {
                    this.on(key, events[key])
                }
            },
            
            /**
             * 初始化函数
             * @param {String} name组件实例名
             * @param {JQuery} 组件实例JQuery对象
             */
            init: function (name, $element) {
                this.name = name;
                this.$element = $element;
            },
        });
    return UI;
});