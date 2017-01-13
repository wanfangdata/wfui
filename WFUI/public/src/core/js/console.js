'use strict';

(function (global) {
    /**
     * 兼容console
     */
    var _console = global.console || {};
    
    var methods = [
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
    ];
    var console = {
        version: '1.0.0'
    };
    var key;
    
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