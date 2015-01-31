function addToListHtml(url) {
    $("#list").append('<li><a href="' + url + '" target="_blank">' + url + '</a> - <button class="btn btn-danger btn-xs delete-site">Remove</button></li>');
}

function restoreOptions() {
    chrome.storage.local.get(["time", "enabled", "sites"], function(r) {
        $("#time").val(r.time);
        if (r.enabled) {
            $("#switch").bootstrapSwitch('state', true, true);
        }
        if (r.sites.length == 0) {
            $("#list").append('Empty');
        }
        for (var i = 0; i < r.sites.length; i++) {
            addToListHtml(r.sites[i]);
        }
    });
}

function message(type, msg) {
    $("#alert").text(msg).removeClass().addClass("alert alert-" + type).hide().fadeIn();
}

function updateTime() {
    var time = $("#time").val();
    if (!time) {
        message("danger", "Error: No value specified");
        return;
    }
    chrome.storage.local.set({
        "time": time
    }, function() {
        message("success", "Settings saved");
    });
    if ($("#switch").bootstrapSwitch('state')) {
        setAlarm();
    }
}

function addToList(url) {
    if (url.substring(0, 7) != "http://") {
        url = "http://" + url;
    }
    addToListHtml(url);
    chrome.storage.local.get("sites", function(r) {
        var array = r.sites;
        array.push(url);
        chrome.storage.local.set({
            "sites": array
        });
    });
}

function removeFromList(t) {
    chrome.storage.local.get("sites", function(r) {
        var array = r.sites;
        var index = array.indexOf(t.prev("a").attr("href"));
        if (index > -1) {
            array.splice(index, 1);
            chrome.storage.local.set({
                "sites": array
            });
            t.parent("li").remove();
        } else {
            message("danger", "Error: We couln't remove the site. Please try again.");
        }
    });
}
$(function() {
    restoreOptions();
    $("#switch").bootstrapSwitch();
    $("#switch").on("switchChange.bootstrapSwitch", function(event, state) {
        state ? enable() : disable();
    });
    $('#time').timepicker({
        template: false,
        showInputs: false,
        showMeridian: false,
        minuteStep: 5
    });
    $("#update-time").submit(function(e) {
        e.preventDefault();
        updateTime();
    });
    $("#add-site").submit(function(e) {
        e.preventDefault();
        addToList($("#url").val().trim());
        $("#url").val('');
    });
    $(document).on("click", ".delete-site", function(e) {
        removeFromList($(this));
    });
});
