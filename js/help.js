function getHelpText() {

    jQuery.get('https://raw.githubusercontent.com/fabrica-devs/fabrica/master/help.md', function(text) {
        var converter = new showdown.Converter({
                underline: 'true',
                tasklists: 'true',
                omitExtraWLInCodeBlocks: 'true',
                headerLevelStart: 'true',
                tables: 'true',
                smoothLivePreview: 'true',
                simpleLineBreaks: 'true',
                underline: 'true'
            }),
            html = converter.makeHtml(text)
        $("#innerOverlayContainer").html("<div id='helpContainer'>" + html + "</div>")
    });
}