import express, { Express, Request, Response } from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

// Интерфейсы для типизации
interface IGenApiRequest {
  prompt: string;
  max_tokens?: number;
}

interface IGenApiResponse {
  result: string;
  [key: string]: any;
}

interface IErrorResponse {
  error: string;
}

const app: Express = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());

app.post('/api/generate-comment', async (req: Request, res: Response): Promise<any> => {
  const apiKey = process.env.GEN_API_KEY;
  
  if (!apiKey) {
    return res.status(500).json({ error: 'GEN_API_KEY is not configured' });
  }

  if (!req.body.prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  try {
    const response = await axios.post<IGenApiResponse>(
      'https://api.gen-api.ru/api/v1/networks/gpt-4-5', {
         messages: [{
            role: "user",
            content: req.body.prompt,
         }],
         max_tokens: req.body.max_tokens || 300,
         is_sync: true,
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        timeout: 10000
      }
    );

    return res.json(response.data);
  } catch (err: unknown) {
   if (err instanceof Error && 'isAxiosError' in err && err.isAxiosError) {
     const axiosError = err as { response?: { data?: { message?: string } }, message: string };
     console.error('Gen-API Error:', axiosError.response?.data || axiosError.message);
     const errorMessage = axiosError.response?.data?.message || axiosError.message || 'Unknown error occurred';
     return res.status(500).json({ error: errorMessage });
   }}
});

app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});

export default app;