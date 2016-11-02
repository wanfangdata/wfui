QUnit.test('wf.ui.checkbox', function (assert) {
    var Checkbox = wf.require('UI.Checkbox');
    var cb = new Checkbox('test', $('[data-role="checkbox"]'), false);
    cb.checked(true);
    cb.on('click', function () {
        console.log('action1');
    });
    cb.on('click', function () {
        console.log('action2');
    });
    assert.ok(true, '_core_');
});