'use strict';

/**

 */
wf.define('UI.Menu', ['UI', 'logger', 'Action'], function (UI, logger, Action) {


    /**
     * @class Menu
     */
    var Menu = wf.inherit(UI, {

        /**
         * [data-role]
         */
        role: 'menu',

        /**
         * ui初始化
         */
        init: function (_base_, name, $element) {
            _base_(name, $element);
            this.initElement([

            ]);
            //初始化事件
            this.action = this.actionHandler();
            this.initEvent(events);
        }
    });

    return Menu;

});