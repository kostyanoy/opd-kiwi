<?php
if ($_SERVER["REQUEST_METHOD"] != "POST") {
    throw new Exception();
}

include_once("boot.php");
$conn = get_db_connection();

$username = $_POST["username"];
$email = $_POST["email"];
$password = $_POST["password"];
if (!($username && $email && $password)) {
    throw new Exception("Пожалуйста, заполните все поля.");
}

$stmt = $conn->prepare('SELECT * FROM users WHERE login=?');
$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result();
if ($result->fetch_array()) {
    throw new Exception("Логин уже занят.");
}
$stmt->close();

$hashed_password = password_hash($password, PASSWORD_DEFAULT);

$stmt = $conn->prepare('INSERT INTO users (login, password, email) VALUES (?, ?, ?)');
$stmt->bind_param("sss", $username, $hashed_password, $email);
$stmt->execute();
$stmt->close();

header('Location: login_form.php');
?>