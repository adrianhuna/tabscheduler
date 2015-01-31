function runAlarm() {
    chrome.storage.local.get("sites", function(r) {
        for (var i = 0; i < r.sites.length; i++) {
            chrome.tabs.create({
                url: r.sites[i]
            });
        }
    });
}
chrome.alarms.onAlarm.addListener(function(alarm) {
    chrome.tabs.query({}, function(tabs) {
        if (tabs.length === 0) {
            chrome.storage.local.set({
                "missed": 1
            });
        } else {
            runAlarm();
        }
    });
});
chrome.windows.onCreated.addListener(function(window) {
    chrome.storage.local.get("missed", function(r) {
        if (r.missed === 1) {
            chrome.storage.local.set({
                "missed": 0
            });
            runAlarm();
        }
    });
});
chrome.runtime.onInstalled.addListener(function(details) {
    chrome.storage.local.get("enabled", function(r) {
        if (r.enabled === undefined) {
            chrome.storage.local.set({
                "sites": [],
                "time": "08:00",
                "enabled": false,
                "missed": 0
            });
        }
    });
});
