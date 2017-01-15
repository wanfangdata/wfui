'use strict';

wf.define('loader', [], function () {
    
    /**
     * private
     * 动态加载模块集合
     */
    var loadModules = {};
    
    /**
     * 创建模块node
     * private
     * @method createModuleNode
     * @param {String} path 模块url
     * @return {String} node
     */
    var createModuleNode = function (path) {
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
         * 动态加载模块
         * @method load 动态获取模块
         */
        load: function (pathArr, callback) {
            for (var i = 0; i < pathArr.length; i++) {
                
                var path = pathArr[i];
                
                if (!loadModules[path]) {
                    var head = document.getElementsByTagName('head')[0];
                    var node = createModuleNode(path);
                    node.path = path;
                    
                    /**
                     * check所有模块加载完成执行callback
                     * @param {Function} callback 加载完成回调函数
                     * private
                     */
                     var checkAllFiles = function () {
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
                    };
                    node.onload = function () {
                        loadModules[this.path] = true;
                        head.removeChild(this);
                        checkAllFiles(pathArr, callback);
                    };
                    head.appendChild(node);
                }
            }

        }
    };
});