<!doctype html>
<html lang="ru">

<head>
    <title>Эксперты</title>
</head>

<body>
    Наши эксперты: 
    <?php
    include_once("boot.php");
    $conn = get_db_connection();

    $experts = $conn->query("SELECT * FROM users WHERE status='expert'");
    $i = 1;

    while ($result = $experts->fetch_array()) {
        echo "<p>{$i}) {$result['login']} - {$result['age']} - {$result['gender']}</p>";
        $i++;
    }
    ?>
</body>

</html>