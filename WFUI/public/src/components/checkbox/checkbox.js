'use strict';

/**
 * html结构：
 * <span data-role="checkbox" class="wf-checkbox">
 *      <span class="wf-checkbox-inner">
 *          <i class="wf-icon icon-selected"></i>
 *      </span>
 *      <input class="wf-checkbox-input" type="checkbox"/>
 *      <span class="wf-checkbox-text"></span>
 * </span>
 */
wf.define('UI.Checkbox', ['UI', 'logger', 'Action'], function (UI, logger, Action) {

    var role = 'checkbox';

    /**
     * @class Checkbox
     */
    var Checkbox = wf.inherit(UI, {

        /**
         * [data-role]
         */
        role: role,

        /**
         * 选中class
         */
        checkedCls: function () {
            return this.clsName('checked');
        },

        /**
         * disabled class
         */
        disabledCls: function () {
            return this.clsName('disabled');
        },

        /**
         * 注册用户自定义事件
         * @event on
         * @param {String} name 事件名称
         * @param {Function} func 事件函数
         */
        on: function (name, func) {
            if (!this.action[name]) {
                logger.error('checkbox 无{0}事件'.format(name));
            } else {
                this.action[name].register(func);
            }
        },

        /**
         * 设置checkbox的选中状态
         * @param {Bool||undefined} checked 是否选中
         * 如果为undefined则根据当前状态修改
         */
        set: function (checked) {
            var $ele = this.input.$element;
            var result = checked === undefined ?
                $ele.is(':checked') ?
                false : true :
                checked;
            $ele.prop('checked', result);
            this.checked = result;
            this.$element[result ? 'addClass' : 'removeClass'](this.checkedCls());
        },

        /**
         * 设置checkbox的文本内容
         * @param {String} text 文本内容
         */
        setText: function (text) {
            this.text.$element.text(text);
        },

        /**
         * ui初始化
         * @param {String} _base_ 父类同名方法
         * @param {Object} $element ui jquery对象
         * @param {Bool} checked 是否选中
         * @param {Object} events 组件事件
         * events:{'click',function($element){}}
         */
        init: function (_base_, $element, checked, events) {
            var me = this;
            _base_($element);
            //初始化组件元素,为JQuery对象
            me.initElement([
                { selector: 'inner' },
                { selector: 'input' },
                { selector: 'text' }
            ]);
            //初始化选中状态
            me.set(checked || false);
            //初始化事件
            me.action = {
                click: new Action('click', function () {
                    var _action_ = this;
                    _action_.$target.click(function () {
                        if (me.$element.hasClass(me.disabledCls())) {
                            return false;
                        }
                        me.set();
                        _action_.piping();
                    });
                }, this.$element)
            };
            me.initEvent(events);
        }
    });

    /**
     * dataRole
     */
    var dataRole = '[data-role="' + role + '"]';

    /**
     * checkbox实例name
     * @param {Object} $ele Checkbox JQuery元素
     * @param {String} index 元素index
     */
    var name = function ($ele, index) {
        return $ele.attr('id') || role + index;
    };

    /**
     * 创建checkbox
     * @param {Object} $elm checkbox jquery object
     * @param {String} index checkbox index
     * @param {Function} click click事件
     */
    var generateCB = function ($elm, index, click) {
        if (!$elm.attr('id')) {
            $elm.attr('id', role + index);
        }        
        return new Checkbox(
            $elm,
            $elm.hasClass(UI.clsName('checked', role)),
            click ? { click: click } : null
        );
    };

    /**
     * 创建checkbox组
     * @param {Object} $controller checkbox控制
     * @return {$controller,items}
     */
    Checkbox.group = function ($controller) {
        var result = { items: {} }, $cb, groupId = $controller.data('target');
        $.each($(UI.ID_PREFIX + groupId).find(dataRole), function (i) {
            $cb = $(this);
            result.items[name($cb, groupId + i)] =
            generateCB($cb, groupId + i, function () {
                var valide = [];
                var all = true;
                for (var key in result.items) {
                    if (valide.length == 0) {
                        valide.push(result.items[key].checked);
                        continue;
                    }
                    if ($.inArray(result.items[key].checked, valide) < 0) {
                        all = false;
                        break;
                    }
                }
                result.controller.set(all ? valide[0] : false);
            });
        });
        result.controller = new Checkbox(
            $controller,
            $controller.hasClass(UI.clsName('checked', role)),
            {
                click: function (cb) {
                    for (var key in result.items) {
                        result.items[key].set(
                            $controller.hasClass(UI.clsName('checked', role))
                        );
                    }
                }
            }
        );
        result.name = groupId;
        return result;
    };

    /**
     * 自动初始化
     * @param {Object} page页面容器
     */
    Checkbox.auto = function (page) {

        var $this, target;

        $.each($(dataRole).not(UI.CLS_PREFIX + UI.clsName('group-item', role)), function (index) {
            $this = $(this);
            target = $this.data('target');
            page.addElement(target ?
                Checkbox.group($this, target, index) :
                generateCB($this, index)
            );
        });
    };

    return Checkbox;

});