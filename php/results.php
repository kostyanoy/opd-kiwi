<?php

//get percent of max score
function get_percent($score, $max_score): int {
    return round($score / $max_score * 100);
}

//preparing
include_once("boot.php");

//must be logged in
if (!is_auth()) {
    header("Location: login_form.php");
}

//getting db connection and user id
$conn = get_db_connection();
$user_id = $_SESSION["user_id"];

//get scores of the last tries
$sql = 'select tc.test_id, tr.score, tc.profession1, tc.profession2, tc.profession3 from test_coefficients tc LEFT JOIN ( SELECT tr.test_id as test_id, max(date) as date From test_results tr where tr.user_id = ? group by tr.test_id ) lt on lt.test_id = tc.test_id LEFT JOIN test_results tr on tr.date = lt.date ORDER BY tc.test_id';
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $user_id);
$stmt->execute();
$tests = $stmt->get_result();
$stmt->close();

$scores = array(0, 0, 0);
$max_scores = array(0.1, 0.1, 0.1);

$row = $tests->fetch_array();

//sum up currecnt and max scores
while ($row) {
    $s = is_null($row["score"]) ? 0 : $row["score"];
    $scores[0] += $s * $row["profession1"];
    $scores[1] += $s * $row["profession2"];
    $scores[2] += $s * $row["profession3"];

    $max_scores[0] += 100 * $row["profession1"];
    $max_scores[1] += 100 * $row["profession2"];
    $max_scores[2] += 100 * $row["profession3"];

    $row = $tests->fetch_array();
}

?>


<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/css/globalResults.css">
    <title>Результат</title>
</head>

<body>
    <a href="/testPage.html" class="return-button">Назад</a>
    <p class="hint">Пройдите больше тестов, чтобы улучшить результат и сделать его точнее!</p>
    <div class="flex-wrapper">
        <div class="single-chart">
            <div class="title">Инди-разработчик</div>
            <svg viewBox="0 0 36 36" class="circular-chart orange">
                <path class="circle-bg" d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path id="dPath1" class="circle" stroke-dasharray="<?php echo get_percent($scores[0], $max_scores[0])?>, 100" d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831" />
                <text id="dText1" x="18" y="20.35" class="percentage"><?php echo get_percent($scores[0], $max_scores[0])?>%</text>
            </svg>
        </div>

        <div class="single-chart">
            <div class="title">Тестировщик ПО</div>
            <svg viewBox="0 0 36 36" class="circular-chart green">
                <path class="circle-bg" d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path id="dPath2" class="circle" stroke-dasharray="<?php echo get_percent($scores[1], $max_scores[1])?>, 100" d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831" />
                <text id="dText2" x="18" y="20.35" class="percentage"><?php echo get_percent($scores[1], $max_scores[1])?>%</text>
            </svg>
        </div>

        <div class="single-chart">
            <div class="title">Сисадмин</div>
            <svg viewBox="0 0 36 36" class="circular-chart blue">
                <path class="circle-bg" d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path id="dPath3" class="circle" stroke-dasharray="<?php echo get_percent($scores[2], $max_scores[2])?>, 100" d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831" />
                <text id="dText3" x="18" y="20.35" class="percentage"><?php echo get_percent($scores[2], $max_scores[2])?>%</text>
            </svg>
        </div>
    </div>

    <div class="professions">
        <div class="profession">
            <h3 class="title">Инди-разработчик</h3>
            <p class="description">
                Инди-разработчик в меньшей степени подвергается влиянию стереотипов игровой индустрии. Как правило, он
                менее ориентирован на бизнес, у него другие источники мотивации и другие цели. В первую очередь
                инди-игра — это художественное высказывание
            </p>
        </div>

        <div class="profession">
            <h3 class="title">Тестировщик ПО</h3>
            <p class="description">
                Ни в одном российском ВУЗе нет специальности под названием «тестировщик». Дело в том, что тестировщик –
                разноплановый специалист, который способен подстраиваться под особенности работы конкретной компании и
                ее продукта
            </p>
        </div>

        <div class="profession">
            <h3 class="title">Системный администратор</h3>
            <p class="description">
                Системный администратор — постоянный герой мемов про перипетии офисной жизни, в которых персонаж дает
                отпор просьбам перетащить шкаф или починить телефон. Но сисадмины, вопреки стереотипам, не просто жмут
                на злосчастную any key, они спасают сотрудников, налаживают работу и защищают важные данные компании
            </p>
        </div>
    </div>
</body>

</html>