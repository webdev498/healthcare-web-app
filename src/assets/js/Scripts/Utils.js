
function CreateHyperlinkFromTextUrl(sText) {
    var sTextToParse = sText;
    var sProcessed = "";
    var sMatchedUrl = "";
    var i = 0;

    do {
        var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
        var regex = new RegExp(expression);

        sMatchedUrl = sTextToParse.match(regex);

        if (sMatchedUrl != null) {
            var bIsValidUrl = false;
            var currUrlMatch = sMatchedUrl[0];
            var arrValidDomains = ['.com', '.net', '.org', '.edu', '.info', '.gov', '.int', '.biz', '.name', '.us', '.io'];
            for (index = 0; index < arrValidDomains.length; index++) {
                if (currUrlMatch.indexOf(arrValidDomains[index]) >= 0) bIsValidUrl = true;
            }

            // where the match occured
            var locCurrMatch = sTextToParse.indexOf(currUrlMatch);

            // add it to the output
            sProcessed += sTextToParse.substr(0, locCurrMatch);

            if (bIsValidUrl) {
                // set href value
                href = currUrlMatch;

                // add protocol prefix
                if (href.substr(0, 7) != "http://") href = "http://" + href;

                // make into a link
                sProcessed += '<a href="' + href + '" target="_blank">' + currUrlMatch + '</a>';
            }
            else {
                sProcessed += currUrlMatch;
            }

            // remove processed portion of the text
            sTextToParse = sTextToParse.substr((locCurrMatch + sMatchedUrl[0].length));

        } else {
            sProcessed += sTextToParse;
            sTextToParse = "";
        }
    } while (sTextToParse.length > 0);
    return sProcessed;
}


function ShowLargerUploadedFile (sFileUrl) {
    $('#FileLargerView').attr('src', sFileUrl);
    document.getElementById('UploadedFileLargerView').style.display = '';
    document.getElementById('ChatPanel').style.display = 'none';
}

function CloseUploadedFileLargerView () {
    document.getElementById('ChatPanel').style.display = '';
    document.getElementById('UploadedFileLargerView').style.display = 'none';
}
