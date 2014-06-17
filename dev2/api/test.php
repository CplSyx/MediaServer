<?php
$movies = array();
$apiKey = "4bccdaf9961a8734cc9bd742bff4b862";
$item = "The Dark Knight";
$ch = curl_init();
curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
curl_setopt($ch, CURLOPT_HEADER, FALSE);
curl_setopt($ch, CURLOPT_HTTPHEADER, array("Accept: application/json"));
curl_setopt($ch, CURLOPT_URL, "http://api.themoviedb.org/3/search/movie?api_key=".$apiKey."&query=".urlencode($item));
$response = json_decode(curl_exec($ch), true);

echo "<pre>";
print_r($response['results'][0]);
echo "</pre>";

curl_setopt($ch, CURLOPT_URL, "http://www.omdbapi.com/?i=&t=".urlencode($item));
$response = json_decode(curl_exec($ch), true);

echo "<pre>";
print_r($response);
echo "</pre>";

echo "<br><br><br>TESTING SQL CONNECTION:<br><br><br>";
// Create connection
$connectionInfo = array("Database"=>"MediaServer", "UID"=>"webuser", "PWD"=>"f1shs0up");
$serverName = "home.cplsyx.com";
$conn = sqlsrv_connect( $serverName, $connectionInfo);
if( $conn === false )
{
     echo "Could not connect.\n";
     echo "<pre>"; print_r( sqlsrv_errors());echo "</pre>";
     die();
}

$server_info = sqlsrv_server_info( $conn);
if( $server_info )
{
      echo "<pre>";
      print_r($server_info);
      echo "</pre>";
}
else
{
      echo "Error in retrieving server info.\n";
      die( print_r( sqlsrv_errors(), true));
}

/* Free connection resources. */
sqlsrv_close( $conn);
?>


