var BrowserDetect = {init: function() {
        this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
        this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "an unknown version";
        this.OS = this.searchString(this.dataOS) || "an unknown OS"
    },searchString: function(data) {
        for (var i = 0; i < data.length; i++) {
            var dataString = data[i].string, dataProp = data[i].prop;
            this.versionSearchString = data[i].versionSearch || data[i].identity;
            if (dataString) {
                if (dataString.indexOf(data[i].subString) != -1)
                    return data[i].identity
            } else if (dataProp)
                return data[i].identity
        }
    },searchVersion: function(dataString) {
        var index = dataString.indexOf(this.versionSearchString);
        if (index == -1)
            return;
        return parseFloat(dataString.substring(index + this.versionSearchString.length + 1))
    },dataBrowser: [{string: navigator.userAgent,subString: "Chrome",identity: "Chrome"}, {string: navigator.userAgent,subString: "OmniWeb",versionSearch: "OmniWeb/",identity: "OmniWeb"}, {string: navigator.vendor,subString: "Apple",identity: "Safari",versionSearch: "Version"}, {prop: window.opera,identity: "Opera",versionSearch: "Version"}, {string: navigator.vendor,subString: "iCab",identity: "iCab"}, {string: navigator.vendor,subString: "KDE",identity: "Konqueror"}, {string: navigator.userAgent,subString: "Firefox",identity: "Firefox"}, {string: navigator.vendor,subString: "Camino",identity: "Camino"}, {string: navigator.userAgent,subString: "Netscape",identity: "Netscape"}, {string: navigator.userAgent,subString: "MSIE",identity: "Explorer",versionSearch: "MSIE"}, {string: navigator.userAgent,subString: "Gecko",identity: "Mozilla",versionSearch: "rv"}, {string: navigator.userAgent,subString: "Mozilla",identity: "Netscape",versionSearch: "Mozilla"}],dataOS: [{string: navigator.platform,subString: "Win",identity: "Windows"}, {string: navigator.platform,subString: "Mac",identity: "Mac"}, {string: navigator.userAgent,subString: "iPhone",identity: "iPhone/iPod"}, {string: navigator.platform,subString: "Linux",identity: "Linux"}]};
BrowserDetect.init();
if (typeof JSON !== 'object')
    JSON = {};
(function() {
    'use strict'
    function f(n) {
        return n < 10 ? '0' + n : n
    }
    function this_value() {
        return this.valueOf()
    }
    ;
    if (typeof Date.prototype.toJSON !== 'function') {
        Date.prototype.toJSON = function() {
            return isFinite(this.valueOf()) ? this.getUTCFullYear() + '-' + f(this.getUTCMonth() + 1) + '-' + f(this.getUTCDate()) + 'T' + f(this.getUTCHours()) + ':' + f(this.getUTCMinutes()) + ':' + f(this.getUTCSeconds()) + 'Z' : null
        };
        Boolean.prototype.toJSON = this_value;
        Number.prototype.toJSON = this_value;
        String.prototype.toJSON = this_value
    }
    ;
    var cx, escapable, gap, indent, meta, rep
    function quote(string) {
        escapable.lastIndex = 0;
        return escapable.test(string) ? '"' + string.replace(escapable, function(a) {
            var c = meta[a];
            return typeof c === 'string' ? c : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4)
        }) + '"' : '"' + string + '"'
    }
    function str(key, holder) {
        var i, k, v, length, mind = gap, partial, value = holder[key];
        if (value && typeof value === 'object' && typeof value.toJSON === 'function')
            value = value.toJSON(key);
        if (typeof rep === 'function')
            value = rep.call(holder, key, value);
        switch (typeof value) {
            case 'string':
                return quote(value);
            case 'number':
                return isFinite(value) ? String(value) : 'null';
            case 'boolean':
            case 'null':
                return String(value);
            case 'object':
                if (!value)
                    return 'null';
                gap += indent;
                partial = [];
                if (Object.prototype.toString.apply(value) === '[object Array]') {
                    length = value.length;
                    for (i = 0; i < length; i += 1)
                        partial[i] = str(i, value) || 'null';
                    v = partial.length === 0 ? '[]' : gap ? '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']' : '[' + partial.join(',') + ']';
                    gap = mind;
                    return v
                }
                ;
                if (rep && typeof rep === 'object') {
                    length = rep.length;
                    for (i = 0; i < length; i += 1)
                        if (typeof rep[i] === 'string') {
                            k = rep[i];
                            v = str(k, value);
                            if (v)
                                partial.push(quote(k) + (gap ? ': ' : ':') + v)
                        }
                } else
                    for (k in value)
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = str(k, value);
                            if (v)
                                partial.push(quote(k) + (gap ? ': ' : ':') + v)
                        }
                ;
                v = partial.length === 0 ? '{}' : gap ? '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}' : '{' + partial.join(',') + '}';
                gap = mind;
                return v
        }
    }
    ;
    if (typeof JSON.stringify !== 'function') {
        escapable = /[\\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
        meta = {'\b': '\\b','\t': '\\t','\n': '\\n','\f': '\\f','\r': '\\r','"': '\\"','\\': '\\\\'};
        JSON.stringify = function(value, replacer, space) {
            var i;
            gap = '';
            indent = '';
            if (typeof space === 'number') {
                for (i = 0; i < space; i += 1)
                    indent += ' '
            } else if (typeof space === 'string')
                indent = space;
            rep = replacer;
            if (replacer && typeof replacer !== 'function' && (typeof replacer !== 'object' || typeof replacer.length !== 'number'))
                throw new Error('JSON.stringify');
            return str('', {'': value})
        }
    }
    ;
    if (typeof JSON.parse !== 'function') {
        cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
        JSON.parse = function(text, reviver) {
            var j
            function walk(holder, key) {
                var k, v, value = holder[key];
                if (value && typeof value === 'object')
                    for (k in value)
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v
                            } else
                                delete value[k]
                        }
                ;
                return reviver.call(holder, key, value)
            }
            ;
            text = String(text);
            cx.lastIndex = 0;
            if (cx.test(text))
                text = text.replace(cx, function(a) {
                    return '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4)
                });
            if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
                j = eval('(' + text + ')');
                return typeof reviver === 'function' ? walk({'': j}, '') : j
            }
            ;
            throw new SyntaxError('JSON.parse')
        }
    }
}());
(function($, document, undefined) {
    var pluses = /\+/g
    function raw(s) {
        return s
    }
    function decoded(s) {
        return decodeURIComponent(s.replace(pluses, ' '))
    }
    ;
    var config = $.cookie = function(key, value, options) {
        if (value !== undefined) {
            options = $.extend({}, config.defaults, options);
            if (value === null)
                options.expires = -1;
            if (typeof options.expires === 'number') {
                var ms = options.expires, t = options.expires = new Date();
                t.setTime(t.getTime() + ms)
            }
            ;
            value = config.json ? JSON.stringify(value) : String(value);
            return (document.cookie = [encodeURIComponent(key), '=', config.raw ? value : encodeURIComponent(value), options.expires ? '; expires=' + options.expires.toUTCString() : '', options.path ? '; path=' + options.path : '', options.domain ? '; domain=' + options.domain : '', options.secure ? '; secure' : ''].join(''))
        }
        ;
        var decode = config.raw ? raw : decoded, cookies = document.cookie.split('; ');
        for (var i = 0, l = cookies.length; i < l; i++) {
            var parts = cookies[i].split('=');
            if (decode(parts.shift()) === key) {
                var cookie = decode(parts.join('='));
                return config.json ? JSON.parse(cookie) : cookie
            }
        }
        ;
        return null
    };
    config.defaults = {};
    $.removeCookie = function(key, options) {
        if ($.cookie(key) !== null) {
            $.cookie(key, null, options);
            return true
        }
        ;
        return false
    }
})($, document);
(function($) {
    var hexcase = 0, b64pad = '', chrsz = 8, mode = 32
    function hex_md5(s) {
        return binl2hex(core_md5(str2binl(s), s.length * chrsz))
    }
    function b64_md5(s) {
        return binl2b64(core_md5(str2binl(s), s.length * chrsz))
    }
    function str_md5(s) {
        return binl2str(core_md5(str2binl(s), s.length * chrsz))
    }
    function hex_hmac_md5(key, data) {
        return binl2hex(core_hmac_md5(key, data))
    }
    function b64_hmac_md5(key, data) {
        return binl2b64(core_hmac_md5(key, data))
    }
    function str_hmac_md5(key, data) {
        return binl2str(core_hmac_md5(key, data))
    }
    function core_md5(x, len) {
        x[len >> 5] |= 0x80 << (len % 32);
        x[(((len + 64) >>> 9) << 4) + 14] = len;
        var a = 1732584193, b = -271733879, c = -1732584194, d = 271733878;
        for (var i = 0; i < x.length; i += 16) {
            var olda = a, oldb = b, oldc = c, oldd = d;
            a = md5_ff(a, b, c, d, x[i + 0], 7, -680876936);
            d = md5_ff(d, a, b, c, x[i + 1], 12, -389564586);
            c = md5_ff(c, d, a, b, x[i + 2], 17, 606105819);
            b = md5_ff(b, c, d, a, x[i + 3], 22, -1044525330);
            a = md5_ff(a, b, c, d, x[i + 4], 7, -176418897);
            d = md5_ff(d, a, b, c, x[i + 5], 12, 1200080426);
            c = md5_ff(c, d, a, b, x[i + 6], 17, -1473231341);
            b = md5_ff(b, c, d, a, x[i + 7], 22, -45705983);
            a = md5_ff(a, b, c, d, x[i + 8], 7, 1770035416);
            d = md5_ff(d, a, b, c, x[i + 9], 12, -1958414417);
            c = md5_ff(c, d, a, b, x[i + 10], 17, -42063);
            b = md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
            a = md5_ff(a, b, c, d, x[i + 12], 7, 1804603682);
            d = md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
            c = md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
            b = md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);
            a = md5_gg(a, b, c, d, x[i + 1], 5, -165796510);
            d = md5_gg(d, a, b, c, x[i + 6], 9, -1069501632);
            c = md5_gg(c, d, a, b, x[i + 11], 14, 643717713);
            b = md5_gg(b, c, d, a, x[i + 0], 20, -373897302);
            a = md5_gg(a, b, c, d, x[i + 5], 5, -701558691);
            d = md5_gg(d, a, b, c, x[i + 10], 9, 38016083);
            c = md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
            b = md5_gg(b, c, d, a, x[i + 4], 20, -405537848);
            a = md5_gg(a, b, c, d, x[i + 9], 5, 568446438);
            d = md5_gg(d, a, b, c, x[i + 14], 9, -1019803690);
            c = md5_gg(c, d, a, b, x[i + 3], 14, -187363961);
            b = md5_gg(b, c, d, a, x[i + 8], 20, 1163531501);
            a = md5_gg(a, b, c, d, x[i + 13], 5, -1444681467);
            d = md5_gg(d, a, b, c, x[i + 2], 9, -51403784);
            c = md5_gg(c, d, a, b, x[i + 7], 14, 1735328473);
            b = md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);
            a = md5_hh(a, b, c, d, x[i + 5], 4, -378558);
            d = md5_hh(d, a, b, c, x[i + 8], 11, -2022574463);
            c = md5_hh(c, d, a, b, x[i + 11], 16, 1839030562);
            b = md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
            a = md5_hh(a, b, c, d, x[i + 1], 4, -1530992060);
            d = md5_hh(d, a, b, c, x[i + 4], 11, 1272893353);
            c = md5_hh(c, d, a, b, x[i + 7], 16, -155497632);
            b = md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
            a = md5_hh(a, b, c, d, x[i + 13], 4, 681279174);
            d = md5_hh(d, a, b, c, x[i + 0], 11, -358537222);
            c = md5_hh(c, d, a, b, x[i + 3], 16, -722521979);
            b = md5_hh(b, c, d, a, x[i + 6], 23, 76029189);
            a = md5_hh(a, b, c, d, x[i + 9], 4, -640364487);
            d = md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
            c = md5_hh(c, d, a, b, x[i + 15], 16, 530742520);
            b = md5_hh(b, c, d, a, x[i + 2], 23, -995338651);
            a = md5_ii(a, b, c, d, x[i + 0], 6, -198630844);
            d = md5_ii(d, a, b, c, x[i + 7], 10, 1126891415);
            c = md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
            b = md5_ii(b, c, d, a, x[i + 5], 21, -57434055);
            a = md5_ii(a, b, c, d, x[i + 12], 6, 1700485571);
            d = md5_ii(d, a, b, c, x[i + 3], 10, -1894986606);
            c = md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
            b = md5_ii(b, c, d, a, x[i + 1], 21, -2054922799);
            a = md5_ii(a, b, c, d, x[i + 8], 6, 1873313359);
            d = md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
            c = md5_ii(c, d, a, b, x[i + 6], 15, -1560198380);
            b = md5_ii(b, c, d, a, x[i + 13], 21, 1309151649);
            a = md5_ii(a, b, c, d, x[i + 4], 6, -145523070);
            d = md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
            c = md5_ii(c, d, a, b, x[i + 2], 15, 718787259);
            b = md5_ii(b, c, d, a, x[i + 9], 21, -343485551);
            a = safe_add(a, olda);
            b = safe_add(b, oldb);
            c = safe_add(c, oldc);
            d = safe_add(d, oldd)
        }
        ;
        if (mode == 16) {
            return Array(b, c)
        } else
            return Array(a, b, c, d)
    }
    function md5_cmn(q, a, b, x, s, t) {
        return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b)
    }
    function md5_ff(a, b, c, d, x, s, t) {
        return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t)
    }
    function md5_gg(a, b, c, d, x, s, t) {
        return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t)
    }
    function md5_hh(a, b, c, d, x, s, t) {
        return md5_cmn(b ^ c ^ d, a, b, x, s, t)
    }
    function md5_ii(a, b, c, d, x, s, t) {
        return md5_cmn(c ^ (b | (~d)), a, b, x, s, t)
    }
    function core_hmac_md5(key, data) {
        var bkey = str2binl(key);
        if (bkey.length > 16)
            bkey = core_md5(bkey, key.length * chrsz);
        var ipad = Array(16), opad = Array(16);
        for (var i = 0; i < 16; i++) {
            ipad[i] = bkey[i] ^ 0x36363636;
            opad[i] = bkey[i] ^ 0x5C5C5C5C
        }
        ;
        var hash = core_md5(ipad.concat(str2binl(data)), 512 + data.length * chrsz);
        return core_md5(opad.concat(hash), 512 + 128)
    }
    function safe_add(x, y) {
        var lsw = (x & 0xFFFF) + (y & 0xFFFF), msw = (x >> 16) + (y >> 16) + (lsw >> 16);
        return (msw << 16) | (lsw & 0xFFFF)
    }
    function bit_rol(num, cnt) {
        return (num << cnt) | (num >>> (32 - cnt))
    }
    function str2binl(str) {
        var bin = Array(), mask = (1 << chrsz) - 1;
        for (var i = 0; i < str.length * chrsz; i += chrsz)
            bin[i >> 5] |= (str.charCodeAt(i / chrsz) & mask) << (i % 32);
        return bin
    }
    function binl2str(bin) {
        var str = "", mask = (1 << chrsz) - 1;
        for (var i = 0; i < bin.length * 32; i += chrsz)
            str += String.fromCharCode((bin[i >> 5] >>> (i % 32)) & mask);
        return str
    }
    function binl2hex(binarray) {
        var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef", str = "";
        for (var i = 0; i < binarray.length * 4; i++)
            str += hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8 + 4)) & 0xF) + hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8)) & 0xF);
        return str
    }
    function binl2b64(binarray) {
        var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", str = "";
        for (var i = 0; i < binarray.length * 4; i += 3) {
            var triplet = (((binarray[i >> 2] >> 8 * (i % 4)) & 0xFF) << 16) | (((binarray[i + 1 >> 2] >> 8 * ((i + 1) % 4)) & 0xFF) << 8) | ((binarray[i + 2 >> 2] >> 8 * ((i + 2) % 4)) & 0xFF);
            for (var j = 0; j < 4; j++)
                if (i * 8 + j * 6 > binarray.length * 32) {
                    str += b64pad
                } else
                    str += tab.charAt((triplet >> 6 * (3 - j)) & 0x3F)
        }
        ;
        return str
    }
    function _md5(s) {
        return hex_md5(s)
    }
    function _getAntiCSRFToken(objConfig) {
        objConfig = objConfig || {};
        var skey = objConfig.skey || $.cookie("skey") || '', md5str = _md5(skey);
        return md5str
    }
    ;
    $.extend($, {getAntiCSRFToken: _getAntiCSRFToken,md5: _md5})
})($);
(function($, window, document, undefined) {
    var $window = $(window);
    $.fn.lazyload = function(options) {
        var elements = this, $container, settings = {threshold: 0,failure_limit: 0,event: "scroll",effect: "show",container: window,data_attribute: "original",class_name: 'g-lazy',skip_invisible: true,appear: null,load: null,placeholder: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC"}
        function update() {
            var counter = 0;
            elements.each(function() {
                var $this = $(this);
                if (settings.skip_invisible && !$this.is(":visible"))
                    return;
                if ($.abovethetop(this, settings) || $.leftofbegin(this, settings))
                    ;
                else if (!$.belowthefold(this, settings) && !$.rightoffold(this, settings)) {
                    $this.trigger("appear");
                    counter = 0
                } else if (++counter > settings.failure_limit)
                    return false
            })
        }
        ;
        if (options) {
            if (undefined !== options.failurelimit) {
                options.failure_limit = options.failurelimit;
                delete options.failurelimit
            }
            ;
            if (undefined !== options.effectspeed) {
                options.effect_speed = options.effectspeed;
                delete options.effectspeed
            }
            ;
            $.extend(settings, options)
        }
        ;
        $container = (settings.container === undefined || settings.container === window) ? $window : $(settings.container);
        if (0 === settings.event.indexOf("scroll"))
            $container.bind(settings.event, function() {
                return update()
            });
        this.each(function() {
            var self = this, $self = $(self);
            self.loaded = false;
            if ($self.attr("src") === undefined || $self.attr("src") === false)
                $self.attr("src", settings.placeholder);
            $self.one("appear", function() {
                if (!this.loaded) {
                    if (settings.appear) {
                        var elements_left = elements.length;
                        settings.appear.call(self, elements_left, settings)
                    }
                    ;
                    $("<img />").bind("load", function() {
                        var original = $self.data(settings.data_attribute);
                        $self.hide();
                        if ($self.is("img")) {
                            $self.attr("src", original);
                            $self.css("background-image", "none");
                            $self.removeClass(settings.class_name)
                        } else
                            $self.css("background-image", "url('" + original + "')");
                        $self[settings.effect](settings.effect_speed);
                        self.loaded = true;
                        var temp = $.grep(elements, function(element) {
                            return !element.loaded
                        });
                        elements = $(temp);
                        if (settings.load) {
                            var elements_left = elements.length;
                            settings.load.call(self, elements_left, settings)
                        }
                    }).attr("src", $self.data(settings.data_attribute))
                }
            });
            if (0 !== settings.event.indexOf("scroll"))
                $self.bind(settings.event, function() {
                    if (!self.loaded)
                        $self.trigger("appear")
                })
        });
        $window.bind("resize", function() {
            update()
        });
        if (/iphone|ipod|ipad.*os 5/gi.test(navigator.appVersion))
            $window.bind("pageshow", function(event) {
                if (event.originalEvent && event.originalEvent.persisted)
                    elements.each(function() {
                        $(this).trigger("appear")
                    })
            });
        $(document).ready(function() {
            update()
        });
        return this
    };
    $.belowthefold = function(element, settings) {
        var fold;
        if (settings.container === undefined || settings.container === window) {
            fold = (window.innerHeight ? window.innerHeight : $window.height()) + $window.scrollTop()
        } else
            fold = $(settings.container).offset().top + $(settings.container).height();
        return fold <= $(element).offset().top - settings.threshold
    };
    $.rightoffold = function(element, settings) {
        var fold;
        if (settings.container === undefined || settings.container === window) {
            fold = $window.width() + $window.scrollLeft()
        } else
            fold = $(settings.container).offset().left + $(settings.container).width();
        return fold <= $(element).offset().left - settings.threshold
    };
    $.abovethetop = function(element, settings) {
        var fold;
        if (settings.container === undefined || settings.container === window) {
            fold = $window.scrollTop()
        } else
            fold = $(settings.container).offset().top;
        return fold >= $(element).offset().top + settings.threshold + $(element).height()
    };
    $.leftofbegin = function(element, settings) {
        var fold;
        if (settings.container === undefined || settings.container === window) {
            fold = $window.scrollLeft()
        } else
            fold = $(settings.container).offset().left;
        return fold >= $(element).offset().left + settings.threshold + $(element).width()
    };
    $.inviewport = function(element, settings) {
        return !$.rightoffold(element, settings) && !$.leftofbegin(element, settings) && !$.belowthefold(element, settings) && !$.abovethetop(element, settings)
    };
    $.extend($.expr[":"], {"below-the-fold": function(a) {
            return $.belowthefold(a, {threshold: 0})
        },"above-the-top": function(a) {
            return !$.belowthefold(a, {threshold: 0})
        },"right-of-screen": function(a) {
            return $.rightoffold(a, {threshold: 0})
        },"left-of-screen": function(a) {
            return !$.rightoffold(a, {threshold: 0})
        },"in-viewport": function(a) {
            return $.inviewport(a, {threshold: 0})
        },"above-the-fold": function(a) {
            return !$.belowthefold(a, {threshold: 0})
        },"right-of-fold": function(a) {
            return $.rightoffold(a, {threshold: 0})
        },"left-of-fold": function(a) {
            return !$.rightoffold(a, {threshold: 0})
        }})
})($, window, document);
(function($, h, c) {
    var a = $([]), e = $.resize = $.extend($.resize, {}), i, k = "setTimeout", j = "resize", d = j + "-special-event", b = "delay", f = "throttleWindow";
    e[b] = 250;
    e[f] = true;
    $.event.special[j] = {setup: function() {
            if (!e[f] && this[k])
                return false;
            var l = $(this);
            a = a.add(l);
            $.data(this, d, {w: l.width(),h: l.height()});
            if (a.length === 1)
                g()
        },teardown: function() {
            if (!e[f] && this[k])
                return false;
            var l = $(this);
            a = a.not(l);
            l.removeData(d);
            if (!a.length)
                clearTimeout(i)
        },add: function(l) {
            if (!e[f] && this[k])
                return false;
            var n
            function m(s, o, p) {
                var q = $(this), r = $.data(this, d);
                r.w = o !== c ? o : q.width();
                r.h = p !== c ? p : q.height();
                n.apply(this, arguments)
            }
            ;
            if ($.isFunction(l)) {
                n = l;
                return m
            } else {
                n = l.handler;
                l.handler = m
            }
        }}
    function g() {
        i = h[k](function() {
            a.each(function() {
                var n = $(this), m = n.width(), l = n.height(), o = $.data(this, d);
                if (m !== o.w || l !== o.h)
                    n.trigger(j, [o.w = m, o.h = l])
            });
            g()
        }, e[b])
    }
})(jQuery, this);
Date.CultureInfo = {name: "en-US",englishName: "English (United States)",nativeName: "English (United States)",dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],abbreviatedDayNames: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],shortestDayNames: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],firstLetterDayNames: ["S", "M", "T", "W", "T", "F", "S"],monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],abbreviatedMonthNames: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],amDesignator: "AM",pmDesignator: "PM",firstDayOfWeek: 0,twoDigitYearMax: 2029,dateElementOrder: "mdy",formatPatterns: {shortDate: "M/d/yyyy",longDate: "dddd, MMMM dd, yyyy",shortTime: "h:mm tt",longTime: "h:mm:ss tt",fullDateTime: "dddd, MMMM dd, yyyy h:mm:ss tt",sortableDateTime: "yyyy-MM-ddTHH:mm:ss",universalSortableDateTime: "yyyy-MM-dd HH:mm:ssZ",rfc1123: "ddd, dd MMM yyyy HH:mm:ss GMT",monthDay: "MMMM dd",yearMonth: "MMMM, yyyy"},regexPatterns: {jan: /^jan(uary)?/i,feb: /^feb(ruary)?/i,mar: /^mar(ch)?/i,apr: /^apr(il)?/i,may: /^may/i,jun: /^jun(e)?/i,jul: /^jul(y)?/i,aug: /^aug(ust)?/i,sep: /^sep(t(ember)?)?/i,oct: /^oct(ober)?/i,nov: /^nov(ember)?/i,dec: /^dec(ember)?/i,sun: /^su(n(day)?)?/i,mon: /^mo(n(day)?)?/i,tue: /^tu(e(s(day)?)?)?/i,wed: /^we(d(nesday)?)?/i,thu: /^th(u(r(s(day)?)?)?)?/i,fri: /^fr(i(day)?)?/i,sat: /^sa(t(urday)?)?/i,future: /^next/i,past: /^last|past|prev(ious)?/i,add: /^(\+|after|from)/i,subtract: /^(\-|before|ago)/i,yesterday: /^yesterday/i,today: /^t(oday)?/i,tomorrow: /^tomorrow/i,now: /^n(ow)?/i,millisecond: /^ms|milli(second)?s?/i,second: /^sec(ond)?s?/i,minute: /^min(ute)?s?/i,hour: /^h(ou)?rs?/i,week: /^w(ee)?k/i,month: /^m(o(nth)?s?)?/i,day: /^d(ays?)?/i,year: /^y((ea)?rs?)?/i,shortMeridian: /^(a|p)/i,longMeridian: /^(a\.?m?\.?|p\.?m?\.?)/i,timezone: /^((e(s|d)t|c(s|d)t|m(s|d)t|p(s|d)t)|((gmt)?\s*(\+|\-)\s*\d\d\d\d?)|gmt)/i,ordinalSuffix: /^\s*(st|nd|rd|th)/i,timeContext: /^\s*(\:|a|p)/i},abbreviatedTimeZoneStandard: {GMT: "-000",EST: "-0400",CST: "-0500",MST: "-0600",PST: "-0700"},abbreviatedTimeZoneDST: {GMT: "-000",EDT: "-0500",CDT: "-0600",MDT: "-0700",PDT: "-0800"}};
Date.getMonthNumberFromName = function(name) {
    var n = Date.CultureInfo.monthNames, m = Date.CultureInfo.abbreviatedMonthNames, s = name.toLowerCase();
    for (var i = 0; i < n.length; i++)
        if (n[i].toLowerCase() == s || m[i].toLowerCase() == s)
            return i;
    return -1
};
Date.getDayNumberFromName = function(name) {
    var n = Date.CultureInfo.dayNames, m = Date.CultureInfo.abbreviatedDayNames, o = Date.CultureInfo.shortestDayNames, s = name.toLowerCase();
    for (var i = 0; i < n.length; i++)
        if (n[i].toLowerCase() == s || m[i].toLowerCase() == s)
            return i;
    return -1
};
Date.isLeapYear = function(year) {
    return (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0))
};
Date.getDaysInMonth = function(year, month) {
    return [31, (Date.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month]
};
Date.getTimezoneOffset = function(s, dst) {
    return (dst || false) ? Date.CultureInfo.abbreviatedTimeZoneDST[s.toUpperCase()] : Date.CultureInfo.abbreviatedTimeZoneStandard[s.toUpperCase()]
};
Date.getTimezoneAbbreviation = function(offset, dst) {
    var n = (dst || false) ? Date.CultureInfo.abbreviatedTimeZoneDST : Date.CultureInfo.abbreviatedTimeZoneStandard, p;
    for (p in n)
        if (n[p] === offset)
            return p;
    return null
};
Date.prototype.clone = function() {
    return new Date(this.getTime())
};
Date.prototype.compareTo = function(date) {
    if (isNaN(this))
        throw new Error(this);
    if (date instanceof Date && !isNaN(date)) {
        return (this > date) ? 1 : (this < date) ? -1 : 0
    } else
        throw new TypeError(date)
};
Date.prototype.equals = function(date) {
    return (this.compareTo(date) === 0)
};
Date.prototype.between = function(start, end) {
    var t = this.getTime();
    return t >= start.getTime() && t <= end.getTime()
};
Date.prototype.addMilliseconds = function(value) {
    this.setMilliseconds(this.getMilliseconds() + value);
    return this
};
Date.prototype.addSeconds = function(value) {
    return this.addMilliseconds(value * 1e3)
};
Date.prototype.addMinutes = function(value) {
    return this.addMilliseconds(value * 6e4)
};
Date.prototype.addHours = function(value) {
    return this.addMilliseconds(value * 36e5)
};
Date.prototype.addDays = function(value) {
    return this.addMilliseconds(value * 864e5)
};
Date.prototype.addWeeks = function(value) {
    return this.addMilliseconds(value * 604800000)
};
Date.prototype.addMonths = function(value) {
    var n = this.getDate();
    this.setDate(1);
    this.setMonth(this.getMonth() + value);
    this.setDate(Math.min(n, this.getDaysInMonth()));
    return this
};
Date.prototype.addYears = function(value) {
    return this.addMonths(value * 12)
};
Date.prototype.add = function(config) {
    if (typeof config == "number") {
        this._orient = config;
        return this
    }
    ;
    var x = config;
    if (x.millisecond || x.milliseconds)
        this.addMilliseconds(x.millisecond || x.milliseconds);
    if (x.second || x.seconds)
        this.addSeconds(x.second || x.seconds);
    if (x.minute || x.minutes)
        this.addMinutes(x.minute || x.minutes);
    if (x.hour || x.hours)
        this.addHours(x.hour || x.hours);
    if (x.month || x.months)
        this.addMonths(x.month || x.months);
    if (x.year || x.years)
        this.addYears(x.year || x.years);
    if (x.day || x.days)
        this.addDays(x.day || x.days);
    return this
};
Date._validate = function(value, min, max, name) {
    if (typeof value != "number") {
        throw new TypeError(value + " is not a Number.")
    } else if (value < min || value > max)
        throw new RangeError(value + " is not a valid value for " + name + ".");
    return true
};
Date.validateMillisecond = function(n) {
    return Date._validate(n, 0, 999, "milliseconds")
};
Date.validateSecond = function(n) {
    return Date._validate(n, 0, 59, "seconds")
};
Date.validateMinute = function(n) {
    return Date._validate(n, 0, 59, "minutes")
};
Date.validateHour = function(n) {
    return Date._validate(n, 0, 23, "hours")
};
Date.validateDay = function(n, year, month) {
    return Date._validate(n, 1, Date.getDaysInMonth(year, month), "days")
};
Date.validateMonth = function(n) {
    return Date._validate(n, 0, 11, "months")
};
Date.validateYear = function(n) {
    return Date._validate(n, 1, 9999, "seconds")
};
Date.prototype.set = function(config) {
    var x = config;
    if (!x.millisecond && x.millisecond !== 0)
        x.millisecond = -1;
    if (!x.second && x.second !== 0)
        x.second = -1;
    if (!x.minute && x.minute !== 0)
        x.minute = -1;
    if (!x.hour && x.hour !== 0)
        x.hour = -1;
    if (!x.day && x.day !== 0)
        x.day = -1;
    if (!x.month && x.month !== 0)
        x.month = -1;
    if (!x.year && x.year !== 0)
        x.year = -1;
    if (x.millisecond != -1 && Date.validateMillisecond(x.millisecond))
        this.addMilliseconds(x.millisecond - this.getMilliseconds());
    if (x.second != -1 && Date.validateSecond(x.second))
        this.addSeconds(x.second - this.getSeconds());
    if (x.minute != -1 && Date.validateMinute(x.minute))
        this.addMinutes(x.minute - this.getMinutes());
    if (x.hour != -1 && Date.validateHour(x.hour))
        this.addHours(x.hour - this.getHours());
    if (x.month !== -1 && Date.validateMonth(x.month))
        this.addMonths(x.month - this.getMonth());
    if (x.year != -1 && Date.validateYear(x.year))
        this.addYears(x.year - this.getFullYear());
    if (x.day != -1 && Date.validateDay(x.day, this.getFullYear(), this.getMonth()))
        this.addDays(x.day - this.getDate());
    if (x.timezone)
        this.setTimezone(x.timezone);
    if (x.timezoneOffset)
        this.setTimezoneOffset(x.timezoneOffset);
    return this
};
Date.prototype.clearTime = function() {
    this.setHours(0);
    this.setMinutes(0);
    this.setSeconds(0);
    this.setMilliseconds(0);
    return this
};
Date.prototype.isLeapYear = function() {
    var y = this.getFullYear();
    return (((y % 4 === 0) && (y % 100 !== 0)) || (y % 400 === 0))
};
Date.prototype.isWeekday = function() {
    return !(this.is().sat() || this.is().sun())
};
Date.prototype.getDaysInMonth = function() {
    return Date.getDaysInMonth(this.getFullYear(), this.getMonth())
};
Date.prototype.moveToFirstDayOfMonth = function() {
    return this.set({day: 1})
};
Date.prototype.moveToLastDayOfMonth = function() {
    return this.set({day: this.getDaysInMonth()})
};
Date.prototype.moveToDayOfWeek = function(day, orient) {
    var diff = (day - this.getDay() + 7 * (orient || +1)) % 7;
    return this.addDays((diff === 0) ? diff += 7 * (orient || +1) : diff)
};
Date.prototype.moveToMonth = function(month, orient) {
    var diff = (month - this.getMonth() + 12 * (orient || +1)) % 12;
    return this.addMonths((diff === 0) ? diff += 12 * (orient || +1) : diff)
};
Date.prototype.getDayOfYear = function() {
    return Math.floor((this - new Date(this.getFullYear(), 0, 1)) / 864e5)
};
Date.prototype.getWeekOfYear = function(firstDayOfWeek) {
    var y = this.getFullYear(), m = this.getMonth(), d = this.getDate(), dow = firstDayOfWeek || Date.CultureInfo.firstDayOfWeek, offset = 7 + 1 - new Date(y, 0, 1).getDay();
    if (offset == 8)
        offset = 1;
    var daynum = ((Date.UTC(y, m, d, 0, 0, 0) - Date.UTC(y, 0, 1, 0, 0, 0)) / 864e5) + 1, w = Math.floor((daynum - offset + 7) / 7);
    if (w === dow) {
        y--;
        var prevOffset = 7 + 1 - new Date(y, 0, 1).getDay();
        if (prevOffset == 2 || prevOffset == 8) {
            w = 53
        } else
            w = 52
    }
    ;
    return w
};
Date.prototype.isDST = function() {
    console.log('isDST');
    return this.toString().match(/(E|C|M|P)(S|D)T/)[2] == "D"
};
Date.prototype.getTimezone = function() {
    return Date.getTimezoneAbbreviation(this.getUTCOffset, this.isDST())
};
Date.prototype.setTimezoneOffset = function(s) {
    var here = this.getTimezoneOffset(), there = Number(s) * -6 / 10;
    this.addMinutes(there - here);
    return this
};
Date.prototype.setTimezone = function(s) {
    return this.setTimezoneOffset(Date.getTimezoneOffset(s))
};
Date.prototype.getUTCOffset = function() {
    var n = this.getTimezoneOffset() * -10 / 6, r;
    if (n < 0) {
        r = (n - 1e4).toString();
        return r[0] + r.substr(2)
    } else {
        r = (n + 1e4).toString();
        return "+" + r.substr(1)
    }
};
Date.prototype.getDayName = function(abbrev) {
    return abbrev ? Date.CultureInfo.abbreviatedDayNames[this.getDay()] : Date.CultureInfo.dayNames[this.getDay()]
};
Date.prototype.getMonthName = function(abbrev) {
    return abbrev ? Date.CultureInfo.abbreviatedMonthNames[this.getMonth()] : Date.CultureInfo.monthNames[this.getMonth()]
};
Date.prototype._toString = Date.prototype.toString;
Date.prototype.toString = function(format) {
    var self = this, p = function p(s) {
        return (s.toString().length == 1) ? "0" + s : s
    };
    return format ? format.replace(/dd?d?d?|MM?M?M?|yy?y?y?|hh?|HH?|mm?|ss?|tt?|zz?z?/g, function(format) {
        switch (format) {
            case "hh":
                return p(self.getHours() < 13 ? self.getHours() : (self.getHours() - 12));
            case "h":
                return self.getHours() < 13 ? self.getHours() : (self.getHours() - 12);
            case "HH":
                return p(self.getHours());
            case "H":
                return self.getHours();
            case "mm":
                return p(self.getMinutes());
            case "m":
                return self.getMinutes();
            case "ss":
                return p(self.getSeconds());
            case "s":
                return self.getSeconds();
            case "yyyy":
                return self.getFullYear();
            case "yy":
                return self.getFullYear().toString().substring(2, 4);
            case "dddd":
                return self.getDayName();
            case "ddd":
                return self.getDayName(true);
            case "dd":
                return p(self.getDate());
            case "d":
                return self.getDate().toString();
            case "MMMM":
                return self.getMonthName();
            case "MMM":
                return self.getMonthName(true);
            case "MM":
                return p((self.getMonth() + 1));
            case "M":
                return self.getMonth() + 1;
            case "t":
                return self.getHours() < 12 ? Date.CultureInfo.amDesignator.substring(0, 1) : Date.CultureInfo.pmDesignator.substring(0, 1);
            case "tt":
                return self.getHours() < 12 ? Date.CultureInfo.amDesignator : Date.CultureInfo.pmDesignator;
            case "zzz":
            case "zz":
            case "z":
                return ""
        }
    }) : this._toString()
};
Date.now = function() {
    return new Date()
};
Date.today = function() {
    return Date.now().clearTime()
};
Date.prototype._orient = +1;
Date.prototype.next = function() {
    this._orient = +1;
    return this
};
Date.prototype.last = Date.prototype.prev = Date.prototype.previous = function() {
    this._orient = -1;
    return this
};
Date.prototype._is = false;
Date.prototype.is = function() {
    this._is = true;
    return this
};
Number.prototype._dateElement = "day";
Number.prototype.fromNow = function() {
    var c = {};
    c[this._dateElement] = this;
    return Date.now().add(c)
};
Number.prototype.ago = function() {
    var c = {};
    c[this._dateElement] = this * -1;
    return Date.now().add(c)
};
(function() {
    var $D = Date.prototype, $N = Number.prototype, dx = "sunday monday tuesday wednesday thursday friday saturday".split(/\s/), mx = "january february march april may june july august september october november december".split(/\s/), px = "Millisecond Second Minute Hour Day Week Month Year".split(/\s/), de, df = function(n) {
        return function() {
            if (this._is) {
                this._is = false;
                return this.getDay() == n
            }
            ;
            return this.moveToDayOfWeek(n, this._orient)
        }
    };
    for (var i = 0; i < dx.length; i++)
        $D[dx[i]] = $D[dx[i].substring(0, 3)] = df(i);
    var mf = function(n) {
        return function() {
            if (this._is) {
                this._is = false;
                return this.getMonth() === n
            }
            ;
            return this.moveToMonth(n, this._orient)
        }
    };
    for (var j = 0; j < mx.length; j++)
        $D[mx[j]] = $D[mx[j].substring(0, 3)] = mf(j);
    var ef = function(j) {
        return function() {
            if (j.substring(j.length - 1) != "s")
                j += "s";
            return this["add" + j](this._orient)
        }
    }, nf = function(n) {
        return function() {
            this._dateElement = n;
            return this
        }
    };
    for (var k = 0; k < px.length; k++) {
        de = px[k].toLowerCase();
        $D[de] = $D[de + "s"] = ef(px[k]);
        $N[de] = $N[de + "s"] = nf(de)
    }
}());
Date.prototype.toJSONString = function() {
    return this.toString("yyyy-MM-ddThh:mm:ssZ")
};
Date.prototype.toShortDateString = function() {
    return this.toString(Date.CultureInfo.formatPatterns.shortDatePattern)
};
Date.prototype.toLongDateString = function() {
    return this.toString(Date.CultureInfo.formatPatterns.longDatePattern)
};
Date.prototype.toShortTimeString = function() {
    return this.toString(Date.CultureInfo.formatPatterns.shortTimePattern)
};
Date.prototype.toLongTimeString = function() {
    return this.toString(Date.CultureInfo.formatPatterns.longTimePattern)
};
Date.prototype.getOrdinal = function() {
    switch (this.getDate()) {
        case 1:
        case 21:
        case 31:
            return "st";
        case 2:
        case 22:
            return "nd";
        case 3:
        case 23:
            return "rd";
        default:
            return "th"
    }
};
(function() {
    Date.Parsing = {Exception: function(s) {
            this.message = "Parse error at '" + s.substring(0, 10) + " ...'"
        }};
    var $P = Date.Parsing, _ = $P.Operators = {rtoken: function(r) {
            return function(s) {
                var mx = s.match(r);
                if (mx) {
                    return [mx[0], s.substring(mx[0].length)]
                } else
                    throw new $P.Exception(s)
            }
        },token: function(s) {
            return function(s) {
                return _.rtoken(new RegExp("^\s*" + s + "\s*"))(s)
            }
        },stoken: function(s) {
            return _.rtoken(new RegExp("^" + s))
        },until: function(p) {
            return function(s) {
                var qx = [], rx = null;
                while (s.length) {
                    try {
                        rx = p.call(this, s)
                    } catch (e) {
                        qx.push(rx[0]);
                        s = rx[1];
                        continue
                    }
                    ;
                    break
                }
                ;
                return [qx, s]
            }
        },many: function(p) {
            return function(s) {
                var rx = [], r = null;
                while (s.length) {
                    try {
                        r = p.call(this, s)
                    } catch (e) {
                        return [rx, s]
                    }
                    ;
                    rx.push(r[0]);
                    s = r[1]
                }
                ;
                return [rx, s]
            }
        },optional: function(p) {
            return function(s) {
                var r = null;
                try {
                    r = p.call(this, s)
                } catch (e) {
                    return [null, s]
                }
                ;
                return [r[0], r[1]]
            }
        },not: function(p) {
            return function(s) {
                try {
                    p.call(this, s)
                } catch (e) {
                    return [null, s]
                }
                ;
                throw new $P.Exception(s)
            }
        },ignore: function(p) {
            return p ? function(s) {
                var r = null;
                r = p.call(this, s);
                return [null, r[1]]
            } : null
        },product: function() {
            var px = arguments[0], qx = Array.prototype.slice.call(arguments, 1), rx = [];
            for (var i = 0; i < px.length; i++)
                rx.push(_.each(px[i], qx));
            return rx
        },cache: function(rule) {
            var cache = {}, r = null;
            return function(s) {
                try {
                    r = cache[s] = (cache[s] || rule.call(this, s))
                } catch (e) {
                    r = cache[s] = e
                }
                ;
                if (r instanceof $P.Exception) {
                    throw r
                } else
                    return r
            }
        },any: function() {
            var px = arguments;
            return function(s) {
                var r = null;
                for (var i = 0; i < px.length; i++) {
                    if (px[i] == null)
                        continue;
                    try {
                        r = (px[i].call(this, s))
                    } catch (e) {
                        r = null
                    }
                    ;
                    if (r)
                        return r
                }
                ;
                throw new $P.Exception(s)
            }
        },each: function() {
            var px = arguments;
            return function(s) {
                var rx = [], r = null;
                for (var i = 0; i < px.length; i++) {
                    if (px[i] == null)
                        continue;
                    try {
                        r = (px[i].call(this, s))
                    } catch (e) {
                        throw new $P.Exception(s)
                    }
                    ;
                    rx.push(r[0]);
                    s = r[1]
                }
                ;
                return [rx, s]
            }
        },all: function() {
            var px = arguments, _ = _;
            return _.each(_.optional(px))
        },sequence: function(px, d, c) {
            d = d || _.rtoken(/^\s*/);
            c = c || null;
            if (px.length == 1)
                return px[0];
            return function(s) {
                var r = null, q = null, rx = [];
                for (var i = 0; i < px.length; i++) {
                    try {
                        r = px[i].call(this, s)
                    } catch (e) {
                        break
                    }
                    ;
                    rx.push(r[0]);
                    try {
                        q = d.call(this, r[1])
                    } catch (ex) {
                        q = null;
                        break
                    }
                    ;
                    s = q[1]
                }
                ;
                if (!r)
                    throw new $P.Exception(s);
                if (q)
                    throw new $P.Exception(q[1]);
                if (c)
                    try {
                        r = c.call(this, r[1])
                    } catch (ey) {
                        throw new $P.Exception(r[1])
                    }
                ;
                return [rx, (r ? r[1] : s)]
            }
        },between: function(d1, p, d2) {
            d2 = d2 || d1;
            var _fn = _.each(_.ignore(d1), p, _.ignore(d2));
            return function(s) {
                var rx = _fn.call(this, s);
                return [[rx[0][0], r[0][2]], rx[1]]
            }
        },list: function(p, d, c) {
            d = d || _.rtoken(/^\s*/);
            c = c || null;
            return (p instanceof Array ? _.each(_.product(p.slice(0, -1), _.ignore(d)), p.slice(-1), _.ignore(c)) : _.each(_.many(_.each(p, _.ignore(d))), px, _.ignore(c)))
        },set: function(px, d, c) {
            d = d || _.rtoken(/^\s*/);
            c = c || null;
            return function(s) {
                var r = null, p = null, q = null, rx = null, best = [[], s], last = false;
                for (var i = 0; i < px.length; i++) {
                    q = null;
                    p = null;
                    r = null;
                    last = (px.length == 1);
                    try {
                        r = px[i].call(this, s)
                    } catch (e) {
                        continue
                    }
                    ;
                    rx = [[r[0]], r[1]];
                    if (r[1].length > 0 && !last) {
                        try {
                            q = d.call(this, r[1])
                        } catch (ex) {
                            last = true
                        }
                    } else
                        last = true;
                    if (!last && q[1].length === 0)
                        last = true;
                    if (!last) {
                        var qx = [];
                        for (var j = 0; j < px.length; j++)
                            if (i != j)
                                qx.push(px[j]);
                        p = _.set(qx, d).call(this, q[1]);
                        if (p[0].length > 0) {
                            rx[0] = rx[0].concat(p[0]);
                            rx[1] = p[1]
                        }
                    }
                    ;
                    if (rx[1].length < best[1].length)
                        best = rx;
                    if (best[1].length === 0)
                        break
                }
                ;
                if (best[0].length === 0)
                    return best;
                if (c) {
                    try {
                        q = c.call(this, best[1])
                    } catch (ey) {
                        throw new $P.Exception(best[1])
                    }
                    ;
                    best[1] = q[1]
                }
                ;
                return best
            }
        },forward: function(gr, fname) {
            return function(s) {
                return gr[fname].call(this, s)
            }
        },replace: function(rule, repl) {
            return function(s) {
                var r = rule.call(this, s);
                return [repl, r[1]]
            }
        },process: function(rule, fn) {
            return function(s) {
                var r = rule.call(this, s);
                return [fn.call(this, r[0]), r[1]]
            }
        },min: function(min, rule) {
            return function(s) {
                var rx = rule.call(this, s);
                if (rx[0].length < min)
                    throw new $P.Exception(s);
                return rx
            }
        }}, _generator = function(op) {
        return function() {
            var args = null, rx = [];
            if (arguments.length > 1) {
                args = Array.prototype.slice.call(arguments)
            } else if (arguments[0] instanceof Array)
                args = arguments[0];
            if (args) {
                for (var i = 0, px = args.shift(); i < px.length; i++) {
                    args.unshift(px[i]);
                    rx.push(op.apply(null, args));
                    args.shift();
                    return rx
                }
            } else
                return op.apply(null, arguments)
        }
    }, gx = "optional not ignore cache".split(/\s/);
    for (var i = 0; i < gx.length; i++)
        _[gx[i]] = _generator(_[gx[i]]);
    var _vector = function(op) {
        return function() {
            if (arguments[0] instanceof Array) {
                return op.apply(null, arguments[0])
            } else
                return op.apply(null, arguments)
        }
    }, vx = "each any all".split(/\s/);
    for (var j = 0; j < vx.length; j++)
        _[vx[j]] = _vector(_[vx[j]])
}());
(function() {
    var flattenAndCompact = function(ax) {
        var rx = [];
        for (var i = 0; i < ax.length; i++)
            if (ax[i] instanceof Array) {
                rx = rx.concat(flattenAndCompact(ax[i]))
            } else if (ax[i])
                rx.push(ax[i]);
        return rx
    };
    Date.Grammar = {};
    Date.Translator = {hour: function(s) {
            return function() {
                this.hour = Number(s)
            }
        },minute: function(s) {
            return function() {
                this.minute = Number(s)
            }
        },second: function(s) {
            return function() {
                this.second = Number(s)
            }
        },meridian: function(s) {
            return function() {
                this.meridian = s.slice(0, 1).toLowerCase()
            }
        },timezone: function(s) {
            return function() {
                var n = s.replace(/[^\d\+\-]/g, "");
                if (n.length) {
                    this.timezoneOffset = Number(n)
                } else
                    this.timezone = s.toLowerCase()
            }
        },day: function(x) {
            var s = x[0];
            return function() {
                this.day = Number(s.match(/\d+/)[0])
            }
        },month: function(s) {
            return function() {
                this.month = ((s.length == 3) ? Date.getMonthNumberFromName(s) : (Number(s) - 1))
            }
        },year: function(s) {
            return function() {
                var n = Number(s);
                this.year = ((s.length > 2) ? n : (n + (((n + 2e3) < Date.CultureInfo.twoDigitYearMax) ? 2e3 : 1900)))
            }
        },rday: function(s) {
            return function() {
                switch (s) {
                    case "yesterday":
                        this.days = -1;
                        break;
                    case "tomorrow":
                        this.days = 1;
                        break;
                    case "today":
                        this.days = 0;
                        break;
                    case "now":
                        this.days = 0;
                        this.now = true;
                        break
                }
            }
        },finishExact: function(x) {
            x = (x instanceof Array) ? x : [x];
            var now = new Date();
            this.year = now.getFullYear();
            this.month = now.getMonth();
            this.day = 1;
            this.hour = 0;
            this.minute = 0;
            this.second = 0;
            for (var i = 0; i < x.length; i++)
                if (x[i])
                    x[i].call(this);
            this.hour = (this.meridian == "p" && this.hour < 13) ? this.hour + 12 : this.hour;
            if (this.day > Date.getDaysInMonth(this.year, this.month))
                throw new RangeError(this.day + " is not a valid value for days.");
            var r = new Date(this.year, this.month, this.day, this.hour, this.minute, this.second);
            if (this.timezone) {
                r.set({timezone: this.timezone})
            } else if (this.timezoneOffset)
                r.set({timezoneOffset: this.timezoneOffset});
            return r
        },finish: function(x) {
            x = (x instanceof Array) ? flattenAndCompact(x) : [x];
            if (x.length === 0)
                return null;
            for (var i = 0; i < x.length; i++)
                if (typeof x[i] == "function")
                    x[i].call(this);
            if (this.now)
                return new Date();
            var today = Date.today(), method = null, expression = !!(this.days != null || this.orient || this.operator);
            if (expression) {
                var gap, mod, orient;
                orient = ((this.orient == "past" || this.operator == "subtract") ? -1 : 1);
                if (this.weekday) {
                    this.unit = "day";
                    gap = (Date.getDayNumberFromName(this.weekday) - today.getDay());
                    mod = 7;
                    this.days = gap ? ((gap + (orient * mod)) % mod) : (orient * mod)
                }
                ;
                if (this.month) {
                    this.unit = "month";
                    gap = (this.month - today.getMonth());
                    mod = 12;
                    this.months = gap ? ((gap + (orient * mod)) % mod) : (orient * mod);
                    this.month = null
                }
                ;
                if (!this.unit)
                    this.unit = "day";
                if (this[this.unit + "s"] == null || this.operator != null) {
                    if (!this.value)
                        this.value = 1;
                    if (this.unit == "week") {
                        this.unit = "day";
                        this.value = this.value * 7
                    }
                    ;
                    this[this.unit + "s"] = this.value * orient
                }
                ;
                return today.add(this)
            } else {
                if (this.meridian && this.hour)
                    this.hour = (this.hour < 13 && this.meridian == "p") ? this.hour + 12 : this.hour;
                if (this.weekday && !this.day)
                    this.day = (today.addDays((Date.getDayNumberFromName(this.weekday) - today.getDay()))).getDate();
                if (this.month && !this.day)
                    this.day = 1;
                return today.set(this)
            }
        }};
    var _ = Date.Parsing.Operators, g = Date.Grammar, t = Date.Translator, _fn;
    g.datePartDelimiter = _.rtoken(/^([\s\-\.\,\/\x27]+)/);
    g.timePartDelimiter = _.stoken(":");
    g.whiteSpace = _.rtoken(/^\s*/);
    g.generalDelimiter = _.rtoken(/^(([\s\,]|at|on)+)/);
    var _C = {};
    g.ctoken = function(keys) {
        var fn = _C[keys];
        if (!fn) {
            var c = Date.CultureInfo.regexPatterns, kx = keys.split(/\s+/), px = [];
            for (var i = 0; i < kx.length; i++)
                px.push(_.replace(_.rtoken(c[kx[i]]), kx[i]));
            fn = _C[keys] = _.any.apply(null, px)
        }
        ;
        return fn
    };
    g.ctoken2 = function(key) {
        return _.rtoken(Date.CultureInfo.regexPatterns[key])
    };
    g.h = _.cache(_.process(_.rtoken(/^(0[0-9]|1[0-2]|[1-9])/), t.hour));
    g.hh = _.cache(_.process(_.rtoken(/^(0[0-9]|1[0-2])/), t.hour));
    g.H = _.cache(_.process(_.rtoken(/^([0-1][0-9]|2[0-3]|[0-9])/), t.hour));
    g.HH = _.cache(_.process(_.rtoken(/^([0-1][0-9]|2[0-3])/), t.hour));
    g.m = _.cache(_.process(_.rtoken(/^([0-5][0-9]|[0-9])/), t.minute));
    g.mm = _.cache(_.process(_.rtoken(/^[0-5][0-9]/), t.minute));
    g.s = _.cache(_.process(_.rtoken(/^([0-5][0-9]|[0-9])/), t.second));
    g.ss = _.cache(_.process(_.rtoken(/^[0-5][0-9]/), t.second));
    g.hms = _.cache(_.sequence([g.H, g.mm, g.ss], g.timePartDelimiter));
    g.t = _.cache(_.process(g.ctoken2("shortMeridian"), t.meridian));
    g.tt = _.cache(_.process(g.ctoken2("longMeridian"), t.meridian));
    g.z = _.cache(_.process(_.rtoken(/^(\+|\-)?\s*\d\d\d\d?/), t.timezone));
    g.zz = _.cache(_.process(_.rtoken(/^(\+|\-)\s*\d\d\d\d/), t.timezone));
    g.zzz = _.cache(_.process(g.ctoken2("timezone"), t.timezone));
    g.timeSuffix = _.each(_.ignore(g.whiteSpace), _.set([g.tt, g.zzz]));
    g.time = _.each(_.optional(_.ignore(_.stoken("T"))), g.hms, g.timeSuffix);
    g.d = _.cache(_.process(_.each(_.rtoken(/^([0-2]\d|3[0-1]|\d)/), _.optional(g.ctoken2("ordinalSuffix"))), t.day));
    g.dd = _.cache(_.process(_.each(_.rtoken(/^([0-2]\d|3[0-1])/), _.optional(g.ctoken2("ordinalSuffix"))), t.day));
    g.ddd = g.dddd = _.cache(_.process(g.ctoken("sun mon tue wed thu fri sat"), function(s) {
        return function() {
            this.weekday = s
        }
    }));
    g.M = _.cache(_.process(_.rtoken(/^(1[0-2]|0\d|\d)/), t.month));
    g.MM = _.cache(_.process(_.rtoken(/^(1[0-2]|0\d)/), t.month));
    g.MMM = g.MMMM = _.cache(_.process(g.ctoken("jan feb mar apr may jun jul aug sep oct nov dec"), t.month));
    g.y = _.cache(_.process(_.rtoken(/^(\d\d?)/), t.year));
    g.yy = _.cache(_.process(_.rtoken(/^(\d\d)/), t.year));
    g.yyy = _.cache(_.process(_.rtoken(/^(\d\d?\d?\d?)/), t.year));
    g.yyyy = _.cache(_.process(_.rtoken(/^(\d\d\d\d)/), t.year));
    _fn = function() {
        return _.each(_.any.apply(null, arguments), _.not(g.ctoken2("timeContext")))
    };
    g.day = _fn(g.d, g.dd);
    g.month = _fn(g.M, g.MMM);
    g.year = _fn(g.yyyy, g.yy);
    g.orientation = _.process(g.ctoken("past future"), function(s) {
        return function() {
            this.orient = s
        }
    });
    g.operator = _.process(g.ctoken("add subtract"), function(s) {
        return function() {
            this.operator = s
        }
    });
    g.rday = _.process(g.ctoken("yesterday tomorrow today now"), t.rday);
    g.unit = _.process(g.ctoken("minute hour day week month year"), function(s) {
        return function() {
            this.unit = s
        }
    });
    g.value = _.process(_.rtoken(/^\d\d?(st|nd|rd|th)?/), function(s) {
        return function() {
            this.value = s.replace(/\D/g, "")
        }
    });
    g.expression = _.set([g.rday, g.operator, g.value, g.unit, g.orientation, g.ddd, g.MMM]);
    _fn = function() {
        return _.set(arguments, g.datePartDelimiter)
    };
    g.mdy = _fn(g.ddd, g.month, g.day, g.year);
    g.ymd = _fn(g.ddd, g.year, g.month, g.day);
    g.dmy = _fn(g.ddd, g.day, g.month, g.year);
    g.date = function(s) {
        return ((g[Date.CultureInfo.dateElementOrder] || g.mdy).call(this, s))
    };
    g.format = _.process(_.many(_.any(_.process(_.rtoken(/^(dd?d?d?|MM?M?M?|yy?y?y?|hh?|HH?|mm?|ss?|tt?|zz?z?)/), function(fmt) {
        if (g[fmt]) {
            return g[fmt]
        } else
            throw Date.Parsing.Exception(fmt)
    }), _.process(_.rtoken(/^[^dMyhHmstz]+/), function(s) {
        return _.ignore(_.stoken(s))
    }))), function(rules) {
        return _.process(_.each.apply(null, rules), t.finishExact)
    });
    var _F = {}, _get = function(f) {
        return _F[f] = (_F[f] || g.format(f)[0])
    };
    g.formats = function(fx) {
        if (fx instanceof Array) {
            var rx = [];
            for (var i = 0; i < fx.length; i++)
                rx.push(_get(fx[i]));
            return _.any.apply(null, rx)
        } else
            return _get(fx)
    };
    g._formats = g.formats(["yyyy-MM-ddTHH:mm:ss", "ddd, MMM dd, yyyy H:mm:ss tt", "ddd MMM d yyyy HH:mm:ss zzz", "d"]);
    g._start = _.process(_.set([g.date, g.time, g.expression], g.generalDelimiter, g.whiteSpace), t.finish);
    g.start = function(s) {
        try {
            var r = g._formats.call({}, s);
            if (r[1].length === 0)
                return r
        } catch (e) {
        }
        ;
        return g._start.call({}, s)
    }
}());
Date._parse = Date.parse;
Date.parse = function(s) {
    var r = null;
    if (!s)
        return null;
    try {
        r = Date.Grammar.start.call({}, s)
    } catch (e) {
        return null
    }
    ;
    return ((r[1].length === 0) ? r[0] : null)
};
Date.getParseFunction = function(fx) {
    var fn = Date.Grammar.formats(fx);
    return function(s) {
        var r = null;
        try {
            r = fn.call({}, s)
        } catch (e) {
            return null
        }
        ;
        return ((r[1].length === 0) ? r[0] : null)
    }
};
Date.parseExact = function(s, fx) {
    return Date.getParseFunction(fx)(s)
};
window.Life = window.Life || {};
(function(Life) {
    var User = {};
    User.isLogin = function() {
        if ($.cookie('uid') && $.cookie('skey')) {
            return true
        } else
            return false
    };
    Life.User = User
})(Life);
window.Life = window.Life || {};
(function(Life) {
    var LifeSelect = function(selector) {
        var $select = $(selector);
        if ($select.data('LifeSelect'))
            return $select.data('LifeSelect');
        $select.data('LifeSelect', this);
        this._$select = $select;
        return this
    };
    LifeSelect.prototype.init = function(displayText) {
        if (displayText)
            this._$select.find('.is-up').html(displayText + "<span><b></b></span>");
        var $select = this._$select, $display = $select.find('.is-up'), $list = $select.find('.is-list');
        if ($select.length < 1 || $display < 1 || $list < 1)
            $.error('Init LifeSelect failed, please sure is it an i-select');
        $list.css('zIndex', 1);
        $display.unbind('click');
        $display.on('click', function() {
            var $self = $(this);
            if ($self.hasClass('is-upcur')) {
                $self.removeClass('is-upcur');
                $list.hide()
            } else {
                $self.addClass('is-upcur');
                $list.show()
            }
            ;
            return false
        });
        var $options = $select.find('.is-list a');
        $options.unbind('click');
        $select.data('val', '');
        $options.on('click', function() {
            var $option = $(this), val = $option.data('val');
            $list.hide();
            $display.removeClass('is-upcur');
            $display.html($option.text() + "<span><b></b></span>");
            $select.data('val', val);
            $select.trigger('change', val)
        })
    };
    LifeSelect.prototype.disable = function() {
        var $select = this._$select, $display = $select.find('.is-up');
        $display.unbind('click')
    };
    LifeSelect.prototype.val = function(val) {
        var $select = this._$select, $options = $select.find('.is-list a');
        if (typeof val != 'undefined') {
            $options.each(function() {
                var $option = $(this);
                if ($option.data('val') == val)
                    $option.trigger('click')
            })
        } else
            return $select.data('val')
    };
    LifeSelect.methods = ['init', 'val', 'disable'];
    $(document).on('click', function() {
        $(".is-list").hide()
    });
    $.fn.lifeSelect = function(method) {
        if ($.inArray(method, LifeSelect.methods) != -1) {
            var $select = $(this), lifeSelect = $select.data('LifeSelect');
            if (!lifeSelect)
                lifeSelect = new LifeSelect($select);
            return lifeSelect[method].apply(lifeSelect, Array.prototype.slice.call(arguments, 1))
        } else
            return $.error("Method " + method + " does not exist on Life.Tips")
    }
})(Life);
window.Life = window.Life || {};
Life.alert = function(msg) {
    return new Life.Dialog.alert(msg, '温馨提示', '确定')
};
Life.textVal = function(inputSelector) {
    var $input = $(inputSelector), val = $.trim($input.val());
    $input.val(val);
    return val
};
Life.exception = function() {
    Life.alert('请求出错，请稍候重试')
};
Life.confirm = function(msg, onConfirm) {
    if (typeof onConfirm != 'function')
        return false;
    var dialog;
    if (window.gIsMobile) {
        dialog = Life.Dialog.confirm(msg, "确定", "取消")
    } else
        dialog = Life.Dialog.confirm(msg, "温馨提示", "确定", "取消");
    dialog.onConfirm = onConfirm;
    return dialog
};
Life.alertFocus = function(msg, selector) {
    var dialog = new Life.Dialog.alert(msg, '确定');
    dialog.onConfirm = function() {
        $(selector).focus()
    }
};
Life.htmlDecode = function(str) {
    return $('<div></div>').html(str).text()
};
Life.ajaxLockInstance = {};
Life.ajax = function(params) {
    var caller = arguments.callee.caller, callerStr = '';
    if (caller) {
        var callerStr = caller.toString();
        if (Life.ajaxLockInstance[callerStr])
            return;
        if (params.lock)
            Life.ajaxLockInstance[callerStr] = true
    }
    ;
    var loading = false;
    if (typeof params.beforeSend == 'undefined') {
        loading = true;
        params.beforeSend = Life.loading
    }
    ;
    params.data = params.data || {};
    params.data['_fromAjax_'] = 1;
    params.data['_csrfToken_'] = $.getAntiCSRFToken();
    if (typeof params.cache == 'undefined')
        params.cache = false;
    var onComplete = params.complete;
    params.complete = function(XMLHttpRequest, textStatus) {
        if (callerStr)
            Life.ajaxLockInstance[callerStr] = false;
        if (loading)
            Life.removeLoading();
        if (typeof onComplete == 'function')
            onComplete(XMLHttpRequest, textStatus)
    };
    var onSuccess = params.success;
    params.success = function(result) {
        if ($.isPlainObject(result) && result.ret == -10) {
            Life.reLoginNotice();
            return
        }
        ;
        if (typeof onSuccess == 'function')
            onSuccess(result)
    };
    $.ajax(params)
};
Life.reLoginNotice = function() {
    Life.confirm('由于您长时间没操作，登录态已失效，请重新登录', function() {
        var url = Life.makeUrl('user', 'login', {fromUrl: window.location.href});
        Life.jump(url)
    })
};
Life.renderTemplate = function(tmpId, tmpData, containerId) {
    var $container = $('#' + containerId);
    if ($container.length < 1)
        return;
    var html = Life.renderHtml(tmpId, tmpData);
    $container.html(html)
};
Life.renderHtml = function(tmpId, tmpData) {
    if (!tmpId || !tmpData)
        return '';
    var tmpHtml = $('#' + tmpId).html(), tmpData = tmpData;
    if (!tmpHtml)
        return '';
    var html = $.trim(Life.Template(tmpHtml).render(tmpData));
    return html
};
Life.decode = function(str) {
    return $('<div></div>').html(str).text()
};
Life.loading = function(newOne) {
    var html = '\
			<div class="g_loading_wrap" style="position:relative;">\
				<div style="position:fixed;width:100%;height:100%;z-index:1100;background:#ffffff;top:0;left:0;opacity: 0.5;filter: alpha(opacity:50);">\
					<div style="margin-top:-16px;margin-left:-16px;width:32px;height:32px;display:block;position:fixed;top:50%;left:50%;background:url(' + gAssetBase + '/pc/img/loading_3.gif) no-repeat;"></div>\
				</div>\
			</div>', $loading = $($.trim(html));
    if (newOne === true) {
        $loading.addClass('jManualDelete');
        $('body').append($loading);
        return $loading
    } else if ($(".g_loading_wrap").length < 1)
        $('body').append($loading)
};
Life.removeLoading = function() {
    $('.g_loading_wrap').each(function() {
        var $self = $(this);
        if (!$self.hasClass('jManualDelete'))
            $self.remove()
    })
};
Life.checkAll = function(selectors) {
    for (var i in selectors)
        if (!$(selectors[i]).watchInput('isValid'))
            return false;
    return true
};
Life.getInputMap = function(container) {
    var $inputList = $(container).find('input,select'), params = {};
    for (var i = 0, len = $inputList.length; i < len; i++) {
        var $input = $inputList.eq(i), name = $input.attr('name') || $input.attr('id');
        if (name)
            params[name] = $input.val()
    }
    ;
    return params
};
Life.makeUrl = function(controllor, action, params) {
    var url = gAppBase;
    if (!controllor)
        if (params)
            return url + '?' + $.param(params);
    if (!action) {
        url = url + '/' + controllor;
        if (params) {
            return url + '?' + $.param(params)
        } else
            return url
    }
    ;
    url = url + '/' + controllor + '/' + action;
    if (params) {
        return url + '?' + $.param(params)
    } else
        return url
};
Life.maskSecret = function(info, first, last) {
    info += '';
    var len = info.length;
    if (len <= (first + last))
        return info;
    var mask = [];
    mask.push(info.substr(0, first));
    for (var i = first; i < len - last; i++)
        mask.push('*');
    mask.push(info.substr(len - last, last));
    return mask.join('')
};
Life.jump = function(targetUrl) {
    if (targetUrl && Life.allowJump(targetUrl))
        ;
    else
        targetUrl = gAppBase;
    var loginUrl = Life.makeUrl('user');
    if (targetUrl != '' && targetUrl.indexOf(loginUrl) == 0)
        if (Life.User.isLogin())
            targetUrl = Life.makeUrl('my');
    window.location = targetUrl
};
Life.allowJump = function(url) {
    return url.indexOf(gAppBase) === 0
};
Life.refreshCaptcha = function(controller, captcha, captchaImg) {
    var $captchaImg = $(captchaImg);
    $captchaImg.hide();
    $captchaImg.css('cursor', 'pointer');
    $captchaImg.unbind('click');
    $captchaImg.on('click', function() {
        Life.refreshCaptcha(controller, captcha, captchaImg)
    });
    var url = Life.makeUrl(controller, 'captcha'), params = {};
    params.refresh = 1;
    Life.ajax({type: "GET",dataType: "json",url: url,data: params,beforeSend: function() {
        },success: function(data) {
            $captchaImg.show().attr('src', data.url);
            $(captcha).val('')
        },error: function() {
            Life.exception()
        }})
};
Life.foldContent = function(container, length) {
    var $container = $(container), content = $container.html();
    if (content.length <= length)
        return;
    var dataName = '__foldContent__', toUnFold = '[详情]', toFold = '[收起]';
    $container.data(dataName, content);
    var $op = $('<a href="javascript:;"></a>');
    $op.on('click', function() {
        var $ob = $(this);
        $('body').append($ob);
        if ($ob.text() == toUnFold) {
            $ob.text(toFold);
            $container.html(content)
        } else {
            $ob.text(toUnFold);
            $container.html(content.substr(0, length - 3) + '… ')
        }
        ;
        $container.append($op)
    });
    $op.click()
};
Life.resendWatch = function(mobileSelector, sendSelector, waitSelector, sendMsg, templateKey) {
    var $mobile = $(mobileSelector), $send = $(sendSelector), $wait = $(waitSelector), sendMsg = !!sendMsg, interval = 60;
    $send.hide();
    var calTime = function(time) {
        $send.hide();
        $wait.show();
        var timeoutHdl = $wait.data('timeoutHdl') || null;
        timeoutHdl != null && clearTimeout(timeoutHdl);
        timeoutHdl = setTimeout(function() {
            time -= 1;
            if (time <= 0) {
                $send.show();
                $wait.hide().text('')
            } else {
                $wait.text(time + '秒后重发');
                calTime(time)
            }
        }, 1e3);
        $wait.data('timeoutHdl', timeoutHdl)
    };
    $send.on('click', function() {
        if ($mobile.watchInput) {
            if (!$mobile.watchInput('isValid'))
                return;
            var mobile = $mobile.watchInput('val')
        } else {
            var mobile = $mobile.val();
            if (!Life.Validate(Life.Validate.PHONE, mobile))
                return
        }
        ;
        $send.hide();
        $wait.show();
        calTime(interval);
        var params = {};
        params.mobile = mobile;
        if (templateKey)
            params.templateKey = templateKey;
        var url = Life.makeUrl('common', 'apiResendMobileVerifyCode');
        Life.ajax({type: "POST",dataType: "json",url: url,data: params,success: function(data) {
                var ret = data.ret;
                if (ret != 0) {
                    Life.alert('发送失败，请重试');
                    calTime(0)
                }
            },error: function() {
                Life.exception()
            }})
    });
    if (sendMsg) {
        $send.trigger('click')
    } else
        calTime(interval)
};
Life.formatNumber = function(number, form) {
    var forms = form.split('.'), number = '' + number, numbers = number.split('.'), leftNumber = numbers[0].split(''), exec = function(lastMatch) {
        if (lastMatch == '0' || lastMatch == '#') {
            if (leftNumber.length) {
                return leftNumber.pop()
            } else if (lastMatch == '0') {
                return lastMatch
            } else
                return ''
        } else
            return lastMatch
    }, string;
    string = forms[0].split('').reverse().join('').replace(/./g, exec).split('').reverse().join('');
    string = leftNumber.join('') + string;
    if (forms[1] && forms[1].length) {
        leftNumber = (numbers[1] && numbers[1].length) ? numbers[1].split('').reverse() : [];
        string += '.' + forms[1].replace(/./g, exec)
    }
    ;
    return string.replace(/.$/, '')
};
Life.watchPassword = function(password) {
    $(password).on('keyup', function() {
        var $self = $(this), val = $self.watchInput('val');
        if (val.length < 6) {
            $self.lifeTips('hide');
            return
        }
        ;
        var hasNumber = val.match(/\d/) ? 1 : 0, hasUpperChar = val.match(/[a-z]/) ? 1 : 0, hasLowerChar = val.match(/[A-Z]/) ? 1 : 0, hasSymbol = val.replace(/[a-z\d]*/i, '').length > 0 ? 1 : 0, ret = hasNumber + hasUpperChar + hasLowerChar + hasSymbol;
        if (ret >= 3) {
            $self.lifeTips('info', '强：你的密码很安全')
        } else if (ret == 2) {
            $self.lifeTips('info', '中：你的密码还可以更复杂些')
        } else
            $self.lifeTips('info', '弱：密码强度较弱试试数字、字母、常用字符的组合')
    })
};
Life.displayLength = function(str) {
    str += '';
    var asciiLength = 0, otherLength = 0;
    for (var i = 0; i < str.length; i++) {
        var chr = str.charCodeAt(i);
        if (chr >= 0 && chr <= 255) {
            asciiLength++
        } else
            otherLength += 2
    }
    ;
    return asciiLength + otherLength
};
Life.displaySubstr = function(str, maxDisplayLength) {
    str += '';
    var len = 0;
    for (var i = 0; i < str.length; i++) {
        var chr = str.charCodeAt(i);
        if (chr >= 0 && chr <= 255) {
            len++
        } else
            len += 2;
        if (len > maxDisplayLength)
            return str.substring(0, i)
    }
    ;
    return str
};
Life.openFeedback = function(url) {
    var dialog = new Life.Dialog({title: "意见反馈",content: '<iframe height="261" width="100%" frameborder="0" src="' + url + '"></iframe>'});
    dialog._$dialog.css("padding", 0);
    $(".dialog-bd", dialog._$dialog).css("padding", 0);
    $('<a href="javascript:;" class="close"><i class="icon-dialog-close" title="关闭"></i></a>').insertBefore($(".line", dialog._$dialog));
    $(".icon-dialog-close", dialog._$dialog).parent().on("click", function() {
        dialog.remove()
    })
};
Life.antiAutoFill = function(selectors) {
    if (!$.isArray(selectors))
        selectors = [selectors];
    for (var i = 0, len = selectors.length; i < len; i++)
        $(selectors[i]).val('')
};
Life.thumbnail = function(url, width, height) {
    return url + '?imageView2/2/w/' + (parseInt(width) || 180) + '/h/' + (parseInt(height) || 240)
};
Life.trackEvent = function(action) {
    window._hmt = window._hmt || [];
    action += '';
    var actions = action.split('.');
    if (actions.length > 1)
        _hmt.push(['_trackEvent', actions[0], actions[1], actions[2], actions[3]])
};
Life.calculateTotalProfit = function(type, amount, rate, periods) {
    var total = 0;
    rate = rate / 1e4;
    var monthRate = rate / 12;
    switch (type) {
        case 1:
        case 2:
            total = amount * rate * periods;
            break;
        case 3:
            var monthPay = amount * monthRate * Math.pow(1 + monthRate, periods) / (Math.pow(1 + monthRate, periods) - 1);
            total = monthPay * periods - amount;
            break;
        case 4:
            total = (amount * periods - (amount / periods) * n * (n - 1) / 2) * monthRate;
            break;
        case 5:
            total = monthRate * amount * (1 + periods) / 2;
            break
    }
    ;
    total = Math.round(total) / 100;
    return total
};
Life.decodeUriEncodeJson = function(str) {
    return JSON.parse(decodeURIComponent(str))
};
Life.formatMoney = function(number, places, symbol, thousand, decimal) {
    number /= 100;
    number = isNaN(number) ? 0 : number;
    places = !isNaN(places = Math.abs(places)) ? places : 2;
    symbol = symbol !== undefined ? symbol : "";
    thousand = thousand || ",";
    decimal = decimal || ".";
    var negative = number < 0 ? "-" : "", i = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + "", j = (j = i.length) > 3 ? j % 3 : 0, res = symbol + negative + (j ? i.substr(0, j) + thousand : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand) + (places ? decimal + Math.abs(number - i).toFixed(places).slice(2) : "");
    return res.replace(/(\.00)|(\.0)/, '')
};
window.Life = window.Life || {};
(function($) {
    Life.guid = 0;
    Life.Template = (function() {
        var y = "", c = /^[\s\xa0]+|[\s\xa0]+$/g, p = String.prototype.trim;
        p = p ? function(B) {
            return B == null ? y : B.trim()
        } : function(B) {
            return B == null ? y : B.toString().replace(c, y)
        };
        var f = {}, s = {"#": "start","/": "end"}, a = "KS_TEMPL_STAT_PARAM", u = new RegExp(a, "g"), x = "KS_TEMPL", l = "KS_DATA_", j = "as", d = '");', k = x + '.push("', g = "Template: Syntax Error. ", m = "Template: Render Error. ", o = "var " + x + "=[]," + a + "=false;with(", A = "||{}){try{" + x + '.push("', b = '");}catch(e){' + x + '=["' + m + '" + e.message]}};return ' + x + '.join("");', i = function(B) {
            return B.replace(/\\"/g, '"')
        }, q = function(B) {
            return B.replace(/"/g, '\\"')
        }, n = function(B) {
            return (B || y) + Life.guid++
        }, h = function(D) {
            var C, B;
            return q(p(D).replace(/[\r\t\n]/g, " ").replace(/\\/g, "\\\\")).replace(/\{\{([#/]?)(?!\}\})([^}]*)\}\}/g, function(J, K, E) {
                C = "";
                E = i(p(E));
                if (K) {
                    B = E.indexOf(" ");
                    E = B === -1 ? [E, ""] : [E.substring(0, B), E.substring(B)];
                    var F = E[0], I, H = p(E[1]), G = e[F];
                    if (G && s[K]) {
                        I = G[s[K]];
                        C = String($.isFunction(I) ? I.apply(this, H.split(/\s+/)) : I.replace(u, H))
                    }
                } else
                    C = x + ".push(typeof (" + E + ') ==="undefined"?"":' + E + ");";
                return d + C + k
            })
        }, e = {"if": {start: "if(typeof (" + a + ') !=="undefined" && ' + a + "){",end: "}"},"else": {start: "}else{"},elseif: {start: "}else if(" + a + "){"},each: {start: function(G, C, E, D) {
                    var B = "_ks_value", F = "_ks_index";
                    if (C === j && E) {
                        B = E || B;
                        F = D || F
                    }
                    ;
                    return "$.each(" + G + ", function(" + F + ", " + B + "){"
                },end: "});"},"!": {start: "/*" + a + "*/"}}
        function w(C) {
            if (!(f[C])) {
                var D = n(l), E, G, B = [o, D, A, G = h(C), b];
                try {
                    E = new Function(D, B.join(""))
                } catch (F) {
                    B[3] = d + k + g + "," + F.message + d + k;
                    E = new Function(D, B.join(""))
                }
                ;
                f[C] = {name: D,o: G,parser: B.join(""),render: E}
            }
            ;
            return f[C]
        }
        ;
        return w
    })()
})($);
window.Life = window.Life || {};
(function(Life) {
    var Validate = function(type, val) {
        if (typeof type == 'undefined' || typeof val == 'undefined')
            return false;
        var reg, ret;
        switch (type) {
            case Validate.REQUIRED:
                reg = /.+/i;
                ret = reg.test(val);
                break;
            case Validate.URL:
                reg = /^http(s?):\/\/[^\r\n]+$/i;
                ret = reg.test(val);
                break;
            case Validate.INTEGER:
                reg = /^[-\+]?\d+$/;
                ret = reg.test(val);
                break;
            case Validate.NATURAL_INT:
                reg = /^0|([1-9]\d*)$/i;
                ret = reg.test(val);
                break;
            case Validate.POSITIVE_INT:
                reg = /^[1-9]\d*$/i;
                ret = reg.test(val);
                break;
            case Validate.EMAIL:
                reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
                ret = reg.test(val);
                break;
            case Validate.ZIP:
                reg = /^\d{6}$/i;
                ret = reg.test(val);
                break;
            case Validate.ENGLISH:
                val = $.trim(val);
                if (val == '') {
                    ret = false;
                    break
                }
                ;
                ret = true;
                for (var i = 0, len = val.length; i < len; i++)
                    if (val.charCodeAt(i) > 127) {
                        ret = false;
                        break
                    }
                ;
                break;
            case Validate.PRICE:
                reg = /^(([0-9])|([1-9]\d*))(\.[0-9]{1,2})?$/i;
                ret = reg.test(val);
                break;
            case Validate.POSITIVE_FLOAT:
                reg = /^(([0-9])|([1-9]\d*))(\.[0-9]+)?$/i;
                ret = reg.test(val);
                break;
            case Validate.PHONE:
                reg = /^1\d{10}$/i;
                ret = reg.test(val);
                break;
            case Validate.TEL_AREA:
                reg = /^0\d{2,3}$/i;
                ret = reg.test(val);
                break;
            case Validate.TEL_NUM:
                reg = /^\d{7,8}$/i;
                ret = reg.test(val);
                break;
            case Validate.LEAP_YEAR:
                var year = parseInt(val);
                if (isNaN(year)) {
                    ret = false
                } else
                    ret = ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0);
                break;
            case Validate.IDENTIFY:
                ret = _isIdCard(val);
                break;
            case Validate.PASSWORD:
                reg = /^.{6,16}$/i;
                ret = reg.test(val);
                break;
            case Validate.IDENTITY_NAME:
                reg = /[\u4E00-\u9FA5]/g;
                if (val.length < 2) {
                    ret = false
                } else
                    ret = reg.test(val);
                break;
            case Validate.BANK_CARD_NO:
                reg = /^\d{6,30}$/i;
                ret = reg.test(val);
                break;
            case Validate.CAPTCHA:
                reg = /^\w{4}$/i;
                ret = reg.test(val);
                break;
            default:
                ret = false
        }
        ;
        return ret
    };
    Validate.REQUIRED = 1;
    Validate.URL = 2;
    Validate.INTEGER = 3;
    Validate.NATURAL_INT = 4;
    Validate.POSITIVE_INT = 5;
    Validate.EMAIL = 6;
    Validate.ZIP = 7;
    Validate.ENGLISH = 8;
    Validate.PRICE = 9;
    Validate.POSITIVE_FLOAT = 10;
    Validate.PHONE = 11;
    Validate.TEL_AREA = 12;
    Validate.TEL_NUM = 13;
    Validate.LEAP_YEAR = 14;
    Validate.IDENTIFY = 15;
    Validate.PASSWORD = 16;
    Validate.IDENTITY_NAME = 17;
    Validate.BANK_CARD_NO = 18;
    Validate.CAPTCHA = 19
    function _isIdCard(id) {
        var prov = {11: "北京",12: "天津",13: "河北",14: "山西",15: "内蒙古",21: "辽宁",22: "吉林",23: "黑龙江",31: "上海",32: "江苏",33: "浙江",34: "安徽",35: "福建",36: "江西",37: "山东",41: "河南",42: "湖北",43: "湖南",44: "广东",45: "广西",46: "海南",50: "重庆",51: "四川",52: "贵州",53: "云南",54: "西藏",61: "陕西",62: "甘肃",63: "青海",64: "宁夏",65: "新疆",71: "台湾",81: "香港",82: "澳门",91: "国外"}, idChars = id.split("");
        if (!prov[parseInt(id.substr(0, 2))])
            return false;
        var regExp;
        switch (id.length) {
            case 15:
                var year = parseInt(id.substr(6, 2)) + 1900;
                if (Validate(Validate.LEAP_YEAR, year)) {
                    regExp = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}$/
                } else
                    regExp = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}$/;
                return regExp.test(id);
                break;
            case 18:
                var year = id.substr(6, 4);
                if (Validate(Validate.LEAP_YEAR, year)) {
                    regExp = /^[1-9][0-9]{5}[1-9][0-9]{3}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/
                } else
                    regExp = /^[1-9][0-9]{5}[1-9][0-9]{3}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/;
                if (regExp.test(id)) {
                    var modulus, checkCodeList = '10X98765432', sum, code;
                    sum = (parseInt(idChars[0]) + parseInt(idChars[10])) * 7 + (parseInt(idChars[1]) + parseInt(idChars[11])) * 9 + (parseInt(idChars[2]) + parseInt(idChars[12])) * 10 + (parseInt(idChars[3]) + parseInt(idChars[13])) * 5 + (parseInt(idChars[4]) + parseInt(idChars[14])) * 8 + (parseInt(idChars[5]) + parseInt(idChars[15])) * 4 + (parseInt(idChars[6]) + parseInt(idChars[16])) * 2 + parseInt(idChars[7]) * 1 + parseInt(idChars[8]) * 6 + parseInt(idChars[9]) * 3;
                    modulus = sum % 11;
                    code = checkCodeList.substr(modulus, 1);
                    if (code == idChars[17]) {
                        return true
                    } else
                        return false
                } else
                    return false;
                break;
            default:
                return false
        }
    }
    ;
    Life.Validate = Validate
})(window.Life);
window.Life = window.Life || {};
Life.uploadImage = function(options) {
    var settings = $.extend({uploadBtn: '#',buttonImage: gAssetBase + "/img/upload.png",width: 100,height: 100,onSuccess: function() {
        },onError: function() {
        }}, options), $uploadBtn = $(settings.uploadBtn);
    if ($uploadBtn.length < 1)
        return;
    var loading;
    $uploadBtn.uploadify({buttonImage: settings.buttonImage,fileTypeExts: "*.png; *.jpg; *.jpeg;",width: settings.width,height: settings.height,swf: gAssetBase + '/js/pc/lib/uploadify/uploadify.swf',uploader: gAppBase + '/common/apiUploadImg',formData: {type: 'image',uid: $.cookie('uid'),skey: $.cookie('skey'),ua: $.cookie('ua')},queueID: 'file_queue',fileSizeLimit: '2MB',fileObjName: 'media',onUploadStart: function(file) {
            Life.loading()
        },onUploadSuccess: function(file, data, response) {
            Life.removeLoading();
            var result = JSON.parse(data);
            if (!response || !result || result.ret != 0) {
                if (result && result.ret == -10) {
                    Life.reLoginNotice()
                } else
                    Life.alert('文件上传失败');
                return
            }
            ;
            settings.onSuccess(result.data)
        },onUploadError: function(file, errorCode, errorMsg, errorString) {
            Life.exception();
            settings.onError(file, errorCode, errorMsg, errorString);
            Life.removeLoading()
        },onUploadComplete: function(file) {
            Life.removeLoading()
        }})
};
window.Life = window.Life || {};
(function(Life) {
    function Dialog(options) {
        var settings = {type: Dialog.ALERT,title: '温馨提示',content: '',confirmText: '',cancelText: '',duration: 1e3,hasMask: true,removeOnSave: true,onConfirm: function() {
            },onCancel: function() {
            }};
        this._settings = $.extend(settings, options);
        this._$container = $('body');
        this._$dialog = null;
        this._$mask = null;
        this._hasRemoved = false;
        this._isIE6 = BrowserDetect.browser == 'Explorer' && (BrowserDetect.version == "6.0") && !$.support.style;
        this._isIE7 = BrowserDetect.browser == 'Explorer' && (BrowserDetect.version == "7.0");
        this.onConfirm = this._settings.onConfirm;
        this.onCancel = this._settings.onCancel;
        this.show()
    }
    ;
    Dialog.NONE = 0;
    Dialog.ALERT = 1;
    Dialog.CONFIRM = 2;
    Dialog.LOADING = 3;
    Dialog.prototype.show = function() {
        this.remove();
        this._hasRemoved = false;
        this.showMask();
        var self = this, $dialog = $('<div class="dialog-main">\
              <div class="dialog-tip" style="display: none"></div>\
              <div class="dialog-hd"><h2></h2><span class="line"></span> </div>\
              <div class="dialog-bd"></div>\
              <div class="dialog-bt"><a href="javascript:;" class="btn btn-1"></a><a href="javascript:;" class="btn btn-5"></a></div>\
            </div>\
            '), title = this._settings.title;
        if (title) {
            var $title = $dialog.find('.dialog-hd > h2');
            if (typeof title == "object") {
                $title.append($(title))
            } else
                $title.html(title)
        } else
            $dialog.find('.dialog-hd').remove();
        var content = this._settings.content, $body = $dialog.find('.dialog-bd');
        if (typeof content == "object") {
            $body.append($(content))
        } else
            $body.html(content);
        var $operation = $dialog.find('.dialog-bt');
        if (this._settings.type == Dialog.LOADING) {
            $operation.remove()
        } else {
            var cancelText = this._settings.cancelText, $cancel = $dialog.find('.dialog-bt > .btn-5');
            if (cancelText) {
                $cancel.text(cancelText).on('click', function() {
                    if ($.isFunction(self.onCancel))
                        self.onCancel();
                    self.remove();
                    return false
                })
            } else
                $cancel.remove();
            var confirmText = this._settings.confirmText, $confirm = $dialog.find('.dialog-bt > .btn-1');
            if (confirmText) {
                $confirm.text(confirmText).on('click', function() {
                    if ($.isFunction(self.onConfirm))
                        self.onConfirm();
                    if (self._settings.removeOnSave)
                        self.remove();
                    return false
                })
            } else
                $confirm.remove();
            if (!confirmText && !cancelText)
                $operation.remove()
        }
        ;
        this._$dialog = $dialog;
        this._$dialog.appendTo(this._$container);
        $(window).on('resize', function() {
            if (!self._hasRemoved) {
                self.resizeMask();
                self.adjustPosition()
            }
        });
        this.adjustPosition();
        return this
    };
    Dialog.prototype.setRemoveOnSave = function(removeOnSave) {
        this._settings.removeOnSave = removeOnSave
    };
    Dialog.prototype.hide = function() {
        if (this._$dialog)
            this._$dialog.css("display", "none")
    };
    Dialog.prototype.setStyle = function(attr, value) {
        if (this._$dialog)
            this._$dialog.css(attr, value)
    };
    Dialog.prototype.remove = function() {
        if (this._$iframeMask) {
            this._$iframeMask.remove();
            this._$iframeMask = null
        }
        ;
        if (this._$mask) {
            this._$mask.remove();
            this._$mask = null
        }
        ;
        if (this._$dialog) {
            this._$dialog.remove();
            this._$dialog = null
        }
        ;
        this._hasRemoved = true
    };
    Dialog.prototype.adjustPosition = function() {
        if (this._hasRemoved)
            return;
        var dialogWidth = parseInt(this._$dialog.width()), dialogHeight = parseInt(this._$dialog.height()), doc = document, domWidth = parseInt((doc.compatMode == "CSS1Compat") ? doc.documentElement.clientWidth : doc.body.clientWidth), domHeight = parseInt((doc.compatMode == "CSS1Compat") ? doc.documentElement.clientHeight : doc.body.clientHeight), domScrollTop = Math.max(doc.documentElement.scrollTop, doc.body.scrollTop), left = (domWidth - dialogWidth) / 2, abTop = domScrollTop + (domHeight - dialogHeight) * 0.382, top = (domHeight - dialogHeight) * 0.382;
        if (left < 0)
            left = 0;
        if (abTop < 0)
            abTop = 0;
        if (top < 0)
            top = 0;
        var style = {};
        if (this._isIE6 || this._isIE7) {
            style.top = abTop;
            style.left = left
        } else {
            var h = domHeight - dialogHeight;
            if (h < 0) {
                style.position = 'absolute';
                style.top = abTop;
                style.left = left
            } else {
                style.position = 'fixed';
                style.top = top;
                style.left = left
            }
        }
        ;
        style.zIndex = 999;
        this._$dialog.css(style);
        if (this._isIE6) {
            var self = this;
            setTimeout(function() {
                self._adjustPosition()
            }, 1e3)
        }
    };
    Dialog.prototype._adjustPosition = function() {
        var doc = $(window);
        this._$dialog.css({position: "fixed",zIndex: "999",top: Math.floor(doc.height() / 2 - this._$dialog.height() / 2) + 'px',left: Math.floor(doc.width() / 2 - this._$dialog.width() / 2) + 'px'})
    };
    Dialog.prototype.error = function(msg) {
        var $tips = this._$dialog.find('.dialog-tip');
        $tips.show().text(msg);
        setTimeout(function() {
            $tips.fadeOut()
        }, 2e3)
    };
    Dialog.prototype.hideError = function() {
        var $tips = this._$dialog.find('.dialog-tip');
        $tips.hide()
    };
    Dialog.prototype.showMask = function() {
        if (!this._settings.hasMask)
            return;
        if (this._isIE6) {
            this._$iframeMask = $("<iframe src='#' style='position:fixed; _position:absolute; z-index:997; left:0; top:0; width:100%; height:100%; filter:alpha(opacity=0);'></iframe>");
            this._$iframeMask.appendTo(this._$container)
        }
        ;
        this._$mask = $('<div style="position:fixed; _position:absolute; left:0; top:0; z-index:998; width:100%; height:100%; background-color:#000000; opacity:0.6; filter:alpha(opacity=60);"></div>');
        this.resizeMask();
        this._$mask.appendTo(this._$container)
    };
    Dialog.prototype.resizeMask = function() {
        if (this._hasRemoved)
            return;
        var doc = document, width = Math.max(doc.documentElement.scrollWidth, doc.body.scrollWidth), height = Math.max(doc.documentElement.scrollHeight, doc.body.scrollHeight), clientHeight = (doc.compatMode == "CSS1Compat") ? doc.documentElement.clientHeight : doc.body.clientHeight;
        height = Math.max(height, clientHeight);
        if (this._isIE6) {
            this._$iframeMask.css('width', width + 'px');
            this._$iframeMask.css('height', height + 'px')
        }
        ;
        this._$mask.css('width', width + 'px');
        this._$mask.css('height', height + 'px')
    };
    Dialog.alert = function(content, title, confirmText) {
        var options = {title: title || '温馨提示',content: content || ' ',type: Dialog.ALERT,confirmText: confirmText || '确定'};
        return new Dialog(options)
    };
    Dialog.confirm = function(content, title, confirmText, cancelText) {
        var options = {title: title || '温馨提示',content: content || ' ',type: Dialog.CONFIRM,confirmText: confirmText || '确定',cancelText: cancelText || '取消'};
        return new Dialog(options)
    };
    Life.Dialog = Dialog
})(Life);
window.Life = window.Life || {};
(function(Life) {
    var $ = jQuery, Tips = {};
    Tips.Type = {};
    Tips.Type.SUCCESS = 1;
    Tips.Type.ERROR = 2;
    Tips.Type.INFO = 3;
    Tips.Direction = {};
    Tips.Direction.INHERIT = -1;
    Tips.Direction.TOP = 100;
    Tips.Direction.RIGHT = 101;
    Tips.Direction.BOTTOM = 102;
    Tips.Direction.LEFT = 103;
    Tips.zIndex = 3;
    Life.Tips = Tips;
    Tips.clearAll = function() {
        $('.msg-box').each(function() {
            var $self = $(this);
            if (!$self.hasClass('jInlineMsgBox'))
                $self.remove()
        })
    };
    Tips.setTipsZIndex = function(zIndex) {
        Tips.zIndex = zIndex
    };
    var showTips = function(options) {
        var settings = $.extend({refer: '#',type: Tips.Type.INFO,direction: Tips.Direction.RIGHT,left: 0,hide: false,top: 0,msg: ''}, options), $referOb = $(settings.refer);
        if ($referOb.length != 1)
            return;
        var $tips = $referOb.data('_tips_');
        if (!$tips) {
            $tips = $('<div></div>');
            $referOb.data('_tips_', $tips)
        }
        ;
        if (settings.hide)
            return $tips.hide();
        $tips.show();
        $tips.attr('class', 'msg-box');
        $tips.css("position", "absolute");
        $tips.css("zIndex", Tips.zIndex);
        var type = settings.type, msg = settings.msg;
        if (type == Tips.Type.SUCCESS) {
            $tips.html('<div class="msg-succ"><i class="icon-ok-s"></i></div>');
            $tips.addClass('msg-ok')
        } else if (type == Tips.Type.ERROR) {
            $tips.html('\
            <div class="msg-weak msg-inline">\
                <i class="icon-err-s"></i>\
                <div class="msg-cnt">' + msg + '</div>\
            </div>')
        } else if (type == Tips.Type.INFO)
            $tips.html('\
            <div class="msg-weak msg-inline">\
                <i class="icon-info-s"></i>\
                <div class="msg-cnt">' + msg + '</div>\
            </div>');
        $('body').append($tips);
        var tipsWidth = $tips.outerWidth(), tipsHeight = $tips.outerHeight(), arrowSize = 10, referWidth = $referOb.outerWidth(), referHeight = $referOb.outerHeight(), referPos = $referOb.offset(), referTop = referPos.top, referLeft = referPos.left, tipsLeft, tipsTop, direction = settings.direction, arrowClass = '';
        if (direction == Tips.Direction.LEFT) {
            tipsLeft = referLeft - tipsWidth + arrowSize;
            tipsTop = referTop + (referHeight - tipsHeight) / 2;
            arrowClass = 'msg-arr-r'
        } else if (direction == Tips.Direction.TOP) {
            tipsLeft = referLeft;
            tipsTop = referTop - tipsHeight - arrowSize;
            arrowClass = 'msg-arr-b'
        } else if (direction == Tips.Direction.BOTTOM) {
            tipsLeft = referLeft;
            tipsTop = referTop + referHeight + arrowSize;
            arrowClass = 'msg-arr-t'
        } else {
            tipsLeft = referLeft + referWidth + arrowSize;
            tipsTop = referTop + (referHeight - tipsHeight) / 2;
            arrowClass = 'msg-arr-l'
        }
        ;
        var $tipsArrow = $tips.find('.msg-inline');
        if ($tipsArrow.length > 0)
            $tipsArrow.addClass(arrowClass);
        tipsTop = Math.floor(tipsTop) + (parseInt(settings.left) || 0);
        tipsLeft = Math.floor(tipsLeft) + (parseInt(settings.top) || 0);
        $tips.css({top: tipsTop + "px",left: tipsLeft + "px"});
        $(window).on('resize', function() {
            showTips(options)
        })
    }, LifeTips = {};
    LifeTips.show = function(options) {
        options.refer = this;
        return showTips(options)
    };
    LifeTips.hide = function(direction) {
        var options = {refer: this,direction: direction,hide: true};
        return showTips(options)
    };
    LifeTips.success = function(direction) {
        var options = {refer: this,type: Tips.Type.SUCCESS,direction: direction,left: 0,top: 0,msg: ''};
        return showTips(options)
    };
    LifeTips.error = function(msg, direction) {
        var options = {refer: this,type: Tips.Type.ERROR,direction: direction,left: 0,top: 0,msg: msg};
        return showTips(options)
    };
    LifeTips.info = function(msg, direction) {
        var options = {refer: this,type: Tips.Type.INFO,direction: direction,left: 0,top: 0,msg: msg};
        return showTips(options)
    };
    $.fn.lifeTips = function(method) {
        var methods = ['show', 'hide', 'success', 'info', 'error'];
        if ($.isFunction(LifeTips[method])) {
            return LifeTips[method].apply(this, Array.prototype.slice.call(arguments, 1))
        } else
            return $.error("Method " + method + " does not exist on Life.Tips")
    }
})(Life);
window.Life = window.Life || {};
(function(Life) {
    var FloatTips = {};
    FloatTips.show = function(options) {
        var settings = $.extend({refer: '#',msg: '#',direction: 'top',left: 0,top: 0,container: 'body'}, options), $refer = $(settings.refer), $container = $(settings.container);
        if ($refer.length < 1 || $container.length < 1)
            return;
        var $tips = $('<div class="show-tips st-arr-' + settings.direction.substr(0, 1) + '"><i></i><span>' + settings.msg + '</span></div>');
        $tips.appendTo($container);
        var left = parseInt(settings.left) || 0, top = parseInt(settings.top) || 0, referPos = $refer.offset(), referWidth = $refer.outerWidth(), referHeight = $refer.outerHeight(), tipsWidth = $tips.outerWidth(), tipsHeight = $tips.outerHeight(), $arrow = $tips.find('i'), arrowWidth = $arrow.outerWidth() / 2, arrowHeight = $arrow.outerHeight() / 2;
        if (BrowserDetect.browser == 'Explorer' && (BrowserDetect.version == "6.0"))
            left += 2;
        var adjustTips = 6, tipsX, tipsY, arrowX, arrowY;
        if (settings.direction == 'right') {
            tipsX = referPos.left + left + referWidth + arrowWidth;
            tipsY = referPos.top + top - adjustTips
        } else if (settings.direction == 'left') {
            tipsX = referPos.left - tipsWidth - arrowWidth;
            tipsY = referPos.top + top - adjustTips
        } else if (settings.direction == 'top') {
            tipsX = referPos.left + left - adjustTips;
            tipsY = referPos.top + top - (tipsHeight + arrowHeight)
        } else if (settings.direction == 'bottom') {
            tipsX = referPos.left + left - adjustTips;
            tipsY = referPos.top + top + arrowHeight + referHeight
        }
        ;
        $tips.css('left', tipsX);
        $tips.css('top', tipsY);
        $tips.css('zIndex', 3);
        return $tips
    };
    $(document).on('mouseover', '.jMouseOverTips', function() {
        var $self = $(this), $tips = $self.data('tips');
        if ($tips) {
            $tips.show()
        } else {
            var options = {refer: $self,direction: $self.data('direction'),msg: $self.data('msg')};
            $tips = Life.FloatTips.show(options);
            $self.data('tips', $tips)
        }
    });
    $(document).on('mouseout', '.jMouseOverTips', function() {
        var $self = $(this), $tips = $self.data('tips');
        if ($tips)
            $tips.hide()
    });
    Life.FloatTips = FloatTips
})(Life);
window.Life = window.Life || {};
(function(Life) {
    var cssMap = {};
    cssMap.input = {};
    cssMap.input['focus'] = 'i-text-focus';
    cssMap.input['error'] = 'err-input';
    var $ = jQuery, Input = function(input, options) {
        this.$input = $(input);
        if (this.$input.length != 1)
            return;
        this.settings = options;
        if (this.settings.maxLength > 0)
            this.$input.attr('maxlength', this.settings.maxLength);
        if (this.settings.errorContainer && $(this.settings.errorContainer).length >= 1) {
            this.$errorContainer = $(this.settings.errorContainer)
        } else
            this.$errorContainer = null;
        if ($(this.settings.tipsRefer).length == 1) {
            this.$tipsRefer = $(this.settings.tipsRefer)
        } else
            this.$tipsRefer = this.$input;
        this._bind();
        Input._instance_[Input._instanceCounter] = this;
        Input._instanceCounter++
    };
    Input._instanceCounter = 0;
    Input._instance_ = {};
    Input.prototype._bind = function() {
        var self = this;
        this.$input.bind('focus', function() {
            self._doCheck({eventName: 'focus'})
        });
        this.$input.bind('keyup', function() {
            if (self.settings.numberOnly)
                self._inputNumberOnly()
        });
        this.$input.bind('blur', function() {
            self._doCheck({eventName: 'blur'})
        })
    };
    Input.prototype._inputNumberOnly = function() {
        var val = $.trim(this.$input.val()), newVal = parseFloat(val);
        if (val != newVal) {
            newVal = isNaN(newVal) ? '' : newVal;
            this.$input.val(newVal)
        }
    };
    Input.prototype._doCheck = function(data) {
        var value = $.trim(this.$input.val());
        switch (data.eventName) {
            case 'focus':
                this.$input.addClass(cssMap.input['focus']);
                break;
            case 'blur':
                this.$input.removeClass(cssMap.input['focus']);
                if (value == '')
                    this.$tipsRefer.lifeTips('hide');
                break
        }
        ;
        if (value == '')
            return;
        if (this.settings.maxLength > 0) {
            var remain = this.settings.maxLength - value.length;
            if (remain < 0) {
                this.$input.val(value.substr(0, this.settings.maxLength));
                remain = 0
            }
        }
        ;
        if (this.isValid(true)) {
            this.ok()
        } else
            this.error('', true)
    };
    Input.prototype.isValid = function(noShowError) {
        var value = this.val(), ret, msg = '';
        if (value == '' && this.settings.allowEmpty)
            return true;
        if ($.isFunction(this.settings.validator)) {
            var result = this.settings.validator(value);
            ret = result.ret;
            msg = result.msg
        } else {
            ret = Life.Validate(this.settings.validator, value);
            if (ret === false) {
                msg = this.settings.invalidMsg
            } else
                msg = ''
        }
        ;
        this.validateMsg = msg;
        if (ret == false && !noShowError)
            this.error();
        return ret
    };
    Input.prototype.error = function(msg, noFocus) {
        msg = msg || this.validateMsg;
        if (this.$errorContainer) {
            this.$errorContainer.show().html(msg)
        } else {
            this.$tipsRefer.lifeTips('error', msg, this.settings.tipsDirection);
            this.$input.addClass(cssMap.input['error'])
        }
        ;
        if (!noFocus)
            this.$input.focus()
    };
    Input.prototype.ok = function() {
        if (this.$errorContainer)
            this.$errorContainer.hide();
        if (!this.settings.noSuccessTips) {
            var direction = this.settings.successTipsDirection != Life.Tips.Direction.INHERIT ? this.settings.successTipsDirection : this.settings.tipsDirection;
            this.$tipsRefer.lifeTips('success', direction)
        } else
            this.$tipsRefer.lifeTips('hide');
        this.$input.removeClass(cssMap.input['error'])
    };
    Input.prototype.val = function() {
        var val = $.trim(this.$input.val());
        return val
    };
    Input.prototype.errorMsg = function(msg) {
        if (this.$errorContainer) {
            this.$errorContainer.show().html(msg)
        } else
            this.$tipsRefer.lifeTips('error', msg, this.settings.tipsDirection)
    };
    var watchInput = {init: function(options) {
            var settings = $.extend({maxLength: -1,numberOnly: false,tipsRefer: '#',errorContainer: null,tipsDirection: Life.Tips.Direction.RIGHT,validator: {},invalidMsg: '',noSuccessTips: false,successTipsDirection: Life.Tips.Direction.INHERIT}, options);
            return this.each(function() {
                var el = $(this), input;
                if (el.data("watchInput") === undefined) {
                    input = new Input(this, settings);
                    el.data("watchInput", input)
                }
                ;
                return el
            })
        },methods: ['val', 'ok', 'error', 'isValid', 'errorMsg']};
    $.fn.watchInput = function(method) {
        if ($.inArray(method, watchInput.methods) != -1) {
            var input = $(this).data('watchInput');
            return input[method].apply(input, Array.prototype.slice.call(arguments, 1))
        } else if (typeof method === 'object' || !method) {
            return watchInput.init.apply(this, arguments)
        } else
            return $.error("Method " + method + " does not exist on jQuery.watchInput")
    }
})(Life);
(function() {
    Life.GET = (function() {
        var query = window.location.search.substring(1), GET = {};
        if (query.length >= 2) {
            var params = query.split("&");
            for (var i = 0, len = params.length; i < len; i++) {
                var pair = params[i].split("=");
                GET[pair[0]] = decodeURIComponent((pair[1] || '').replace(/\+/g, '%20'))
            }
        }
        ;
        return GET
    })();
    var source = Life.GET['source'];
    if (source)
        $.cookie('source', source.toUpperCase(), {path: '/'});
    var promotionId = Life.GET['pid'];
    if (promotionId)
        $.cookie('promotionId', promotionId, {path: '/'});
    $(".i-text,.i-textarea").focus(function() {
        $(this).addClass("i-text-focus")
    }).blur(function() {
        $(this).removeClass("i-text-focus")
    });
    if (BrowserDetect.browser == 'Explorer' && (BrowserDetect.version == "6.0"))
        window.location = Life.makeUrl('common', 'ie6');
    if (window.gTipsInfo) {
        var date = new Date(), nowTime = date.getTime() / 1e3;
        if ($.cookie('globalTipsHide') != gTipsInfo.id && nowTime > gTipsInfo.show && nowTime < gTipsInfo.end) {
            var $tips = $('<div class="toptips">'), tipsHtml = '<div class="toptips-wrap"><strong>' + gTipsInfo.title + '：</strong><span>' + gTipsInfo.text + '</span>&nbsp; &nbsp;<a href="' + gTipsInfo.link + '" target="_blank">详情</a> &nbsp;<a href="javascript:;" class="btn-close">关闭</a></div>';
            $tips.html(tipsHtml);
            $("#header").prepend($tips);
            setTimeout(function() {
                $(".btn-close", $tips).on("click", function(e) {
                    $.cookie('globalTipsHide', gTipsInfo.id, {expires: 2592e6});
                    $tips.hide()
                })
            }, 0)
        }
        ;
        gTipsInfo.showDialog = function() {
            var tNow = (new Date()).getTime() / 1e3;
            if (!gTipsInfo.shortTips || tNow < gTipsInfo.begin || tNow > gTipsInfo.end)
                return false;
            var dialog = Life.Dialog.confirm(gTipsInfo.shortTips, gTipsInfo.title, "查看详情", "我知道了");
            dialog.onConfirm = function() {
                window.open(gTipsInfo.link, '_blank')
            };
            return dialog
        }
    }
})()
