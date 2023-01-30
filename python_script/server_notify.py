import firebase_admin
from firebase_admin import messaging, credentials


class SendNotification:
    def __init__(self):
        cred = credentials.Certificate("appnotify_cred.json")
        firebase_admin.initialize_app(cred)

    def send_notification(self, web_device_id):
        message = messaging.Message(
            token=web_device_id,
            webpush=messaging.WebpushConfig(
                notification=messaging.WebpushNotification(
                    title='title',
                    body='you message body',
                    icon='https://icon.png',
                ),
            ),
        )

        # Send a message to the device corresponding to the provided registration token.
        response = messaging.send(message)

        # Response is a message ID string.
        print('Successfully sent message:', response)


web_device_id = "..."
SendNotification().send_notification(web_device_id)