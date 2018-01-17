function urlEdit( newPage, sideBarHide ) {
    switch(newPage) {
        case "about":
            document.getElementById("bottomInfo").children[0].children[0].click();
            urlChange(newPage);
            break;
        case "help":
            document.getElementById("bottomInfo").children[0].children[1].click();
            urlChange(newPage);
            break;
        default:
            var curUrl = window.location.href;
            if ( curUrl.split("?b=").length > 1 ) {
                
            }
            break;
    }
}

function urlChange(newPage) {
    var curUrl = window.location.href;
    if ( curUrl.split("?p=").length > 1 ) {
        curUrl.split("?p=")[1] = "about";
    } else {
        curUrl += "?p=" + newPage;
    }
}
