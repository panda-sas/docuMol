import { useState } from 'react';

const mockAnswers: Record<string, string> = {
  'What is BTZ-043?': 'BTZ-043 is a benzothiazinone targeting DprE1...',
  'What models was it tested on?': 'BTZ-043 was tested in murine TB models...',
  'Any known side effects?': 'No significant toxicity was reported...'
};

export function AskAssistant() {
  const [input, setInput] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAsk = () => {
    setLoading(true);
    setAnswer('');

    setTimeout(() => {
      setAnswer(mockAnswers[input] || "No answer available for that question yet.");
      setLoading(false);
    }, 1500);
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
