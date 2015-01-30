function restoreOptions() {
    chrome.storage.local.get(["time", "enabled"], function(r) {
        $("#time").val(r.time);
        if (r.enabled && !$("#switch").bootstrapSwitch('state')) {
            $("#switch").bootstrapSwitch('state', true);
        }
        console.log($("#switch").state);
        console.log(r.enabled === true);
    });
}

function enable() {
    console.log(Date.now());
    chrome.alarms.create("scheduler", {
        when: Date.now() + 30000,
        periodInMinutes: 1440
    })
    chrome.storage.local.set({
        "enabled": true
    });
}

function disable() {
    chrome.alarms.clearAll();
    chrome.storage.local.set({
        "enabled": false
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
