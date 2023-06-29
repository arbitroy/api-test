
// Set your app credentials
const credentials = {
    apiKey: 'MyAppAPIkey',
    username: 'MyAppUsername',
}

// Initialize the SDK
import AfricasTalking from 'africastalking';

const africasTalking = AfricasTalking(credentials);

// Get the SMS service
const sms = africasTalking.SMS;

function sendMessage() {
    const options = {
        // Set the numbers you want to send to in international format
        to: ['+254', '758337480'],
        // Set your message
        message: "I'm a lumberjack and its ok, I sleep all night and I work all day",
        // Set your shortCode or senderId
        from: 'XXYYZZ'
    }

    // That’s it, hit send and we’ll take care of the rest
    sms.send(options)
        .then(console.log)
        .catch(console.log);
}

sendMessage();
