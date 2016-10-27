'use strict';

/**
 * html结构：
 * <span class="wf-checkbox">
 *      <span class="wf-checkbox-inner"></span>
 *      <input type="checkbox" class="wf-checkbox-input" value="" />
 *      <span class="wf-checkbox-text"></span>
 *  </span>
 */
wf.define('ui.Checkbox', [], function () {
    var Checkbox = function (name, checked) {
        this.name = name;
        this.checked = checked;
    };


    var checkbox = {

    };

    return {
        on: function (event) {

        },
        disable: function (disabled) {

        }
    };
});