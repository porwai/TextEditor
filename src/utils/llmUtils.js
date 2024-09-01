export const askLLM = async (context, prompt) => {
    const response = await fetch('http://localhost:5001/api/ask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ context, prompt }),
    });
  
    const data = await response.json();
    return data.text;
  };
  