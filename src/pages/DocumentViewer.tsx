import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { TagChip } from '@/components/TagChip';
import { MoleculeCard } from '@/components/MoleculeCard';
import { FeedbackPanel } from '@/components/FeedbackPanel';
import { mockDocuments, PharmaDocument } from '@/lib/mockData';
import { 
  ArrowLeft, 
  FileText, 
  Presentation, 
  Calendar, 
  FileStack, 
  ChevronDown, 
  ChevronUp,
  Download
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const DocumentViewer = () => {
  const { id } = useParams();
  const [document, setDocument] = useState<PharmaDocument | undefined>(
    mockDocuments.find((doc) => doc.id === id)
  );
  const [summaryMode, setSummaryMode] = useState<'short' | 'medium'>('medium');
  const [currentPage, setCurrentPage] = useState(1);

  if (!document) {
    return (
      <Layout>
        <div className="p-8 max-w-6xl mx-auto">
          <div className="text-center py-16">
            <p className="text-muted-foreground">Document not found.</p>
            <Link to="/" className="text-teal hover:underline mt-2 inline-block">
              Return to dashboard
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const FileIcon = document.fileType === 'ppt' ? Presentation : FileText;

  const handleFeedbackChange = (feedback: PharmaDocument['feedback']) => {
    setDocument((prev) => prev ? { ...prev, feedback } : prev);
  };

  return (
    <Layout>
      <div className="flex min-h-screen">
        {/* Main Content */}
        <div className="flex-1 p-8 border-r border-border/50">
          {/* Back Button */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to dashboard
          </Link>

          {/* Document Header */}
          <div className="flex items-start gap-4 mb-8">
            <div className="p-4 rounded-xl bg-navy/5 text-navy">
              <FileIcon className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-foreground">{document.title}</h1>
              <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {document.uploadedAt.toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
                <span className="flex items-center gap-1">
                  <FileStack className="w-4 h-4" />
                  {document.pageCount} pages
                </span>
                <span className="uppercase text-xs font-medium px-2 py-0.5 rounded bg-muted">
                  {document.fileType}
                </span>
              </div>
            </div>
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="w-4 h-4" />
              Download
            </Button>
          </div>

          {/* Content Grid - Summary + Molecules Side by Side */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Summary Section */}
            <div className="lg:col-span-2 bg-card rounded-2xl border border-border/50 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-foreground">Summary</h2>
                <button
                  onClick={() => setSummaryMode(summaryMode === 'short' ? 'medium' : 'short')}
                  className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {summaryMode === 'short' ? (
                    <>
                      <ChevronDown className="w-4 h-4" />
                      Expand
                    </>
                  ) : (
                    <>
                      <ChevronUp className="w-4 h-4" />
                      Collapse
                    </>
                  )}
                </button>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {summaryMode === 'short' ? document.shortSummary : document.mediumSummary}
              </p>

              {/* Tags */}
              <div className="mt-6 pt-6 border-t border-border/50">
                <h3 className="text-sm font-medium text-muted-foreground mb-3">Extracted Entities</h3>
                <div className="flex flex-wrap gap-2">
                  {document.tags.map((tag) => (
                    <TagChip key={tag.id} tag={tag} editable />
                  ))}
                </div>
              </div>
            </div>

            {/* Molecules Section */}
            <div className="bg-card rounded-2xl border border-border/50 p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">Molecules</h2>
              <div className="space-y-3">
                {document.molecules.map((molecule) => (
                  <MoleculeCard key={molecule.id} molecule={molecule} size="md" />
                ))}
              </div>
            </div>
          </div>

          {/* Page Viewer Placeholder */}
          <div className="bg-card rounded-2xl border border-border/50 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-foreground">Document Pages</h2>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                >
                  Previous
                </Button>
                <span className="text-sm text-muted-foreground px-3">
                  Page {currentPage} of {document.pageCount}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === document.pageCount}
                  onClick={() => setCurrentPage((p) => Math.min(document.pageCount, p + 1))}
                >
                  Next
                </Button>
              </div>
            </div>
            <div className="aspect-[8.5/11] bg-surface rounded-xl border border-border/50 flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <FileText className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p className="text-sm">Page {currentPage} content preview</p>
                <p className="text-xs mt-1">Extracted text and images would appear here</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Metadata */}
        <aside className="w-80 p-6 bg-surface">
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-4">
            Document Metadata
          </h3>
          
          <div className="space-y-4">
            <div className="bg-card rounded-xl border border-border/50 p-4">
              <p className="text-xs text-muted-foreground mb-1">File Name</p>
              <p className="text-sm font-medium font-mono">{document.fileName}</p>
            </div>
            <div className="bg-card rounded-xl border border-border/50 p-4">
              <p className="text-xs text-muted-foreground mb-1">Upload Date</p>
              <p className="text-sm font-medium">
                {document.uploadedAt.toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
            <div className="bg-card rounded-xl border border-border/50 p-4">
              <p className="text-xs text-muted-foreground mb-1">Page Count</p>
              <p className="text-sm font-medium">{document.pageCount} pages</p>
            </div>
            <div className="bg-card rounded-xl border border-border/50 p-4">
              <p className="text-xs text-muted-foreground mb-1">File Type</p>
              <p className="text-sm font-medium uppercase">{document.fileType}</p>
            </div>
            <div className="bg-card rounded-xl border border-border/50 p-4">
              <p className="text-xs text-muted-foreground mb-1">Tags</p>
              <p className="text-sm font-medium">{document.tags.length} entities</p>
            </div>
            <div className="bg-card rounded-xl border border-border/50 p-4">
              <p className="text-xs text-muted-foreground mb-1">Molecules</p>
              <p className="text-sm font-medium">{document.molecules.length} found</p>
            </div>
          </div>

          {/* Feedback Section */}
          <div className="mt-8 pt-6 border-t border-border/50">
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-4">
              Your Feedback
            </h3>
            <FeedbackPanel
              feedback={document.feedback}
              onChange={handleFeedbackChange}
            />
          </div>
        </aside>
      </div>
    </Layout>
  );
};

export default DocumentViewer;
