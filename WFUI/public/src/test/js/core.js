QUnit.test('wf base', function (assert) {
    wf.define('constant.PI', [], function () {
        return 3.14159;
    });

    wf.define('shape.Circle', ['constant.PI'], function (pi) {
        var Circle = function (r) {
            this.r = r;
        };

        Circle.prototype = {
            area: function () {
                return pi * this.r * this.r;
            }
        }

        return Circle;
    });

    wf.define('shape.Rectangle', [], function () {
        var Rectangle = function (l, w) {
            this.l = l;
            this.w = w;
        };

        Rectangle.prototype = {
            area: function () {
                return this.l * this.w;
            }
        };

        return Rectangle;
    });

    wf.define('ShapeTypes', ['shape.Circle', 'shape.Rectangle'], function (Circle, Rectangle) {
        return {
            CIRCLE: Circle,
            RECTANGLE: Rectangle
        };
    });

    wf.define('ShapeFactory', ['ShapeTypes'], function (ShapeTypes) {

        return {
            getShape: function (type) {
                var shape;

                switch (type) {
                    case 'CIRCLE': {
                        shape = new ShapeTypes[type](arguments[1]);
                        break;
                    }
                    case 'RECTANGLE': {
                        shape = new ShapeTypes[type](arguments[1], arguments[2]);
                        break;
                    }
                }

                return shape;
            }
        };
    });
    var pi = wf.require('constant.PI');
    var ShapeFactory = wf.require('ShapeFactory');
    var cirlceArea = ShapeFactory.getShape('CIRCLE', 5).area();
    var rectangleArea = ShapeFactory.getShape('RECTANGLE', 3, 4).area();
    assert.equal(pi, 3.14159, "module define successed");
    assert.ok(cirlceArea == 78.53975 && rectangleArea == 12, 'module require successed');
});

QUnit.test('wf.cookie', function (assert) {
    var cookie = wf.require('cookie');
    cookie.set('testCookie', 'value');
    assert.equal(cookie.get('testCookie'), 'value', "wf.cookie/get;set;");
});
QUnit.test('wf.logger', function (assert) {
    var logger = wf.require('logger');
    assert.equal(logger.getOutputMode(), 'local', "wf.logger/getOutputMode;");
    logger.setOutputMode('http://www.wanfnagdata.com.cn/log');
    assert.equal(logger.getOutputMode(), 'remote', "wf.logger/setOutputMode;");
    assert.equal(logger.debug('测试debug'), '测试debug', "wf.logger/debug;");
    assert.equal(logger.info('测试info'), '测试info', "wf.logger/info;");
    assert.equal(logger.warn('测试warn'), '测试warn', "wf.logger/warn;");
    assert.equal(logger.error('测试error'), '测试error', "wf.logger/error;");
});
QUnit.test('wf.loader', function (assert) {
    var done = assert.async();
    var loader = wf.require('loader');
    loader.load(['/src/test/js/loaderTest'], function () {
        var loaderTest = wf.require('loaderTest');
        assert.equal(loaderTest, 'loaderTest', "wf.loader/load;");
        done();
    });    
});