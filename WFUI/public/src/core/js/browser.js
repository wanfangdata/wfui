'use strict';
/**
 * browser core and version
 */
wf.define('browser', '_core_', function (logger) {
    var webkit = /(webkit)\/([\w.]+)/;
    var opera = /(opera)(?:.*version)?[ \/]([\w.]+)/;
    var msie = /(msie) ([\w.]+)/;
    var mozilla = /(mozilla)(?:.*? rv:([\w.]+))?/;
    var browser = {};
    var ua = window.navigator.userAgent;
    var uaMatch = function (ua) {
        ua = ua.toLowerCase();
        
        var match = webkit.exec(ua) 
                    || opera.exec(ua) 
                    || msie.exec(ua) 
                    || ua.indexOf('compatible') < 0 && mozilla.exec(ua) 
                    || [];
        
        return {
            browser : match[1] || '',  
            version : match[2] || '0'
        };
    };
    var browserMatch = uaMatch(ua);
    if (browserMatch.browser) {
        browser[browserMatch.browser] = true;
        browser.version = browserMatch.version;
    }
    return browser;
});