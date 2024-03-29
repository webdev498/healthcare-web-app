(function(window){
    'use strict';
    function define_ALSocket() {
        var ALSocket = {};
        var MCK_APP_ID;
        var events = {};
        var subscriber = null;
        ALSocket.stompClient = null;
        var TYPING_TAB_ID = '';
        ALSocket.typingSubscriber = null;
        var openGroupSubscriber = [];
        var checkConnectedIntervalId;
        var sendConnectedStatusIntervalId;
        var OPEN_GROUP_SUBSCRIBER_MAP;
        ALSocket.mck_typing_status = 0;
        var MCK_TYPING_STATUS;
        var SOCKET = '';
        var MCK_WEBSOCKET_URL = 'https://apps.applozic.com';
        var MCK_TOKEN;
        var USER_DEVICE_KEY;
        var mckUtils = new MckUtils();

        /**
         * var events = {
                'onConnectFailed': function() {},
                'onConnect': function() {},
                'onMessageDelivered': function() {},
                'onMessageRead': function() {},
                'onMessageDeleted': function() {},
                'onConversationDeleted': function() {},
                'onUserConnect': function() {},
                'onUserDisconnect': function() {},
                'onConversationReadFromOtherSource': function() {},
                'onConversationRead': function() {},
                'onMessageReceived': function() {},
                'onMessageSentUpdate': function() {},
                'onMessageSent': function() {},
                'onUserBlocked': function() {},
                'onUserUnblocked': function() {},
                'onUserActivated': function() {},
                'onUserDeactivated': function() {},
                'connectToSocket': function() {},
                'onMessage': function(resp) { console.log(resp); },
                'onTypingStatus': function(resp) {}
               };
        window.Applozic.ALSocket.init("applozic-sample-app", "https://apps.applozic.com", events);
        */
        ALSocket.init = function(appId, data, _events) {
            if (appId) {
                MCK_APP_ID = appId;
            }
            if (typeof data !== "undefined") {
                MCK_TOKEN = data.token;
                USER_DEVICE_KEY = data.deviceKey;
                MCK_WEBSOCKET_URL = data.websocketUrl;
            }

            events = _events;
            if (typeof MCK_WEBSOCKET_URL !== 'undefined') {
                var port = (!mckUtils.startsWith(MCK_WEBSOCKET_URL, "https")) ? "15674" : "15675";
                if (typeof SockJS === 'function') {
                    if (!SOCKET) {
                        SOCKET = new SockJS(MCK_WEBSOCKET_URL + ":" + port + "/stomp");
                    }
                    ALSocket.stompClient = Stomp.over(SOCKET);
                    ALSocket.stompClient.heartbeat.outgoing = 0;
                    ALSocket.stompClient.heartbeat.incoming = 0;
                    ALSocket.stompClient.onclose = function() {
                        ALSocket.disconnect();
                    };
                    ALSocket.stompClient.connect("guest", "guest", ALSocket.onConnect, ALSocket.onError, '/');
                    window.addEventListener("beforeunload", function(e) {
                      var check_url=e.target.activeElement.href;
                      if(!check_url || 0 === check_url.length){
                      ALSocket.disconnect();
                      }
                    });
                }
            }
        };
        ALSocket.checkConnected = function(isFetchMessages) {
            if (ALSocket.stompClient.connected) {
                if (checkConnectedIntervalId) {
                    clearInterval(checkConnectedIntervalId);
                }
                if (sendConnectedStatusIntervalId) {
                    clearInterval(sendConnectedStatusIntervalId);
                }
                checkConnectedIntervalId = setInterval(function() {
                    ALSocket.connectToSocket(isFetchMessages);
                }, 600000);
                sendConnectedStatusIntervalId = setInterval(function() {
                    ALSocket.sendStatus(1);
                }, 1200000);
            } else {
                ALSocket.connectToSocket(isFetchMessages);
            }
        };
        ALSocket.connectToSocket = function(isFetchMessages) {
            if (typeof events.connectToSocket === "function") {
                events.connectToSocket(isFetchMessages);
            }
        };
        ALSocket.stopConnectedCheck = function() {
            if (checkConnectedIntervalId) {
                clearInterval(checkConnectedIntervalId);
            }
            if (sendConnectedStatusIntervalId) {
                clearInterval(sendConnectedStatusIntervalId);
            }
            checkConnectedIntervalId = '';
            sendConnectedStatusIntervalId = '';
            ALSocket.disconnect();
        };
        ALSocket.disconnect = function() {
            if (ALSocket.stompClient && ALSocket.stompClient.connected) {
                ALSocket.sendStatus(0);
                ALSocket.stompClient.disconnect();
            }
        };
        ALSocket.unsubscibeToTypingChannel = function() {
            if (ALSocket.stompClient && ALSocket.stompClient.connected) {
                if (ALSocket.typingSubscriber) {
                    if (ALSocket.mck_typing_status === 1) {
                        ALSocket.sendTypingStatus(0, TYPING_TAB_ID);
                    }
                    ALSocket.typingSubscriber.unsubscribe();
                }
            }
            ALSocket.typingSubscriber = null;
        };
        ALSocket.unsubscibeToNotification = function() {
            if (ALSocket.stompClient && ALSocket.stompClient.connected) {
                if (subscriber) {
                    subscriber.unsubscribe();
                }
            }
            subscriber = null;
        };
        ALSocket.subscibeToTypingChannel = function(subscribeId) {
            if (ALSocket.stompClient && ALSocket.stompClient.connected) {
                ALSocket.typingSubscriber = ALSocket.stompClient.subscribe("/topic/typing-" + MCK_APP_ID + "-" + subscribeId, ALSocket.onTypingStatus);
            } else {
                ALSocket.reconnect();
            }
        };
        ALSocket.subscribeToOpenGroup = function(group) {
            if (ALSocket.stompClient && ALSocket.stompClient.connected) {
                var subs = ALSocket.stompClient.subscribe("/topic/group-" + MCK_APP_ID + "-" + group.contactId, ALSocket.onOpenGroupMessage);
                openGroupSubscriber.push(subs.id);
                OPEN_GROUP_SUBSCRIBER_MAP[group.contactId] = subs.id;
            } else {
                ALSocket.reconnect();
            }
        };
        ALSocket.sendTypingStatus = function(status, mck_typing_status,MCK_USER_ID,tabId) {
            ALSocket.mck_typing_status =mck_typing_status;
            if (ALSocket.stompClient && ALSocket.stompClient.connected) {
                if (status === 1 && ALSocket.mck_typing_status === 1) {
                    ALSocket.stompClient.send('/topic/typing-' + MCK_APP_ID + "-" + TYPING_TAB_ID, {
                        "content-type": "text/plain"
                    }, MCK_APP_ID + "," + MCK_USER_ID + "," + status);
                }
                if (tabId) {
                    if (tabId === TYPING_TAB_ID && status === ALSocket.mck_typing_status && status === 1) {
                        return;
                    }
                    TYPING_TAB_ID = tabId;
                    ALSocket.stompClient.send('/topic/typing-' + MCK_APP_ID + "-" + tabId, {
                        "content-type": "text/plain"
                    }, MCK_APP_ID + "," + MCK_USER_ID + "," + status);
                    setTimeout(function() {
                        ALSocket.mck_typing_status = 0;
                    }, 60000);
                } else if (status === 0) {
                    ALSocket.stompClient.send('/topic/typing-' + MCK_APP_ID + "-" + TYPING_TAB_ID, {
                        "content-type": "text/plain"
                    }, MCK_APP_ID + "," + MCK_USER_ID + "," + status);
                }
                ALSocket.mck_typing_status = status;
            }
        };
        ALSocket.onTypingStatus = function(resp) {
            if (typeof events.onTypingStatus === "function") {
                events.onTypingStatus(resp);
            }
        };
        ALSocket.reconnect = function() {
            ALSocket.unsubscibeToTypingChannel();
            ALSocket.unsubscibeToNotification();
            ALSocket.disconnect();
            var data ={};
            data.token = MCK_TOKEN ;
            data.deviceKey = USER_DEVICE_KEY;
            data.websocketUrl = MCK_WEBSOCKET_URL;
            ALSocket.init(MCK_APP_ID, data, events);
        };
        ALSocket.onError = function(err) {
            console.log("Error in channel notification. " + err);
            if (typeof events.onConnectFailed === "function") {
                events.onConnectFailed();
            }
        };
        ALSocket.sendStatus = function(status) {
            if (ALSocket.stompClient && ALSocket.stompClient.connected) {
                ALSocket.stompClient.send('/topic/status-v2', {
                    "content-type": "text/plain"
                }, MCK_TOKEN + "," + USER_DEVICE_KEY + "," + status);
            }
        };
        ALSocket.onConnect = function() {
            if (ALSocket.stompClient.connected) {
                if (subscriber) {
                    ALSocket.unsubscibeToNotification();
                }
                subscriber = ALSocket.stompClient.subscribe("/topic/" + MCK_TOKEN, ALSocket.onMessage);
                ALSocket.sendStatus(1);
                ALSocket.checkConnected(true);
            } else {
                setTimeout(function() {
                    subscriber = ALSocket.stompClient.subscribe("/topic/" + MCK_TOKEN, ALSocket.onMessage);
                    ALSocket.sendStatus(1);
                    ALSocket.checkConnected(true);
                }, 5000);
            }
            if (typeof events.onConnect === "function") {
                events.onConnect();
            }
        };
        ALSocket.onOpenGroupMessage = function(obj) {
            if (typeof events.onOpenGroupMessage === "function") {
                events.onOpenGroupMessage(obj);
            }
        };
        ALSocket.onMessage = function (obj) {
            if (subscriber != null && subscriber.id === obj.headers.subscription) {
                var resp = JSON.parse(obj.body);
                var messageType = resp.type;
                if (typeof events.onMessage === "function") {
                    events.onMessage(resp);
                }
                if (messageType === "APPLOZIC_04" || messageType === "MESSAGE_DELIVERED") {
                    events.onMessageDelivered(resp);
                } else if (messageType === 'APPLOZIC_08' || messageType === "MT_MESSAGE_DELIVERED_READ") {
                    events.onMessageRead(resp);
                } else if (messageType === "APPLOZIC_05") {
                    events.onMessageDeleted(resp);
                } else if (messageType === 'APPLOZIC_27') {
                    events.onConversationDeleted(resp);
                }
                else if (messageType === 'APPLOZIC_11') {
                    events.onUserConnect(resp.message);
                } else if (messageType === 'APPLOZIC_12') {
                  var lastSeenAtTime = resp.message.split(",")[1];
                    events.onUserDisconnect({
                        'userId': userId,
                        'lastSeenAtTime': lastSeenAtTime
                    });
                } else if (messageType === "APPLOZIC_29") {
                    events.onConversationReadFromOtherSource(resp);
                } else if (messageType === 'APPLOZIC_28') {
                    events.onConversationRead(resp);
                } else if (messageType === "APPLOZIC_16") {
                    var status = resp.message.split(":")[0];
                    var userId = resp.message.split(":")[1];
                    events.onUserBlocked({
                        'status': status,
                        'userId': userId
                    });
                } else if (messageType === 'APPLOZIC_17') {
                    var status = resp.message.split(":")[0];
                    var userId = resp.message.split(":")[1];
                    events.onUserUnblocked({
                        'status': status,
                        'userId': userId
                    });
                } else if (messageType === 'APPLOZIC_18') {
                    events.onUserActivated();
                } else if (messageType === 'APPLOZIC_19') {
                    events.onUserDeactivated();
                } else {
                    var message = resp.message;
                    if (messageType === "APPLOZIC_03") {
                        events.onMessageSentUpdate({
                            'messageKey': message.key
                        });
                    } else if (messageType === "APPLOZIC_01" || messageType === "APPLOZIC_02" || messageType === "MESSAGE_RECEIVED") {
                        events.onMessageReceived({
                            'message': messageFeed
                        });
                    } else if (messageType === "APPLOZIC_02") {
                        var messageFeed = mckMessageLayout.getMessageFeed(message);
                        events.onMessageSent({
                            'message': messageFeed
                        });
                    }

                }
            }
        };

        return ALSocket;
    }

    if(typeof(ALSocket) === 'undefined'){
        window.Applozic.ALSocket = define_ALSocket();
    } else{
        console.log("ALSocket already defined.");
    }
})(window);
