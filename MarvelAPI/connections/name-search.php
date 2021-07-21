<?php
if (isset($_GET['name'])) {
    $curl = curl_init();
    curl_setopt($scurl, CURLOPT_RETURNTRANSFER, 1);

    $nameToSearch = htmlentities(strtolower($_GET['name']));

    $ts = time();
    $publicKey = "bc78813236d6d6cc83c2163be59b7650";
    $privateKey = "a791a7ddd7e7709052718a3a9acc386e97290196";
    $hash = md5($ts . $privateKey . $publicKey);

    $query = array(
        "name" => $nameToSearch,
        "orderBy" => "name",
        "limit" => "20",
        'apiKey' => $publicKey,
        'ts' => $ts,
        'hash' => $hash
    )

    $url = 'http://gateway.marvel.com/v1/public/characters?' . http_build_query($query);

    curl_setopt($curl, CURLOPT_URL, $url);

    $result = json_decode(curl_exec($curl), true);
    curl_close($curl);
    echo json_encode($result);


}
else{
    echo "Error: no name given.";
}
?>