var topbarLeftButtonMenu;
var texts = [['about', `<div id="about"><h1 class="headerText">Welcome! We are Fabrica</h1><div class="logocontainer"><div class="logos"><div><img src="MISC/turtleowoextend.png" alt="IMG"><h2>Andreas</h2><code>Project Management/Implementation of the Table Calculation</code></div><div><img src="MISC/Clemens.png" alt="IMG"><h2>Clemens</h2><code>Implementation of the Table Calculation</code><p>yeah can i get uuuuuuuuhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh</p></div><div><img src="MISC/Thomas.png" alt="IMG"><h2>Thomas</h2><code>Creation of the Documentation/Helpsites</code></div><div><img src="MISC/Gabi.png" alt="IMG"><h2>Gabriel (Gabi) Deutner</h2><code>Design and Execution of the Layout</code><p>"Heya! Welcome to our website!<br/>As written above, I am responsible for the design and execution of the layout, if you find a mistake in the layout, send me an <a href="mailto:info@deutner.space">email!</a><br/><b>Loves turtles!</b></p></div></a></div></div></div>`]];

$(document).ready(function () {
    setTimeout(function () {
        $('#overlay').fadeOut(400, function () {
            $('#overlay').html("");
        });
    }, 500);
    topbarLeftButtonMenu = $('#topbar #leftButtonMenu').html();
    $('#innerOverlay').css('height', $(window).height() - 72);
    $(window).on('resize', function () {
        $('#innerOverlay').css('height', $(window).height() - 72);
    });
    $('.formattingbutton').on('click', function () {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        } else {
            $(this).addClass('selected');
        }
    });
});
function leavingPage(url) {
    $('#overlay').html(`<h1 class="fabricaLogoText">Fabrica</h1>
                        <p>You are now leaving the editor</p>
                        <p>And are getting redirected to: <a href="`+ url + `">` + url + `</p>`);
    $('#overlay').fadeIn(400);
    setTimeout(function () {
        window.location.href = url;
    }, 200);
}


function writeOverlay(to) {
    if (to != 'Empty') {
        for (let i = 0; i < texts.length; i++) {
            if (texts[i][0] == to) {
                $('#innerOverlayContainer').html(texts[i][1]);
            }
        }
    } else {
        $('#innerOverlayContainer').html('');
    }
}

function changeIndicatorButton(to, from) {
    lastButtonText = $('.positionindicator div').html();
    //console.log("To: " + to + ", From: " + from + " at changeIndicatorButton()");
    $('.positionindicator div').fadeOut(200, function () {
        $('.positionindicator').addClass(to).removeClass(from);
        if (to == 'tablecalc') {
            $(this).html(`<h1>table</h1><p>calculation</p>`).fadeIn(200);
        } else {
            $(this).html(to).fadeIn(200);
        }
    });
}

function slideUp(to, from) {

    changeIndicatorButton(to, from);

    $('#innerOverlay').slideUp(400, function () {
        $('#topbar #leftButtonMenu').fadeOut(400, function () {
            $('#topbar #leftButtonMenu').html(topbarLeftButtonMenu);
            $('.formattingbutton').on('click', function () {
                if ($(this).hasClass('selected')) {
                    $(this).removeClass('selected');
                } else {
                    $(this).addClass('selected');
                }
            });
            $('#topbar *').fadeIn(400);
        });
        writeOverlay('Empty');
    });
}

function slideDown(to, from) {

    $('#innerOverlay').css('height', $(window).height() - 72);

    writeOverlay(to);

    changeIndicatorButton(to, from);

    $('#innerOverlay').slideDown(400, function () {
        $('#topbar #leftButtonMenu .buttoncontainer').fadeOut(400, function () {
            $('#topbar #leftButtonMenu .buttoncontainer').remove();
            $('#topbar #leftButtonMenu').html(`<div class="button buttoncontainer back" onclick="slide(this, '${from}', '${to}');">Back</div>`);
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