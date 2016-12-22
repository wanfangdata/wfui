'use strict';

/**
 * html结构：
 * <div data-role="select" class="wf-select" id="selectDemo1">
 *     <div class="wf-select-selection">
 *         <div class="wf-select-selection-value"></div>
 *         <i class="wf-icon icon-moreunfold"></i>
 *     </div>
 *     <input class="wf-select-input" type="text" />
 *     <ul class="wf-select-options">
 *         <li data-value="wanfangdata" class="wf-select-option wf-select-option-selected">wangfangdata</li>
 *         <li data-value="wffe" class="wf-select-option">wffe</li>
 *         <li data-value="bishanshan" class="wf-select-option">bishanshan</li>
 *         <li data-value="selector" class="wf-select-option">选择器</li>
 *     </ul>
 * </div>
 */
wf.define('UI.Select', ['logger', 'UI', 'Action'], function (logger, UI, Action) {
    
    var role = 'select',
    
    /**
     * @class Select
     */
    Select = wf.inherit(UI, {
        
        /**
         * [data-role]
         */
        role: role,
        
        /**
         * 选中class
         */
        openCls: function () {
            return this.clsName('open');
        },
        
        /**
         * disabled class
         */
        disabledCls: function () {
            return this.clsName('disabled');
        },
            
        /**
         * disabled class
         */
        selectCls: function () {
            return this.clsName('option-selected');
        },    

        /**
         * 注册用户自定义事件
         * @event on
         * @param {String} name 事件名称
         * @param {Function} func 事件函数
         */
        on: function (name, func) {
            if (!this.action[name]) {
                logger.error('select 无{0}事件'.format(name));
            } else {
                this.action[name].register(func);
            }
        },
        
        /**
         * select打开选项列表
         */
        open: function () {
            this.$element.addClass(this.openCls());
            this.animation(this.options.$element, 
                this.animationCls(['slide', 'up', 'in'])
            );
        },    
        
        /**
         * select收起选项列表
         */
        close: function () {
            var me = this;
            if (me.supportCss3('animation')) {
                me.animation(
                    this.options.$element,
                    this.animationCls(['slide', 'up', 'out']),
                    function () {
                        me.$element.removeClass(me.openCls());
                    }
                );
            } else {
                me.$element.removeClass(me.openCls());
            }
        },            
            
        /**
         * 设置select的选中状态
         * @param {String} value 选中值
         * @param {String} text 选中文本
         */
        set: function (value,text) {
            this.selection
            .$element
            .find(UI.CLS_PREFIX + this.clsName('selection-value'))
            .text(text);
            this.input.$element.val(value);
        }, 
           
        /**
         * 获取select值
         * @param {String} value 选中值
         * @param {String} text 选中文本
         */  
        value: function () { 
            return this.input.$element.val();
        },    

        /**
         * ui初始化
         * @param {String} _base_ 父类同名方法
         * @param {String} name ui名
         * @param {Object} $element ui jquery对象
         * @param {Object} events 组件事件
         * events:{'click',function($element){}}
         */
        init: function (_base_, name, $element, events) {
            var me = this;
            _base_(name, $element);
            //初始化组件元素,为JQuery对象
            me.initElement([
                {
                    selector: 'selection'
                },
                {
                    selector: 'input'
                },
                {
                    selector: 'options', 
                    action: function ($options) {
                        var selectCls = me.selectCls();
                        var $optionList = $options.find(UI.CLS_PREFIX + me.clsName('option', role))
                        $optionList.click(function () {
                            $(this)
                            .addClass(selectCls)
                            .siblings()
                            .removeClass(selectCls);
                            me.set($(this).data('value'), $(this).text());
                            me.close();
                        });
                    }
                }
            ]);
            //初始化事件
            me.action = {
                click: new Action('click', function () {
                    var _action_ = this;
                    _action_.$target.click(function () {
                        if (me.$element.hasClass(me.disabledCls())) {
                            return false;
                        }
                        me[me.$element.hasClass(me.openCls())?'close':'open']();
                        _action_.piping();
                    });
                }, this.selection.$element)
            };
            me.initEvent(events);
            //设置空白处点击关闭
            me.blankClick($([
                UI.CLS_PREFIX + me.clsName('options', role),
                UI.CLS_PREFIX + me.clsName('selection', role),
            ].join(',')), function () {
                if (me.$element.hasClass(me.openCls())) {
                    me.close();
                }
            });
        }
    }),

    /**
     * dataRole
     */
    dataRole = '[data-role="' + role + '"]';
    
    /**
     * 自动初始化
     * @param {Object} page页面容器
     */
    Select.auto = function (page) {
        
        $.each($(dataRole), function (index) {
            page.addElement(new Select('testSelect', $(this)));
        });

    };
    
    return Select;

});