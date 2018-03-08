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
    var iframeSrc = ' http://localhost:4100/',
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
            SendMessage: 'sendmessage',
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
        }, 500);

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onDragAndDropEnd);
    }

    function postMessage(postedData, typeOfMessage) {
        iframe.contentWindow.postMessage({
            messageObject: postedData,
            type: typeOfMessage
        }, iframeSrc);
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
        }
    }

    function initMinimize() {
        var minimizeButton = document.getElementById(minimizeButtonId);
        minimizeButton.addEventListener('click', minimizeClick, false);
        minimizeButton.addEventListener('mousedown', function (event) {
            event.stopPropagation();
        })
    }

    function handleMessage(event) {
        switch (event.data.action) {
            case messageTypes.SendMessage:
                console.log('recieve');
                var body = {
                    Url: document.URL,
                    Guid: event.data.message.Guid
                };
                console.log('http');
                httpPost(body, "http://localhost:19407/send")
                break;
        }
    }

    function detectDomChange() {
        document.body.addEventListener('DOMSubtreeModified', function () {
            newElementCheckAndRewrite();
        }, false);
    }

    function newElementCheckAndRewrite() {
        var elements = document.body.getElementsByTagName("*");
        for (var i = 0, l = elements.length; i < l; i++) {
            if (elements[i].textContent.startsWith("elementcustom")) {
                var innertHtmlForElement = httpGet("http://localhost:19407/get/html/" + elements[i].textContent.substr(13, elements[i].textContent.length - 13));
                elements[i].innerHTML = unescape(innertHtmlForElement).substr(1, unescape(innertHtmlForElement).length - 2);
            }
        }
    }

    function httpGet(theUrl) {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", theUrl, false);
        xmlHttp.send(null);
        return xmlHttp.responseText;
    }

    function httpPost(body, theUrl) {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", theUrl, false);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(body));
    }

    function injectIframe() {
        if (!document.getElementById(pageIfarameContanerId)) {
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
            window.removeEventListener('message', handleMessage);
            window.addEventListener('message', handleMessage);
            head.appendChild(style);
            initMinimize();
            initDragAndDrop();
            detectDomChange();
        }
    }

    injectIframe();

    window.addEventListener('resize', isElementInWindow, true);
})();