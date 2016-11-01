'use strict';
/**
 * UI组件
 */
wf.define('UI', '_core_', function () {
    /**
     * UI组件命名规则
     */
    var _WF_ = 'wf',

        CHAIN = '-',

        CLS_PREFIX = '.';
    
    return wf.inherit({
        /**
         * 组件实例名
         */
        name: String.empty,
        
        /**
         * 组件实例JQuery对象
         */
        $element: Object.empty,
        
        /**
         * 初始化函数
         * @param {String} name组件实例名
         * @param {JQuery} 组件实例JQuery对象
         */
        init: function (name, $element) {
            this.name = name;
            this.$element = $element;
        },
        
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
        
        /**
         * 单个组件实例查找结构元素
         * @param {String} 元素名（按照组件命名规则）
         * @return {JQuery} 返回结构元素
         */
        find: function (name) {
            return this.$element.find([CLS_PREFIX + _WF_, this.type, name].join(CHAIN));
        }
    });
});