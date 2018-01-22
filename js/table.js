/* Clemens */

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

function setGit() {
    git = true;
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
            document.getElementById("table").children[0].children[0].style.width = "100%";
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
    window.history.pushState({ path: curUrl }, '', curUrl);
}


/* Andi */

$(document).ready(() => {
    const $container = $('#table')

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

        contextMenu: true,
        outsideClickDeselects: false,

        renderer: textFormattingRenderer
    })

    formattingControls.onChangeOptions(options => {
        const range = spreadsheet.getSelectedRange()
        if (!range) return

        range.forAll((row, col) => {
            spreadsheet.setCellMetaObject(row, col, options)
        })

        spreadsheet.render()
    })
})

function textFormattingRenderer(spreadsheet, td, row, col, prop, value, cellProperties) {
    Handsontable.renderers.TextRenderer.apply(this, arguments)

    const meta = spreadsheet.getCellMeta(row, col)

    // TODO: Set default font in formattingControls
    td.style.fontFamily = meta.fontFamily == undefined ? 'Montserrat' : meta.fontFamily
    td.style.fontWeight = meta.bold ? 'bold' : 'normal'
    td.style.fontStyle = meta.italics ? 'italic' : 'normal'
    td.style.textDecoration = meta.underline ? 'underline' : 'none'
}