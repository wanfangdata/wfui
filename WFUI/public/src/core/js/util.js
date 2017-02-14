'use strict';
/**
 * 事件系统
 */
wf.define('Util', [], function () {
    return {
        /**
         * 获取滚动条宽度
         */
        getScrollbarWidth: function () {
            var outer;
            var inner;
            var widthNoScroll;
            var widthWithScroll;
            outer = document.createElement('div');
            outer.style.visibility = 'hidden';
            outer.style.width = '100px';
            outer.style.msOverflowStyle = 'scrollbar';
            document.body.appendChild(outer);
            widthNoScroll = outer.offsetWidth;
            outer.style.overflow = 'scroll';
            inner = document.createElement('div');
            inner.style.width = '100%';
            outer.appendChild(inner);
            widthWithScroll = inner.offsetWidth;
            outer.parentNode.removeChild(outer);
            return widthNoScroll - widthWithScroll;
        }
    };
});