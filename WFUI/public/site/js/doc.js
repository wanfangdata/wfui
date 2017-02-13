var page = wf.require('page').render(
    'doc', [
        'UI.Checkbox',
        'UI.Radio',
        'UI.Select',
        'UI.Tab',
        'UI.Alert',
        'UI.Modal'
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
        var copy = function (str) {
            var save = function (e) {
                e.clipboardData.setData('text/plain', str);
                e.preventDefault();
            }
            document.addEventListener('copy', save);
            document.execCommand('copy');
            document.removeEventListener('copy', save);
        };
        var copyTip = function ($item) {
            $item.addClass('copied');
            var timer = setTimeout(function () {
                $item.removeClass('copied');
                clearTimeout(timer);
            }, 1000);
        }
        $('.icon-demo .wf-icons-list li').click(function () {
            copy($(this).find('.wf-icon').attr('class'));
            copyTip($(this));
        });
        //components.Checkbox.group($('#cbDemoAll'));
        //components.Radio.group($('#rdgroupDemo1'));
    }, true
);