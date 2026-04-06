import axios from 'axios';

export async function callOllama(superPrompt: string): Promise<string> {
  const url = process.env.OLLAMA_URL ?? 'http://localhost:11434/api/generate';
  try {
    const res = await axios.post(
      url,
      {
        model: process.env.OLLAMA_MODEL ?? 'llama2',
        prompt: superPrompt,
        max_tokens: 2000,
      },
      { timeout: 60000 },
    );

    if (typeof res.data === 'string') return res.data;
    if (res.data.text) return res.data.text;
    if (res.data.output) {
      if (Array.isArray(res.data.output)) return res.data.output.map((o: any) => o.text || JSON.stringify(o)).join('');
      return JSON.stringify(res.data.output);
    }
    if (res.data.choices && res.data.choices[0]) return res.data.choices.map((c: any) => c.text || c.message?.content).join('');
    return JSON.stringify(res.data);
  } catch (err) {
    throw err;
  }
}
