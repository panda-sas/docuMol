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

  // Static response
  const answer = 'BTZ-043 showed strong bacterial load reduction in murine TB models.';

  res.json({ answer });
});

app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
});
