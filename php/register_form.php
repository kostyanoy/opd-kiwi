<!DOCTYPE html>
<html lang="ru">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/css/auth.css">
    <title>Регистрация</title>
</head>

<body>
    <?php
    try {
        include_once("register.php");
    } catch (Exception $e) {
        echo $e->getMessage();
    }
    ?>
    <form method="post">
        <label>
            Логин:
            <input type="text" name="username" required>
        </label>
        <br>
        <label>
            Почта:
            <input type="email" name="email" required>
        </label>
        <br>
        <label>
            Пароль:
            <input type="password" name="password" required>
        </label>
        <br>
        <label>
            Возраст:
            <input type="number" min="0" max="100" name="age" required>
        </label>
        <br>
        <label>
            Пол:
            <select name="gender" required>
                <option value="male">Мужчина</option>
                <option value="female">Женщина</option>
                <option value="helicopter">Боевой вертолёт</option>
            </select>
        </label>
        <br>
        <br>
        <label>
            Код эксперта (необязательно):
            <input type="text" name="expert_code" autocomplete="off">
        </label>
        <br>
        <button type="submit">Зарегистрироваться</button>
    </form>
    <div class="button-container">
        <a href="login_form.php" class="button">Вход</a>
        <a href="/" class="button">На главную</a>
    </div>

</body>

</html>