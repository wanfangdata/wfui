'use strict';

(function (global) {
    /**
     * 兼容console
     */
    var _console = global.console || {},

        methods = [
            'assert', 
            'clear',
            'count', 
            'debug', 
            'dir', 
            'dirxml',
            'exception',
            'error', 
            'group', 
            'groupCollapsed',
            'groupEnd',
            'info', 
            'log', 
            'profile',
            'profileEnd',
            'table',
            'time',
            'timeEnd',
            'timeStamp',
            'trace', 
            'warn'
        ],
        console = {
            version: '1.0.0'
        },
        key;
    
    for (var i = 0, len = methods.length; i < len; i++) {
        key = methods[i];
        console[key] = function (key) {
            return function () {
                if (typeof _console[key] === 'undefined') {
                    return 0;
                }
                
                Function.prototype.apply.call(_console[key], _console, arguments);
            };
        }(key);
    }
    
    global.console = console;

}(window));

wf.define('logger', [], function () {
    
    /**
     * private
     * 日志级别
     */
    var LOG_LEVEL = {
        debug: 0,
        info: 1,
        warn: 2,
        error: 3
    };
    return {
        debug: function () { 
            
        },
        info: function () { 
        
        },
        warn: function () { 
        
        },
        error: function () {

        }
    };
});