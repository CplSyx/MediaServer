<?php
function getConnectionString($database)
{
    if($database == "MediaServer")
        return array("Database"=>"MediaServer", "UID"=>"webuser", "PWD"=>"f1shs0up");
}
function getSQLServerName()
{
    return "(local)";
}

function mssql_escape($data) {
    if(is_numeric($data))
        return $data;
    $unpacked = unpack('H*hex', $data);
    return '0x' . $unpacked['hex'];
}
?>