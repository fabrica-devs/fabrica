/* Clemens */

window.onload = function() {
    if ( typeof(Storage) !== undefined ) {
        if ( localStorage.getItem("lastSite").split("?p=").length > 1 && localStorage.getItem("lastSite") !== undefined) {
            urlEdit(localStorage.getItem("lastSite").split("?p=")[1]);
        }
    }
}

function urlEdit( newPage ) {
    switch(newPage) {
        case "about":
            document.getElementById("bottomInfo").children[0].children[0].click();
            urlChange(newPage);
            break;
        case "help":
            document.getElementById("bottomInfo").children[0].children[1].click();
            urlChange(newPage);
            break;
        default:
            window.location.href = window.location.href.split("?p=")[0];
            if ( typeof(Storage) !== undefined ) {
                localStorage.setItem("lastSite", window.location.href);
            }
            break;
    }
}

function urlChange(newPage) {
    var curUrl = window.location.href;
    if ( curUrl.split("?p=").length > 1 ) {
        curUrl = curUrl.split("?p=")[0] + "?p=" + newPage;
    } else {
        curUrl += "?p=" + newPage;
    }
    if ( typeof(Storage) !== undefined ) {
        localStorage.setItem("lastSite", curUrl);
    }
}

/* Andi */

$(document).ready(() => {
    const container = document.getElementById('table')

    const spreadsheet = new Handsontable(container, {
        rowHeaders: true,
        colHeaders: true,
        startRows: 26,
        startCols: 26,
        contextMenu: true
    })
})