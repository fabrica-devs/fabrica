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