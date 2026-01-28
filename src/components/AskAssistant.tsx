import React, { useState } from 'react';

// Suggested questions
const exampleQuestions = [
  "What models was BTZ-043 tested on?",
  "List all studies targeting InhA",
  "Show me molecules effective against MDR-TB",
];

// Mock answers for demonstration
const mockAnswers: Record<string, string> = {
  "What models was BTZ-043 tested on?":
    "BTZ-043 was tested in murine infection models using BALB/c mice to assess efficacy against MDR-TB strains.",
  "List all studies targeting InhA":
    "Studies targeting InhA include BTZ-043 preclinical evaluation, and analog screening projects involving isoniazid resistance pathways.",
  "Show me molecules effective against MDR-TB":
    "BTZ-043 and other benzothiazinone derivatives demonstrated activity against MDR-TB in murine models.",
};

export default function ResearchAskAssistant() {
  const [input, setInput] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAsk = (customInput?: string) => {
    const query = customInput || input;
    setLoading(true);
    setAnswer('');

    setTimeout(() => {
      setAnswer(mockAnswers[query] || "Sorry, I don't have an answer for that yet.");
      setLoading(false);
    }, 1500);
  };

  const handleChipClick = (question: string) => {
    setInput(question);
    handleAsk(question);
  };

  return (
    <div className="bg-white border rounded-lg p-6 shadow-sm mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Ask a question about any document
      </label>
      <div className="flex gap-2 mb-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about TB research..."
          className="flex-1 px-4 py-2 border rounded text-sm"
        />
        <button
          onClick={() => handleAsk()}
          className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded text-sm"
        >
          {loading ? "Thinking..." : "Ask"}
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {exampleQuestions.map((q) => (
          <button
            key={q}
            onClick={() => handleChipClick(q)}
            className="text-sm bg-gray-200 hover:bg-gray-300 rounded-full px-3 py-1"
          >
            {q}
          </button>
        ))}
      </div>

      {loading && <p className="text-gray-500 text-sm">Thinking…</p>}

      {!loading && answer && (
        <div className="mt-3 p-3 bg-gray-50 border rounded text-sm text-gray-800">
          <strong>Answer:</strong> {answer}
        </div>
      )}
    </div>
  );
}
