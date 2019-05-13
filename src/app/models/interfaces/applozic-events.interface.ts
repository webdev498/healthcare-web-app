export interface ApplozicEvents
{
    onConnectFailed(),
    onConnect(),
    onMessageDelivered(),
    onMessageRead(),
    onMessageDeleted(),
    onConversationDeleted(),
    onUserConnect(),
    onUserDisconnect(),
    onConversationReadFromOtherSource(),
    onConversationRead(),
    onMessageReceived(resp: any),
    onMessageSentUpdate(),
    onMessageSent(),
    onUserBlocked(),
    onUserUnblocked(),
    onUserActivated(),
    onUserDeactivated(),
    connectToSocket(),
    onMessage(),
    onTypingStatus(resp: any)
}
