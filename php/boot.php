<?php

session_start();

function get_db_connection(): mysqli
{
    static $conn;

    if (!$conn) {
        include_once("../../config.php");

        $conn = new mysqli($HOST, $USERNAME, $PASSWORD, $DB_NAME);
        if ($conn->connect_error) {
            die('Ошибка (' . $conn->connect_errno . ') ' . $conn->connect_error);
        }
    }
    return $conn;
}

function is_auth(){
    return isset($_SESSION["user_id"]);
}

?>