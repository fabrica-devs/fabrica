import $ from 'jquery'
import formattingControls from './formattingControls'

function initTable() {
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
}

function textFormattingRenderer(spreadsheet, td, row, col) {
    Handsontable.renderers.TextRenderer.apply(this, arguments)

    const meta = spreadsheet.getCellMeta(row, col)

    // TODO: Set default font in formattingControls
    td.style.fontFamily = meta.fontFamily == undefined ? 'Montserrat' : meta.fontFamily
    td.style.fontWeight = meta.bold ? 'bold' : 'normal'
    td.style.fontStyle = meta.italics ? 'italic' : 'normal'
    td.style.textDecoration = meta.underline ? 'underline' : 'none'
}

export default initTable