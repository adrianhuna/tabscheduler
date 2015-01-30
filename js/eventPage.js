function runAlarm() {
    chrome.tabs.create({
        url: "http://example.com"
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
    })
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
