let array = JSON.parse(sessionStorage.getItem("percentage"))

let devRes = array[0]
let sysRes = array[1]
let testRes = array[2]

document.getElementById("dText1").innerHTML = devRes + '%';
document.getElementById("dPath1").setAttribute("stroke-dasharray", devRes + ", 100")

document.getElementById("dText2").innerHTML = sysRes + '%';
document.getElementById("dPath2").setAttribute("stroke-dasharray", sysRes + ", 100")

document.getElementById("dText3").innerHTML = testRes + '%';
document.getElementById("dPath3").setAttribute("stroke-dasharray", testRes + ", 100")