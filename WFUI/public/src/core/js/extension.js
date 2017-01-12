'use strict';
/**
 * 兼容和扩展
 */
(function () {
    
    String.prototype.format = function () {
        var source = this;
        if (arguments.length > 0) {
            $.each(arguments, function (i, n) {
                source = source.replace(new RegExp('\\{' + i + '\\}', 'g'), n);
            });
        }
        return source;
    };
    
    String.prototype.empty = function () {
        return '';
    };
    Array.prototype.empty = function () {
        return [];
    };

})();