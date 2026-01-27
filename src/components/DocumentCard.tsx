import { useState } from 'react';
import { FileText, Presentation, ChevronDown, ChevronUp, Calendar, FileStack } from 'lucide-react';
import { PharmaDocument } from '@/lib/mockData';
import { TagChip } from './TagChip';
import { MoleculeCard } from './MoleculeCard';
import { FeedbackPanel } from './FeedbackPanel';
import { Link } from 'react-router-dom';

interface DocumentCardProps {
  document: PharmaDocument;
  onFeedbackChange?: (feedback: PharmaDocument['feedback']) => void;
}

export function DocumentCard({ document, onFeedbackChange }: DocumentCardProps) {
  const [summaryMode, setSummaryMode] = useState<'short' | 'medium'>('short');

  const FileIcon = document.fileType === 'ppt' ? Presentation : FileText;

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
        <div className="mt-6 pt-4 border-t border-border/50 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>{document.pageCount} pages</span>
            <span>•</span>
            <span className="uppercase">{document.fileType}</span>
          </div>
          <FeedbackPanel
            feedback={document.feedback}
            onChange={(feedback) => onFeedbackChange?.(feedback)}
            compact
          />
        </div>
      </div>
    </div>
  );
}
