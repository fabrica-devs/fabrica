import $ from 'jquery'

$(document).ready(function () {
    if ((navigator.userAgent.indexOf("MSIE") != -1) || (!!document.documentMode == true)) {
        $('#overlay *').fadeOut(400, function () {
            $('#overlay').html('<div id="nonSupportedBrowser"><h2>Your Browser is currently not supported by</h2><h1 class="fabricaLogoText">Fabrica</h1><br><br><br><p>We recommend: <a href="https://www.mozilla.org/en-US/firefox/">Firefox</a> and <a href="https://www.google.com/chrome/">Chrome</a><p></div>');
            $('#overlay *').fadeIn(400);
            $('#overlay #nonSupportedBrowser').css('position', 'absolute');
            $('#overlay #nonSupportedBrowser').css('top', '50%');
            $('#overlay #nonSupportedBrowser').css('left', '50%');
            $('#overlay #nonSupportedBrowser').css('transform', 'translateY(-50%) translateX(-50%)');
        });
    }
});