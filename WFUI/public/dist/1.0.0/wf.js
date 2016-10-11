'use strict';
(function (global) {
        
    /**
     * wf module framework.
     * @module wf
     * @base wf
     * @alias f
     */

    var wf = global.wf || {},
    
        wf = function () {

            var name = 'wf',
                /**
                 * private
                 * 模块集合
                 */
                modules = {};

            return {
                
                /**
                 * 模块名称
                 * @property {String} name
                 */
                name: 'wf', 
                
                /**
                 * 版本号,项目构建新版本时更新发布版本号
                 * @property {String} version
                 */
                version: '1.0.0',
                
                /**
                 * 模块声明
                 * @method define
                 * @param {String} name 模块名称
                 * @param {Array} dependencies 模块依赖项
                 * @param {String} factory 模块创建工厂
                 * @return {Module} 返回该定义模块
                 */
                define: function (name, dependencies, factory) {
                    
                    if (!modules[name]) {
                        var module = {
                            name: name,
                            dependencies: dependencies,
                            factory: factory
                        };
                        
                        modules[name] = module;
                    }
                    
                    return modules[name];
                },

                /**
                 * 引用模块
                 * @method require
                 * @param {String} name 模块名称
                 * @return {Object} 返回该定义模块的实例
                 */
                require: function (name) {

                    var module = modules[name];
                                       
                    if (!module.entity) {
                        var args = [];
                        for (var i = 0; i < module.dependencies.length; i++) {
                            if (modules[module.dependencies[i]].entity) {
                                args.push(modules[module.dependencies[i]].entity);
                            }
                            else {
                                args.push(this.require(module.dependencies[i]));
                            }
                        }
                        
                        module.entity = module.factory.apply(function () { 
                            //noop
                        }, args);
                    }                    
                    return module.entity;
                }
            };
        };
    
    global.wf = wf();

})(window);

'use strict';
/**
 * 扩展String format.
 */
(function () {
    
    String.prototype.format = function () {
        var source = this;
        if (arguments.length > 0) {
            $.each(arguments, function (i, n) {
                source = source.replace(new RegExp('\\{' + i + '\\}', 'g'), n);
            });
        }
        return source;
    };

})();
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

wf.define('log', [], function () {
    
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
/*
 * cookie module
 *
 */

wf.define('cookie', [], function () {
    return {
        /**
         * 设置cookie
         * 
         * @param {String} key cookie名称
         * @param {String} value cookie值
         * @param {String} domain 所在域名
         * @param {String} path 所在路径
         * @param {String} expires 过期时间
         */
        set: function (key, value, domain, path, expires) {
            document.cookie = [
                key, '=', value,
                expires ? '; expires=' + expires.toGMTString() : '',
                path ? '; path=' + path : '',
                domain ? '; domain=' + domain : ''
            ].join('');
        },
        /**
         * 获取指定名称的cookie值
         * 
         * @param {String} key cookie名称
         * @return {String} 获取到的cookie值
         */
        get: function (key) {
            var arr, reg = new RegExp('(^| )' + key + '=([^;]*)(;|$)');
            if (arr = document.cookie.match(reg))
                return arr[2];
            else
                return null;
        },
        /**
         * 删除cookie
         * 
         * @param {String} key cookie名称
         */
        remove: function (key) {
            document.cookie = key + '=; expires=Mon, 26 Jul 1997 05:00:00 GMT;';
        }
    };
});
'use strict';
wf.define('loader', [], function () {
    return {
        load: function (pathArr, callback) {
            for (var i = 0; i < pathArr.length; i++) {
                var path = pathArr[i];
                
                if (!fileMap[path]) {
                    var head = document.getElementsByTagName('head')[0];
                    var node = document.createElement('script');
                    node.type = 'text/javascript';
                    node.async = 'true';
                    node.src = path + '.js';
                    node.onload = function () {
                        fileMap[path] = true;
                        head.removeChild(node);
                        checkAllFiles();
                    };
                    head.appendChild(node);
                }
            }
            
            function checkAllFiles() {
                var allLoaded = true;
                for (var i = 0; i < pathArr.length; i++) {
                    if (!fileMap[pathArr[i]]) {
                        allLoaded = false;
                        break;
                    }
                }
                
                if (allLoaded) {
                    callback();
                }
            }
        }
    };
});