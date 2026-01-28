import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Beaker, ChevronRight } from 'lucide-react';
import { molecules } from '@/lib/mockData';

interface MoleculeSketchModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onMoleculeSelect: (moleculeName: string) => void;
}

export function MoleculeSketchModal({
  open,
  onOpenChange,
  onMoleculeSelect,
}: MoleculeSketchModalProps) {
  const [searching, setSearching] = useState(false);

  const handleMoleculeClick = (moleculeName: string) => {
    setSearching(true);
    // Simulate a brief delay for realism
    setTimeout(() => {
      onMoleculeSelect(moleculeName);
      setSearching(false);
      onOpenChange(false);
    }, 300);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Beaker className="w-5 h-5 text-navy" />
            Search by Molecule Structure
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-3 py-4">
          <p className="text-sm text-muted-foreground">
            Select a molecule to search for related documents:
          </p>

          <div className="space-y-2 max-h-64 overflow-y-auto">
            {molecules.map((mol) => (
              <button
                key={mol.id}
                onClick={() => handleMoleculeClick(mol.name)}
                disabled={searching}
                className="w-full text-left p-3 rounded-lg border border-border/30 bg-muted/30 hover:border-teal/30 hover:bg-teal/5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-foreground mb-1">
                      {mol.name}
                    </h4>
                    <p className="text-xs text-muted-foreground font-mono truncate">
                      {mol.formula}
                    </p>
                    <p className="text-xs text-muted-foreground font-mono truncate mt-1">
                      SMILES: {mol.smiles.substring(0, 40)}
                      {mol.smiles.length > 40 ? '...' : ''}
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-1" />
                </div>
              </button>
            ))}
          </div>

          <div className="pt-2 text-center">
            <p className="text-xs text-muted-foreground">
              Search will find documents containing this molecule or SMILES structure.
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={searching}
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
