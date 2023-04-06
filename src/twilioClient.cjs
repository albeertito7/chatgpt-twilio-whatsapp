const twilio = require('twilio');

// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
class TwilioClient {
  constructor(accountSid, authToken, sandboxPhoneNumber) {
    this.accountSid = accountSid;
    this.authToken = authToken;
    this.sandboxPhoneNumber = sandboxPhoneNumber;
    this.client = twilio(this.accountSid, this.authToken);
  }

  async sendTextMessage(to, message) {
    try {
      const twilioMessage = await this.client.messages.create({
        from: `whatsapp:${this.sandboxPhoneNumber}`,
        to: `whatsapp:${to}`,
        body: message
      });
      console.log("Twilio msg ->", twilioMessage);
    } catch (err) {
      console.log(err);
      throw new Error('Error sending the twilio message: ' + err);
    }
  }
}

module.exports = TwilioClient;
