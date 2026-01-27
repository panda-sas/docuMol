import { useState } from 'react';
import { Star, ThumbsUp, ThumbsDown, HelpCircle, MessageSquare } from 'lucide-react';
import { DocumentFeedback } from '@/lib/mockData';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

interface FeedbackPanelProps {
  feedback: DocumentFeedback;
  onChange: (feedback: DocumentFeedback) => void;
  compact?: boolean;
}

export function FeedbackPanel({ feedback, onChange, compact = false }: FeedbackPanelProps) {
  const [showComment, setShowComment] = useState(!!feedback.comment);
  const [hoveredStar, setHoveredStar] = useState(0);

  const handleRating = (rating: number) => {
    onChange({ ...feedback, rating });
  };

  const handlePreference = (preference: DocumentFeedback['preference']) => {
    onChange({ 
      ...feedback, 
      preference: feedback.preference === preference ? null : preference 
    });
  };

  const handleComment = (comment: string) => {
    onChange({ ...feedback, comment });
  };

  return (
    <div className={`flex flex-col gap-3 ${compact ? 'flex-row items-center gap-6' : ''}`}>
      {/* Star Rating */}
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => handleRating(star)}
            onMouseEnter={() => setHoveredStar(star)}
            onMouseLeave={() => setHoveredStar(0)}
            className="p-0.5 transition-transform hover:scale-110"
          >
            <Star
              className={`w-4 h-4 transition-colors ${
                star <= (hoveredStar || feedback.rating)
                  ? 'fill-amber-400 text-amber-400'
                  : 'text-muted-foreground/40'
              }`}
            />
          </button>
        ))}
      </div>

      {/* Preference Buttons */}
      <div className="flex items-center gap-1">
        <button
          onClick={() => handlePreference('like')}
          className={`
            inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium
            transition-all duration-200 border
            ${feedback.preference === 'like'
              ? 'bg-teal text-teal-foreground border-teal shadow-sm'
              : 'bg-surface border-border hover:border-teal/50 text-muted-foreground hover:text-foreground'
            }
          `}
        >
          <ThumbsUp className="w-3.5 h-3.5" />
          {!compact && 'Like'}
        </button>
        <button
          onClick={() => handlePreference('dislike')}
          className={`
            inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium
            transition-all duration-200 border
            ${feedback.preference === 'dislike'
              ? 'bg-rose-500 text-white border-rose-500 shadow-sm'
              : 'bg-surface border-border hover:border-rose-300 text-muted-foreground hover:text-foreground'
            }
          `}
        >
          <ThumbsDown className="w-3.5 h-3.5" />
          {!compact && 'Dislike'}
        </button>
        <button
          onClick={() => handlePreference('maybe')}
          className={`
            inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium
            transition-all duration-200 border
            ${feedback.preference === 'maybe'
              ? 'bg-amber-500 text-white border-amber-500 shadow-sm'
              : 'bg-surface border-border hover:border-amber-300 text-muted-foreground hover:text-foreground'
            }
          `}
        >
          <HelpCircle className="w-3.5 h-3.5" />
          {!compact && 'Maybe'}
        </button>
      </div>

      {/* Comment Toggle & Input */}
      {!compact && (
        <>
          {!showComment ? (
            <button
              onClick={() => setShowComment(true)}
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              Add comment
            </button>
          ) : (
            <div className="space-y-2">
              <Textarea
                value={feedback.comment}
                onChange={(e) => handleComment(e.target.value)}
                placeholder="Share your thoughts on this document..."
                className="text-sm resize-none h-20"
              />
              <div className="flex justify-end">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    handleComment('');
                    setShowComment(false);
                  }}
                  className="text-xs"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
