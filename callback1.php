<?php

$callback = 'fn';
if(isset($_GET['callback'])){
    $callback = $_GET['callback'];
}

//jsonp
//echo $callback.'({a:1,b:2}, {c:3,d:4})';

//json
//echo '{a:1,b:2}';

//script
echo "var callFn = 51;";

