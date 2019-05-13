// create the test users: provider
/* var providerID = document.getElementById('provID').value;
 var patientName = document.getElementById('patientName').value;
 var patientLastName = document.getElementById('patientLastName').value;
 var token = document.getElementById('token').value;
 var currVisitId = document.getElementById('currVisitId').value; 
 console.log(providerID);
 console.log(patientName); 
 console.log(patientLastName);      */

// start patient visit queue
function StartPatientVisitQueue(providerID, patientName, patientLastName, token, currVisitId) {
    var WSClient = new fm.websync.client('https://emd-chat.vertex.com/websync.ashx');
    WSClient.connect({
        onSuccess: function(e) {
            WSClient.publish({
                channel: '/chat/' + providerID + '/0',
                data: {
                    Token: token,
                    Username: providerID,
                    Text: 'Dr. ' + providerID + ' has started a visits queue.',
                    MessageType: 'system_message'
                },
                onSuccess: function(e) {
                    WSClient.subscribe({
                        channel: '/chat/' + providerID + '/0',
                        onSuccess: function(e) {
                            document.getElementById('lblActivityStatus').innerHTML = 'success: new provider visit queue established';
                            /*this.ViewVisitChat(providerID,patientName,patientLastName,token,currVisitId,WSClient);*/
                            if (currVisitId != null && currVisitId != '') {
                                WSClient.leave({
                                    channel: '/chat/' + providerID + '/' + currVisitId,
                                    userId: providerID,
                                    userNickname: providerID,
                                    onSuccess: function(e) {
                                        alert('left visit ' + currVisitId);
                                    },
                                    onFailure: function(e) {
                                        alert('Could not leave visit/chat.');
                                        alert(e.getException().message);
                                    }
                                });
                            }
                            //`iframe_chatui_${currVisitId}`

                            var chatFrame = document.getElementById("iframe_chatui");
                            console.log(currVisitId);

                            if (chatFrame && chatFrame != null) {
                                chatFrame.src = 'https://emd-chat.vertex.com/ProviderChatBox.aspx?token=' + token + '&providerID=' + providerID + '&visitID=' + currVisitId + '&PatientFirstFirstName=' + patientName + '&PatientLastName=' + patientLastName
                                chatFrame.style.display = '';

                                var visitTabButton = document.getElementById('VisitTabButton' + currVisitId);
                                if (visitTabButton != null) {
                                    visitTabButton.style.background = '';
                                }

                                ShowCloseVisitButton();

                                currVisitId = currVisitId;
                            }
                        },
                        onFailure: function(e) {
                            alert('not subscribed');
                        },
                        onReceive: function(e) {
                            var msgReceived = e.getData();
                            console.log(msgReceived)
                            if (msgReceived != null && msgReceived.MessageType == 'visit_request') {
                                // AddVisitTab(msgReceived);
                            } else if (msgReceived != null && msgReceived.MessageType == 'new_msg') {
                                var visitId = msgReceived.VisitID;
                                var visitTabButton = document.getElementById('btn_' + visitId);
                                if (visitTabButton != null) {
                                    visitTabButton.style.background = 'red';
                                }
                            }
                        }
                    });
                },
                onFailure: function(e) {
                    alert('fail: ' + e.getException().message);
                },
                onReceive: function(e) {

                }
            });
        },
        onFailure: function(e) {
            // alert('fail2: ' + e.getException().message);
        },
        onStreamFailure: function(e) {

        },
        onReceive: function(e) {
            var msgReceived = e.getData();

            //alert(msgReceived.text + ' ' + msgReceived.timestamp.toLocaleTimeString());

        }
    });
}


var AddVisitTab = function(message) {
    var tabs = document.getElementById('tabs');
    if (tabs && tabs != null) {
        patientName = message.FirstName + ' ' + message.LastName.substring(0, 1);
        var visitID = message.VisitID;

        var newVisitTab = document.createElement('div');
        newVisitTab.style = 'display:inline-block';
        newVisitTab.id = 'VisitTabDiv' + visitID;
        newVisitTab.innerHTML = '<button class=VisitPatientTab onclick=ViewVisitChat("' + providerID + '","' + visitID + '") id=VisitTabButton' + visitID + '  >' + patientName + '</button>';
        tabs.appendChild(newVisitTab);
    }
}

var AddCloseVisitButton = function(message) {
    var btnCloseVisit = document.getElementById('btnCloseVisit');
    if (btnCloseVisit == null) {
        var buttons = document.getElementById('buttons');
        if (buttons && buttons != null) {
            var visitID = message.VisitID;

            divCloseVisit = document.createElement('div');
            divCloseVisit.style = 'display:inline-block';
            divCloseVisit.innerHTML = '<button class=VisitPatientTab onclick=CloseVisit("' + providerID + '","' + visitID + '") id=btnCloseVisit  ><img src="/Content/images/btn_close.png" /></button>';
            tabs.appendChild(divCloseVisit);
        }
    }
}

var ShowCloseVisitButton = function() {
    var btnCloseVisit = document.getElementById('btnCloseVisit');
    if (btnCloseVisit != null) {
        btnCloseVisit.style.display = '';
    }
}

var HideCloseVisitButton = function() {
    var btnCloseVisit = document.getElementById('btnCloseVisit');
    if (btnCloseVisit != null) {
        btnCloseVisit.style.display = 'none';
    }
}

var ViewVisitChat = function(providerID, patientName, patientLastName, token, currVisitId, WSClient) {
    if (currVisitId != null && currVisitId != '') {
        WSClient.leave({
            channel: '/chat/' + providerID + '/' + currVisitId,
            userId: providerID,
            userNickname: providerID,
            onSuccess: function(e) {
                // alert('left visit ' + currVisitId);
            },
            onFailure: function(e) {
                alert('Could not leave visit/chat.');
                alert(e.getException().message);
            }
        });
    }


    var chatFrame = document.getElementById("iframe_chatui");
    console.log(currVisitId);

    if (chatFrame && chatFrame != null) {
        chatFrame.src = 'https://emd-chat.vertex.com/ProviderChatBox.aspx?token=' + token + '&providerID=' + providerID + '&visitID=' + currVisitId + '&PatientFirstFirstName=' + patientName + '&PatientLastName=' + patientLastName
        chatFrame.style.display = '';

        var visitTabButton = document.getElementById('VisitTabButton' + currVisitId);
        if (visitTabButton != null) {
            visitTabButton.style.background = '';
        }

        ShowCloseVisitButton();

        currVisitId = currVisitId;
    }
}

var CloseVisit = function() {
    WSClient.leave({
        channel: '/chat/' + providerID + '/' + currVisitId,
        userId: providerID,
        userNickname: providerID,
        onSuccess: function(e) {
            //alert('left visit ' + currVisitId);
        },
        onFailure: function(e) {
            alert('Could not leave visit/chat.');
            alert(e.getException().message);
        }
    });

    var chatFrame = document.getElementById('iframe_chatui');
    if (chatFrame && chatFrame != null) {
        chatFrame.src = '';
        //chatFrame.style.display = 'none';
    }

    var visitTabButton = document.getElementById('VisitTabButton' + currVisitId);
    if (visitTabButton != null) {
        visitTabButton.parentNode.removeChild(visitTabButton);
    }

    var visitTabDiv = document.getElementById('VisitTabDiv' + currVisitId);
    if (visitTabDiv != null) {
        visitTabDiv.parentNode.removeChild(visitTabDiv);
    }

    var tabRow = document.getElementById('tabs');
    if (tabRow != null) {
        if (tabRow.childElementCount == 0) HideCloseVisitButton();
    }

    currVisitId = '';
}




function sendMessage(message) {
    try {
        document.getElementById("iframe_chatui").contentWindow.postMessage(message, "https://emd-chat.vertex.com/");
    } catch (e) {
        console.log(e);
    }
}



function receiveMessage(event) {
    try {
        /*This makes sure you only accept the value from the correct page.*/
        console.log("receiveMessage: origin=" + event.origin + "; message=" + event.data);

        if (event.origin === "http://localhost:7078" ||
            event.origin === "http://localhost:4200" ||
            event.origin === "http://emdtelemed-review.vertex.com" ||
            event.origin === "https://emdtelemed-review.vertex.com" ||
            event.origin === "http://emdtelemed-dev.vertex.com" ||
            event.origin === "https://emdtelemed-dev.vertex.com" ||
            event.origin === "http://emd-chat-dev1.vertex.com" ||
            event.origin === "https://emd-chat-dev1.vertex.com" ||
            event.origin === "http://emd-chat-dev2.vertex.com" ||
            event.origin === "https://emd-chat-dev2.vertex.com" ||
            event.origin === "http://emd-chat-review.vertex.com" ||
            event.origin === "https://emd-chat-review.vertex.com" ||
            event.origin === "http://emd-chat.vertex.com" ||
            event.origin === "https://emd-chat.vertex.com") {
            console.log(event.data);

            if (event.data == "ConfirmEndVisit") {
                console.log("Hide the End Visit button here")
                    // Hide End Visit Button
                this.HideEndVisitButton();
            } else if (event.data == "Exit") {
                console.log("Close the visit here") // Close the visit
                this.HideEndVisitButton();
            }
        }
    } catch (e) {
        console.log(e);
    }
}



// This is the event listener.  Starts when the page loads.
try {
    if (window.addEventListener) {
        window.addEventListener('message', receiveMessage, false);
    } else if (window.attachEvent) {
        window.attachEvent('onmessage', receiveMessage);

    }
} catch (e) {
    console.log(e);
}



function HideEndVisitButton() {
    var visitId = localStorage.getItem('VisitID')
    document.getElementById(`endVisit_${visitId}`).style.visibility = 'hidden';
    var ele = document.getElementById('execAction');
    if (typeof ele.click == 'function') { ele.click() } else if (typeof ele.onclick == 'function') { ele.onclick() }
}