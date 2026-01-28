import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Loader2 } from 'lucide-react';

interface ResearchAskBarProps {
  onAnswerReceived?: (answer: string) => void;
}

export function ResearchAskBar({ onAnswerReceived }: ResearchAskBarProps) {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState<string | null>(null);
  const [sources, setSources] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAsk = async () => {
    if (!question.trim()) return;

    setLoading(true);
    setError(null);
    setAnswer(null);
    setSources([]);

    try {
      const response = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      setAnswer(data.answer);
      setSources(data.sources || []);
      onAnswerReceived?.(data.answer);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get answer');
    } finally {
      setLoading(false);
    }
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

        {/* Error State */}
        {error && (
          <div className="mt-4 p-3 rounded-lg bg-destructive/10 border border-destructive/30 text-destructive text-sm">
            Error: {error}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="mt-4 p-4 bg-gray-50 rounded border text-sm text-gray-800">
            <strong>Thinking…</strong>
          </div>
        )}

        {/* Answer Display */}
        {answer && !loading && (
          <div className="mt-4 p-4 bg-gray-50 rounded border text-sm text-gray-800">
            <strong>Answer:</strong> {answer}
          </div>
        )}
      </div>
    </div>
  );
}
