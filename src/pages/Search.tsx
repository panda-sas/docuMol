import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { SearchInput } from '@/components/SearchInput';
import { TagChip } from '@/components/TagChip';
import { mockDocuments, sampleTags } from '@/lib/mockData';
import { FileText, Presentation, Calendar, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const toggleTag = (tagId: string) => {
    setSelectedTags((prev) =>
      prev.includes(tagId)
        ? prev.filter((id) => id !== tagId)
        : [...prev, tagId]
    );
  };

  const filteredDocuments = mockDocuments.filter((doc) => {
    const matchesSearch =
      searchQuery === '' ||
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.shortSummary.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTags =
      selectedTags.length === 0 ||
      doc.tags.some((tag) => selectedTags.includes(tag.id));

    return matchesSearch && matchesTags;
  });

  return (
    <Layout>
      <div className="p-8 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Search Documents</h1>
          <p className="text-muted-foreground mt-2">
            Find documents by keywords or filter by entity tags
          </p>
        </div>

        {/* Search */}
        <div className="mb-6">
          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search by title, content, or keywords..."
          />
        </div>

        {/* Tag Filters */}
        <div className="mb-8">
          <h3 className="text-sm font-medium text-muted-foreground mb-3">Filter by tags</h3>
          <div className="flex flex-wrap gap-2">
            {sampleTags.map((tag) => (
              <button
                key={tag.id}
                onClick={() => toggleTag(tag.id)}
                className={`
                  transition-all duration-200
                  ${selectedTags.includes(tag.id) ? 'ring-2 ring-teal ring-offset-2' : ''}
                `}
              >
                <TagChip tag={tag} />
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-muted-foreground">
              {filteredDocuments.length} result{filteredDocuments.length !== 1 ? 's' : ''}
            </h3>
          </div>

          {filteredDocuments.length > 0 ? (
            <div className="space-y-3">
              {filteredDocuments.map((doc, index) => {
                const FileIcon = doc.fileType === 'ppt' ? Presentation : FileText;
                return (
                  <Link
                    key={doc.id}
                    to={`/document/${doc.id}`}
                    className="block bg-card rounded-xl border border-border/50 p-5 hover:border-teal/30 hover:shadow-md transition-all duration-200 animate-fade-up"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-2.5 rounded-lg bg-navy/5 text-navy">
                        <FileIcon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-foreground">{doc.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                          {doc.shortSummary}
                        </p>
                        <div className="flex items-center gap-4 mt-3">
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {doc.uploadedAt.toLocaleDateString()}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {doc.pageCount} pages
                          </span>
                          <div className="flex gap-1.5">
                            {doc.tags.slice(0, 3).map((tag) => (
                              <TagChip key={tag.id} tag={tag} />
                            ))}
                            {doc.tags.length > 3 && (
                              <span className="text-xs text-muted-foreground">
                                +{doc.tags.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground" />
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16 bg-card rounded-xl border border-border/50">
              <p className="text-muted-foreground">No documents match your search criteria.</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Search;
