QUnit.test('wf.ui.checkbox', function (assert) {
    var Checkbox = wf.require('UI.Checkbox');
    var cb = new Checkbox('test', $('[data-role="checkbox"]'), false);
    cb.checked(true);
    cb.on('click', function () {

    });
    assert.ok(true, '_core_');
});