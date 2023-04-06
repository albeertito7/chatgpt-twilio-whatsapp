import { Configuration, OpenAIApi } from 'openai';

class ChatBot {
  constructor(openai_api_key, model = 'gpt-3.5-turbo', max_tokens = 256) {
    this.openai_api_key = openai_api_key;
    this.model = model;
    this.max_tokens = max_tokens;

    const configuration = new Configuration({
      apiKey: this.openai_api_key
    });
    this.openai = new OpenAIApi(configuration);
  }
  async generateResponse(input_message) {
    const response = await this.openai.createChatCompletion({
      model: this.model,
      messages: [{ role: 'user', content: input_message }],
      max_tokens: this.max_tokens
    });
    console.log("ChatGPT res ->", response?.data?.choices[0]);
    return response?.data?.choices[0]?.message?.content;
  }
}

export default ChatBot;