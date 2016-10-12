'use strict';

wf.define('logger', [], function () {

    /**
     * private
     * 日志级别
     */
    var LogLevel = {
        debug: 0,
        info: 1,
        warn: 2,
        error: 3
    },

    /**
     * private
     * 日志输出位置默认为本地输出
     */
    isLocal = true,

    /**
     * private
     * 日志输出到远程地址
     */
    remoteUrl = '',

    /**
     * private
     * 日志输出到远程地址
     */
    out = function (msg) {

    };

    return {
        setOutPosition: function (url) {
            isLocal = false;

        },
        debug: function (msg) {

        },
        info: function (msg) {

        },
        warn: function (msg) {

        },
        error: function (msg) {

        }
    };
});