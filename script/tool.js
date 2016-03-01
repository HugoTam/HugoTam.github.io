/**
 * Created by hugotam on 16/3/1.
 */
var TamTool = {
    transformCreateTime: function(time,symbol){
        if(symbol){
            return time.split(".").join(symbol);
        }else{
            return time.split(".").join("");
        }

    },

    isFlashAvailable: function(){
        var hasFlash = false;
        try {
            var fo = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
            if (fo) {
                hasFlash = true;
            }
        } catch (e) {
            if (navigator.mimeTypes
                && navigator.mimeTypes['application/x-shockwave-flash'] != undefined
                && navigator.mimeTypes['application/x-shockwave-flash'].enabledPlugin) {
                hasFlash = true;
            }
        }
        return hasFlash;
    },

    //检测环境
    initENV: function(){
        //简单Cookie工具类
        Cookies = {};
        Cookies.set = function(name,value,days){
            if (days) {
                var date = new Date();
                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                var expires = "; expires=" + date.toGMTString();
            } else {
                var expires = "";
            }
            document.cookie = name + "=" + value + expires + "; path=/";
            this[name] = value;
        };

        Cookies.remove = function(name){
            if(name) document.cookie = name+"=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/"
        };

        Cookies.get = function(name){
            var value = "; " + document.cookie;
            var parts = value.split("; " + name + "=");
            if (parts.length == 2) return parts.pop().split(";").shift();
        };

        (function (window) {
            {
                var unknown = '-';

                // screen
                var screenSize = '';
                if (screen.width) {
                    width = (screen.width) ? screen.width : '';
                    height = (screen.height) ? screen.height : '';
                    screenSize += '' + width + " x " + height;
                }

                //browser
                var nVer = navigator.appVersion;
                var nAgt = navigator.userAgent;
                var browser = navigator.appName;
                var version = '' + parseFloat(navigator.appVersion);
                var majorVersion = parseInt(navigator.appVersion, 10);
                var nameOffset, verOffset, ix;

                // Opera
                if ((verOffset = nAgt.indexOf('Opera')) != -1) {
                    browser = 'Opera';
                    version = nAgt.substring(verOffset + 6);
                    if ((verOffset = nAgt.indexOf('Version')) != -1) {
                        version = nAgt.substring(verOffset + 8);
                    }
                }
                // MSIE
                else if ((verOffset = nAgt.indexOf('MSIE')) != -1) {
                    browser = 'Microsoft Internet Explorer';
                    version = nAgt.substring(verOffset + 5);
                }
                // Chrome
                else if ((verOffset = nAgt.indexOf('Chrome')) != -1) {
                    browser = 'Chrome';
                    version = nAgt.substring(verOffset + 7);
                }
                // Safari
                else if ((verOffset = nAgt.indexOf('Safari')) != -1) {
                    browser = 'Safari';
                    version = nAgt.substring(verOffset + 7);
                    if ((verOffset = nAgt.indexOf('Version')) != -1) {
                        version = nAgt.substring(verOffset + 8);
                    }
                }
                // Firefox
                else if ((verOffset = nAgt.indexOf('Firefox')) != -1) {
                    browser = 'Firefox';
                    version = nAgt.substring(verOffset + 8);
                }
                // MSIE 11+
                else if (nAgt.indexOf('Trident/') != -1) {
                    browser = 'Microsoft Internet Explorer';
                    version = nAgt.substring(nAgt.indexOf('rv:') + 3);
                }
                // Other browsers
                else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) < (verOffset = nAgt.lastIndexOf('/'))) {
                    browser = nAgt.substring(nameOffset, verOffset);
                    version = nAgt.substring(verOffset + 1);
                    if (browser.toLowerCase() == browser.toUpperCase()) {
                        browser = navigator.appName;
                    }
                }
                // trim the version string
                if ((ix = version.indexOf(';')) != -1) version = version.substring(0, ix);
                if ((ix = version.indexOf(' ')) != -1) version = version.substring(0, ix);
                if ((ix = version.indexOf(')')) != -1) version = version.substring(0, ix);

                majorVersion = parseInt('' + version, 10);
                if (isNaN(majorVersion)) {
                    version = '' + parseFloat(navigator.appVersion);
                    majorVersion = parseInt(navigator.appVersion, 10);
                }

                // mobile version
                var mobile = /Mobile|mini|Fennec|Android|iP(ad|od|hone)/.test(nVer);

                // cookie
                var cookieEnabled = (navigator.cookieEnabled) ? true : false;

                if (typeof navigator.cookieEnabled == 'undefined' && !cookieEnabled) {
                    document.cookie = 'testcookie';
                    cookieEnabled = (document.cookie.indexOf('testcookie') != -1) ? true : false;
                }

                // system
                var os = unknown;
                var clientStrings = [
                    {s:'Windows 3.11', r:/Win16/},
                    {s:'Windows 95', r:/(Windows 95|Win95|Windows_95)/},
                    {s:'Windows ME', r:/(Win 9x 4.90|Windows ME)/},
                    {s:'Windows 98', r:/(Windows 98|Win98)/},
                    {s:'Windows CE', r:/Windows CE/},
                    {s:'Windows 2000', r:/(Windows NT 5.0|Windows 2000)/},
                    {s:'Windows XP', r:/(Windows NT 5.1|Windows XP)/},
                    {s:'Windows Server 2003', r:/Windows NT 5.2/},
                    {s:'Windows Vista', r:/Windows NT 6.0/},
                    {s:'Windows 7', r:/(Windows 7|Windows NT 6.1)/},
                    {s:'Windows 8.1', r:/(Windows 8.1|Windows NT 6.3)/},
                    {s:'Windows 8', r:/(Windows 8|Windows NT 6.2)/},
                    {s:'Windows NT 4.0', r:/(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/},
                    {s:'Windows ME', r:/Windows ME/},
                    {s:'Android', r:/Android/},
                    {s:'Open BSD', r:/OpenBSD/},
                    {s:'Sun OS', r:/SunOS/},
                    {s:'Linux', r:/(Linux|X11)/},
                    {s:'iOS', r:/(iPhone|iPad|iPod)/},
                    {s:'Mac OS X', r:/Mac OS X/},
                    {s:'Mac OS', r:/(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/},
                    {s:'QNX', r:/QNX/},
                    {s:'UNIX', r:/UNIX/},
                    {s:'BeOS', r:/BeOS/},
                    {s:'OS/2', r:/OS\/2/},
                    {s:'Search Bot', r:/(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/}
                ];

                for (var id in clientStrings) {
                    var cs = clientStrings[id];
                    if (cs.r.test(nAgt)) {
                        os = cs.s;
                        break;
                    }
                }

                var osVersion = unknown;

                if (/Windows/.test(os)) {
                    osVersion = /Windows (.*)/.exec(os)[1];
                    os = 'Windows';
                }

                switch (os) {
                    case 'Mac OS X':
                        osVersion = /Mac OS X (10[\.\_\d]+)/.exec(nAgt)[1];
                        break;

                    case 'Android':
                        osVersion = /Android ([\.\_\d]+)/.exec(nAgt)[1];
                        break;

                    case 'iOS':
                        osVersion = /OS (\d+)_(\d+)_?(\d+)?/.exec(nVer);
                        osVersion = osVersion[1] + '.' + osVersion[2] + '.' + (osVersion[3] | 0);
                        break;
                }

                // flash (you'll need to include swfobject)
                /* script src="//ajax.googleapis.com/ajax/libs/swfobject/2.2/swfobject.js" */
                var flashVersion = 'no check';
                if (typeof swfobject != 'undefined') {
                    var fv = swfobject.getFlashPlayerVersion();
                    if (fv.major > 0) {
                        flashVersion = fv.major + '.' + fv.minor + ' r' + fv.release;
                    }
                    else  {
                        flashVersion = unknown;
                    }
                }
            }

            window._ENV = {
                screen: screenSize,
                browser: browser,
                browserVersion: version,
                mobile: mobile,
                os: os,
                osVersion: osVersion,
                cookies: cookieEnabled,
                flashVersion: flashVersion,
                flashAvailable: TamTool.isFlashAvailable(),
                device: os+" "+osVersion+" "+browser
            };
        }(window));

        //检测浏览器
        function getBrowserName(){
            var browser = null;

            if(typeof window.chrome != "undefined" && navigator.userAgent.toLowerCase().indexOf("qqbrowser") >= 0){
                return "qq";
            }if(typeof window.safari != "undefined"){
                return "safari";
            }if(typeof window.sogou != "undefined" || (window.external && window.external.Sogou404)){
                return "sogou";
            }if(typeof InstallTrigger != "undefined" || typeof window.scrollMaxX != "undefined"){
                return "firefox";
            }if(navigator.userAgent.toLowerCase().indexOf("opera") >= 0){
                return "opera";
            }else if(browser == "chrome" && window.externalfa){
                var keys = Object.keys(window.external);
                if(keys.length > 0){
                    for(var i=0,len=keys.length; i<len; i++){
                        if(keys[i].toLowerCase().indexOf("liebao") >= 0){
                            return browser = "liebao";
                        }
                    }
                }
            }else if(is360se()){
                return "360se";
            }

            //通过特性检测得到浏览器
            if(typeof window.chrome != "undefined" || navigator.userAgent.toLowerCase().indexOf("chrome") >= 0){
                browser = "chrome";
            }

            //360极速浏览器
            if(browser == "chrome" && window.external && Object.keys(window.external).length > 2){
                browser = "360ee";
            }

            return browser;
        }

        function is360se() {
            if( navigator.userAgent.toLowerCase().indexOf('chrome') > -1 ) {
                var desc = navigator.mimeTypes['application/x-shockwave-flash'].description.toLowerCase();
                if (desc.indexOf('adobe') > -1) {
                    return true;
                }
            }
            return false;
        }

        var $body = $("body");

        //支持触摸设备，需要扩大可点击范围
        if( ("ontouchstart" in window || window.navigator.pointerEnabled || window.navigator.msPointerEnabled) && window._ENV.mobile){
            //enable :active selector
            document.addEventListener("touchstart", function() {},false);
            $body.addClass("touch-device");
        }

        var browserName = getBrowserName();

        /*以类的方式标识用户的浏览环境，如操作系统，移动设备操作系统*/
        if(window._ENV){
            var os_class = window._ENV.os.replace(/[\s|\_]/g,"-").toLowerCase();
            var browser_class = window._ENV.browser.replace(/[\s|\_]/g,"-").toLowerCase();
            if(browserName) window.browser = browserName;
            $body.addClass(os_class+" "+ (browserName || browser_class) );
        }

        if(window.innerWidth < 400){
            $body.addClass("in-sidebar");
        }

        //检测ipad设备
        if((navigator.userAgent.match(/iPad/i) != null)){
            $body.addClass("ipad");
        }

        if('WebkitAppearance' in document.documentElement.style){
            $body.addClass("webkit");
        }


    }
};