import React, { useState } from 'react';

const exampleQuestions = [
  "What models was BTZ-043 tested on?",
  "List all studies targeting InhA",
  "Show me molecules effective against MDR-TB",
];

const mockAnswers: Record<string, string> = {
  "What models was BTZ-043 tested on?": "BTZ-043 was tested in murine models using BALB/c mice.",
  "List all studies targeting InhA": "BTZ-043 and related analog studies target InhA.",
  "Show me molecules effective against MDR-TB": "BTZ-043 showed high efficacy in MDR-TB models.",
};

export default function ResearchAskAssistant() {
  const [input, setInput] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAsk = (query?: string) => {
    const actualQuery = query || input;
    if (!actualQuery.trim()) return;

    setLoading(true);
    setAnswer('');

    setTimeout(() => {
      const result = mockAnswers[actualQuery] || "Sorry, no data found for that query.";
      setAnswer(result);
      setLoading(false);
    }, 1200);
  };

  const handleChipClick = (q: string) => {
    setInput(q);
    handleAsk(q);
  };

  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-xl shadow-md p-6 mb-6">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xl">💡</span>
        <label className="text-sm font-semibold text-gray-800">
          Ask a question about any document
        </label>
      </div>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about TB research..."
          className="flex-1 px-4 py-2 border border-yellow-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
        <button
          onClick={() => handleAsk()}
          disabled={loading}
          className="bg-amber-600 hover:bg-amber-700 disabled:bg-amber-400 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
        >
          {loading ? "Thinking..." : "Ask"}
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {exampleQuestions.map((q) => (
          <button
            key={q}
            onClick={() => handleChipClick(q)}
            className="text-xs px-3 py-1 border border-yellow-300 bg-white hover:bg-yellow-100 text-gray-700 rounded-full transition font-medium"
          >
            {q}
          </button>
        ))}
      </div>

      {loading && (
        <p className="text-gray-600 text-sm">Thinking…</p>
      )}

      {!loading && answer && (
        <div className="mt-4 p-4 bg-gray-100 border border-gray-300 rounded-lg text-sm text-gray-900 font-mono">
          <strong className="block mb-2 text-gray-800">Answer:</strong> {answer}
        </div>
      )}
    </div>
  );
}
