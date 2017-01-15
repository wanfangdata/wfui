var page = wf.require('page').render(
    'doc', [
        'UI.Checkbox',
        'UI.Radio',
        'UI.Select'
    ], function (components) {
        //$(document).pjax('.wf-menu-item a', '.doc-content');
        var codeFormat = '<pre class="demo-code"><code class="html">{0}</code></pre>';
        $('.page .demo').each(function () {
            $(this).next().after(codeFormat.format($('<div>').text($(this).html()).html()));
        });
        $('.page .section .title .wf-btn,.page .wf-btn-toggleall').click(function () {
            $(this).parent().parent().find('.demo-code').toggle(200);
        });
        $('.doc-content .nav').html((function () {
            var result = [];
            $('.doc-content .section').each(function (i, item) {
                result.push('<a href="#{0}">{1}</a>'.format(
                    $(this).attr('id'), 
                    $(this).find('h1.title .text').html())
                );
            });
            return result.join('');
        })());
        //components.Checkbox.group($('#cbDemoAll'));
        //components.Radio.group($('#rdgroupDemo1'));
    }, true
);