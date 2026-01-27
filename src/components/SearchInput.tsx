import { useState } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchInput({ value, onChange, placeholder = 'Search documents...' }: SearchInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={`
      relative flex items-center transition-all duration-200
      ${isFocused ? 'ring-2 ring-teal/20' : ''}
      rounded-xl bg-card border border-border/50
    `}>
      <Search className="absolute left-4 w-4 h-4 text-muted-foreground" />
      <Input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        className="pl-11 pr-10 py-6 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-4 p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
