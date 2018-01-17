function urlEdit( newPage, sideBarHide ) {
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
            var curUrl = window.location.href;
            if ( curUrl.split("?b=").length > 1 ) {
                
            }
            break;
    }
}

function urlChange(newPage) {
    var curUrl = window.location.href;
    if ( curUrl.split("?p=").length > 1 ) {
        curUrl.split("?p=")[1] = "about";
    } else {
        curUrl += "?p=" + newPage;
    }
}

$(document).ready(() => {
    const $container = $('#table')

    console.log($(window).height() - $('#topbar').height())

    const spreadsheet = new Handsontable($container.get(0), {
        height: $(window).height() - $('#topbar').height(),
        width: $container.width(),

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
