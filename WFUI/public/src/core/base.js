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
