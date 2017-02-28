'use strict';
/**
 * UI组件
 */
wf.define('UI', ['logger'], function (logger) {
    
    /**
     * UI组件命名规则
     */
    var _WF_ = 'wf';
    var CHAIN = '-';
    var CLS_PREFIX = '.';
    var ID_PREFIX = '#';
    var UI = wf.inherit({
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
        
        /**
         * 组装className
         * @param {String} name元素名
         */
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
         * 设置全局点击机制
         */
        blankClick: (function () {
            
            /**
             * 全局目标对象列表
             */
            var $targetList = [];
            $(document).mouseup(function (e) {
                $.each($targetList, function () {
                    if (!this.target.is(e.target) && 
                            this.target.has(e.target).length === 0) {
                        if ($.isFunction(this.clickOut)) {
                            this.clickOut();
                        }
                    } else {
                        if ($.isFunction(this.clickIn)) {
                            this.clickIn();
                        }
                    }
                });
            });
            
            /**
             * @param {JQuery} $target目标对象
             * @param {Function} clickOut点击非目标对象时执行函数
             * @param {Function} clickIn点击目标对象时执行函数
             */
            return function ($target, clickOut, clickIn) {
                $targetList.push({
                    target: $target,
                    clickIn: clickIn,
                    clickOut: clickOut
                });
            };
        })(),
        
        /**
        * 判断浏览器是否支持某一个CSS3属性
        * @param  {String} style 属性名称
        * @return {Boolean}
        */
        supportCss3: function supportCss3(style) {
            var prefix = ['webkit', 'Moz', 'ms', 'o'];
            var i;
            var humpString = [];
            var htmlStyle = document.documentElement.style;
            var _toHumb = function (string) {
                return string.replace(/-(\w)/g, function ($0, $1) {
                    return $1.toUpperCase();
                });
            };
            
            for (i in prefix) {
                humpString.push(_toHumb(prefix[i] + '-' + style));
            }
            
            humpString.push(_toHumb(style));
            
            for (i in humpString) {
                if (humpString[i] in htmlStyle) {
                    return true;
                }
            }
            return false;
        },
        
        /**
         * 获取动画class
         * @param {Array} keywords 动画关键词
         */
        animationCls: function (keywords) {
            return _WF_ + CHAIN + keywords.join(CHAIN);
        },
        
        /**
         * 为UI添加一段动画
         * @param {Object}  $ui jquery对象
         * @param {String}  cls 动画class
         * @param {Function}  callback 动画结束后回调
         */
        animation: function ($ui, cls, callback) {
            $ui.addClass(cls);
            $ui.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                $ui.removeClass(cls);
                if ($.isFunction(callback)) {
                    callback();
                }
            });
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
                    this.action(this.$element);
                }
                _ui_[this.selector] = this;
            });
        },
        
        /**
         * 初始化组件内部元素
         * @param {Object} events 组件事件
         */
        initEvent: function (events) {
            if (!events) { return; }
            for (var key in events) {
                this.on(key, events[key])
            }
        },
        
        /**
         * 初始化函数
         * @param {JQuery} 组件实例JQuery对象
         * @param {String} name组件实例名
         */
        init: function ($element, name) {
            this.name = name || $element.attr('id');
            this.$element = $element;
            if (!this.name) {
                logger.error('missing unique identifier');
            }
        }

    });
    
    /**
     * static 组装className
     * @param {String} 元素名
     * @param {role} 组件role
     * @return {String} 返回className
     */
    UI.clsName = function (name, role) {
        return [_WF_, role, name].join(CHAIN);
    };
    
    UI.CLS_PREFIX = CLS_PREFIX;
    UI.ID_PREFIX = ID_PREFIX;
    UI.CHAIN = CHAIN;
    UI.AUTO_TAG = '[data-auto="true"]';
    UI.DATA_RENDERED_STR = 'data-rendered';
    UI.DATA_RENDERED = '[' + UI.DATA_RENDERED_STR + ']';
    return UI;
});