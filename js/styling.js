var topbarLeftButtonMenu;
var texts = [
    [
        'about',
        `
        <div id="about">
            <h1 class="headerText">Welcome! We are Fabrica</h1>
            <div class="logocontainer">
                <div class="logos">
                    <div>
                        <img src="media/andi.png" alt="IMG">
                        <h2>Andreas (Andi) Hässler</h2>
                        <code>Project Management/Implementation of the Table Calculation</code>
                    </div>
                    <div>
                        <img src="media/Clemens.png" alt="IMG">
                        <h2>Clemens</h2>
                        <code>Implementation of the Table Calculation</code>
                        <p>yeah can i get uuuuuuuuhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh</p>
                    </div>
                    <div>
                        <img src="media/Thomas.png" alt="IMG">
                        <h2>Thomas</h2>
                        <code>Creation of the Documentation/Helpsites</code>
                    </div>
                    <div>
                        <img src="media/Gabi.png" alt="IMG">
                        <h2>Gabriel (Gabi) Deutner</h2>
                        <code>Design and Execution of the Layout</code>
                        <p>"Heya! Welcome to our website!
                            <br/> As written above, I am responsible for the design and execution of the layout, if you find a mistake
                            in the layout, send me an
                            <a href="mailto:info@deutner.space">email!</a>
                            <br/>
                            <b>Loves turtles!</b>
                        </p>
                    </div>
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
];

/* On Page Load */
$(document).ready(function () {
    /* Hardcoded Loading Animation */
    setTimeout(function () {
        $('#overlay').fadeOut(400, function () {
            $('#overlay').html("");
        });
    }, 500);

    /* Realignes objects on Resize */
    $(window).on('resize', function () {
        $('#innerOverlay').css('height', $(window).height() - 72);
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

function fixTopbar() {

    /* Set the Height of the innerOverlay according to the height of the window */
    $('#innerOverlay').css('height', $(window).height() - 72);

    $('#fontsizeselector').on('blur', function () {
        console.log($(this).val());
        if ($(this).val() < 3 || $(this).val() > 72) {
            $(this).val(12);
        }
    });

    fixCollapsedButtons();

    $('#fontfamilyselector').on('change', function () {
        $('#fontfamilyselector').css('font-family', `${this.value}, sans-serif`);
    });
}

/* Overlay that gets executed when leaving the page! */
function leavingPage(url) {
    $('#overlay').html(`<h1 class="fabricaLogoText">Fabrica</h1>
                        <p>You are now leaving the editor</p>
                        <p>And are getting redirected to: <a href="`+ url + `">` + url + `</p>`);
    $('#overlay').fadeIn(400);
    setTimeout(function () {
        window.location.href = url;
    }, 200);
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