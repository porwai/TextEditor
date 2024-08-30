import OpenAI from 'openai';
/*
const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY, // Make sure to store your API key in an environment variable
});
*/

export const askLLM = async (context, prompt) => {
    /*
  const response = await openai.completions.create({
    model: "text-davinci-003", // Replace with your desired model
    prompt: `${context}\n\n${prompt}`,
    max_tokens: 150,
    temperature: 0.7,
  });
  

  return response.choices[0].text.trim();
  */
  return "hello"
};
