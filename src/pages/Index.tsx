import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { DocumentCard } from '@/components/DocumentCard';
import { ResearchAskAssistant } from '@/components/ResearchAskAssistant';
import { SearchInput } from '@/components/SearchInput';
import { ResearchAskBar } from '@/components/ResearchAskBar';
import { Button } from '@/components/ui/button';
import { mockDocuments, PharmaDocument, currentUser } from '@/lib/mockData';
import { FileText, TrendingUp, Tag } from 'lucide-react';

const Index = () => {
  const [documents, setDocuments] = useState<PharmaDocument[]>(mockDocuments);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAskBar, setShowAskBar] = useState(false);

  const filteredDocuments = documents.filter((doc) =>
    doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.shortSummary.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.tags.some((tag) => tag.label.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleFeedbackChange = (docId: string, feedback: PharmaDocument['feedback']) => {
    setDocuments((prev) =>
      prev.map((doc) => (doc.id === docId ? { 
        ...doc, 
        feedback,
        lastEditedBy: currentUser,
        lastEditedAt: new Date(),
      } : doc))
    );
  };

  const totalTags = documents.reduce((acc, doc) => acc + doc.tags.length, 0);
  const totalMolecules = documents.reduce((acc, doc) => acc + doc.molecules.length, 0);

  return (
    <Layout>
      <div className="p-8 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Document Dashboard</h1>
            <p className="text-muted-foreground mt-2">
              Browse and analyze your research documents.
            </p>
          </div>
          <Button
            onClick={() => setShowAskBar(!showAskBar)}
            className="bg-teal hover:bg-teal/90 text-white"
          >
            Ask Research Assistant
          </Button>
        </div>

        {/* Research Ask */}
        <div className="mb-8">
          <ResearchAskAssistant />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-card rounded-2xl border border-border/50 p-5 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-navy/5 text-navy">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-foreground">{documents.length}</p>
              <p className="text-sm text-muted-foreground">Documents</p>
            </div>
          </div>
          <div className="bg-card rounded-2xl border border-border/50 p-5 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-teal/10 text-teal">
              <Tag className="w-5 h-5" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-foreground">{totalTags}</p>
              <p className="text-sm text-muted-foreground">Tags Extracted</p>
            </div>
          </div>
          <div className="bg-card rounded-2xl border border-border/50 p-5 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-violet-100 text-violet-600">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-foreground">{totalMolecules}</p>
              <p className="text-sm text-muted-foreground">Molecules Found</p>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="mb-8">
          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search by title, summary, or tags..."
          />
        </div>

        {/* Document Grid */}
        <div className="space-y-6">
          {filteredDocuments.length > 0 ? (
            filteredDocuments.map((doc, index) => (
              <div
                key={doc.id}
                className="animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <DocumentCard
                  document={doc}
                  onFeedbackChange={(feedback) => handleFeedbackChange(doc.id, feedback)}
                />
              </div>
            ))
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground">No documents found matching your search.</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Index;
