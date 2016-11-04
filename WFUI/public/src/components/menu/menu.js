'use strict';

/**

 */
wf.define('UI.Menu', ['UI', 'logger', 'Action'], function (UI, logger, Action) {


    /**
     * @class Checkbox
     */
    var Menu = wf.inherit(UI, {

        /**
         * [data-role]
         */
        role: 'menu',

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

    return Menu;

});