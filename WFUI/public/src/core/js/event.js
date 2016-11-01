'use strict';
/**
 * 事件系统
 */
wf.define('Event', '_core_', function (logger) {

    return wf.inherit({
        /**
         * 事件名称
         */
        name: String.empty,
        
        /**
         * 事件初始化
         * @param {String} name 事件名
         * @param {Function} fun 事件体
         */
        init: function (name,fun) {
            this.name = name;
            
        }
    });
});