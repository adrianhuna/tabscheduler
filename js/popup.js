$(function() {
    $("#options").click(function() {
        chrome.tabs.create({url: "/html/options.html"});
    });

});
