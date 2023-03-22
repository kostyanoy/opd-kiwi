<!doctype html>
<html lang="ru">
<head>
  <title>Админ-панель</title>
</head>
<body>
  <?php
    include_once("boot.php");

    $host = 'localhost';  // Хост, у нас все локально
    $username = 'notrightbu';    // Имя созданного вами пользователя
    $password = 'Mazda767'; // Установленный вами пароль пользователю
    $db_name = 'notrightbu';   // Имя базы данных
    $conn = new mysqli($host, $username, $password, $db_name); // Соединяемся с базой

    // Ругаемся, если соединение установить не удалось
    if ($conn->connect_error) {
      die('Не могу соединиться с БД. Код ошибки: ' . $conn->connect_errno . ', ошибка: ' . $conn->connect_error);
    }

    //Если переменная name передана
    if (isset($_POST["name"])) {
      //Если это запрос на обновление, то обновляем
      if (isset($_GET['red'])) {
        $sql = $conn->query("UPDATE `experts` SET `name` = '{$_POST['name']}' WHERE `id`={$_GET['red']}");
      } else {
        //Иначе вставляем данные, подставляя их в запрос
        $sql = $conn->query("INSERT INTO `experts` (`name`) VALUES ('{$_POST['name']}')");
      }

      //Если вставка прошла успешно
      if ($sql) {
        echo '<p>Успешно!</p>';
      } else {
        echo '<p>Произошла ошибка: ' . $conn->error . '</p>';
      }
    }

    //Удаляем, если что
    if (isset($_GET['del'])) {
      $sql = $conn->query("DELETE FROM `experts` WHERE `id` = {$_GET['del']}");
      if ($sql) {
        echo "<p>Эксперт удален.</p>";
      } else {
        echo '<p>Произошла ошибка: ' . $conn->error . '</p>';
      }
    }

    //Если передана переменная red, то надо обновлять данные. Для начала достанем их из БД
    if (isset($_GET['red'])) {
      $sql = $conn->query("SELECT `id`, `name` FROM `experts` WHERE `id`={$_GET['red']}");
      $product = $sql->fetch_array();
    }
  ?>
  <form action="" method="post">
    <table>
      <tr>
        <td>Имя эксперта:</td>
        <td><input type="text" name="name" value="<?= isset($_GET['red']) ? $product['name'] : ''; ?>"></td>
      </tr>
      <tr>
        <td colspan="2"><input type="submit" value="OK"></td>
      </tr>
    </table>
  </form>
  <?php
  //Получаем данные
  $i = 1;
  $sql = $conn->query('SELECT `id`, `name` FROM `experts`');
  while ($result = $sql->fetch_array()) {
    echo "<p>{$i}) {$result['name']} - <a href='?del={$result['id']}'>Удалить</a> - <a href='?red={$result['id']}'>Редактировать</a></p>";
    $i++;
  }
  ?>
  <p><a href="?add=new">Добавить нового эксперта</a></p>
</body>
</html>