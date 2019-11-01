let xmlhttp = new XMLHttpRequest();
var url = "https://tj-scanner-beta.herokuapp.com/api/scanner/";


let scanner = new Instascan.Scanner({
    video: document.getElementById('preview')
});
scanner.addListener('scan', function(content) {
    scanner.stop()
    document.getElementById("btnAgain").style.display = "block";
    document.getElementById("outdiv").style.display = "none";
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var myArr = JSON.parse(this.responseText);
            if (myArr.authentication == "successful") {
                document.getElementById('successMessage').style.display = "block"

                document.getElementById("cardName").textContent = myArr.name;
                document.getElementById("image").src = myArr.imageUrl;
                document.getElementById('about').textContent = myArr.about;
                document.getElementById('hobbies').textContent = myArr.hobbies
                document.getElementById('skill0').textContent = myArr.skills[0]
                document.getElementById('skill1').textContent = myArr.skills[1]
                document.getElementById('skill2').textContent = myArr.skills[2]
                document.getElementById('skill3').textContent = myArr.skills[3]
                document.getElementById('twitter').onclick = () => { window.location.href = myArr.twitter; }
                document.getElementById('linkedin').onclick = () => { window.location.href = myArr.linkedin; }
                document.getElementById('twitter').onclick = () => { window.location.href = myArr.github; }
                document.getElementById("memberInfo").style.display = "block";

            } else {
                document.getElementById("notFound").style.display = "block";
            }
        }
    };
    xmlhttp.open("GET", url + content, true);
    xmlhttp.send();
});

document.getElementById("btnAgain").onclick = function() {
    document.getElementById("btnAgain").style.display = "none";
    document.getElementById("memberInfo").style.display = "none";
    document.getElementById("notFound").style.display = "none";
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