import $ from 'jquery'
import getHelpText from './help'
import { hideSidebar, slide, changeLogo, initStyling } from './styling'
import { urlChange, setGit } from './url'
import initTable from './table'
import testBrowserSupport from './supportedBrowser'

$(document).ready(() => {
    testBrowserSupport()
    initStyling()
    initTable()

    $('.helpbutton').click(() => {
        slide(this, 'help', 'tablecalc')
        urlChange('help')
        getHelpText()
    })

    $('.showHideButton').click(() => {
        hideSidebar('empty')
    })

    $('.service.about.hoverable').click(() => {
        slide(this, 'about', 'tablecalc')
        urlChange('about')
    })

    $('.service.git.hoverable').click(() => {
        setGit()
    })

    $('.fabricaLogoImg').click(() => {
        changeLogo()
    })
})