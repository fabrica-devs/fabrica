import $ from 'jquery'
import getHelpText from './help'
import { hideSidebar, slide, changeLogo } from './styling'
import './supportedBrowser'
import './help'
import './formattingControls'
import { urlChange, setGit } from './table'

$(document).ready(() => {
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