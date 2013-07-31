/**
 *@desc:通用js库
 *@author: zhoujian
 *@date:2012-11-20
 */

/*
疑问:
1 childNodes和children有什么区别

*/
/*
键盘
        KEY_BACKSPACE: 8,
        KEY_TAB: 9,
        KEY_RETURN: 13,
        KEY_ESC: 27,
        KEY_LEFT: 37,
        KEY_UP: 38,
        KEY_RIGHT: 39,
        KEY_DOWN: 40,
        KEY_DELETE: 46,
*/
/*
 Object.prototype.toString.call(jQuery.isFunction)
"[object Function]"
 Object.prototype.toString.call(jQuery.fn)
"[object Object]"

*/
/*现总结Error.name的六种值对应的信息：
1. EvalError：eval()的使用与定义不一致 
2. RangeError：数值越界 
3. ReferenceError：非法或不能识别的引用数值 
4. SyntaxError：发生语法解析错误 
5. TypeError：操作数类型错误 
6. URIError：URI处理函数使用不当*/

/*
var o={ name:'dd'};
var f=function(str){return this.name+str}
bindF = function(o,f){
return function(){return f.apply(o,arguments)}}
var t = bindF(o,f)
t(5,6);//返回 dd5

*/
//打印js运行错误
window.onerror = function(){
    
    var errorMsg = '';
    for(var i=0; i<arguments.length; i++){
        var reportString='';
        arguments[i] = arguments[i].toString();
        reportString = arguments[i];
        errorMsg += (reportString)+'\r\n';
    }

    try{
        console && console.log(errorMsg) ;
        
    }catch(e){}
    
    return true;
    
}
//返回对象的key集合
function getPropertyNames(o){
    var r=[];
    for(name in o) r.push(name);
    return r;

}

function copyProperties(from, to){
    if(!to) to={};
    for(p in from) to[p] = from[p];
    return to;
}

function copyUndefinedProperties(from, to){
  for(p in from){
    if(! p in to) to[p] = from[p];
  }
}

//函数过滤回调
function filterArray(a, fn){
    var results = [];
    var length = a.length;
    for(var i=0; i<length; i++){
        var element = a[i];
        if(fn(element)) results.push(element);
    }
    return results;
}

function mapArray(a, fn){

    var r = [];
    var length = a.length;
    for(var i=0; i<length; i++){
        r[i] = fn(a[i]);
    }
    return r;
}


function bindMethod(o,fn){
    return function(){
        return fn.apply(o, arguments);
    }

}

function bindArguments(fn){
    var boundArgs = arguments;
    return function(){
        var args = [];
        for(var i=1, len = boundArgs.length; i<len; i++) args.push(boundArgs[i]);
        for(var i=1, len = arguments.length; i<len; i++) args.push(arguments[i]);
        return fn.apply(this, args);    
    }

}
if (!Array.prototype.push){
    Array.prototype.push = function(){
        var len = this.length;
        for (var i=0; i<arguments.length; i++) {
            this[len + i] = arguments[i];
        }
        return this.length;
    }
}

if (!Array.prototype.pop){
    Array.prototype.pop = function(){
        var returnValue = this[this.length - 1];
        this.length--;
        return returnValue;
    }
}

if (!Array.prototype.splice){
    Array.prototype.splice = function(start, deleteCount){
        var len = arguments.length - 2;
        var returnValue = this.slice(start);
        for (var i = 0; i < len; i++) {
            this[start + i] = arguments[i + 2];
        }
        for (var i = 0; i < returnValue.length - deleteCount; i++) {
            this[start + len + i] = returnValue[deleteCount + i];
        }
        this.length = start + len + returnValue.length - deleteCount;
        returnValue.length = deleteCount;
        return returnValue;
    }
}
/*通用函数*/
var isUndef = function(a){ return typeof a === "undefined";};

function MyRound(n,precision){
    n = Math.round(n*Math.pow(10,precision))/Math.pow(10,precision);  
    return n; 
}

//javascript num.toFixed方法，只能用于数字变量，不能直接用数字调用

/**字符串功能拓展**/
String.prototype.hasChinese = function() {
    return /[^\u00-\uff]/g.test(this);
}
String.prototype.onlyChinese = function() {
    return /^[\u0391-\uffe5]+$/g.test(this);
}
String.prototype.bytes = function() {
    return this.replace(/[^\x00-\xff]/gi, 'xx').length;
}

String.prototype.getBytes = function() {
    var bytes = 0;
    for (var i = 0; i < this.length; i++) {
        if (this.charCodeAt(i) > 256) {
            bytes += 2;
        } else {
            bytes += 1;
        }
    }
    return bytes;
};

//原则：可以给原生对象的原型添加方法，但是最好不要修改已经存在的对象方法
String.prototype.intercept = function(length, appendStr) {
    var str = this;
    str = str.trim();
    if (str.getBytes() <= length) return str;
    var countLen = 0;
    var charCount = 0;
    // if (appendStr.length > 0) {//将添加的字符串的长度也算在截取长度里面
    //     length = length - appendStr.length

    // }
    for (var i = 0; i < str.length; i++) {
        if (this.charCodeAt(i) > 256) {
            countLen += 2;
        } else {
            countLen += 1;
        }
        if (countLen > length) {
            break;
        }
        charCount++;
    }
    return str.substr(0, charCount) + appendStr;

};
String.prototype.lTrim = function() {
    return this.replace(/^\s*/, "");
}
String.prototype.rTrim = function() {
    return this.replace(/\s*$/, "");
}
String.prototype.trim = function() {
    return this.replace(/^\s*|\s*$/g, "");

};

/**数组功能拓展**/

//查找值是否存在，存在返回位置，否则返回-1
Array.prototype._in=function(find)
{
    for (i = 0; i < this.length; i++)
    {
        if (find==this[i])
        return i;
    }
    return -1;
}
//删除指定索引位置的成员
Array.prototype._removeAt=function(idx) 
{ 
    this.splice(idx, 1);
    return this;
} ;

//删除指定value的项
Array.prototype._remove=function(v)
{
    var tmp=[];
    for(var i=0;i<this.length;i++)
    {
        if(this[i]!=v)
        {
            tmp.push(this[i]);
        }
    }
    return tmp;
}


var Browser = {};
    Browser.isMSIE = ((window.navigator.userAgent.toLowerCase().indexOf("msie") != -1));
function send_pv_url(num) {
    try {
        setTimeout(function() { 
            (new Image()).src = "http://www.baidu.com?num=" + num + "&url=&t=" + Math.random();
        }, 0)

    } catch(ex) {}

};
Request = {
    QueryString: function(item) {
        var svalue = location.search.match(new RegExp("[\?\&]" + item + "=([^\&]*)(\&?)", "i"));
        return svalue ? svalue[1] : svalue;

    },
    SharpString: function(item) {
        var svalue = location.href.match(new RegExp("[\#]" + item + "=([^\&]*)(#?)", "i"));
        return svalue ? svalue[1] : svalue;

    }

};

var IFrame = {
    create: function(attr) {
        var ifr = null;
        if (Browser.isMSIE && parseInt(navigator.userAgent.toLowerCase().match(/msie ([\d.]+)/)[1]) < 9) {
            var attr_str = "";
            for (name in attr)
            attr_str += (" " + name + "='" + attr[name] + "' ");
            ifr = document.createElement("<iframe " + attr_str + " />");
        } else {
            ifr = document.createElement("iframe");
            for (name in attr)
            eval("ifr." + name + "='" + attr[name] + "'");
        }
        return ifr;
    }
};
var Form = {
    create: function(attr) {
        var form = document.createElement("form");
        for (name in attr) {
            if (typeof attr[name] == 'function') {
                continue;
            }
            eval("form." + name + "='" + attr[name] + "'");
        }
        return form;
    },
    addfield: function(form, data) {
        for (name in data) {
            var input = document.createElement("input");
            input.type = "text";
            input.name = name;
            input.value = data[name];
            form.appendChild(input);
        }
    }
};
var Class = {
    create: function() {
        return function() {
            this.initialize.apply(this, arguments);
        }
    },
    extend: function(destination, source) {
        for (property in source) {
            destination[property] = source[property];
        }
        return destination;
    }
};

var Delegate = {
    create: function(obj, func) {
        var f = function() {
                var target = arguments.callee.target;
                var func = arguments.callee.func;
                return func.apply(target, arguments);
            }
        f.target = obj;
        f.func = func;
        return f;
    }
};

Class.extend(String.prototype, {
    trim: function() {
        return this.replace(/(^\s+)|(\s+$)/g, "");
    },
    bytes: function() {
        return this.replace(/[^\x00-\xff]/g, "  ").length;
    },
    strip: function() {
        var temp = this;
        temp = temp.replace(/&/ig, "&amp;");
        temp = temp.replace(/</ig, "&lt;");
        temp = temp.replace(/>/ig, "&gt;");
        temp = temp.replace(/\"/ig, "&quot;");
        temp = temp.replace(/\'/ig, "&#39;");
        temp = temp.replace(/ /ig, "&nbsp;");
        temp = temp.replace(/(\r?\n)|\r/ig, "<br />");
        return temp;
    },
    revert: function() {
        var temp = this;
        temp = temp.replace(/&apos;/ig, "\'");
        temp = temp.replace(/&quot;/ig, "\"");
        temp = temp.replace(/&gt;/ig, ">");
        temp = temp.replace(/&lt;/ig, "<");
        temp = temp.replace(/&nbsp;/ig, " ");
        temp = temp.replace(/&amp;/ig, "&");
        temp = temp.replace(/<br.*?>|<\/p><p(\s*|\s+.+?)>/ig, "\n").replace(/<\/?p(\s*|\s+.+?)>/ig, "");
        return temp;
    },
    camelize: function() {
        var result = this.replace(new RegExp("(\\W)+", "g"), "");
        return result.charAt(0).toLowerCase() + result.substr(1);
    }
});


var Cookie = {
    setCookie: function(name, value, expires, path, domain, secure)
    {

        document.cookie = name + "=" + escape(value) + 
        ((expires) ? "; expires=" + expires.toGMTString() : "") + 
        ((path) ? "; path=" + path: "; path=/") + 
        ((domain) ? "; domain=" + domain: "; domain=kankan.com") + 
        ((secure) ? "; secure": "");
    },
    getCookie: function(name)
    {
        var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
        if (arr != null)
        {
            return unescape(arr[2]);
        }
        return null;
    },
    clearCookie: function(name, path, domain)
    {
        if (Cookie.getCookie(name))
        {
            document.cookie = name + "=" + 
            ((path) ? "; path=" + path: "; path=/") + 
            ((domain) ? "; domain=" + domain: "; domain=kankan.com") + ";expires=Fri, 02-Jan-1970 00:00:00 GMT";
        }
    },
    clearAnyway: function(name, path, domain)
    {
        document.cookie = name + "=" + 
        ((path) ? "; path=" + path: "; path=/") + 
        ((domain) ? "; domain=" + domain: "; domain=kankan.com") + ";expires=Fri, 02-Jan-1970 00:00:00 GMT";
    }
};
window.setRunTimeout = function(fn, dt)
 {
    if (typeof(fn) != 'function') return false;
    var p = new Array();
    if (arguments.length > 2)
    {
        for (var i = 2; i < arguments.length; i++) p[i - 2] = arguments[i];
    }
    var f = function() {
        fn.apply(null, p)
    }
    return window.setTimeout(f, dt);
}
window.setRunInterval = function(fn, dt)
 {
    if (typeof(fn) != 'function') return false;
    var p = new Array();
    if (arguments.length > 2)
    {
        for (var i = 2; i < arguments.length; i++) p[i - 2] = arguments[i];
    }
    var f = function() {
        fn.apply(null, p)
    }
    return window.setInterval(f, dt);
}


var KK = KK || {
    UA: {
        Ie:  !!document.all && /msie/gi.test(window.navigator.appVersion),
        Ie6: !!document.all && !window.XMLHttpRequest,
        Ie7: !!document.all && /msie 7.0/gi.test(window.navigator.appVersion),
        Ie8: !!document.all && /msie 8.0/gi.test(window.navigator.appVersion),
        FF: /firefox/gi.test(window.navigator.userAgent),
        Opera: /opera/gi.test(window.navigator.userAgent),
        Chrome: /Chrome/gi.test(window.navigator.userAgent)

    },
    $: function() {
        var els = [];
        for (var i = 0, l = arguments.length; i < l; i++) {
            var el = arguments[i];
            if (typeof el == "string") el = document.getElementById(el);
            if (l == 1) return el;
            els.push(el)

        };
        return els

    },
    $T: function(tagName, el) {
        var els = (this.$(el) || document).getElementsByTagName(tagName || "*");
        return this.$A(els)

    },
    $C: function(name, el, tagName) {
        var cEls = [],
        i = 0;
        if ( !! document.getElementsByClassName) {
            var arr = this.$(el || document).getElementsByClassName(name);
            arr = this.$A(arr);
            if (tagName && tagName !== "*") {
                for (var l = arr.length; i < l; i++) { (arr[i].tagName.toLowerCase() === tagName.toLowerCase()) && cEls.push(arr[i])

                }

            } else {
                cEls = arr

            }

        } else {
            for (var arr = this.$T(tagName, el), l = arr.length; i < l; i++) {
                new RegExp("\\b" + name + "\\b", "g").test(arr[i].className) && cEls.push(arr[i])

            }

        };
        return cEls

    },
    $A: function(args) {
        var arr = [];
        for (var i = 0, l = args.length; i < l; i++) {
            arr.push(args[i])

        };
        return arr

    },
    extend: function(target, souce, rewrite) {
        for (var property in souce) {
            if (rewrite) target[property] = souce[property];
            else if (!target[property]) target[property] = souce[property]

        };
        return target

    },
    getStyle: function(el, name) {
        el = this.$(el);
        if (name === "float") {
            name = KK.UA.Ie ? "styleFloat": "cssFloat"

        };
        name = name.replace(/-(\w)/, 
        function(a, b) {
            return b.toUpperCase()

        });
        return KK.UA.Ie ? el.currentStyle[name] : window.getComputedStyle(el, null)[name]

    },
    getBodySize: function() {
        if (document.compatMode == "BackCompat") {
            var clientH = document.body.clientHeight;
            var clientW = document.body.clientWidth;
            var scrollH = document.body.scrollHeight;
            var scrollW = document.body.scrollWidth;
            var scrollT = document.body.scrollTop;
            var scrollL = document.body.scrollLeft

        } else if (document.compatMode == "CSS1Compat") {
            var clientH = document.documentElement.clientHeight;
            var clientW = document.documentElement.clientWidth;
            var scrollH = document.documentElement.scrollHeight;
            var scrollW = document.documentElement.scrollWidth;
            var scrollT = document.body.scrollTop || document.documentElement.scrollTop;
            var scrollL = document.body.scrollLeft || document.documentElement.scrollLeft

        };
        return {
            cH: clientH,
            cW: clientW,
            sH: scrollH,
            sW: scrollW,
            sT: scrollT,
            sL: scrollL

        }

    },
    getXY: function(el) {
        el = this.$(el);
        var bodySize = this.getBodySize();
        var elRect = el.getBoundingClientRect();
        return {
            left: bodySize.sL + elRect.left,
            right: bodySize.sL + elRect.right,
            top: bodySize.sT + elRect.top,
            bottom: bodySize.sT + elRect.bottom

        }

    },
    isFather: function(father, child, bol) {
        father = this.$(father);
        child = this.$(child);
        if (bol && (father == child)) return true;
        if (father.compareDocumentPosition) return father.compareDocumentPosition(child) == 20;
        while (child && child.parentNode) {
            child = child.parentNode;
            if (child == father) return true

        };
        return false

    },
    addEvent: function(obj, type, func) {
        obj = this.$(obj);
        if (obj.addEventListener) {
            obj.addEventListener(type, func, true)

        } else if (obj.attachEvent) {
            obj.attachEvent("on" + type, func)

        } else {
            obj["on" + type] = func

        }

    },
    removeEvent: function(obj, type, func) {
        obj = this.$(obj);
        if (obj.removeEventListener) {
            obj.removeEventListener(type, func, false);

        } else if (obj.detachEvent) {
            obj.detachEvent("on" + type, func);

        } else {
            obj["on" + type] = null;

        }

    },
    bind: function(func, environment) {
        var params = Array.prototype.slice.call(arguments, 2);
        return function() {
            func.apply(environment, params.concat(Array.prototype.slice.call(arguments)));

        }

    },
    stopEvent: function(event) {
        event = window.event || event;
        if (event.stopPropagation) {
            event.stopPropagation();

        } else {
            event.cancelBubble = true;

        };
        return this;

    },
    inArray: function(arr, compare) {
        for (var i = 0, l = arr.length; i < l; i++) {
            if (arr[i] === compare) return true

        };
        return false;

    },
    indexOf: function(arr, compare) {
        for (var i = 0, l = arr.length; i < l; i++) {
            if (arr[i] === compare) return i

        };
        return -1;

    },
    setOpacity: function(el, num) {
        el = this.$(el);
        document.all ? el.style.filter = "Alpha(Opacity=" + num + ")": el.style.opacity = num / 100;
        return el;

    },
    fadein: function(el, speed, step, callback) {
        speed = speed || 1;
        step = step || 1;
        el = this.$(el);
        var num = 0;
        var _this = this;
        var timer = setInterval(function() {
            _this.setOpacity(el, (num += step));
            if (num >= 100) {
                clearInterval(timer);
                callback && callback(el);

            }

        },
        speed);
        return timer;

    },
    fadeout: function(el, speed, step, callback) {
        speed = speed || 1;
        step = step || 1;
        el = this.$(el);
        var num = 100;
        var _this = this;
        var timer = setInterval(function() {
            _this.setOpacity(el, (num -= step));
            if (num <= 0) {
                clearInterval(timer);
                callback && callback(el);

            }

        },
        speed);
        return timer;

    },
    slide: function(el, style, start, end, speed, callback, extra) {
        el = this.$(el);
        speed = speed || 0.1;
        var prefix = "";
        var dom = el;
        if (style === "height" || style === "width" || style === "top" || style === "bottom" || style === "left" || style === "right") {
            el = el.style;
            prefix = "px"

        };
        var timer = setInterval(function() {
            if (start > end) {
                start -= Math.ceil((start - end) * speed);
                el[style] = start + prefix;
                extra && extra(dom);
                if (start <= end) {
                    clearInterval(timer);
                    callback && callback(dom);

                }

            } else {
                start += Math.ceil((end - start) * speed);
                el[style] = start + prefix;
                extra && extra(dom);
                if (start >= end) {
                    clearInterval(timer);
                    callback && callback(dom);

                }

            }

        },
        1);
        return timer;

    },
    JSON: function() {
        function f(n) {
            return n < 10 ? '0' + n: n

        };
        Date.prototype.toJSON = function() {
            return this.getUTCFullYear() + '-' + f(this.getUTCMonth() + 1) + '-' + f(this.getUTCDate()) + 'T' + f(this.getUTCHours()) + ':' + f(this.getUTCMinutes()) + ':' + f(this.getUTCSeconds()) + 'Z'

        };
        var m = {
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"': '\\"',
            '\\': '\\\\'

        };
        function stringify(value, whitelist) {
            var a,
            i,
            k,
            l,
            r = /["\\\x00-\x1f\x7f-\x9f]/g,
            v;
            switch (typeof value) {
                case 'string':
                return r.test(value) ? '"' + value.replace(r, 
                function(a) {
                    var c = m[a];
                    if (c) {
                        return c

                    };
                    c = a.charCodeAt();
                    return '\\u00' + Math.floor(c / 16).toString(16) + (c % 16).toString(16)

                }) + '"': '"' + value + '"';
                case 'number':
                return isFinite(value) ? String(value) : 'null';
                case 'boolean':
            case 'null':
                return String(value);
                case 'object':
                if (!value) {
                    return 'null'

                };
                if (typeof value.toJSON === 'function') {
                    return stringify(value.toJSON())

                };
                a = [];
                if (typeof value.length === 'number' && !(value.propertyIsEnumerable('length'))) {
                    l = value.length;
                    for (i = 0; i < l; i += 1) {
                        a.push(stringify(value[i], whitelist) || 'null')

                    };
                    return '[' + a.join(',') + ']'

                };
                if (whitelist) {
                    l = whitelist.length;
                    for (i = 0; i < l; i += 1) {
                        k = whitelist[i];
                        if (typeof k === 'string') {
                            v = stringify(value[k], whitelist);
                            if (v) {
                                a.push(stringify(k) + ':' + v)

                            }

                        }

                    }

                } else {
                    for (k in value) {
                        if (typeof k === 'string') {
                            v = stringify(value[k], whitelist);
                            if (v) {
                                a.push(stringify(k) + ':' + v)

                            }

                        }

                    }

                };
                return '{' + a.join(',') + '}'

            }

        };
        return {
            stringify: stringify,
            parse: function(text, filter) {
                var j;
                function walk(k, v) {
                    var i,
                    n;
                    if (v && typeof v === 'object') {
                        for (i in v) {
                            if (Object.prototype.hasOwnProperty.apply(v, [i])) {
                                n = walk(i, v[i]);
                                if (n !== undefined) {
                                    v[i] = n

                                } else {
                                    delete v[i]

                                }

                            }

                        }

                    };
                    return filter(k, v)

                };
                if (/^[\],:{}\s]*$/.test(text.replace(/\\["\\\/bfnrtu]/g, '@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
                    j = eval('(' + text + ')');
                    return typeof filter === 'function' ? walk('', j) : j

                };
                throw new SyntaxError('parseJSON')

            }

        }

    } (),
    Cookie: {
        write: function(name, value, exp, path) {
            var expires = "";
            if (exp) {
                var dt = new Date();
                dt.setTime(dt.getTime() + (exp * 1000));
                expires = ";expires=" + dt.toGMTString()

            };
            if (path != undefined) {
                document.cookie = name + "=" + value + expires + ";path=" + path + ";"

            } else {
                document.cookie = name + "=" + value + expires + ";path=\;"

            }

        },
        setDay: function(name, value, exp, path) {
            this.write(name, value, (exp * 24 * 60 * 60), path)

        },
        setHour: function(name, value, exp, path) {
            this.write(name, value, (exp * 60 * 60), path)

        },
        setMin: function(name, value, exp, path) {
            this.write(name, value, (exp * 60), path)

        },
        setSec: function(name, value, exp, path) {
            this.write(name, value, (exp), path)

        },
        read: function(name, key) {
            var cookieValue = "";
            var search = name + "=";
            if (document.cookie.length > 0) {
                offset = document.cookie.indexOf(search);
                if (offset != -1) {
                    offset += search.length;
                    end = document.cookie.indexOf(";", offset);
                    if (end == -1) {
                        end = document.cookie.length

                    };
                    cookieValue = document.cookie.substring(offset, end)

                }

            };
            if (key) {
                return new KK.Param().parse(cookieValue)[key]

            };
            return cookieValue

        },
        remove: function(name) {
            this.write(name, "", -1)

        }

    },
    Param: function() {
        var arr = [];
        var o = {};
        this.parse = function(str) {
            var a = str.split("&");
            for (var i = 0, l = a.length; i < l; i++) {
                var k = a[i].split("=");
                o[k[0]] = k[1]

            };
            return o

        };
        this.toString = function(filter) {
            filter = filter || "&";
            return arr.join(filter)

        };
        this.add = function(key, val) {
            var prm = key + "=" + val;
            arr.push(prm);
            return this

        }

    },
    Ajax: function(method, url, async, args, callback, error, docType) {
        try {
            external.SuperCall(40, '{"status":"1", "speed":"80", "autotime":"5"}')

        } catch(ex) {}
        var params = args;
        async = async == null ? true: async;
        if (args) {
            params = encodeURI(encodeURI(params));
            if (typeof args === "object") {
                var str = "";
                for (var i in args) {
                    str += i + "=" + args[i] + "&"

                };
                params = str.substr(0, str.length - 1)

            }

        };
        method = method ? method.toUpperCase() : "POST";
        docType = docType ? docType: "text";
        var XMLHttp = null;
        if (window.XMLHttpRequest && !(window.ActiveXObject)) {
            XMLHttp = new XMLHttpRequest()

        } else if (window.ActiveXObject) {
            try {
                XMLHttp = new ActiveXObject("Microsoft.XMLHTTP")

            } catch(otherMSIE) {
                try {
                    XMLHttp = new ActiveXObject("Msxml2.XMLHTTP")

                } catch(NoSupport) {
                    XMLHttp = null

                }

            }

        };
        XMLHttp.onreadystatechange = function() {
            if (XMLHttp.readyState == 4) {
                try {
                    //external.SuperCall(40, '{"status":"2", "speed":"0", "autotime":"0"}')

                } catch(ex) {}
                if (XMLHttp.status == 200 || XMLHttp.status == 0) {
                    var param = null;
                    switch (docType) {
                        case "xml":
                        param = XMLHttp.responseXML;
                        break;
                        case "json":
                        param = KK.JSON.parse(XMLHttp.responseText);
                        break;
                        default:
                        param = XMLHttp.responseText

                    };
                    callback && callback(param);
                    XMLHttp = null

                } else {
                    error && error()

                }

            }

        };
        if (method == "GET") {
            XMLHttp.open(method, url + "?" + (params || ''), async);
            XMLHttp.send(null)

        } else {
            XMLHttp.open(method, url, async);
            XMLHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            XMLHttp.send(params)

        }

    },
    get: function(url, params, callback, error, async) {
        this.Ajax("get", url, async, params, callback, error)

    },
    post: function(url, params, callback, error, async) {
        this.Ajax("post", url, async, params, callback, error)

    },
    getJSON: function(url, params, callback, error, async) {
        this.Ajax("get", url, async, params, callback, error, "json")

    },
    postJSON: function(url, params, callback, error, async) {
        this.Ajax("post", url, async, params, callback, error, "json")

    },
    loadScript: function(url, args, callback) {
        var params = args || "";
        if (args && (typeof args === "object")) {
            var str = "";
            for (var i in args) {
                str += i + "=" + args[i] + "&"

            };
            params = str.substr(0, str.length - 1)

        };
        var script = document.createElement("script");
        script.type = 'text/javascript';
        script.src = url + "?" + params;
        script.onload = script.onreadystatechange = function() {
            if (!this.readyState || (this.readyState == "complete" || this.readyState == "loaded")) {
                callback && callback();
                script.onreadystatechange = script.onload = null;
                script = null

            }

        };
        document.getElementsByTagName("head")[0].appendChild(script)

    }

};

/*
//创建类库举例:
//原则：静态属性、方法用prototype，实例数据放在initialize方法中
var Thunder = {};
Thunder.WebThunder = Class.create();
Thunder.WebThunder.prototype = {    
    initialize: function(){
        this.name = "test";
    },
    getName: function(){
        return this.name;
    },
    setName: function(v){
        this.name = v;
    },
    version:"1.0.0"
}

//单例调用
Thunder.WebThunder.getInstance = function(){
    //alert(this._thunder);
    if (isUndef(this._thunder))
        this._thunder = new Thunder.WebThunder();
    return this._thunder;
}
*/
