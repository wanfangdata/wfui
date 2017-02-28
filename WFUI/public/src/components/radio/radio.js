'use strict';

/**
 * html结构：
 * <span data-role="radio" class="wf-radio">
 *      <span class="wf-radio-inner">
 *          <i class="wf-icon icon-radio"></i>
 *      </span>
 *      <input class="wf-radio-input" type="radio"/>
 *      <span class="wf-radio-text"></span>
 * </span>
 */
wf.define('UI.Radio', ['UI', 'logger', 'Action'], function (UI, logger, Action) {

    var role = 'radio';

    /**
     * @class Radio
     */
    var Radio = wf.inherit(UI, {

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
                logger.error('radio 无{0}事件'.format(name));
            } else {
                this.action[name].register(func);
            }
        },

        /**
         * 设置radio的选中状态
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
         * 设置radio的文本内容
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
                        me.set(true);
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
     * radio实例name
     * @param {Object} $ele Radio JQuery元素
     * @param {String} index 元素index
     */
    var name = function ($ele, index) {
        return $ele.attr('id') || role + index;
    };

    /**
     * 创建radio
     * @param {Object} $elm radio jquery object
     * @param {String} index radio index
     * @param {Function} click click事件
     */
    var generateRD = function ($elm, index, click) {
        if (!$elm.attr('id')) {
            $elm.attr('id', role + index);
        }
        return new Radio(
            $elm,
            $elm.hasClass(UI.clsName('checked', role)),
            click ? { click: click } : null
        );
    };

    /**
     * 创建radio组
     * @param {Object} $group radio控制
     * @param {String} index $group index
     * @return {items}
     */
    Radio.group = function ($group, index) {
        var result = { items: {} }, $rd, groupId = name($group, index);
        $.each($group.find(dataRole), function (i) {
            $rd = $(this);
            result.items[name($rd, groupId + i)] =
            generateRD($rd, groupId + i, function (e) {
                for (var key in result.items) {
                    if (key !== e.$target.attr('id')) {
                        result.items[key].set(false);
                    }
                }
            });
        });
        result.name = groupId;
        result.$element = $group;
        return result;
    };

    /**
     * 自动初始化
     * @param {Object} page页面容器
     * @param {Bool} 是否tagRender渲染方式
     */
    Radio.auto = function (page, tagRender) {
        var $this, target;
        var groupCls = '.' + UI.clsName('group', role);
        var $target = tagRender ? $(dataRole).filter(UI.AUTO_TAG) : $(dataRole);
        var $targetGroup = tagRender ? $(groupCls).filter(UI.AUTO_TAG) :$(groupCls);
        $.each($target.not('.' + UI.clsName('group-item', role)).not(UI.DATA_RENDERED), function (index) {
            page.addElement(generateRD($(this), index));
        });
        $.each($targetGroup.not(UI.DATA_RENDERED), function (index) {
            page.addElement(Radio.group($(this)));
        });

    };

    return Radio;

});