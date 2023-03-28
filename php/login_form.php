<!DOCTYPE html>
<html lang="ru">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/css/auth.css">
    <title>Вход</title>
</head>

<body>
    <?php
    include_once("boot.php");

    if (is_auth()){
        header('Location: ../index.html');
    }

    try {
        include_once("login.php");
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
            Пароль:
            <input type="password" name="password" required>
        </label>
        <br>
        <button type="submit">Войти</button>
    </form>
    <div class="button-container">
        <a href="register_form.php" class="button">Регистрация</a>
        <a href="/index.html" class="button">На главную</a>
    </div>
</body>

</html>