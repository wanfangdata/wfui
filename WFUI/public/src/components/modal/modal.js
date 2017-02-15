'use strict';

/**
 * html结构：
 * <div class="wf-modal">
 *     <div class="wf-modal-mask"></div>
 *     <div class="wf-modal-content">
 *         <div class="wf-modal-header">
 *             <div class="wf-modal-title">Title</div>
 *             <i class="wf-icon icon-close"></i>
 *         </div>
 *         <div class="wf-modal-body">
 *             <p>some contents...</p><p>some contents...</p><p>some contents...</p>
 *         </div>
 *         <div class="wf-modal-footer">
 *             <button type="button" class="wf-btn">Cancel</button>
 *             <button type="button" class="wf-btn wf-btn-primary">OK</button>
 *         </div>
 *     </div>
 * </div>
 */

wf.define('UI.Modal', ['UI', 'logger', 'Action', 'Util'], function (UI, logger, Action, Util) {
    
    var role = 'modal';
    
    /**
     * @class Modal
     */
    var Modal = wf.inherit(UI, {
        
        /**
         * [data-role]
         */
        role: role,
        
        /**
         * 注册用户自定义事件
         * @event on
         * @param {String} name 事件名称
         * @param {Function} func 事件函数
         */
        on: function (name, func) {
            if (!this.action[name]) {
                logger.error('modal 无{0}事件'.format(name));
            } else {
                this.action[name].register(func);
            }
        },
        
        /**
         * hide class
         */
        hideCls: function () {
            return this.clsName('hidden');
        },
        
        /**
         * mask hide class
         */
        maskHideCls: function () {
            return this.clsName('mask-hidden');
        },
        
        /**
         * 关闭对话框
         */
        close: function () {
            var me = this;
            $('body').removeAttr('style');
            if (me.supportCss3('animation')) {
                me.animation(me.mask.$element, me.animationCls(['fade', 'leave']));
                me.animation(me.content.$element, me.animationCls(['zoom', 'leave']), function () {
                    me.$element.addClass(me.hideCls());
                });
            } else {
                me.$element.addClass(me.hideCls());
            }
        },
        
        /**
         * 打开对话框
         */
        open: function (origin) {
            var offset;
            var transformOrigin;
            var scrollWidth;
            var me = this;
            me.$element.removeClass(this.hideCls());
            if (me.supportCss3('animation')) {
                scrollWidth = Util.getScrollbarWidth();
                offset = me.content.$element.offset();
                transformOrigin = (origin.left - offset.left) + 'px ' + (origin.top - offset.top) + 'px';
                $('body').attr('style', 'margin-right:' + scrollWidth + 'px; overflow: hidden;');
                me.content.$element.css({ 'transform-origin': transformOrigin });
                me.animation(me.mask.$element, me.animationCls(['fade', 'enter']));
                me.animation(me.content.$element, me.animationCls(['zoom', 'enter']));
            }
        },
        
        /**
         * ui初始化
         * @param {String} _base_ 父类同名方法
         * @param {String} id modal id
         * @param {Object} $element ui jquery对象
         * events:{'click',function($element){}}
         */
        init: function (_base_, id, $element, events) {
            var me = this;
            _base_($element, id);
            //初始化组件元素,为JQuery对象
            me.initElement([
                { selector: 'content' }, 
                { selector: 'mask' }, 
                { selector: 'closeBtn' }, 
                { selector: 'cancelBtn' },
                { selector: 'okBtn' }
            ]);
            //初始化事件
            me.action = {
                click: new Action('close', function () {
                    var _action_ = this;
                    _action_.$target.click(function () {
                        me.close();
                        _action_.piping();
                    });
                }, this.closeBtn.$element),
                cancel: new Action('cancel', function () {
                    var _action_ = this;
                    _action_.$target.click(function () {
                        me.close();
                        _action_.piping();
                    });
                }, this.cancelBtn.$element),
                ok: new Action('ok', function () {
                    var _action_ = this;
                    _action_.$target.click(function () {
                        if (me.$element.hasClass(me.clsName('message'))) {
                            me.close();
                        }
                        _action_.piping();
                    });
                }, this.okBtn.$element)
            };
            me.initEvent(events);
        }
    });
    
    /**
     * dataRole
     */
    var dataRole = '[data-role="' + role + '"]';
    
    /**
     * 自动初始化
     * @param {Object} page页面容器
     */
    Modal.auto = function (page) {
        $.each($('[data-modal'), function (index) {
            var id = $(this).data('modal');
            var modal = new Modal(id, $(UI.ID_PREFIX + id));
            $(this).click(function (e) {
                modal.open($(this).offset());
            });
            page.addElement(modal);
        });
    };
    
    return Modal;

});