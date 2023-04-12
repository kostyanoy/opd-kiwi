<?php 
// text on a page
$profile = [
    [
        "english" => "login",
        "russian" => "Логин",
    ],
    [
        "english" => "email",
        "russian" => "Почта",
    ],
    [
        "english" => "age",
        "russian" => "Возраст",
    ],
    [
        "english" => "gender",
        "russian" => "Пол",
    ],
    [
        "english" => "status",
        "russian" => "Статус",
    ],
];

// name_of_test => [db_column, name_of_columns]
$tests = [
    // basic columns
    "other" => [
        [
            "english" => "avg_time",
            "russian" => "Среднее время",
        ],
        [
            "english" => "total_time",
            "russian" => "Всего время",
        ],
        [
            "english" => "correct",
            "russian" => "Правильно",
        ],
        [
            "english" => "misses",
            "russian" => "Промахи",
        ],
        [
            "english" => "date",
            "russian" => "Дата",
        ],        
    ],
    "Точность реакции (простая)" => [
        [
            "english" => "avg_time",
            "russian" => "Средняя точность",
        ],
    ],
    "Точность реакции (сложная)" => [
        [
            "english" => "avg_time",
            "russian" => "Средняя точность",
        ],
    ],
];
?>