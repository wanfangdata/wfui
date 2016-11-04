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
                 * 核心模块,dependencies
                 */
                core = {
                    token: '_core_',
                    values: [
                        'logger'
                    ]
                },
                /**
                 * private
                 * 模块集合
                 */
                modules = {};
            
            /**
             * WFUI实例
             */
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
                 * @param {Array||String} dependencies 模块依赖项,为core.token时引用核心模块
                 * @param {String} factory 模块创建工厂
                 * @return {Module} 返回该定义模块
                 */
                define: function (name, dependencies, factory) {
                    
                    if (typeof dependencies === 'string' && dependencies === core.token) {
                        dependencies = core.values;
                    }
                    
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
                 * 模块引用
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
                },
                
                /**
                 * 模块继承
                 * @method inherit
                 * @param {String} base 父类
                 * @return {Class} 返回该定义的类型
                 */
                inherit: function (base, prop) {
                    
                    /**
                     * 正则匹配函数参数
                     * private
                     * @method argumentNames
                     * @param {Function} fn 函数
                     * @return {Array}names 参数名数组
                     */
                    var argumentNames = function (fn) {
                        var names = fn.toString().match(/^[\s\(]*function[^(]*\(([^\)]*)\)/)[1].replace(/\s+/g, '').split(',');
                        return names.length == 1 && !names[0] ? [] : names;
                    }
                    
                    // 本次调用所创建的类（构造函数）
                    function UI() {
                        
                        if (base) {
                            this.baseprototype = base.prototype;
                        }
                        if (!this.init) {
                            throw new Error('init function is undefind');
                        }
                        this.init.apply(this, arguments);
                    }
                    
                    // 单参数情况下 - inherit(prop)
                    if (typeof (base) === 'object') {
                        prop = base;
                        base = null;

                    }
                    
                    if (base) {
                        var MiddleClass = function () { };
                        MiddleClass.prototype = base.prototype;
                        UI.prototype = new MiddleClass();
                        UI.prototype.constructor = UI;
                    }
                    
                    /**
                     * 重写父类方法,特殊情况下使用_base_访问父类同名方法（必须为第一个参数）
                     */
                    for (var name in prop) {
                        if (prop.hasOwnProperty(name)) {
                            if (base && typeof (prop[name]) === 'function' && argumentNames(prop[name])[0] === '_base_') {
                                UI.prototype[name] = (function (name, fn) {
                                    return function () {
                                        var that = this,
                                            _base_ = function () {
                                                return base.prototype[name].apply(that, arguments);
                                            };
                                        return fn.apply(this, Array.prototype.concat.apply(_base_, arguments));
                                    };
                                })(name, prop[name]);
                        
                            } else {
                                UI.prototype[name] = prop[name];
                            }
                        }
                    }
                    
                    return UI;
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

    String.prototype.empty = function () {
        return '';
    };
    Array.prototype.empty = function () {
        return [];
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
'use strict';

wf.define('logger', [], function () {

    /**
     * private
     * 日志级别
     */
    var LogLevel = {
        debug: 'debug',
        info: 'info',
        warn: 'warn',
        error: 'error'
    },

    /**
     * private
     * 日志输出模式
     */
    Mode = {
        local: 'local',
        remote: 'remote'
    },

    /**
     * private
     * 日志默认输出到本地
     */
    mode = Mode.local,

    /**
     * private
     * 日志输出到远程的地址
     */
    remoteUrl = '',

    /**
     * 日志输出
     * private
     * @method output
     * @param {String} msg 日志消息
     * @param {LogLevel} level 日志级别
     */
    output = function (msg, level) {
        if (mode = Mode.local) {
            console[level](msg);
        } else {
            if (!remoteUrl) {
                throw new Error('remoteUrl empty,');
            } else {
                //TODO 远程日志服务
            }
        }
        return msg;
    };

    /**
     * public api
     */
    return {

        /**
         * 获取日志输出模式
         * @method getOutputMode
         * @return {String} mode
         */
        getOutputMode: function () {
            return mode;
        },

        /**
         * 设置日志输出模式,仅当url有值时使用Mode.remote
         * @method setOutputMode
         * @param {String} url 远程日志系统url
         */
        setOutputMode: function (url) {
            if (url) {
                remoteUrl = url;
                mode = Mode.remote;
            }
        },

        /**
         * debug模式,调试时输出
         * @method debug
         * @param {String} msg 日志消息
         * @return {String} 返回该消息
         */
        debug: function (msg) {
            return output(msg, LogLevel.debug);
        },

        /**
         * info模式,输出到终端用户
         * @method info
         * @param {String} msg 日志消息
         * @return {Module} 返回该消息
         */
        info: function (msg) {
            return output(msg, LogLevel.info);
        },

        /**
         * warn模式,系统警告,建议远程传回
         * @method warn
         * @param {String} msg 日志消息
         * @return {Module} 返回该消息
         */
        warn: function (msg) {
            return output(msg, LogLevel.warn);
        },

        /**
         * error模式,系统错误,建议远程传回
         * @method error
         * @param {String} msg 日志消息
         * @return {Module} 返回该消息
         */
        error: function (msg) {
            return output(msg, LogLevel.error);
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

    /**
     * private
     * 动态加载模块集合
     */
    var loadModules = {},

        /**
         * 创建模块node
         * private
         * @method createModuleNode
         * @param {String} path 模块url
         * @return {String} node
         */
        createModuleNode = function (path) {
            var node = document.createElement('script');
            node.type = 'text/javascript';
            node.async = 'true';
            node.src = path + '.js';
            return node;
        };

    /**
     * public api
     */
    return {
        
        name: 'model loader',

        /**
         * 获取日志输出模式
         * @method load 动态获取模块
         */
        load: function (pathArr, callback) {
            for (var i = 0; i < pathArr.length; i++) {

                var path = pathArr[i];

                if (!loadModules[path]) {
                    var head = document.getElementsByTagName('head')[0],
                        node = createModuleNode(path),

                    /**
                     * check所有模块加载完成执行callback
                     * @param {Function} callback 加载完成回调函数
                     * private
                     */
                    checkAllFiles = function () {
                        var allLoaded = true;

                        for (var i = 0; i < pathArr.length; i++) {
                            if (!loadModules[pathArr[i]]) {
                                allLoaded = false;
                                break;
                            }
                        }

                        if (allLoaded) {
                            callback();
                        }
                    }
                    node.onload = function () {
                        loadModules[path] = true;
                        head.removeChild(node);
                        checkAllFiles(pathArr, callback);
                    };
                    head.appendChild(node);
                }
            }

        }
    };
});
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
'use strict';

/**
 * html结构：
 * <span data-role="checkbox" class="wf-checkbox">
 *      <span class="wf-checkbox-inner"></span>
 *      <input class="wf-checkbox-input" type="checkbox"/>
 *      <span class="wf-checkbox-text"></span>
 * </span>
 */
wf.define('UI.Checkbox', ['UI', 'logger', 'Action'], function (UI, logger, Action) {


    /**
     * @class Checkbox
     */
    var Checkbox = wf.inherit(UI, {

        /**
         * [data-role]
         */
        role: 'checkbox',

        /**
         * 选中class
         */
        checkedCls: function () {
            return this.clsName('checked');
        },

        /**
         * checkbox ui
         */
        inner: {
            selector: 'inner',
            $element: {}
        },

        /**
         * 实际checkbox元素
         */
        input: {
            selector: 'input',
            $element: {}
        },

        /**
         * 文本元素
         */
        text: {
            selector: 'text',
            $element: {}
        },

        /**
         * 事件处理
         */
        actionHandler: function () {
            var _cb_ = this;
            return {
                click: new Action('click', function () {
                    var _action_ = this;
                    _action_.$target.click(function () {
                        _cb_.checked();
                        _action_.piping();
                    });
                }, this.$element)
            }
        },

        /**
         * 注册用户自定义事件
         * @event on
         * @param {String} name 事件名称
         * @param {Function} func 事件函数
         */
        on: function (name, func) {
            if (!this.action[name]) {
                logger.error('checkbox 无{0}事件'.format(name));
            } else {
                this.action[name].register(func);
            }
        },

        /**
         * 设置checkbox的选中状态
         * @param {Bool||undefined} checked 是否选中
         * 如果为undefined则根据当前状态修改
         */
        checked: function (checked) {
            var $ele = this.input.$element,
                result = checked === undefined ?
                $ele.is(':checked') ?
                false : true :
                checked;
            $ele.prop('checked', result);
            this.$element[result ? 'addClass' : 'removeClass'](this.checkedCls());
        },

        /**
         * ui初始化
         * @param {String} _base_ 父类同名方法
         * @param {String} name ui名
         * @param {Object} $element ui jquery对象
         * @param {Bool} checked 是否选中
         * @param {Object} events 组件事件
         * events:{'click',function($element){}}
         */
        init: function (_base_, name, $element, checked, events) {
            _base_(name, $element, events);
            //初始化组件元素,为JQuery对象
            this.initElement([
                this.inner,
                this.input,
                this.text
            ]);
            //初始化选中状态
            this.checked(checked || false);
            //初始化事件
            this.action = this.actionHandler();
            this.initEvent(events);
        }
    });

    Checkbox.auto = function () {
        console.log('checkbox auto render');
    };

    return Checkbox;

});
'use strict';
/**
 * Page
 */
wf.define('page', ['logger'], function (logger) {
    
    /**
     * Page
     */    
    return {
        /**
         * 页面名称
         */
        name: String.empty,
        
        /**
         * 页面组件
         */
        components: {},
        
        /**
         * 自动render页面所有组件
         */
        auto: function () {
            
            for (var com in this.components) {
                if ($.isFunction(this.components[com].auto)) {
                    this.components[com].auto();
                } else {
                    logger.error(com + '缺少auto render');
                }
            };
            
        },        
        
        logger: logger,

        /**
         * 初始化函数
         * @param {String} name页面名称
         * @param {Array<String>} components页面组件
         * @param {Function} func 自定义执行函数
         * @param {Bool} auto 所有组件是否自动初始化
         * @return {Object} 返回当前页面
         */
        render: function (name, components , func, auto) {
            var _pg_ = this,
                UI_SPLITOR = '.';
            _pg_.name = name;
            $.each(components, function () {
                if (this.indexOf(UI_SPLITOR) > -1) {
                    _pg_.components[this.split(UI_SPLITOR)[1]] = wf.require(this);
                } else {
                    if (!_pg_[this]) {
                        _pg_[this] = wf.require(this);
                    }
                }
            });
            if ($.isFunction(func)) {
                func.call(_pg_, _pg_.components);
            }
            if (auto === undefined || auto) {
                _pg_.auto();
            }
            return _pg_;
        },
    };
});