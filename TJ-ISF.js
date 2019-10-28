let scanner = new Instascan.Scanner({
    video: document.getElementById('preview')
});
scanner.addListener('scan', function(content) {
    scanner.stop()
    document.getElementById("outdiv").style.display = "none";
    document.getElementById("memberInfo").style.display = "block";
    document.getElementById("cardName").textContent = content;
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