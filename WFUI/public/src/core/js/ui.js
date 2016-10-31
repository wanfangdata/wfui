'use strict';

wf.define('UI', '_core_', function () {
    return wf.inherit({

        name: String.empty,

        $element: Object.empty,
        
        init: function (name,$element) {
            this.name = name;
            this.$element = $element;
        },

        show: function () { 
            this.$element.show();
        },

        hide: function () { 
            this.$element.hide();
        },

        remove: function () { 
            this.$element.remove();
        }

    });
});