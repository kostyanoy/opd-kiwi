<?php
//preparing
include_once("boot.php");
include_once("profile_info.php");

if (!is_auth()) {
    header("Location: login_form.php");
}

$conn = get_db_connection();
$user_id = $_SESSION["user_id"];

//user info
$stmt = $conn->prepare("SELECT * FROM users WHERE id = ?");
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();
$user = $result->fetch_array();
$stmt->close();

//test results
$stmt = $conn->prepare('SELECT * FROM users u JOIN test_results r on u.id = r.user_id JOIN tests t on r.test_id = t.id WHERE u.id = ? ORDER BY t.id, r.date');
$stmt->bind_param("i", $user_id);
$stmt->execute();
$test_results = $stmt->get_result();

//preparing for showing tests
$test_id = 0;
$row = $test_results->fetch_array();
?>

<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/css/profile.css">
    <title>Профиль</title>
</head>

<body>
    <div class="container">
        <div class="profile">
            <div class="profile-image">
                <img src="/images/profile-picture.png" alt="Profile Image">
            </div>
            <div class="profile-info">
                <h1>Профиль</h1>
                <!-- profile info -->
                <?php
                foreach ($profile as $field) {
                    echo "<p>{$field['russian']}: <span id=\"{$field['english']}\"> {$user[$field['english']]} </span></p>";
                }
                ?>

            </div>
        </div>
        <a class="return-btn" href="/">Вернуться на главную</a>
        <div class="test-results">
            <h2>Результаты тестов</h2>
            <!-- show test results in different tables -->
            <?php
            while ($row) {
                $cur_test = $tests["other"];
                if (key_exists($row["name"], $tests)){
                    $cur_test = $tests[$row["name"]];
                }
                $test_id = $row["test_id"];
                echo "<table><caption>{$row["name"]}</caption><tr>";
                foreach ($cur_test as $col) {
                    echo "<th> {$col["russian"]} </th>";
                }
                echo "</tr>";
                while ($row) {
                    if ($row["test_id"] != $test_id) {
                        break;
                    }
                    echo "<tr>";
                    foreach ($cur_test as $col) {
                        echo "<td> {$row[$col["english"]]} </td>";
                    }
                    echo "</tr>";
                    $row = $test_results->fetch_array();
                }
                echo "</table>";
            }
            ?>

        </div>
    </div>

</body>

</html>