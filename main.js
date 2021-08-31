// ==UserScript==
// @name         RARBG Add YouTube Trailer Link
// @namespace    http://tampermonkey.net/
// @version      2
// @description  Click RARBG torrent poster and get youtube trailer
// @author       https://github.com/michalani
// @match        https://rarbgmirror.com/torrent/*
// @downloadURL  https://raw.githubusercontent.com/michalani/rarbg-add-trailer-extension/master/main.js
// @updateURL    https://raw.githubusercontent.com/michalani/rarbg-add-trailer-extension/master/main.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
  
    var arrayOfHeaders = document.querySelectorAll(".header2")
    var notFoundTrailer = true
    function isTrailer(value) {
        if(value.innerHTML === '<a name="trailer"></a>Trailer:')
        {
            notFoundTrailer = false
        }
  
    }
    arrayOfHeaders.forEach(isTrailer);
  
    /*
    Create a youtube trailer at the top even if one exists at the bottom.. scrolling is painful.
    Delete next line if you prefer otherwise.
    */
    notFoundTrailer = true;
  
    if(notFoundTrailer){
        //find torrent title
        var torrentTitle = document.getElementsByClassName("lista")[6].innerText.replace(/\./g,' ').substring(1);
  
        //remove last 2 words and a trailing space
        torrentTitle = torrentTitle.substring(0, torrentTitle.lastIndexOf(" "));
        torrentTitle = torrentTitle.substring(0, torrentTitle.lastIndexOf(" "));
        torrentTitle = torrentTitle.substring(0, torrentTitle.lastIndexOf(" "));
  
        let ytlink = "https://www.youtube.com/results?search_query=" + torrentTitle + " trailer"
  
        //find Torrent file
        let torrentSection = document.getElementsByTagName("tr")[23];
        
        //make poster clickable as a youtube link
        var pic = (document.querySelectorAll(".lista")[7]).innerHTML;
        pic = '<a href="'+ytlink+'" target="_blank">'+pic+'</>'
        document.querySelectorAll(".lista")[7].innerHTML = pic;
  }
  
  })();