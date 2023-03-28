// Событие отправки формы
document.getElementById("sendForm").addEventListener("submit", function (event) {
    // Отменяем стандартное поведение формы
    event.preventDefault();

    // Получаем данные из формы
    const formData = new FormData(event.target);

    // Отправляем AJAX запрос на сервер
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/php/send_test_result.php", true);
    xhr.onload = function () {
        if (this.status === 200) {
            // Обработка ответа сервера
            console.log(this.responseText);
        }
    };
    xhr.send(formData);
});

function submit() {
    document.getElementById("submit-button").click();
}