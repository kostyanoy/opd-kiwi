<!DOCTYPE html>
<html lang="ru">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
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
            Username:
            <input type="text" name="username">
        </label>
        <br>
        <label>
            Email:
            <input type="email" name="email">
        </label>
        <br>
        <label>
            Password:
            <input type="password" name="password">
        </label>
        <br>
        <button type="submit">Зарегистрироваться</button>
    </form>
    <form action="login_form.php">
        <button>Вход</button>
    </form>
</body>

</html>