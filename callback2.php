<?php

$callback = 'fn';
if(isset($_GET['callback'])){
    $callback = $_GET['callback'];
}

//echo $callback.'({a:1,b:2})';
echo '{a:1,b:2}';