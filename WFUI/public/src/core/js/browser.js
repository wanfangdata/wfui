'use strict';
/**
 * browser core and version
 */
wf.define('browser', '_core_', function (logger) {
    
    var webkit = /(webkit)\/([\w.]+)/,  
        opera = /(opera)(?:.*version)?[ \/]([\w.]+)/,  
        msie = /(msie) ([\w.]+)/,  
        mozilla = /(mozilla)(?:.*? rv:([\w.]+))?/,      
        browser = {},  
        ua = window.navigator.userAgent, 
        uaMatch = function (ua) {
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
        }, 
        browserMatch = uaMatch(ua);
    
    
    if (browserMatch.browser) {
        browser[browserMatch.browser] = true;
        browser.version = browserMatch.version;
    }
    return browser;
});