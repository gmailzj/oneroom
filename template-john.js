// Simple JavaScript Templating
// John Resig - http://ejohn.org/ - MIT Licensed
(function(){
    var cache = {};

    this.tmpl = function tmpl(str, data){
    // Figure out if we're getting a template, or if we need to
    // load the template - and be sure to cache the result.
    var fn = !/\W/.test(str) ?
        cache[str] = cache[str] ||
        tmpl(document.getElementById(str).innerHTML) :

        // Generate a reusable function that will serve as a template
        // generator (and which will be cached).
        new Function("obj",
        "var p=[],print=function(){p.push.apply(p,arguments);};" +

        // Introduce the data as local variables using with(){}
        "with(obj){p.push('" +

        // Convert the template into pure JavaScript
        str
            .replace(/[\r\t\n]/g, " ")
            .split("<%").join("\t")
            .replace(/((^|%>)[^\t]*)'/g, "$1\r")
            .replace(/\t=(.*?)%>/g, "',$1,'")
            .split("\t").join("');")
            .split("%>").join("p.push('")
            .split("\r").join("\\'")
        + "');}return p.join('');");

    // Provide some basic currying to the user
    return data ? fn( data ) : fn;
    };
})();
/*
模板的例子：
<script type="text/html" id="item_tmpl">
    <div id="<%=id%>" class="<%=(i % 2 == 1 ? " even" : "")%>">
    <div class="grid_1 alpha right">
        <img class="righted" src="<%=profile_image_url%>"/>
    </div>
    <div class="grid_6 omega contents">
        <p><b><a href="/<%=from_user%>"><%=from_user%></a>:</b> <%=text%></p>
    </div>
    </div>
</script>

模板里还可以嵌入js代码：
<script type="text/html" id="user_tmpl">
    <% for ( var i = 0; i < users.length; i++ ) { %>
    <li><a href="<%=users[i].url%>"><%=users[i].name%></a></li>
    <% } %>
</script>


and you would use it from script like so:

var results = document.getElementById("results");
results.innerHTML = tmpl("item_tmpl", dataObject);



You could pre-compile the results for later use. If you call the templating function with only an ID (or a template code) then it’ll return a pre-compiled function that you can execute later:

var show_user = tmpl("item_tmpl"), html = "";
for ( var i = 0; i < users.length; i++ ) {
  html += show_user( users[i] );
}

这个模板引擎实现的大致原理是：
 •把传入的模板中的静态文本，根据特定的标识符拆分为若干的片断，并压入数组中
 •将模板中的js代码解析出来，并在压入相关静态文本前执行，以实现渲染逻辑
 •将模板中的变量通过with展开为传入数据对象的对应值，并压入数组中
 •最后通过join函数一并输出最终渲染结果
 
而且，它还支持缓存和预编译哦，是不是很巧妙啊？

*/