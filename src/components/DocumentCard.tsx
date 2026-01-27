import { useState } from 'react';
import { FileText, Presentation, ChevronDown, ChevronUp, Calendar, FileStack, Clock } from 'lucide-react';
import { PharmaDocument, DocumentComment } from '@/lib/mockData';
import { TagChip } from './TagChip';
import { MoleculeCard } from './MoleculeCard';
import { FeedbackPanel } from './FeedbackPanel';
import { CommentSection } from './CommentSection';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Link } from 'react-router-dom';

interface DocumentCardProps {
  document: PharmaDocument;
  onFeedbackChange?: (feedback: PharmaDocument['feedback']) => void;
  onDocumentUpdate?: (document: PharmaDocument) => void;
}

export function DocumentCard({ document, onFeedbackChange, onDocumentUpdate }: DocumentCardProps) {
  const [summaryMode, setSummaryMode] = useState<'short' | 'medium'>('short');

  const FileIcon = document.fileType === 'ppt' ? Presentation : FileText;

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const formatEditDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) return 'today';
    if (days === 1) return 'yesterday';
    if (days < 7) return `${days} days ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const handleAddComment = (comment: DocumentComment) => {
    const updatedFeedback = {
      ...document.feedback,
      comments: [...document.feedback.comments, comment],
    };
    onFeedbackChange?.(updatedFeedback);
  };

  return (
    <div className="group bg-card rounded-2xl border border-border/50 hover:border-teal/30 hover:shadow-lg hover:shadow-teal/5 transition-all duration-300 overflow-hidden">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start gap-4 mb-4">
          <div className="p-3 rounded-xl bg-navy/5 text-navy">
            <FileIcon className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <Link 
              to={`/document/${document.id}`}
              className="block group/link"
            >
              <h3 className="text-lg font-semibold text-foreground group-hover/link:text-teal transition-colors line-clamp-2">
                {document.title}
              </h3>
            </Link>
            <div className="flex items-center gap-3 mt-1.5 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {document.uploadedAt.toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric', 
                  year: 'numeric' 
                })}
              </span>
              <span className="flex items-center gap-1">
                <FileStack className="w-3.5 h-3.5" />
                {document.pageCount} pages
              </span>
              <span className="uppercase text-xs font-medium px-1.5 py-0.5 rounded bg-muted">
                {document.fileType}
              </span>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Summary Section - 2 columns */}
          <div className="lg:col-span-2 space-y-4">
            {/* Summary Toggle */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSummaryMode(summaryMode === 'short' ? 'medium' : 'short')}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {summaryMode === 'short' ? (
                  <>
                    <ChevronDown className="w-3.5 h-3.5" />
                    Show more
                  </>
                ) : (
                  <>
                    <ChevronUp className="w-3.5 h-3.5" />
                    Show less
                  </>
                )}
              </button>
            </div>

            {/* Summary Text */}
            <div className="relative overflow-hidden">
              <p 
                className={`text-sm text-muted-foreground leading-relaxed transition-all duration-300 ${
                  summaryMode === 'short' ? 'line-clamp-3' : ''
                }`}
              >
                {summaryMode === 'short' ? document.shortSummary : document.mediumSummary}
              </p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {document.tags.map((tag) => (
                <TagChip key={tag.id} tag={tag} editable />
              ))}
            </div>
          </div>

          {/* Molecules Section - 1 column */}
          <div className="space-y-3">
            <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Extracted Molecules
            </h4>
            <div className="flex flex-wrap gap-2">
              {document.molecules.map((molecule) => (
                <MoleculeCard key={molecule.id} molecule={molecule} size="sm" />
              ))}
            </div>
          </div>
        </div>

        {/* Footer with Feedback */}
        <div className="mt-6 pt-4 border-t border-border/50">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              
              {/* Recently Edited By */}
              {document.lastEditedBy && document.lastEditedAt && (
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  <span>Edited {formatEditDate(document.lastEditedAt)} by</span>
                  <Avatar className="w-4 h-4">
                    <AvatarFallback className="text-[8px] bg-navy/10 text-navy">
                      {getInitials(document.lastEditedBy.name)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-medium text-foreground">{document.lastEditedBy.name}</span>
                </div>
              )}
            </div>
            
            <FeedbackPanel
              feedback={document.feedback}
              onChange={(feedback) => onFeedbackChange?.(feedback)}
              compact
            />
          </div>

          {/* Comment Section */}
          <div className="pt-3 border-t border-border/30">
            <CommentSection
              comments={document.feedback.comments}
              onAddComment={handleAddComment}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
