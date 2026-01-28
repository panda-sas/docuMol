import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const mockAnswers: Record<string, string> = {
  'What models was BTZ-043 tested on?': 'BTZ-043 was tested in murine models using BALB/c mice.',
  'List all studies targeting InhA': 'BTZ-043 and related analog studies target InhA.',
  'Show me molecules effective against MDR-TB': 'BTZ-043 showed high efficacy in MDR-TB models.',
};

const suggestedQuestions = Object.keys(mockAnswers);

export function ResearchAskAssistant() {
  const [input, setInput] = useState('');
  const [answer, setAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const requestIdRef = useRef(0);
  const timeoutRef = useRef<number | null>(null);

  const handleAsk = (queryOverride?: string) => {
    const query = (queryOverride ?? input).trim();
    if (!query) return;

    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }

    requestIdRef.current += 1;
    const requestId = requestIdRef.current;

    setInput(query);
    setIsLoading(true);
    setAnswer('');

    timeoutRef.current = window.setTimeout(() => {
      if (requestIdRef.current !== requestId) return;
      setAnswer(mockAnswers[query] ?? 'No mock answer available for that question.');
      setIsLoading(false);
    }, 700);
  };

  return (
    <div className="bg-card rounded-2xl border border-border/50 p-6 space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-foreground">Research Ask Assistant</h2>
        <p className="text-sm text-muted-foreground">
          Ask a quick question about your research documents.
        </p>
      </div>

      <form
        className="flex flex-col sm:flex-row gap-3"
        onSubmit={(event) => {
          event.preventDefault();
          handleAsk();
        }}
      >
        <Input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Ask about models, targets, or molecules..."
          className="flex-1"
        />
        <Button type="submit" className="sm:w-28">
          Ask
        </Button>
      </form>

      <div className="flex flex-wrap gap-2">
        {suggestedQuestions.map((question) => (
          <button
            key={question}
            type="button"
            onClick={() => handleAsk(question)}
            className="text-xs px-3 py-1.5 rounded-full border border-border/50 text-muted-foreground hover:text-foreground hover:border-teal/40 transition-colors"
          >
            {question}
          </button>
        ))}
      </div>

      <div className="bg-surface rounded-xl border border-border/50 p-4 text-sm text-muted-foreground min-h-[64px]">
        {isLoading ? (
          <span>Thinking...</span>
        ) : answer ? (
          <span className="text-foreground">{answer}</span>
        ) : (
          <span>Pick a question or type your own to see a mock answer.</span>
        )}
      </div>
    </div>
  );
}
