import * as dotenv from 'dotenv';
import express from 'express';
import rateLimit from 'express-rate-limit';
import ChatBot from './chatBot.js';
import TwilioClient from './twilioClient.cjs';

dotenv.config();

const openaiApiKey = process.env.OPENAI_API_KEY;
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const sandboxPhoneNumber = process.env.TWILIO_SANDBOX_PHONE_NUMBER;

if (!openaiApiKey || !accountSid || !authToken || !sandboxPhoneNumber) {
  console.error("Check the environment variables. Exiting the program...");
  process.exit(1);
}

const chatBot = new ChatBot(openaiApiKey);
const twilioClient = new TwilioClient(accountSid, authToken, sandboxPhoneNumber);

const app = express();
app.use(express.json()); // JSON Payloads
app.use(express.urlencoded({ extended: true })); // body parser

const apiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10, // limit each IP to 10 requests per windowMs
  message: (req) => {
    const data = req.body;
    if (data.WaID) {
      twilioClient.sendTextMessage(data.WaId, "Too many request from this IP, please try again later");
    }
    res.status(429).send("Too many request from this IP, please try again later");
  }
})

app.post('/webhook', apiLimiter, async function (req, res) {
  console.log("/webhook ->", req.body);
  const data = req?.body;
  if (!data?.Body || !data?.WaId) {
    return res.status(400).send('Bad Request: missing Body or WaId');
  }
  const response = await chatBot.generateResponse(data?.Body);
  await twilioClient.sendTextMessage(data.WaId, response);
});

export default app;