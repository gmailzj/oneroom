<?php

$callback = 'fn';
if(isset($_GET['callback'])){
    $callback = $_GET['callback'];
}

echo '{a:1,b:2}';
exit;
// echo "1";
// exit;
//echo '\/*准备返回*\/';
echo $callback.'()';
//echo ";alert('回调')";