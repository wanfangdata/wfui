'use strict';

/**
 * 标签页
 */
wf.define('UI.Tab', ['UI', 'logger', 'Action'], function (UI, logger, Action) {
    
    
    /**
     * @class Menu
     */
    var Menu = wf.inherit(UI, {
        
        /**
         * [data-role]
         */
        role: 'tab',
        
        /**
         * 菜单项
         */
        items: [],
        
        /**
         * ui初始化    
         */
        init: function (_base_, name, $element) {
            _base_(name, $element);
            this.initElement([
                { selector: 'nav' },
                { selector: 'content' }
            ]);
            //初始化事件
            this.action = this.actionHandler();
            this.initEvent(events);
        }
    });
    
    return Menu;

});