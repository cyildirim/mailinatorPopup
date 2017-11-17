// var clipboard = new Clipboard('#copy');

// clipboard.on('success', function(e) {
//     console.info('Action:', e.action);
//     console.info('Text:', e.text);
//     console.info('Trigger:', e.trigger);

//     e.clearSelection();
// });

var buttonElement;
var mailstr;

document.addEventListener('DOMContentLoaded', function () {
    buttonElement = document.getElementById("generate-mail-btn");
});





window.top.onload = function () {

    if (getCookie("email")) {
        var mailFrame = document.getElementById('mailFrame');
        console.log(" should redirect = " + mailstr);
        var emailPrefix = getCookie("email");
        mailFrame.src = "https://www.mailinator.com/v2/inbox.jsp?zone=public&query=" + emailPrefix;
        document.getElementById('generated-mail-txt').value = emailPrefix + "@mailinator.com"
    }
    document.getElementById("generate-mail-btn").addEventListener("click", function () {
        var generateMailTxt = document.getElementById('generated-mail-txt');

        var rString = randomString(10);
        mailstr = rString + "@mailinator.com";
        generateMailTxt.value = mailstr;
        var mailFrame = document.getElementById('mailFrame');
        console.log(" should redirect = " + mailstr);
        mailFrame.src = "https://www.mailinator.com/v2/inbox.jsp?zone=public&query=" + rString;
        setCookie("email", rString, 10);

    });

    document.getElementById("jumpMailinator").addEventListener("click", function () {
        chrome.tabs.create({ url: document.getElementById("mailFrame").getAttribute("src") });
    });

    var clipboard = new Clipboard('#copy');

    clipboard.on('success', function (e) {
        console.info('Action:', e.action);
        console.info('Text:', e.text);
        console.info('Trigger:', e.trigger);

        e.clearSelection();
    });




}

//---


function randomString(length) {
    var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}