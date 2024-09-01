export const askLLM = async (context, prompt) => {
    const response = await fetch('/api/ask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ context, prompt }),
    });
  
    const data = await response.json();
    return data.text;
  };
  