var git = false;

window.onload = function () {
    if (window.location.href.split("?p=").length > 1) {
        urlEdit(window.location.href.split("?p=")[1]);
    }
}

window.onfocus = function () {
    if ( git ) {
        location.reload();
    } else {
        git = false;
    }
}

export function setGit() {
    git = true;
}

export function urlEdit(newPage) {
    switch (newPage) {
        case "about":
            document.getElementById("bottomInfo").children[0].children[0].click();
            urlChange(newPage);
            break;
        case "help":
            document.getElementById("rightButtonMenu").children[0].children[0].click();
            urlChange(newPage);
            document.getElementById("table").children[0].children[0].style.width = "100%";
            break;
        default:
            window.history.pushState({path:window.location.href.split("?p=")[0]},'',window.location.href.split("?p=")[0]);
            break;
    }
}

export function urlChange(newPage) {
    var curUrl = String(window.location.href);
    if (curUrl.split("?p=").length > 1) {
        curUrl = curUrl.split("?p=")[0] + "?p=" + newPage;
    } else {
        curUrl += "?p=" + newPage;
    }
    window.history.pushState({ path: curUrl }, '', curUrl);
}
