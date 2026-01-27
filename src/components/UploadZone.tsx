import { useState, useCallback } from 'react';
import { Upload, FileText, Presentation, X, Loader2, CheckCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: 'pdf' | 'ppt' | 'docx';
  status: 'uploading' | 'processing' | 'complete' | 'error';
  progress: number;
}

interface UploadZoneProps {
  onUploadComplete?: (files: UploadedFile[]) => void;
}

export function UploadZone({ onUploadComplete }: UploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<UploadedFile[]>([]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const simulateUpload = useCallback((file: File) => {
    const fileType = file.name.endsWith('.pdf') ? 'pdf' 
      : file.name.endsWith('.pptx') || file.name.endsWith('.ppt') ? 'ppt' 
      : 'docx';

    const uploadedFile: UploadedFile = {
      id: Math.random().toString(36).substring(7),
      name: file.name,
      size: file.size,
      type: fileType,
      status: 'uploading',
      progress: 0,
    };

    setFiles((prev) => [...prev, uploadedFile]);

    // Simulate upload progress
    let progress = 0;
    const uploadInterval = setInterval(() => {
      progress += Math.random() * 20;
      if (progress >= 100) {
        progress = 100;
        clearInterval(uploadInterval);
        setFiles((prev) =>
          prev.map((f) =>
            f.id === uploadedFile.id
              ? { ...f, progress: 100, status: 'processing' }
              : f
          )
        );

        // Simulate processing
        setTimeout(() => {
          setFiles((prev) =>
            prev.map((f) =>
              f.id === uploadedFile.id ? { ...f, status: 'complete' } : f
            )
          );
        }, 2000);
      } else {
        setFiles((prev) =>
          prev.map((f) =>
            f.id === uploadedFile.id ? { ...f, progress } : f
          )
        );
      }
    }, 200);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    droppedFiles.forEach(simulateUpload);
  }, [simulateUpload]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    selectedFiles.forEach(simulateUpload);
  }, [simulateUpload]);

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const FileIcon = ({ type }: { type: UploadedFile['type'] }) => {
    return type === 'ppt' ? (
      <Presentation className="w-5 h-5" />
    ) : (
      <FileText className="w-5 h-5" />
    );
  };

  return (
    <div className="space-y-4">
      {/* Drop Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          relative border-2 border-dashed rounded-2xl p-12 text-center
          transition-all duration-300 cursor-pointer
          ${isDragging
            ? 'border-teal bg-teal/5 scale-[1.02]'
            : 'border-border hover:border-teal/50 hover:bg-surface'
          }
        `}
      >
        <input
          type="file"
          accept=".pdf,.ppt,.pptx,.doc,.docx"
          multiple
          onChange={handleFileSelect}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <div className="flex flex-col items-center gap-4">
          <div className={`
            p-4 rounded-2xl transition-colors
            ${isDragging ? 'bg-teal/10 text-teal' : 'bg-muted text-muted-foreground'}
          `}>
            <Upload className="w-8 h-8" />
          </div>
          <div>
            <p className="text-lg font-medium text-foreground">
              Drop files here or click to upload
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Supports PDF, PPT, PPTX, DOC, DOCX
            </p>
          </div>
        </div>
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className="space-y-3">
          {files.map((file) => (
            <div
              key={file.id}
              className="flex items-center gap-4 p-4 bg-card rounded-xl border border-border/50 animate-fade-up"
            >
              <div className={`
                p-2.5 rounded-lg
                ${file.status === 'complete' ? 'bg-teal/10 text-teal' : 'bg-muted text-muted-foreground'}
              `}>
                <FileIcon type={file.type} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {file.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {formatFileSize(file.size)}
                </p>
                {file.status === 'uploading' && (
                  <div className="mt-2">
                    <Progress value={file.progress} className="h-1" />
                  </div>
                )}
                {file.status === 'processing' && (
                  <p className="text-xs text-teal mt-1.5 flex items-center gap-1.5">
                    <Loader2 className="w-3 h-3 animate-spin" />
                    Ingesting... extracting insights
                  </p>
                )}
              </div>
              <div className="flex items-center gap-2">
                {file.status === 'complete' && (
                  <CheckCircle className="w-5 h-5 text-teal" />
                )}
                <button
                  onClick={() => removeFile(file.id)}
                  className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
