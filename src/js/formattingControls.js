import $ from 'jquery'

const optionChangeCallbacks = $.Callbacks()
let formattingOptions = {}
let $toggleButtons = $()

const formattingControls = {
    reset() {
        $toggleButtons = $()
        formattingOptions = {}
    },

    registerToggleButton($selector, name) {
        $toggleButtons = $toggleButtons.add($selector)

        const isSelected = () => $selector.hasClass('selected')

        $selector.click(() => {
            if (isSelected()) {
                $selector.removeClass('selected')
            } else {
                $selector.addClass('selected')
            }

            formattingOptions[name] = isSelected()

            optionChangeCallbacks.fire(formattingOptions)
        })

        formattingOptions[name] = $selector.hasClass('selected')
    },

    registerFontSelector($selector) {
        const baseFonts = [
            'Montserrat',
            'Pacifico',
            'sans-serif',
            'serif',
            'monospace',
            'cursive'
        ]
        baseFonts.forEach(font => $selector.append(`<option>${font}</option>`))

        const testedFonts = [
            'Arial',
            'Arial Black',
            'Verdana'
        ]

        const detector = new Detector()
        const installedFonts = testedFonts.filter(font => detector.detect(font))
        installedFonts.forEach(font => $selector.append(`<option>${font}</option>`))

        $selector.change(e => {
            const selectedFont = e.target.value
            formattingOptions.fontFamily = selectedFont
            optionChangeCallbacks.fire(formattingOptions)
        })

        formattingOptions.fontFamily = baseFonts[0]
    },

    registerDefault() {
        this.reset()
        this.registerFontSelector($('#fontfamilyselector'))
        this.registerToggleButton($('.formattingbutton.bold'), 'bold')
        this.registerToggleButton($('.formattingbutton.italics'), 'italics')
        this.registerToggleButton($('.formattingbutton.underscore'), 'underline')
    },

    getFormattingOptions() {
        return formattingOptions
    },

    onChangeOptions(callback) {
        optionChangeCallbacks.add(callback)
    }
}

export default formattingControls