<?php
if ($_SERVER["REQUEST_METHOD"] != "POST") {
    throw new Exception();
}

include_once("boot.php");
$conn = get_db_connection();

$username = $_POST["username"];
$password = $_POST["password"];
if (!($username && $password)) {
    throw new Exception("Пожалуйста, заполните все поля.");
}

$stmt = $conn->prepare('SELECT * FROM users WHERE login=?');
$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result();

$user = $result->fetch_array();

if (!$user || !password_verify($password, $user["password"])) {
    throw new Exception("Неправильный логин или пароль.");
}
$stmt->close();

$_SESSION["user_id"] = $user["id"];
$_SESSION["status"] = $user["status"];

header('Location: /');
?>