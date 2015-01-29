function restoreOptions() {
    chrome.storage.local.get("time", function(r) {
        $("#time").val(r.time);
    });
}

function enable() {
    chrome.alarms.create("scheduler", {
        when: Date.now() + 30,
        periodInMinutes: 1440
    })
}

function disable() {
    chrome.alarms.clearAll();
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
}
$(function() {
    restoreOptions();
    $("#switch").bootstrapSwitch();
    $("#switch").on("switchChange.bootstrapSwitch", function(event, state) {
        state ? enable() : disable();
    });
    $("#update-time").submit(function(e) {
        e.preventDefault();
        updateTime();
    });
});
