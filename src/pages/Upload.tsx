import { Layout } from '@/components/Layout';
import { UploadZone } from '@/components/UploadZone';
import { FileText, Sparkles, Tags, Clock } from 'lucide-react';

const Upload = () => {
  return (
    <Layout>
      <div className="p-8 max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Upload Documents</h1>
          <p className="text-muted-foreground mt-2">
            Drag and drop your pharma research documents for automatic parsing and insight extraction
          </p>
        </div>

        {/* Upload Zone */}
        <div className="mb-12">
          <UploadZone />
        </div>

        {/* Process Info */}
        <div className="bg-card rounded-2xl border border-border/50 p-8">
          <h2 className="text-lg font-semibold text-foreground mb-6">What happens after upload</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex gap-4">
              <div className="p-3 rounded-xl bg-navy/5 text-navy h-fit">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-medium text-foreground">Text Extraction</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  We parse every page and extract readable text, maintaining document structure
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="p-3 rounded-xl bg-teal/10 text-teal h-fit">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-medium text-foreground">AI Summarization</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Generate short and medium-length summaries capturing key findings
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="p-3 rounded-xl bg-violet-100 text-violet-600 h-fit">
                <Tags className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-medium text-foreground">Entity Recognition</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Identify molecules, proteins, pathways, and other scientific entities
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="p-3 rounded-xl bg-amber-100 text-amber-600 h-fit">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-medium text-foreground">Quick Processing</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Most documents are processed within 30 seconds to 2 minutes
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Upload;
