let developer = ['Интрапунитивность', 'Переключаемость внимания', 'Самоорганизация', 'Аналитичность', 'Умственная работоспособность', 'Образное воображение', 'Планирование', 'Креативность', 'Многозадачность'];
let tester = ['Оперативность', 'Креативность', 'Внимательность', 'Выносливость', 'Транссонантность', 'Умственная работоспособность', 'Концентрирование внимания'];
let sysAdmin = ['Многозадачность', 'Самостоятельность', 'Исполнительность', 'Оперативность', 'Самоконтроль', 'Распределённое внимание', 'Наблюдательность'];

const checkboxes = document.querySelectorAll('input[type=checkbox]');
let checkedCount = 0;
checkboxes.forEach(function (checkbox) {
    checkbox.addEventListener('click', function () {
        if (checkbox.checked) {
            checkedCount++;
            if (checkedCount > 15) {
                checkbox.checked = false;
                checkedCount--;
            }
        } else {
            checkedCount--;
        }
    });
});

let devSum = 0;
let testSum = 0;
let sysSum = 0;

calc.onclick = function () {
    devSum = 0;
    testSum = 0;
    sysSum = 0;

    const myform = document.getElementById("test");
    const chbx = myform['test'];

    for (let d of developer) {
        for (let i = 0; i < chbx.length; i++) {
            if (chbx[i].checked && (chbx[i].value == d))
                devSum++;
        }
    }

    for (let t of tester) {
        for (let i = 0; i < chbx.length; i++) {
            if (chbx[i].checked && (chbx[i].value == t))
                testSum++;
        }
    }
    for (let s of sysAdmin) {
        for (let i = 0; i < chbx.length; i++) {
            if (chbx[i].checked && (chbx[i].value == s))
                sysSum++;
        }
    }

    let devRes = Math.round((devSum / developer.length) * 100);
    let sysRes = Math.round((sysSum / sysAdmin.length) * 100);
    let testRes = Math.round((testSum / tester.length) * 100)

    const send = [devRes, testRes, sysRes]

    sessionStorage.setItem("percentage", JSON.stringify(send))
}
;
