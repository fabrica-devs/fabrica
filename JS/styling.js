var topbar;

$(document).ready(function () {
    setTimeout(function () {
        $('#overlay').fadeOut(400, function () {
            $('#overlay').html("");
        });
    }, 500);
    topbar = $('#topbar').html();
    innerOverlayHeight = $(window).height() - 72;
});


$('.formattingbutton').on('click', function () {
    if ($(this).hasClass('selected')) {
        $(this).removeClass('selected');
    } else {
        $(this).addClass('selected');
    }
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

function slideAbout(button) {
    if (button.innerText != "Back") {
        $('#innerOverlay').css('height', innerOverlayHeight);
        $('#topbar #leftButtonMenu .buttoncontainer').fadeOut(500, function () {
            $('#topbar #leftButtonMenu .buttoncontainer').remove();
            $('#topbar #leftButtonMenu').html(`<div class="button buttoncontainer back" onclick="slideAbout(this);">Back</div>`);
            $('#topbar #leftButtonMenu .buttoncontainer').fadeIn(500);
            $('#topbar #leftButtonMenu .buttoncontainer').css('display', 'flex', 'align-items', 'center', 'text-align', 'center');
        });
        $('#topbar #rightButtonMenu').fadeOut(500);
        $('#innerOverlay').html(`
        <div id="about">
            <h1 class="headerText">Welcome! We are Fabrica</h1>
            <div class="logocontainer">
                <div class="logos">
                    <div>
                        <img src="MISC/turtleowoextend.png" alt="IMG">
                        <h2>Andreas Hässler</h2>
                        <code>Project Management/Implementation of the Table Calculation</code>
                    </div>
                    <div>
                        <img src="MISC/Clemens.png" alt="IMG">
                        <h2>Clemens Kern</h2>
                        <code>Implementation of the Table Calculation</code>
                    </div>
                    <div>
                        <img src="MISC/Thomas.png" alt="IMG">
                        <h2>Thomas Galler</h2>
                        <code>Creation of the Documentation/Helpsites</code>
                    </div>
                    <div>
                        <img src="MISC/Gabi.png" alt="IMG">
                        <h2>Gabriel (Gabi) Deutner</h2>
                        <code>Design and Execution of the Layout</code>
                        <p>"Heya! Welcome to our website!<br/>As written above, I am responsible for the design and execution of the layout, if you find a mistake in the layout, send me an <a href="mailto:info@deutner.space">email!</a><br/><b>Loves turtles!</b></p>
                    </div>
                    </a>
                </div>
            </div>
        </div>`);
        $('#innerOverlay').slideDown(400);
    } else {
        $('#innerOverlay').slideUp(400);
        $('#topbar *').fadeOut(400, function () {
            $('#topbar').html(topbar);
            $('.formattingbutton').on('click', function () {
                if ($(this).hasClass('selected')) {
                    $(this).removeClass('selected');
                } else {
                    $(this).addClass('selected');
                }
            });
        });

    }
}
