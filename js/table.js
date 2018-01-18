/* Clemens */

window.onload = function () {
    if (window.location.href.split("?p=").length > 1) {
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
            setTimeout(function() {tableWidthResize(true)}, 400);
            break;
        default:
            window.history.pushState({path:window.location.href.split("?p=")[0]},'',window.location.href.split("?p=")[0]);
            tableWidthResize(false);
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
    window.history.pushState({ path: curUrl }, '', curUrl);
}

function tableWidthResize(widen) {
    if ( widen ) {
        document.getElementsByClassName("wtHolder")[0].style.width = "100%";
    } else {
        document.getElementsByClassName("wtHolder")[0].style.width = window.innerWidth - document.getElementById("sidebar").style.width;
    }
}

function textDeco(type) {
    switch(type) {
        case "b":
            if ( document.getElementById("leftButtonMenu").children[9].children[0].getClassList.length == 4 ) {
                //append </b> to cellVariable 
            } else {
                //append <b> to cellVariable
            }
            break;
        case "i":
            if ( document.getElementById("leftButtonMenu").children[9].children[1].getClassList.length == 4 ) {
                //append </i> to cellVariable 
            } else {
                //append <i> to cellVariable
            }
            break;
        case "u":
            if ( document.getElementById("leftButtonMenu").children[9].children[2].getClassList.length == 4 ) {
                //append </u> to cellVariable 
            } else {
                //append <u> to cellVariable
            }
            break;
    }
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

        startRows: 99,
        startCols: 50,

        rowHeaderWidth: 30,

        contextMenu: true
    })
})
