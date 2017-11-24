var buttonElement;
var mailstr;

document.addEventListener('DOMContentLoaded', function () {
    buttonElement = document.getElementById("generate-mail-btn");
});



window.top.onload = function () {

    var emailFromCookie = getCookie("email")
    if (emailFromCookie !== undefined ) {
        setEmail(emailFromCookie)
    }

    document.getElementById("generate-mail-btn").addEventListener("click", function () {
        setEmail();
    });

    document.getElementById("jumpMailinator").addEventListener("click", function () {
        chrome.tabs.create({ url: document.getElementById("mailFrame").getAttribute("src") });
    });


    function setEmail(emailPrefix) {
        if(emailPrefix  === undefined)  {
            emailPrefix = randomString(10).toLowerCase();
            setCookie("email", emailPrefix, 10);
        }

        document.getElementById('generated-mail-txt').value = emailPrefix
        

        
        var mailFrame = document.getElementById('mailFrame');
        console.log(" should redirect = " + emailPrefix);
        mailFrame.src = "https://www.mailinator.com/v2/inbox.jsp?zone=public&query=" + emailPrefix;

        
        
    }
    var clipboard = new Clipboard('#copy',{
        text: function(trigger) {
            return document.getElementById("generated-mail-txt").value+"@mailinator.com";
        }
    });

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