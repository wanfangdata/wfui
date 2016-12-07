wf.require('page').render(
    'doc', ['UI.Checkbox'], function (components) {
        console.log(this);
        //$(document).pjax('.wf-menu-item a', '.doc-content');
        $('.page .section .title .wf-btn').click(function () {
            $(this).parent().parent().find('pre').toggle(200);
        });
        $('.page .wf-btn-toggleall').click(function () {
            $(this).parent().parent().find('pre').toggle(200);
        });
    },true
);