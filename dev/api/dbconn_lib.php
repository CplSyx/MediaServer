<?php
function getConnectionString($database)
{
    if($database == "MediaServer")
        return array("Database"=>"MediaServer", "UID"=>"webuser", "PWD"=>"f1shs0up");
}

?>