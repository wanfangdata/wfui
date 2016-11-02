'use strict';
/**
 * 事件系统
 */
wf.define('Action', '_core_', function (logger) {
    
    return wf.inherit({
        /**
         * 事件名称
         */
        name: String.empty,
        
        /**
         * 触发对象
         */
        $target: {},
        
        /**
         * 事件注册的函数
         */
        funcs: [],
        
        /**
         * 事件注册
         * @param {Function} func
         */
        register: function (func) {
            this.funcs.push(func);
        },
        
        /**
         * 事件管道
         */
        piping: function (funcs) {
            var _ac_ = this;
            $.each(_ac_.funcs, function () {
                this(_ac_);
            });
        },
        
        /**
         * 事件初始化
         * @param {String} name 事件名
         * @param {Function} 初始事件体
         * @param {JQuery} target 触发对象
         */
        init: function (name , func, target) {
            this.name = name;
            this.$target = target;
            if ($.isFunction(func)) {
                func.call(this);
            }
        }
    });

});