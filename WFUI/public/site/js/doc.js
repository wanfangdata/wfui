wf.require('page').render(
    'doc', ['UI.Checkbox'], function (components) {
        console.log(this);
        //$(document).pjax('.wf-menu-item a', '.doc-content');
    },true
);