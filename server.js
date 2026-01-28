import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// API endpoint for research questions
app.post('/api/ask', (req, res) => {
  const { question } = req.body;

  if (!question) {
    return res.status(400).json({ error: 'Question is required' });
  }

  // Mock response with answer and sources
  const mockResponse = {
    answer: 'BTZ-043 showed bactericidal activity in mice.',
    sources: [
      { id: 'doc-1', title: 'Preclinical Evaluation of BTZ-043 Against MDR-TB' },
      { id: 'doc-3', title: 'Murine TB Model Efficacy Studies' }
    ]
  };

  res.json(mockResponse);
});

app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
});
