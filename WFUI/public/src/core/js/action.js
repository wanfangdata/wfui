'use strict';
/**
 * 事件系统
 */
wf.define('Action', [], function () {
    return wf.inherit({
        /**
         * 事件名称
         */
        name: String.empty,
        /**
         * 事件注册
         * @param {Function} func
         */
        register: function (func) {
            this.funcs.push(func);
        },
        /**
         * 事件管道
         * @parma {*} param 事件自定义参数
         */
        piping: function (param) {
            var _ac_ = this;
            $.each(_ac_.funcs, function () {
                this(_ac_, param);
            });
        },
        /**
         * 事件初始化
         * @param {String} name 事件名
         * @param {Function} 初始事件体
         * @param {JQuery} $target 触发对象
         */
        init: function (name, func, $target) {
            this.name = name;
            /**
             * 事件注册的函数
             */
            this.funcs = [];
            /**
             * 触发对象
             */
            this.$target = $target;
            if ($.isFunction(func)) {
                func.call(this);
            }
        }
    });
});