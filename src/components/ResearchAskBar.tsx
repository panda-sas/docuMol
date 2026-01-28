import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Loader2 } from 'lucide-react';

interface ResearchAskBarProps {
  onAnswerReceived?: (answer: string) => void;
}

interface DocumentSource {
  title: string;
  id: string;
}

const exampleQuestions = [
  "What models was BTZ-043 tested on?",
  "List all studies targeting InhA",
  "Show me molecules effective against MDR-TB"
];

export function ResearchAskBar({ onAnswerReceived }: ResearchAskBarProps) {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [sources, setSources] = useState<DocumentSource[]>([]);
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    setLoading(true);
    setAnswer('');
    setSources([]);

    const res = await fetch('/api/ask', {
      method: 'POST',
      body: JSON.stringify({ query: question }),
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await res.json();
    setAnswer(data.answer);
    setSources(data.sources || []);
    setLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAsk();
    }
  };

  return (
    <div className="mb-8">
      <div className="bg-card rounded-2xl border border-border/50 p-6">
        {/* Input Section */}
        <div className="flex gap-3 items-end">
          <div className="flex-1">
            <label className="block text-sm font-medium text-foreground mb-2">
              Ask a question about any document
            </label>
            <Input
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about TB research…"
              disabled={loading}
              className="bg-background border-border/50"
            />
          </div>
          <Button
            onClick={handleAsk}
            disabled={loading || !question.trim()}
            className="bg-teal hover:bg-teal/90 text-white"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Thinking…
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Ask
              </>
            )}
          </Button>
        </div>

        {/* Example Questions */}
        <div className="flex gap-2 mt-2 flex-wrap">
          {exampleQuestions.map((q) => (
            <button
              key={q}
              className="text-sm px-3 py-1 bg-gray-100 rounded-full hover:bg-gray-200"
              onClick={() => setQuestion(q)}
            >
              {q}
            </button>
          ))}
        </div>

        {loading && <p className="mt-4 text-sm text-gray-500">Thinking…</p>}

        {answer && (
          <div className="mt-4 p-4 bg-gray-50 rounded border text-sm text-gray-800">
            <strong>Answer:</strong> {answer}

            {sources.length > 0 && (
              <div className="mt-2">
                <p className="text-sm text-gray-600">
                  Based on {sources.length} document{sources.length > 1 ? 's' : ''}:
                </p>
                <ul className="list-disc list-inside text-sm text-blue-600 underline">
                  {sources.map((doc) => (
                    <li key={doc.id}>
                      <a href={`/documents/${doc.id}`}>{doc.title}</a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
