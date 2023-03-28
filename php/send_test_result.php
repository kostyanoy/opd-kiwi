<?php

include_once("boot.php");

if (!is_auth()) {
    die("Не выполнен вход");
}

$conn = get_db_connection();

$user_id = $_SESSION["user_id"];
$test_name = $_POST["test_name"];
$avg_time = $_POST["avg_time"];
$total_time = $_POST["total_time"];
$correct = $_POST["correct"];
$misses = $_POST["misses"];
$date = date('Y-m-d G:i:s', time());

$stmt = $conn->prepare('SELECT t.id FROM tests t WHERE t.name = ?');
$stmt->bind_param("s", $test_name);
$stmt->execute();
$result = $stmt->get_result();

print_r($result);

$test_id = $result->fetch_array()["id"];

echo $test_name;
echo $test_id;
echo $stmt->error;

if (!$test_id){
    die("Нет теста с таким названием");
}
$stmt->close();

$stmt = $conn->prepare('INSERT INTO test_results (user_id, test_id, avg_time, total_time, correct, misses, date) VALUES (?, ?, ?, ?, ?, ?, ?)');
$stmt->bind_param("iiddiis", $user_id, $test_id, $avg_time, $total_time, $correct, $misses, $date);
$stmt->execute();
$stmt->close();

?>