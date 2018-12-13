<?php
$servername = "localhost";
$username = "root";
$password = "";

try {
    $link = new PDO("mysql:host=$servername;dbname=jobs", $username, $password);
    // set the PDO error mode to exception
    $link->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    }
catch(PDOException $e)
    {
    echo "Connection failed: " . $e->getMessage();
    }

?>


