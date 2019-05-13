// create the test users: provider and patients
url = 'https://emd-chat.vertex.com/StartPatientVisit.html'; //window.location.toString();

var qStr = url.substring(url.indexOf('?') + 1);
var token = '12345';
var visitID = '';
var providerID = '';

if (qStr.length > 1) {
    if (qStr.indexOf('&') > 0) {
        var nameValPairs = qStr.split('&');
        for (var p = 0; p < nameValPairs.length; p++) {
            var nameValPair = nameValPairs[p];
            if (nameValPair.indexOf('=') > 0) {
                nameValSplitterSetter(nameValPair, '=');
            }
        }
    } else if (qStr.indexOf('=') > 0) {
        nameValSplitterSetter(qStr, '=');
    }
}

function nameValSplitterSetter(nameValPair, splitterChar) {
    var nameVal = nameValPair.split(splitterChar);
    var name = nameVal[0];
    var val = nameVal[1];

    if (name == 'token') { token = val };
    if (name == 'visitID') { visitID = val };
    if (name == 'providerID') { providerID = val };

}

// for testing only
if (providerID == '') {
    providerID = '3';
}

while (!token || token == 'null') {
    token = prompt('Please enter the security token');
}



var StartPatientVisit = function(FirstName, LastName, VisitID, ReasonForVisit) {
    /*var txtFirstName = document.getElementById('txtFirstName').value;
    var txtLastName = document.getElementById('txtLastName').value;
    var txtVisitID = document.getElementById('txtVisitID').value;
    var txtReasonForVisit = document.getElementById('txtReasonForVisit').value;*/

    var txtFirstName = FirstName;
    var txtLastName = LastName;
    var txtVisitID = VisitID;
    var txtReasonForVisit = ReasonForVisit;

    if (visitID && visitID != '') txtVisitID = visitID;

    if (!txtFirstName || txtFirstName == '' || !txtLastName || txtLastName == '' || !txtVisitID || txtVisitID == '' || !txtReasonForVisit || txtReasonForVisit == '') {
        alert('Pls enter a patient name.');
    } else {
        // start patient visit
        var WSClient = new fm.websync.client('https://emd-chat.vertex.com/StartPatientVisit.html/websync.ashx');
        WSClient.connect({
            onSuccess: function(e) {
                WSClient.publish({
                    channel: '/chat/' + providerID + '/' + txtVisitID,
                    data: {
                        Token: token,
                        FirstName: txtFirstName,
                        LastName: txtLastName,
                        Username: txtFirstName + ' ' + txtLastName.substring(0, 1),
                        Text: txtFirstName + ' ' + txtLastName.substring(0, 1) + ' has started a visit.',
                        MessageType: 'system_message'
                    },
                    onSuccess: function(e) {
                        WSClient.publish({
                            channel: '/chat/' + providerID + '/' + txtVisitID,
                            data: {
                                Token: token,
                                ProviderID: providerID,
                                VisitID: txtVisitID,
                                Username: 'eMD',
                                Text: 'The physician will be with you shortly.',
                                MessageType: 'usermsg'
                            },
                            onSuccess: function(e) {},
                            onFailure: function(e) {
                                alert(e.getException().message);
                            }
                        });
                        WSClient.publish({
                            channel: '/chat/' + providerID + '/0',
                            data: {
                                Token: token,
                                ProviderID: providerID,
                                VisitID: txtVisitID,
                                FirstName: txtFirstName,
                                LastName: txtLastName,
                                ReasonForVisit: txtReasonForVisit,
                                MessageType: 'visit_request'
                            },
                            onSuccess: function(e) {
                                //alert('visit in queue');
                            },
                            onFailure: function(e) {

                            }
                        });
                    },
                    onFailure: function(e) {
                        alert('fail StartPatientVisit: ' + e.getException().message);
                    }
                });

                var chatFrame = document.getElementById('iframe_chatui');
                if (chatFrame && chatFrame != null) {
                    chatFrame.src = 'https://emd-chat.vertex.com/PatientChatBox.aspx?token=' + token + '&providerID=' + providerID + '&visitID=' + txtVisitID + '&patientFirstName=' + txtFirstName + '&patientLastName=' + txtLastName;
                }
            },
            onFailure: function(e) {
                alert('fail2: ' + e.getException().message);
            },
            onStreamFailure: function(e) {

            },
            onReceive: function(e) {
                var msgReceived = e.getData();

                alert(msgReceived.text + ' ' + msgReceived.timestamp.toLocaleTimeString());

            }
        });


    }
}

// This is the event listener.  Starts when the page loads.
try {
    if (window.addEventListener) {
        window.addEventListener('message', receiveMessageP, false);
    } else if (window.attachEvent) {
        window.attachEvent('onmessage', receiveMessageP);
    }
} catch (e) {
    console.log(e);
}



function receiveMessageP(event) {
    console.log(event);

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
            if (event.data == "ConfirmEndVisit") {
                console.log("Hide the End Visit button here") // Hide End Visit Button
                HideEndVisitButtonPatient();
            } else if (event.data == "Exit") {
                console.log("Close the visit here") // Close the visit
                CloseEndVisitButtonPatient();
            }
        }
    } catch (e) {
        console.log(e);
    }
}



function sendMessageP(message) {
    try {
        document.getElementById("iframe_chatui").contentWindow.postMessage(message, "https://emd-chat.vertex.com/");
    } catch (e) {
        console.log(e);
    }
}



function HideEndVisitButtonPatient() {
    console.log(document.getElementById('endVisitbuttonPatient'));
    document.getElementById('endVisitbuttonPatient').style.visibility = 'hidden';
}



function CloseEndVisitButtonPatient() {
    var ele = document.getElementById('execAction');
    console.log(ele);

    if (typeof ele.click == 'function') {
        ele.click()
    } else if (typeof ele.onclick == 'function') {
        ele.onclick()
    }
}