var setButtonDisableState = function(button) {
    button.textContent = 'Disable';
    button.classList.remove('enable-button');
    button.classList.add('disable-button');
}

var setButtonEnableState = function(button) {
    button.textContent = 'Enable';
    button.classList.remove('disable-button');
    button.classList.add('enable-button');
}

var switchButton = document.getElementById('switchButton');

chrome.storage.local.get('isEnabled', function(result) {
    if (result.isEnabled === true) {
        setButtonDisableState(switchButton);
    } else {
        setButtonEnableState(switchButton);
    }
});

switchButton.addEventListener('click', function () {
    chrome.storage.local.get('isEnabled', function(result) {
        if (result.isEnabled === true) {
            chrome.storage.local.set({
                'isEnabled': false
            });
            setButtonEnableState(switchButton);
        } else {
            chrome.storage.local.set({
                'isEnabled': true
            });
            setButtonDisableState(switchButton);
        }
        chrome.tabs.reload();
    });
});