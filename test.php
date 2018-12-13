<?php
include "functions.php";
$data = array();
if($_GET['id'] == 5){
    $stmnt = $link->prepare("SELECT * FROM our_jobs ORDER BY job_index ASC ");

    $stmnt->execute();

    $userData = $stmnt->fetchAll(PDO::FETCH_ASSOC);

    $data = $userData;
    
    echo json_encode($data);
        
    
};

if($_GET['id'] == 6){
    $stmnt = $link->prepare("SELECT * FROM our_emps");

    $stmnt->execute();

    $userData = $stmnt->fetchAll(PDO::FETCH_ASSOC);

    $data = $userData;
    
    echo json_encode($data); 

};

if($_GET['id'] == 7){
    $myID = $_GET['myId'];
    $stmnt = $link->prepare("SELECT * FROM our_jobs WHERE id =:id LIMIT 1;");
    $stmnt->bindParam(":id",$myID,PDO::PARAM_INT,1);
    $stmnt->execute();

    $userData = $stmnt->fetch();

    $data = $userData;
    
    echo json_encode($data);
};


?>