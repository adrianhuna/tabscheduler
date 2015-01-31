function updateView() {
    chrome.storage.local.get(["time", "enabled", "sites"], function(r) {
        $("#time").text(r.time);
        if (r.enabled) {
            $("#switch").bootstrapSwitch('state', true, true);
            $("#info").css("visibility", "visible");
        }
        $("#sites-count").text(r.sites.length);
    });
}
$(function() {
    updateView();
    $("#options").click(function() {
        chrome.tabs.create({
            url: "/html/options.html"
        });
    });
    $("#switch").bootstrapSwitch();
    $("#switch").on('switchChange.bootstrapSwitch', function(event, state) {
        if (state) {
            $("#info").css("visibility", "visible");
            enable();
        } else {
            $("#info").css("visibility", "hidden");
            disable();
        }
    });
});
