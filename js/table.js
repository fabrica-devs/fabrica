/* Clemens */

window.onload = function () {
    if ( window.location.href.split("?p=").length > 1) {
        urlEdit(window.location.href.split("?p=")[1]);
    }
}

function urlEdit(newPage) {
    switch (newPage) {
        case "about":
            document.getElementById("bottomInfo").children[0].children[0].click();
            urlChange(newPage);
            break;
        case "help":
            document.getElementById("rightButtonMenu").children[0].children[0].click();
            urlChange(newPage);
            break;
        default:
            window.history.pushState({path:window.location.href.split("?p=")[0]},'',window.location.href.split("?p=")[0]);
            break;
    }
}

function urlChange(newPage) {
    var curUrl = String(window.location.href);
    if (curUrl.split("?p=").length > 1) {
        curUrl = curUrl.split("?p=")[0] + "?p=" + newPage;
    } else {
        curUrl += "?p=" + newPage;
    }
    window.history.pushState({path:curUrl},'',curUrl);
}

/* Andi */

$(document).ready(() => {
    const $container = $('#table')

    console.log($(window).height() - $('#topbar').height())

    const spreadsheet = new Handsontable($container.get(0), {
        height: $(window).height() - $('#topbar').height(),
        width: '100%',

        rowHeaders: true,
        colHeaders: true,

        rowHeights: 25,
        colWidths: 80,

        startRows: 26,
        startCols: 26,

        rowHeaderWidth: 30,

        contextMenu: true
    })
})
