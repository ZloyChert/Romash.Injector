var onCreatedHandler = function (tab) {
    chrome.storage.local.get('isEnabled', function(result) {
        if (result.isEnabled === true) {
            chrome.tabs.executeScript(tab.id, {
                file: 'js/inject.js'
            });
        }
    });
};

var onUpdatedHandler = function (tabId, changeInfo, tab) {
    chrome.storage.local.get('isEnabled', function(result) {
        if (changeInfo.status == 'complete' && result.isEnabled === true) {
            chrome.tabs.executeScript(tab.id, {
                file: 'js/inject.js'
            });
        }
    });
};

chrome.tabs.onCreated.addListener(onCreatedHandler);
chrome.tabs.onUpdated.addListener(onUpdatedHandler);