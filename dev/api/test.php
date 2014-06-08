<?php
$movies = array();
$directory = '\\\\video\\Movies';
$scanned_directory = array_diff(scandir($directory), array('..', '.'));

//Details for themoviedb.org
$apiKey = "4bccdaf9961a8734cc9bd742bff4b862";
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, "http://api.themoviedb.org/3/search/movie?api_key=".$apiKey."&query=");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
curl_setopt($ch, CURLOPT_HEADER, FALSE);
curl_setopt($ch, CURLOPT_HTTPHEADER, array("Accept: application/json"));
$i = 0;
foreach($scanned_directory as $item)
{
if($i > 5) break;
    if((strpos($item, "!") !== 0) && (is_dir($directory."\\".$item))) //Check that it's not one of our special directories, and that it is actually a directory!
    {
        $item = rtrim($item, " x");
        curl_setopt($ch, CURLOPT_URL, "http://api.themoviedb.org/3/search/movie?api_key=".$apiKey."&query=".urlencode($item)); //Place request to external api
        $response = json_decode(curl_exec($ch), true); //decode the response (which is a json) into an array that php can understand
        
        $image = "";
        if((!is_null($response)) && ($response["total_results"] != 0)) //check it's not null (i.e. an error decoding) and that in this case we have a positive response for the movie
        {   
            $image = $response["results"][0]["poster_path"];
            //echo "<pre>"; print_r($response); echo "</pre>";
        }
        
        $array = array("title" => $item, "image" => $image);
        $movies[] = $array; //could also use array_push($movies, $array);
    }
    $i++;
}

curl_close($ch); // All done, close curl object
echo json_encode($movies); //only thing we should return is our completed json
?>
