'use strict';

/**
 * html结构：
 * <span class="wf-checkbox">
 *      <span class="wf-checkbox-inner"></span>
 *      <input type="checkbox" class="wf-checkbox-input" value="" />
 *      <span class="wf-checkbox-text"></span>
 *  </span>
 */
wf.define('UI.Checkbox', ['UI'], function (UI) {
    return wf.inherit(UI, {

        checked: false,

        event: {
            click: function () {

            },
            checked: function () {

            }
        },        

        init: function (_base_, name, $element, checked) {
            _base_(name, $element);
            this.checked = checked;
        },

        /**
         * 事件
         * @event on
         * @param {String} name 事件名称
         */
        on: function (name) {
            this.event[name]();
        }
    });
});