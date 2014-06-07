<?php
$movies = array();

$directory = '\\\\video\\Movies';
$scanned_directory = array_diff(scandir($directory), array('..', '.'));
//$scanned_directory = scandir($directory);
//echo"<pre>";print_r( $scanned_directory);echo"</pre>";
foreach($scanned_directory as $item)
{
    //if(is_dir($directory."\\".$item))
    //{
        $item = rtrim($item, " x");
        $array = array("title" => $item);
        $movies[] = $array; //could also use array_push($movies, $array);
    //}
}
echo json_encode($movies);
?>
