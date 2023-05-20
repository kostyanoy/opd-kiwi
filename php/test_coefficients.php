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
    //update all coefficients
    $numbers_arrays = $_POST['number']; //coeffitients
    $test_id_arrays = $conn->query("SELECT tq.id FROM test_qualities tq ORDER BY tq.test_id, tq.quality_id")->fetch_all();
    foreach ($test_id_arrays as $index => $test_id_array) {
        $number_array = $numbers_arrays[$index]; //one test-quality coeffs
        $conn->query("UPDATE test_qualities SET profession1=$number_array[0], profession2=$number_array[1], profession3=$number_array[2] WHERE id=$test_id_array[0]");
    }
}


//getting info from db for all the test-qualities
$tests_results = $conn->query('SELECT t.id, tq.quality_id, profession1, profession2, profession3, tq.alias, t.name AS test_name, q.name AS quality_name FROM tests t RIGHT JOIN test_qualities tq ON t.id = tq.test_id LEFT JOIN qualities q ON q.id = tq.quality_id ORDER BY t.id, tq.quality_id');
$row = $tests_results->fetch_array();

//get amount of qualities for each test
$qualities_amount = $conn->query('SELECT test_id, count(*) AS amount FROM test_qualities GROUP BY test_id ORDER BY test_id, quality_id');
$quality = $qualities_amount->fetch_array();
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
                <th>Качество</th>
                <th>Тестировщий ПО</th>
                <th>Инди-разработчик</th>
                <th>Системный администратор</th>
            </tr>
            <?php
            // fill with values from db
            $row_num = 0;
            while ($quality) {
                $q = $quality["amount"]; //qualities amount in one test
                echo "<tr>";
                echo "<td rowspan='$q'>{$row['test_name']}</td>"; //wide cell
                for ($i=0; $i < $q; $i++) { 
                    if ($i != 0){
                        echo "<tr>";
                    }
                    echo "<td>{$row["quality_name"]} ({$row["alias"]})</td>";
                    for ($j = 0; $j < 3; $j++) {
                        $col = "profession" . ($j + 1);
                        $value = is_null($row[$col]) ? 0 : $row[$col];
                        echo "<td><input type='number' name='number[$row_num][$j]' value='$value' min='0' max='10' step='0.1'></td>"; //input fields
                    }
                    echo "</tr>";
                    
                    $row = $tests_results->fetch_array();
                    $row_num++;
                }
                $quality = $qualities_amount->fetch_array();
            }
            ?>
        </table>
        <input type='submit' name='submit' value='Сохранить данные'>
    </form>
</body>

</html>