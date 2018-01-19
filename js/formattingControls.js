const formattingControls = (() => {
    const optionChangeCallbacks = $.Callbacks()
    let formattingOptions = {}

    return {
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
            /*
            TODO:
            - Load list of fonts
            - Detect if fonts are available (3rdparty/detector.js)
            - Add available fonts to dropdown
            - On select, change options to new font and fire optionChangeCallbacks
             */
        },

        registerDefault() {
            this.reset()
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
})()

$(document).ready(() => formattingControls.registerDefault())