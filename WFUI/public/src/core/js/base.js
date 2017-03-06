'use strict';
(function (global) {
    /**
     * wf module framework.
     * @module wf
     * @base wf
     * @alias f
     */
    var wf = global.wf || {};
    wf = function () {
        var name = 'wf';
        /**
         * 核心模块,dependencies
         */
        var core = {
            token: '_core_',
            values: [
                'logger'
            ]
        };
        /**
         * private
         * 模块集合
         */
        var modules = {};
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
             * base 版本号
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
                var i;
                var module = modules[name];
                if (!module.entity) {
                    var args = [];
                    for (i = 0; i < module.dependencies.length; i++) {
                        if (modules[module.dependencies[i]].entity) {
                            args.push(modules[module.dependencies[i]].entity);
                        }
                        else {
                            args.push(this.require(module.dependencies[i]));
                        }
                    }
                    module.entity = module.factory.apply(function () {}, args); //noop
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
                        if (base && typeof (prop[name]) === 'function' && name === 'init') {
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
