import { useState } from 'react';

const mockAnswers: Record<string, string> = {
  'What is BTZ-043?': 'BTZ-043 is a benzothiazinone derivative tested against MDR-TB. It targets DprE1 and shows strong in vivo efficacy.',
  'What models was it tested on?': 'BTZ-043 was evaluated in murine TB infection models using BALB/c mice.',
  'Any known side effects?': 'Current preclinical data reports no significant toxicity at therapeutic doses.'
};

export function AskAssistant() {
  const [input, setInput] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAsk = () => {
    setLoading(true);
    setAnswer('');

    setTimeout(() => {
      setAnswer(mockAnswers[input] || "Sorry, I don't have that answer yet. Try a different question.");
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
        <button onClick={handleAsk} className="mt-2 bg-green-600 text-white px-4 py-1 rounded">
          Ask
        </button>
      </div>

      {loading && (
        <p className="text-sm text-gray-500">Thinking...</p>
      )}

      {!loading && answer && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <strong>Answer:</strong> <p>{answer}</p>
        </div>
      )}
    </div>
  );
}

export { mockAnswers };
