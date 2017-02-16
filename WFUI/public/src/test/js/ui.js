QUnit.test('wf.ui.checkbox', function (assert) {
    var Checkbox = wf.require('UI.Checkbox');
    var cb = new Checkbox($('[data-role="checkbox"]'), false ,{
        click: function () {
            console.log('init click');
        }
    });
    //cb.checked(true);
    cb.on('click', function () {
        console.log('on click');
    });
    assert.ok(true, 'wf.ui.checkbox');
});