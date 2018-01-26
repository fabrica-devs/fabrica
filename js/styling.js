import $ from 'jquery'

var topbarLeftButtonMenu;
var texts = [
    [
        'about',
        `
        <div id="about">
            <h1 class="headerText">Welcome! We are Fabrica</h1>
            <div class="logocontainer">
                <div class="logos">
                    <a target="_blank" href="https://andreashae.github.io/">
                        <img src="media/andi.png" alt="IMG">
                        <h2>Andreas (Andi) Hässler</h2>
                        <code>Project Management,<br>Development</code>
                    </a>
                    <a target="_blank" href="https://github.com/UrMaBo">
                        <img src="media/Clemens.png" alt="IMG">
                        <h2>Clemens</h2>
                        <code>Development</code>
                    </a>
                    <a target="_blank" href="https://github.com/WhatdidusayWhat">
                        <img src="media/What.png" alt="IMG">
                        <h2>What?!</h2>
                        <code>Technical Writing,<br>Documentation</code>
                    </a>
                    <a target="_blank" href="https://github.com/GabrielDeutner">
                        <img src="media/Gabi.png" alt="IMG">
                        <h2>Gabriel (Gabi) Deutner</h2>
                        <code>Design and development of user interface</code>
                    </a>
                </div>
            </div>
        </div>
        `
    ],
    [
        'help',
        `<div id="help>Test</div>`
    ]
]
let sidebarHeight = null
let topbarMargin = null
let topbarWidth = null

/* On Page Load */
$(document).ready(function () {
    changeLogo();

    /* Realignes objects on Resize */
    $(window).on('resize', function () {
        if (!$('.positionindicator').hasClass('help') || $(window).height() <= 472) {
            $('#innerOverlay').css('height', $(window).height() - 72);
        }
        topbarWidth = $(window).width() - 193;
        if ($('#sidebar').height() != 0) {
            $('#sidebar').css('height', '100vh');
            $('#mainArea').animate({
                margin: `0 0 0 ${topbarMargin}`,
                width: `${$(window).width()}`
            }, 100);
            $('#topbar').animate({
                margin: `0 0 0 ${topbarMargin}`,
                width: `${topbarWidth}px`
            }, 100);
        }
    });

    /* Saves buttons, margins and other CSS attributes */
    topbarLeftButtonMenu = $('#topbar #leftButtonMenu').html();
    sidebarHeight = $('#sidebar').css('height');
    topbarMargin = $('#topbar').css('margin-left');
    topbarWidth = $('#topbar').css('width');

    fixTopbar();
});

/* When the Topbar gets changed, all the handlers are removed, method reapplies them */
function fixTopbar() {

    /* Set the Height of the innerOverlay according to the height of the window */
    $('#innerOverlay').css('height', $(window).height() - 72);

    /* Add the font-size controll again */
    $('#fontsizeselector').on('blur', function () {
        console.log($(this).val());
        if ($(this).val() < 3 || $(this).val() > 72) {
            $(this).val(12);
        }
    });

    fixCollapsedButtons();

    /* Applies fontfamily selection again */
    $('#fontfamilyselector').on('change', function () {
        $('#fontfamilyselector').css('font-family', `${this.value}, sans-serif`);
    });
}

/* Write into the inner Overlay */
function writeOverlay(to) {
    if (to != 'Empty') {
        for (let i = 0; i < texts.length; i++) {
            console.log(`Identifier: ${texts[i][0]}, Text: ${texts[i][1]}, Searching for: ${to}`);
            if (texts[i][0] == to) {
                $('#innerOverlayContainer').html(texts[i][1]);
                return;
            }
        }
    } else {
        $('#innerOverlayContainer').html('');
    }
}

/* Changes the indicator in the top right corner */
function changeIndicatorButton(to, from) {
    lastButtonText = $('.positionindicator div').html();
    $('.positionindicator div').fadeOut(200, function () {
        $('.positionindicator').addClass(to).removeClass(from);
        if (to == 'tablecalc') {
            $(this).html(`<h1>table</h1><p>calculation</p>`).fadeIn(200);
        } else {
            $(this).html(to).fadeIn(200);
        }
    });
}

/* Changes offset of dropdown menu */
function fixCollapsedButtons() {
    $('.collapsed').on('mouseenter', function () {
        let buttonClass = $(this).attr('class').replace('buttoncontainer ', '').replace('button ', '').replace('collapsed ', '');
        $(`.dropdown.${buttonClass}`).css('left', $(this).offset().left);
    });
    $('.collapsed').on('click', function () {
        let buttonClass = $(this).attr('class').replace('buttoncontainer ', '').replace('button ', '').replace('collapsed ', '');
        if ($(`.dropdown.${buttonClass}`).hasClass('toggled')) {
            $(`.dropdown.${buttonClass}`).removeClass('toggled');
        } else {
            $(`.dropdown.${buttonClass}`).addClass('toggled');
        }
    });
}

function slideUp(to, from) {

    showSidebar();

    changeIndicatorButton(to, from);

    $('#innerOverlay').slideUp(400, function () {
        $('#topbar #leftButtonMenu').fadeOut(400, function () {
            $('#topbar #leftButtonMenu').html(topbarLeftButtonMenu);

            // reregister controls because elements are recreated
            formattingControls.registerDefault()
            $('#topbar *').fadeIn(400);
            fixCollapsedButtons();
            $(`.dropdown`).removeAttr('style');
        });
        writeOverlay('Empty');
    });
}

function slideDown(to, from) {

    sidebarHeight = $('#sidebar').css('height');
    topbarMargin = $('#topbar').css('margin-left');
    topbarWidth = $('#topbar').css('width');

    if (to == 'help') {
        hideSidebar();
        $('#innerOverlay').css('height', $(window).height() - 400);
        $('#innerOverlay').css('position', 'absolute');
        $('#innerOverlay').css('background-color', 'rgba(255,255,255,0.8)');
    } else {
        $('#innerOverlay').css('height', $(window).height() - 72);
        $('#innerOverlay').css('position', 'absolute');
        $('#innerOverlay').css('background-color', 'white');
    }

    writeOverlay(to);

    changeIndicatorButton(to, from);

    $('#innerOverlay').slideDown(400, function () {
        $('#topbar #leftButtonMenu .buttoncontainer, .helpbuttoncontainer').fadeOut(400, function () {
            $('#topbar #leftButtonMenu .buttoncontainer').remove();
            if (to == 'help') {
                $('#leftButtonMenu .showHideButton').remove();
                $('#topbar #leftButtonMenu *').remove();
                $('#topbar #leftButtonMenu').append(topbarLeftButtonMenu);
                // reregister controls because elements are recreated
                formattingControls.registerDefault()
                fixCollapsedButtons();
            }
            $('#topbar #leftButtonMenu').prepend(`<div class="button buttoncontainer back" onclick="slide(this, '${from}', '${to}'); urlEdit('back');">Back</div>`);
            $('#topbar #leftButtonMenu .buttoncontainer').fadeIn(400);
            $('#topbar #leftButtonMenu .buttoncontainer').css('display', 'flex', 'align-items', 'center', 'text-align', 'center');
        });
    });

}

function slide(button, to, from) {
    if (button.innerText != "Back") {
        topbarLeftButtonMenu = $('#topbar #leftButtonMenu').html();
        slideDown(to, from);
    } else {
        slideUp(to, from);
    }
    setTimeout(function () { document.getElementById("table").children[0].children[0].style.width = "100%"; }, 400);
}

function hideSidebar(special) {
    $('#sidebar, #sidebarshadowfix').animate({
        height: 0
    }, 400, function () {
        $('#leftButtonMenu').animate({
            margin: '0 0 0 0.4%'
        }, 200);
        $('#mainArea').animate({
            margin: '0 0 0 0',
            width: '100vw'
        }, 400);
        $('#topbar').animate({
            margin: 0,
            width: '100%'
        }, 400);
    });
    $('.helpbutton').fadeOut(400);
    if (special == "empty") {
        $('#leftButtonMenu .showHideButton').remove();
        $('#leftButtonMenu').prepend(`<p class="showHideButton" onclick="showSidebar('empty')">Show</p>`);
        $('#leftButtonMenu .showHideButton').animate({
            height: '20px'
        }, 400);
    }
    setTimeout(function () { document.getElementById("table").children[0].children[0].style.width = "100%"; }, 400);
}

function showSidebar(special) {
    if (special == "empty") {
        $('#leftButtonMenu .showHideButton').animate({
            width: 0
        }, 400, function () {
            $('#leftButtonMenu .showHideButton').remove();
        });
    }
    $('.helpbutton').fadeIn(400);
    topbarWidth = $(window).width() - 193;
    $('#mainArea').animate({
        margin: '0 0 0 193px',
        width: topbarWidth
    }, 400);
    $('#topbar').animate({
        margin: `0 0 0 ${topbarMargin}`,
        width: `${topbarWidth}px`
    }, 400, function () {
        $('#sidebar, #sidebarshadowfix').animate({
            height: sidebarHeight
        }, 400);
    });
    $('#leftButtonMenu').animate({
        margin: '0 0 0 0'
    }, 200);
}

function showFunctionBar() {
    $('#topbar #leftButtonMenu').append(topbarLeftButtonMenu).fadeIn(400);
}

function changeLogo() {
    const turtles = ['king', 'owo', 'think', 'thumbsup', 'worker'];
    let rand = Math.floor((Math.random() * 5));
    $('.fabricaLogoImg.toggable').attr('src', `media/turtles/turtle${turtles[rand]}.png`);
}