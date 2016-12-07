wf.require('page').render(
    'doc', ['UI.Checkbox'], function (components) {
        console.log(this);
        //$(document).pjax('.wf-menu-item a', '.doc-content');
        $('.page .section .title .wf-btn,.page .wf-btn-toggleall').click(function () {
            $(this).parent().parent().find('pre').toggle(200);
        });
        $('.doc-content nav').html((function () {
            var result = [];
            var temp = '<a href="#{0}">{1}</a>';
            $('.doc-content .section').each(function (i,item) { 
                result.push(temp.format($(this).attr('id'), $(this).find('h1.title .text').html()));
            });
            return result.join('');
        })(this));
    },true
);