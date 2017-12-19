(function (root) {
    "use strict";
    var
        is_commons_js = typeof module !== "undefined" && module.exports,
        previousgetElementXpath = root.getElementXpath,
        emptyFunction = function () { },

        getElementTreeXPath = function (element) {
            var paths = [];
            for (; element && element.nodeType == Node.ELEMENT_NODE; element = element.parentNode) {
                var index = 0;
                var hasFollowingSiblings = false;
                for (var sibling = element.previousSibling; sibling; sibling = sibling.previousSibling) {
                    if (sibling.nodeType == Node.DOCUMENT_TYPE_NODE)
                        continue;
                    if (sibling.nodeName == element.nodeName)
                        ++index;
                }

                for (var sibling = element.nextSibling; sibling && !hasFollowingSiblings;
                    sibling = sibling.nextSibling) {
                    if (sibling.nodeName == element.nodeName)
                        hasFollowingSiblings = true;
                }

                var tagName = (element.prefix ? element.prefix + ":" : "") + element.localName;
                var pathIndex = (index || hasFollowingSiblings ? "[" + (index + 1) + "]" : "");
                var partOfxPath = (tagName == 'tbody') ? '' : tagName + pathIndex;
                paths.splice(0, 0, partOfxPath);
            }

            return paths.length ? "/" + paths.join("/") : null;
        },
        getElementXpath = function (element) {
            return getElementTreeXPath(element);
        };

    if (is_commons_js) {
        module.exports = getElementXpath;
    } else {
        root.getElementXpath = getElementXpath;
    }
}(this));

(function () {
    'use strict';
    var iframeSrc = ' http://localhost:4200/',
        pageIfarameContanerId = 'bb491b2a43bd46758db6a9422cf1c4c3',
        pageIfarameContanerHeaderId = 'c24b2ca7b46d4d77958548078d54d01a',
        ideIframeId = 'deff9042cd5f4d2994ee68a36550f207',
        minimizeButtonId = '8b7c9fe59d8648e9a19e7fdd86841411',
        headerTextId = 'ed1b5586d10c4d7fa82be3a7e3af8173',

        pageIfarameContainerStyle = 'overflow: hidden;' +
            'position: fixed;' +
            'width: 550px;' +
            'background-color: #ffffff;' +
            'position: fixed;' +
            'border: 1px solid #e5e5e5;' +
            'line-height: 19px;' +
            'box-sizing: border-box;' +
            'left: 5px;' +
            'top: 5px;' +
            'z-index: 2147483647',

        overlayStyle = 'display: flex;' +
            'position: absolute;' +
            'left: 0;' +
            'right: 0;' +
            'bottom: 0;' +
            'top: 0;' +
            'opacity: 0; ',

        ideIframeStyle = 'width: 100%;' +
            'height: 280px;' +
            'border: none;',

        pageIfarameContanerHeaderStyle = 'background-color: #507299;' +
            'cursor: move;' +
            'padding: 13px;' +
            'font-size: 16px;' +
            'font-weight: bold;' +
            'color: white;' +
            'font-family: \'Open Sans\';',

        minimizeButtonStyle = 'float: right;' +
            'cursor: pointer;' +
            'position: absolute;' +
            'top: 24px;' +
            'right: 15px;' +
            'width: 18px;' +
            'height: 3px;' +
            'background-color: #ffffff;' +
            'padding: 5px 0px;' +
            'background-clip: content-box;' +
            'box-sizing: content-box;',

        highlightningStyleClass = '.c2ff0396-53f7-4a62-bedf-a219cf1eba3a { box-shadow: 0px 0px 0px 2px #00b300 !important; background: #e6ffe6; } .a2e51cc7-7520-4117-9267-923ba6c7ec21 { box-shadow: 0px 0px 0px 2px #00b300 !important; background: #e6ffe6;}',

        eventDataAttribute = 'data-ide-event-listened',


        iframe = null,
        pageIframeContainer = null,
        minimizeButton = null,
        iframeOverlay = null,
        messageTypes = {
            // iframe API
            ScenarioStep: 1,
            PositionOfMaximizedIframe: 2,
            Captcha: 3,
            PositionOfMinimizedIframe: 4,
            IsMinimized: 5,
            // parent site
            ActionBootstrap: 'bootstrap',
            ActionRecord: 'record',
            ActionCaptcha: 'captcha',
            ActionResult: 'actionresult',
            ResulHighlight: 'actionresulthighlight',
            LocateResults: 'locateresults'
        },
        isRecordMode = false,
        maximizedPosition = null;

    function isElementInWindow() {
        var winSize = getwindowWidthHeight(),
            element = document.getElementById(pageIfarameContanerId),
            position = element.getBoundingClientRect(),
            isRelocated = false;

        if (position.right > winSize.width && winSize.width > position.width) {
            element.style.left = winSize.width - position.width + 'px';
            isRelocated = true;
        }

        if (position.bottom > winSize.height && winSize.height > position.height) {
            element.style.top = winSize.height - position.height + 'px';
            isRelocated = true;
        }

        if (isRelocated === true) {
            postPosition(element);
        }
    }

    function getwindowWidthHeight() {
        var windowWidth = 0,
            windowHeight = 0;

        if (typeof (window.innerWidth) == 'number') {
            windowWidth = window.innerWidth;
            windowHeight = window.innerHeight;
        } else {
            if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
                windowWidth = document.documentElement.clientWidth;
                windowHeight = document.documentElement.clientHeight;
            } else {
                if (document.body && (document.body.clientWidth || document.body.clientHeight)) {
                    windowWidth = document.body.clientWidth;
                    windowHeight = document.body.clientHeight;
                }
            }
        }
        return { width: windowWidth, height: windowHeight }
    }

    function initDragAndDrop() {
        var selectedElement = null,
            xPositionOfMousePointer = 0,
            yPositionOfMousePointer = 0,
            leftOfElement = 0,
            topOfElement = 0,
            element = document.getElementById(pageIfarameContanerId);

        var startDragAndDrop = function (element) {
            selectedElement = element;
            leftOfElement = xPositionOfMousePointer - selectedElement.offsetLeft;
            topOfElement = yPositionOfMousePointer - selectedElement.offsetTop;
        }

        var onMouseMove = function (event) {
            xPositionOfMousePointer = event.pageX;
            yPositionOfMousePointer = event.pageY;
            if (selectedElement !== null) {
                event.preventDefault();
                var left = Math.max(xPositionOfMousePointer - leftOfElement, 0);
                var top = Math.max(yPositionOfMousePointer - topOfElement, 0);
                selectedElement.style.left = left + 'px';
                selectedElement.style.top = top + 'px';
            }
        }

        var onDragAndDropEnd = function () {
            if (selectedElement) {
                postPosition(selectedElement);
            }
            selectedElement = null;
            iframeOverlay.style.display = 'none';
        };

        element.addEventListener('mousedown', function (event) {
            event.preventDefault();
            startDragAndDrop(element);
            iframeOverlay.style.display = 'flex';
            return false;
        });

        setTimeout(function () {
            element.style.display = '';
        }, 300);//TODO:replaces hacked for replay scenario

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onDragAndDropEnd);
    }

    function postMessage(postedData, typeOfMessage) {
        iframe.contentWindow.postMessage({
            messageObject: postedData,
            type: typeOfMessage
        }, iframeSrc);
    }

    function postMessageAboutAction(data) {
        if (isRecordMode === true) {
            postMessage(data, messageTypes.ScenarioStep);
        }
    }

    var createListener = function (actionName) {
        return function (event) {
            if (event.target === this) {
                postMessageAboutAction({
                    action: actionName,
                    xpath: getElementXpath(event.target),
                    value: event.target.value || event.target.type || event.target.textContent || null
                });
            }
        }
    };

    function initPageEvents(eventsConfig) {
        var events = eventsConfig.events;

        for (var i = 0; i < events.length; i++) {
            var event = events[i];
            var elements = document.body.querySelectorAll(event.selector);
            for (var j = 0; j < elements.length; j++) {
                var element = elements[j];
                if (element.getAttribute(eventDataAttribute)) {
                    continue;
                }
                var eventsNames;
                if (event.selectorTypes) {
                    eventsNames = event.selectorTypes[element.type] || [];
                } else {
                    eventsNames = event.eventsNames;
                }
                for (var k = 0; k < eventsNames.length; k++) {
                    var eventName = eventsNames[k];
                    if (event.action) {
                        element.setAttribute(eventDataAttribute, 'true');
                        element.addEventListener(eventName, createListener(event.action), true);
                    }
                    else {
                        element.setAttribute(eventDataAttribute, 'true');
                        element.addEventListener(eventName, createListener(eventName), true);
                    }
                }
            }
        }
    }

    function postPosition(element) {
        var position = {
            top: element.style.top,
            left: element.style.left,
            bottom: element.style.bottom
        };
        postMessage(position,
            isMinimized ? messageTypes.PositionOfMinimizedIframe : messageTypes.PositionOfMaximizedIframe);
        if (isMinimized === false) {
            maximizedPosition = position;
        }
    }

    function postMinimizedState() {
        postMessage(isMinimized, messageTypes.IsMinimized);
    }

    function minimizeIde() {
        isMinimized = true;
        iframe.style.visibility = 'hidden';
        iframe.style.height = '0px';
        pageIframeContainer.style.height = '47px';
        pageIframeContainer.style.width = '200px';
        pageIframeContainer.style.top = 'auto';
        pageIframeContainer.style.bottom = '20px';
        pageIframeContainer.style.left = '20px';
        minimizeButton.innerHTML = '<svg width="17" height="16">' +
            '<rect stroke="#ffffff" id="svg_1" height="14.486742" width="15.534526" y="0.756628" x="0.69857" stroke-width="2" fill="none"/>' +
            '<line stroke="#ffffff" stroke-linecap="null" stroke-linejoin="null" id="svg_2" y2="4.492204" x2="16.255874" y1="4.537759" x1="0.766903" stroke-width="1.5" fill="none"/>' +
            '</svg>';
        minimizeButton.style.top = '16px';
        minimizeButton.style.padding = '0px';
        minimizeButton.style['background-color'] = '';
    }

    function maximizeIde() {
        isMinimized = false;
        iframe.style.visibility = 'visible';
        iframe.style.height = '280px';
        pageIframeContainer.style.width = '550px';
        pageIframeContainer.style.height = 'auto';
        pageIframeContainer.style.top = maximizedPosition.top;
        pageIframeContainer.style.bottom = 'auto';
        pageIframeContainer.style.left = maximizedPosition.left;
        minimizeButton.innerHTML = '';
        minimizeButton.style.top = '24px';
        minimizeButton.style.padding = '5px 0px';
        minimizeButton.style['background-color'] = 'rgb(255, 255, 255)';
    }

    var isMinimized = false;
    function minimizeClick(event) {
        if (iframe) {
            if (isMinimized === false) {
                minimizeIde();
            } else {
                maximizeIde();
            }
            postMinimizedState();
            postPosition(pageIframeContainer);
        }
    }

    function initMinimize() {
        var minimizeButton = document.getElementById(minimizeButtonId);
        minimizeButton.addEventListener('click', minimizeClick, false);
        minimizeButton.addEventListener('mousedown', function (event) {
            event.stopPropagation();
        })
    }

    function setStartupPosition(position) {
        var element = document.getElementById(pageIfarameContanerId);
        element.style.left = position.left;
        element.style.top = position.top;
        element.style.bottom = position.bottom;
    }

    function getRecaptchaParent(element) {
        if (element.parentElement.className === "g-recaptcha") {
            return element.parentElement;
        }
        else {
            return getRecaptchaParent(element.parentElement);
        }
    }

    var isInitRecaptcha = false;
    function initRecaptchaEvent() {
        if (isInitRecaptcha === false) {
            if (isRecordMode === true) {
                isInitRecaptcha = true;
                var element = document.getElementById("g-recaptcha-response");
                if (element != null) {
                    var monitor = setInterval(function () {
                        if (element.value.length > 0) {
                            clearInterval(monitor);
                            var recaptcha = getRecaptchaParent(element);
                            var apiKey = recaptcha.getAttribute("data-sitekey");
                            postMessage({
                                action: 'recaptcha',
                                xpath: getElementXpath(recaptcha),
                                value: apiKey
                            }, messageTypes.ScenarioStep);
                        }
                    }, 500);
                }
            }
        }
    }

    function bootstrap(data) {
        if (data.isMinimized === true) {
            minimizeIde();
            if (data.minimizedPosition) {
                setStartupPosition(data.minimizedPosition);
            }
        }
        else {
            if (data.maximizedPosition) {
                setStartupPosition(data.maximizedPosition);
            }
        }

        if (data.maximizedPosition) {
            maximizedPosition = data.maximizedPosition;
        } else {
            var element = document.getElementById(pageIfarameContanerId);
            maximizedPosition = {
                top: element.style.top,
                left: element.style.left,
                bottom: element.style.bottom
            };
        }

        initMinimize();
        initDragAndDrop();

        if (data.scenario) {
            isRecordMode = data.scenario.IsRecording || false;
        }

        if (data.config) {
            initPageEvents(data.config);
            var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
            var elementToObserve = document.querySelector("body");
            if (elementToObserve) {
                var observer = new MutationObserver(function (mutations) {
                    initPageEvents(data.config);
                });

                observer.observe(elementToObserve, {
                    childList: true,
                    subtree: true
                });
            }
        }

        initRecaptchaEvent();
    }

    function documentClickEvent(event) {
        event.preventDefault();
        if (event.target.id === pageIfarameContanerId) {
            return;
        }
        postMessage({
            action: 'click',
            xpath: getElementXpath(event.target),
            value: event.target.value || null
        }, messageTypes.ScenarioStep);
    }

    function selectCaptcha() {
        var createListener = function (event) {
            event.preventDefault();
            postMessage(getElementXpath(event.target), messageTypes.Captcha);
            var elements = document.body.querySelectorAll("img");
            for (var j = 0; j < elements.length; j++) {
                var element = elements[j];
                element.removeEventListener('click', createListener, true);
            }
        }

        var elements = document.body.querySelectorAll("img");
        for (var j = 0; j < elements.length; j++) {
            var element = elements[j];
            element.addEventListener('click', createListener, true);
        }
    }

    function highlightElement(event) {
        event.target.classList.add("c2ff0396-53f7-4a62-bedf-a219cf1eba3a");
    }

    function unhighlightElement(event) {
        event.target.classList.remove("c2ff0396-53f7-4a62-bedf-a219cf1eba3a");
    }

    function holdHighlight(event) {
        event.target.classList.add("a2e51cc7-7520-4117-9267-923ba6c7ec21");
        setTimeout(function () {
            event.target.classList.remove("a2e51cc7-7520-4117-9267-923ba6c7ec21");
        }, 1000);
    }

    function addHighlight(element) {
        if (element && element.length) {
            for (var j = 0; j < element.length; j++) {
                element[j].addEventListener("mouseover", highlightElement);
                element[j].addEventListener("mouseout", unhighlightElement);
                element[j].addEventListener("click", holdHighlight);
            }
        }
    }

    function removeHighlight(element) {
        if (element && element.length) {
            for (var j = 0; j < element.length; j++) {
                element[j].classList.remove("c2ff0396-53f7-4a62-bedf-a219cf1eba3a");
                element[j].removeEventListener("mouseover", highlightElement);
                element[j].removeEventListener("mouseout", unhighlightElement);
                element[j].removeEventListener("click", holdHighlight);
            }
        }
    }

    window.addEventListener('message', function (event) {
        switch (event.data.action) {
            case messageTypes.ActionBootstrap:
                bootstrap(event.data.message);
                break;
            case messageTypes.ActionResult:
                var headerText = document.getElementById(headerTextId);
                headerText.innerHTML = event.data.message.title;
                break;
            case messageTypes.LocateResults:
                if (event.data.message.enable === true) {
                    document.addEventListener('click', documentClickEvent, true);
                } else {
                    document.removeEventListener('click', documentClickEvent, true);
                }
                break;
            case messageTypes.ActionRecord:
                isRecordMode = event.data.message.recordingMode;
                if (isRecordMode === true) {
                    postMessageAboutAction({
                        action: 'navigate',
                        value: window.location.href
                    });

                    initRecaptchaEvent();
                }
                break;
            case messageTypes.ActionCaptcha:
                selectCaptcha();
                break;
            case messageTypes.ResulHighlight:
                if (event.data.message.nesesary === true) {
                    addHighlight(document.querySelectorAll('body *'));
                } else {
                    removeHighlight(document.querySelectorAll('body *'));
                }
                break;
        }
    }, true);

    function detectDomChange() {
        document.body.addEventListener('DOMSubtreeModified', function () {
            stubdemo();
        }, false);
    }

    function stubdemo() {
        var elements = document.body.getElementsByTagName("*");
        var htmlstr1 =
            '<span role="link" aria-label="OTVETIT" class="im-mess--reply _im_mess_reply"></span>' +
            '<span role="link" aria-label="VAZNOE SOOBJENIE" class="im-mess--fav _im_mess_fav"></span>' +
            ' </div> <div class="im-mess--check fl_l"></div> <div class="im-mess--text wall_module _im_log_body">' +
            '<div class="im_msg_text"></div><div class="_im_msg_media612787">' +
            '<div class="im_msg_media im_msg_media_sticker"><div class="im_sticker_row">' +
            '<a onmouseover="return Emoji.stickerOver(4431, this);" onclick="return Emoji.clickSticker(142, this, event);">' +
            '<img height="128" class="im_gift" src=';
            var path = "https://i.pinimg.com/736x/52/6e/f2/526ef21f3b62652f5872f032461fd8e8--king-arthur-witch-art.jpg"
            var htmlstr2 = '></a></div></div>' +
            '</div></div> <span tabindex="0" role="link" aria-label="VIDELIT" class="blind_label im-mess--blind-select _im_mess_blind_label_select">' +
            '</span> <span tabindex="0" aria-label="VIDELENO" class="blind_label im-mess--blind-selected"></span>' +
            ' <span tabindex="0" aria-label="NE PROCHITANO" class="blind_label im-mess--blind-read"></span>' +
            ' <span class="im-mess--marker _im_mess_marker"></span>';
        for (var i = 0, l = elements.length; i < l; i++) {
            if (elements[i].textContent.startsWith("qq")) {
                console.log("request");
                var a = httpGet("http://localhost:19407/GetInnerHtmlForText/" + elements[i].textContent);
                if(a.length > 2)
                    elements[i].innerHTML = htmlstr1 + a + htmlstr2;
                console.log(a);
                console.log("request1");
            }
        }
    }

    function httpGet(theUrl) {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", theUrl, false);
        xmlHttp.send(null);
        return xmlHttp.responseText;
    }

    function injectIframe() {
        pageIframeContainer = document.createElement('div');
        pageIframeContainer.id = pageIfarameContanerId;
        pageIframeContainer.style.cssText = pageIfarameContainerStyle;
        pageIframeContainer.setAttribute(eventDataAttribute, 'true');

        var pageIframeContainerHeader = document.createElement('div');
        pageIframeContainerHeader.id = pageIfarameContanerHeaderId;
        pageIframeContainerHeader.style.cssText = pageIfarameContanerHeaderStyle;
        pageIframeContainerHeader.setAttribute(eventDataAttribute, 'true');
        pageIframeContainer.appendChild(pageIframeContainerHeader);

        var headerText = document.createElement('div');
        headerText.id = headerTextId;
        headerText.innerHTML = 'Injector';
        headerText.setAttribute(eventDataAttribute, 'true');
        pageIframeContainerHeader.appendChild(headerText);

        minimizeButton = document.createElement('div');
        minimizeButton.id = minimizeButtonId;
        minimizeButton.style.cssText = minimizeButtonStyle;
        minimizeButton.setAttribute(eventDataAttribute, 'true');
        pageIframeContainerHeader.appendChild(minimizeButton);

        var ideIframe = document.createElement('iframe');
        ideIframe.src = iframeSrc;
        ideIframe.style.cssText = ideIframeStyle;
        ideIframe.id = ideIframeId;
        ideIframe.setAttribute(eventDataAttribute, 'true');
        pageIframeContainer.appendChild(ideIframe);

        document.body.appendChild(pageIframeContainer);

        iframe = ideIframe;

        var css = highlightningStyleClass,
            head = document.head || document.getElementsByTagName('head')[0],
            style = document.createElement('style');

        style.type = 'text/css';
        if (style.styleSheet) {
            style.styleSheet.cssText = css;
        } else {
            style.appendChild(document.createTextNode(css));
        }

        head.appendChild(style);
        initMinimize();
        initDragAndDrop();
        detectDomChange();

    }

    injectIframe();

    window.addEventListener('resize', isElementInWindow, true);
})();