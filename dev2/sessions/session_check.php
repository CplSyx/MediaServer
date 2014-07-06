<?php 
    session_start();
    if(isset($_SESSION['uid']))
        //echo json_encode(array("Authenticated" => "True"));
        echo "True";
    //else
        //echo json_encode(array("Authenticated" => "False"));
        //echo "False";

?>