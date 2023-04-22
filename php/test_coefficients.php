<?php

//preparing 
include_once("boot.php");

//can't be accessed by non-expert
if (!is_expert()) {
    header("Location: experts.php");
}

//getting connection from db
$conn = get_db_connection();

// update numbers in database
if (isset($_POST['submit'])) {
    //add tests if not exists
    $rows = $conn->query('SELECT t.id FROM tests t LEFT JOIN test_coefficients tc ON t.id = tc.test_id WHERE tc.id is null')->fetch_all();
    foreach ($rows as $row) {
        $conn->query("INSERT INTO test_coefficients (test_id, profession1, profession2, profession3) VALUES ({$row[0]}, 0, 0, 0)");
    }

    //update all coefficients
    $numbers_arrays = $_POST['number'];
    $test_id_arrays = $conn->query("SELECT t.id FROM tests t")->fetch_all();
    foreach ($test_id_arrays as $index => $test_id_array) {
        $number_array = $numbers_arrays[$index];
        $conn->query("UPDATE test_coefficients SET profession1=$number_array[0], profession2=$number_array[1], profession3=$number_array[2] WHERE id=$test_id_array[0]");
    }
}


//getting info from db for all the tests
$tests_results = $conn->query('SELECT * FROM tests t LEFT JOIN test_coefficients tc ON t.id = tc.test_id');
$row = $tests_results->fetch_array();

?>


<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/css/coefficients.css">
    <title>Выбор коэффициентов</title>
</head>

<body>
    <a class="return-btn" href="/">Вернуться на главную</a>
    <form method="post">
        <!-- generate table -->
        <table>
            <caption>Коэффициенты для профессий</caption>
            <tr>
                <th>Тест</th>
                <th>Тестировщий ПО</th>
                <th>Инди-разработчик</th>
                <th>Системный администратор</th>
            </tr>
            <?php
            // fill with values from db
            $i = 0;
            while ($row) {
                echo "<tr>";
                echo "<td>{$row["name"]}</td>";
                for ($j = 0; $j < 3; $j++) {
                    $col = "profession" . ($j + 1);
                    $value = is_null($row[$col]) ? 0 : $row[$col];
                    echo "<td><input type='number' name='number[$i][$j]' value='$value' min='0' max='10' step='0.1'></td>";
                }
                echo "</tr>";

                $row = $tests_results->fetch_array();
                $i++;
            }
            ?>
        </table>
        <input type='submit' name='submit' value='Сохранить данные'>
    </form>
</body>

</html>