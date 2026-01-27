import { useState } from 'react';
import { Send, User as UserIcon } from 'lucide-react';
import { DocumentComment, User, currentUser } from '@/lib/mockData';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface CommentSectionProps {
  comments: DocumentComment[];
  onAddComment: (comment: DocumentComment) => void;
}

export function CommentSection({ comments, onAddComment }: CommentSectionProps) {
  const [newComment, setNewComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment: DocumentComment = {
      id: `c-${Date.now()}`,
      text: newComment.trim(),
      author: currentUser,
      createdAt: new Date(),
    };

    onAddComment(comment);
    setNewComment('');
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days} days ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="space-y-3">
      {/* Existing Comments */}
      {comments.length > 0 && (
        <div className="space-y-2 max-h-32 overflow-y-auto">
          {comments.map((comment) => (
            <div key={comment.id} className="flex items-start gap-2 text-xs">
              <Avatar className="w-5 h-5">
                <AvatarFallback className="text-[10px] bg-navy/10 text-navy">
                  {getInitials(comment.author.name)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-foreground">{comment.author.name}</span>
                  <span className="text-muted-foreground">{formatDate(comment.createdAt)}</span>
                </div>
                <p className="text-muted-foreground mt-0.5">{comment.text}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Comment Form */}
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <Avatar className="w-6 h-6">
          <AvatarFallback className="text-[10px] bg-teal/10 text-teal">
            {getInitials(currentUser.name)}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 relative">
          <Input
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="h-8 text-xs pr-8 bg-surface border-border/50 focus:border-teal/50"
          />
          <button
            type="submit"
            disabled={!newComment.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-teal disabled:opacity-40 disabled:hover:text-muted-foreground transition-colors"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </form>
    </div>
  );
}
