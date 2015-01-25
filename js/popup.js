$(function() {
    $("#options").click(function() {
        chrome.tabs.create({url: "/html/options.html"});
    });
    $("#switch").bootstrapSwitch();
    $("#switch").on('switchChange.bootstrapSwitch', function(event, state) {
        $("#info").css("visibility") == "hidden" ? $("#info").css("visibility", "visible") : $("#info").css("visibility", "hidden");
    });
});
