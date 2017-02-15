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
         * 页面组件实例
         */
        element: {},

        /**
         * 添加组件
         * @param {Object} element组件
         */
        addElement: function (element) {
            if (this.element[element.name]) {
                logger.error('页面组件id:' + element.name + ' 重复');
                return;
            }
            this.element[element.name] = element;
        },

        /**
         * 自动render页面所有组件
         */
        auto: function () {

            for (var com in this.components) {
                if ($.isFunction(this.components[com].auto)) {
                    this.components[com].auto(this);
                } else {
                    logger.error(com + '缺少auto render');
                }
            }

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
        render: function (name, components, func, auto) {
            var _pg_ = this;
            var UI_SPLITOR = '.';
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
                func.call(_pg_, _pg_.components, _pg_.element);
            }
            if (auto === undefined || auto) {
                _pg_.auto();
            }
            return _pg_;
        }
    };
});