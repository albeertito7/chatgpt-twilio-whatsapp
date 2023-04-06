## Chatgpt + Twilio + Whatsapp

This repository aims to implement a chat bot via Whatsapp,
using the Twilio API and the ChatGPT API.

## Running this project

- [Node.js](https://nodejs.org/)
- A Twilio account
- A Twilio Whatsapp sandbox phone number
- [Ngrok](https://ngrok.com/) so that you can respond to webhooks in your local development environment

## Dependencies

```bash
npm install
```

## Environment variables

Use the `env.example` file to create your `.env`, to set up your own variables.

## Run the project

Start the web server:

```bash
npm start
```

## Development mode

```bash
npm run dev
```

## Expose the local server

To respond to an incoming webhook your will need a publicly available URL.
One alternative is to expose your local server port.
Ngrok is a tool that can tunnel through from a public URL to your machine.
Once downloaded you can execute the following:

```bash
ngrok http 3000
```

The ngrok terminal will show you a URL, like `https://RANDOM_STRING_.ngrok.io`.