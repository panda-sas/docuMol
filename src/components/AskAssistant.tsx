import { useState } from 'react';

const mockAnswers: Record<string, string> = {
  "What models was BTZ-043 tested on?":
    "BTZ-043 was tested in murine infection models using BALB/c mice to assess efficacy against MDR-TB strains.",

  "List all studies targeting InhA":
    "Studies targeting InhA include BTZ-043 preclinical evaluation, as well as analog screening projects involving isoniazid resistance pathways.",

  "Show me molecules effective against MDR-TB":
    "BTZ-043 and other benzothiazinone derivatives have demonstrated significant in vivo activity against multidrug-resistant TB in murine models."
};

const exampleQuestions = [
  "What models was BTZ-043 tested on?",
  "List all studies targeting InhA",
  "Show me molecules effective against MDR-TB"
];

export function AskAssistant() {
  const [input, setInput] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAsk = (customInput?: string) => {
    const query = customInput || input;
    setLoading(true);
    setAnswer('');

    setTimeout(() => {
      setAnswer(mockAnswers[query] || "Sorry, I don't have that answer yet.");
      setLoading(false);
    }, 1500);
  };

  const handleChipClick = (question: string) => {
    setInput(question);
    handleAsk(question);
  };

  return (
    <div>
      <div className="mb-4">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about TB research..."
          className="w-full p-2 border rounded"
        />
        <button onClick={handleAsk} className="mt-2 bg-blue-600 text-white px-4 py-1 rounded">
          Ask
        </button>
      </div>

      <div className="mb-4">
        {exampleQuestions.map((q) => (
          <button
            key={q}
            onClick={() => handleChipClick(q)}
            className="text-sm bg-gray-200 hover:bg-gray-300 rounded-full px-3 py-1 mr-2 mb-2"
          >
            {q}
          </button>
        ))}
      </div>

      {loading && <p className="text-gray-500 mt-2">Thinking…</p>}

      {!loading && answer && (
        <div className="mt-4 p-4 bg-gray-100 rounded border text-sm">
          <strong>Answer:</strong> <p>{answer}</p>
        </div>
      )}
    </div>
  );
}

export { mockAnswers };
