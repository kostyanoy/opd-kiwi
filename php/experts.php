<!doctype html>
<html lang="ru">

<head>
    <title>Эксперты</title>
    <link rel="stylesheet" href="/css/experts.css">
</head>

<body>
    <h1>Наши эксперты</h1>
    <div class="container">
        <div class="experts">
            <?php
            include_once("boot.php");
            $conn = get_db_connection();

            $experts = $conn->query("SELECT * FROM users WHERE status='expert'");

            while ($result = $experts->fetch_array()) {
                echo "<div class='expert-card'>";
                echo "<div class='expert-image'><img src='/images/profile-picture.png' alt='profile'></div>";
                echo "<div class='expert-info'>";
                echo "<h2>{$result['login']}</h2>";
                echo "<p>{$result['age']} - {$result['gender']}</p>";
                echo "</div>";
                echo "</div>";
            }
            ?>
        </div>
        <a href="/index.html" class="back-button">Назад</a>
    </div>
</body>

</html>