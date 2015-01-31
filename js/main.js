function enable() {
    setAlarm();
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

function setAlarm() {
    chrome.storage.local.get("time", function(r) {
        var current = new Date();
        var t = r.time.split(":");
        var date = new Date(current.getFullYear(), current.getMonth(), current.getDate(), parseInt(t[0]), parseInt(t[1]));
        if (date < current) {
            current.setDate(current.getDate() + 1);
            date = new Date(current.getFullYear(), current.getMonth(), current.getDate(), parseInt(t[0]), parseInt(t[1]));
        }
        chrome.alarms.clearAll();
        chrome.alarms.create("scheduler", {
            when: date.getTime(),
            periodInMinutes: 1440
        });
    });
}
