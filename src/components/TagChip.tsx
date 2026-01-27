import { useState } from 'react';
import { Pencil } from 'lucide-react';
import { DocumentTag } from '@/lib/mockData';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface TagChipProps {
  tag: DocumentTag;
  editable?: boolean;
  onEdit?: (tag: DocumentTag) => void;
}

const tagTypeColors: Record<DocumentTag['type'], string> = {
  molecule: 'bg-teal-muted text-teal border-teal/20',
  protein: 'bg-amber-50 text-amber-700 border-amber-200',
  pathway: 'bg-violet-50 text-violet-700 border-violet-200',
  method: 'bg-slate-100 text-slate-600 border-slate-200',
  disease: 'bg-rose-50 text-rose-600 border-rose-200',
};

const tagTypeLabels: Record<DocumentTag['type'], string> = {
  molecule: 'Molecule',
  protein: 'Protein',
  pathway: 'Pathway',
  method: 'Method',
  disease: 'Disease',
};

export function TagChip({ tag, editable = false, onEdit }: TagChipProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span
          className={`
            inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium
            border transition-all duration-200 cursor-default
            ${tagTypeColors[tag.type]}
            ${isHovered ? 'shadow-sm' : ''}
          `}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {tag.label}
          {editable && isHovered && (
            <button
              onClick={() => onEdit?.(tag)}
              className="ml-0.5 p-0.5 rounded hover:bg-black/5 transition-colors"
            >
              <Pencil className="w-3 h-3" />
            </button>
          )}
        </span>
      </TooltipTrigger>
      <TooltipContent side="top" className="max-w-xs">
        <p className="font-medium text-xs text-muted-foreground mb-1">
          {tagTypeLabels[tag.type]} detected
        </p>
        <p className="text-sm">{tag.description || tag.label}</p>
      </TooltipContent>
    </Tooltip>
  );
}
