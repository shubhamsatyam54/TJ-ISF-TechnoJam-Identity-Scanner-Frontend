let xmlhttp = new XMLHttpRequest();
var url = "https://tj-scanner-beta.herokuapp.com/api/scanner/";


let scanner = new Instascan.Scanner({
    video: document.getElementById('preview')
});
scanner.addListener('scan', function(content) {
    scanner.stop()
    document.getElementById("outdiv").style.display = "none";
    document.getElementById("memberInfo").style.display = "block";
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var myArr = JSON.parse(this.responseText);
            console.log(myArr)
            document.getElementById("cardName").textContent = myArr.name;
        }
    };
    xmlhttp.open("GET", url + content, true);
    xmlhttp.send();
});

document.getElementById("btn").onclick = function() {
    document.getElementById("btn").style.display = "none";
    Instascan.Camera.getCameras().then(function(cameras) {
        if (cameras.length > 0) {
            scanner.start(cameras[0]);
            document.getElementById("outdiv").style.display = "block";
        } else {
            console.error('No cameras found.');
        }
    }).catch(function(e) {
        console.error(e);
    });
}