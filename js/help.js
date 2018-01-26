import $ from 'jquery'

function getHelpText() {

    $.get('https://raw.githubusercontent.com/fabrica-devs/fabrica/master/help.md', function (text) {
        var converter = new showdown.Converter({
            underline: 'true',
            tasklists: 'true',
            omitExtraWLInCodeBlocks: 'true',
            headerLevelStart: 'true',
            tables: 'true',
            smoothLivePreview: 'true',
            simpleLineBreaks: 'true'
        })
        var html = converter.makeHtml(text)
        $("#innerOverlayContainer").html("<div id='helpContainer'>" + html + "</div>")
    });
}

export default getHelpText