<?php

session_start();

/**
 * Returns the connection to the database
 * @return mysqli
 */
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

/**
 * Checks if user is authorized
 * @return bool
 */
function is_auth(){
    return isset($_SESSION["user_id"]);
}

/**
 * Checks if user is expert
 * @return bool
 */
function is_expert(){
    return is_auth() && isset($_SESSION["status"]) && $_SESSION["status"] == "expert";
}

?>