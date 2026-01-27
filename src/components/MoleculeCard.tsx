import { Molecule } from '@/lib/mockData';

interface MoleculeCardProps {
  molecule: Molecule;
  size?: 'sm' | 'md' | 'lg';
}

// Simple SVG representations of common molecules
const moleculeStructures: Record<string, React.ReactNode> = {
  'Aspirin': (
    <svg viewBox="0 0 120 80" className="w-full h-full">
      <g stroke="currentColor" strokeWidth="1.5" fill="none">
        {/* Benzene ring */}
        <polygon points="30,20 50,10 70,20 70,40 50,50 30,40" />
        <line x1="35" y1="23" x2="35" y2="37" />
        <line x1="45" y1="14" x2="55" y2="14" />
        <line x1="65" y1="23" x2="65" y2="37" />
        {/* Carboxylic acid */}
        <line x1="70" y1="30" x2="90" y2="30" />
        <line x1="90" y1="30" x2="100" y2="20" />
        <line x1="90" y1="30" x2="100" y2="40" />
        <circle cx="100" cy="20" r="5" className="fill-rose-100 stroke-rose-400" />
        <circle cx="100" cy="40" r="5" className="fill-rose-100 stroke-rose-400" />
        {/* Acetyl group */}
        <line x1="30" y1="30" x2="15" y2="30" />
        <circle cx="10" cy="30" r="5" className="fill-rose-100 stroke-rose-400" />
      </g>
    </svg>
  ),
  'Caffeine': (
    <svg viewBox="0 0 120 80" className="w-full h-full">
      <g stroke="currentColor" strokeWidth="1.5" fill="none">
        {/* Purine ring system */}
        <polygon points="25,25 45,15 65,25 65,45 45,55 25,45" />
        <polygon points="65,25 85,15 95,30 85,45 65,45" />
        <line x1="30" y1="28" x2="30" y2="42" />
        <line x1="80" y1="20" x2="90" y2="25" />
        {/* Methyl groups */}
        <line x1="25" y1="35" x2="10" y2="35" />
        <circle cx="5" cy="35" r="4" className="fill-blue-100 stroke-blue-400" />
        <line x1="95" y1="30" x2="110" y2="30" />
        <circle cx="115" cy="30" r="4" className="fill-blue-100 stroke-blue-400" />
        {/* Carbonyl oxygens */}
        <circle cx="45" cy="10" r="4" className="fill-rose-100 stroke-rose-400" />
        <circle cx="55" cy="60" r="4" className="fill-rose-100 stroke-rose-400" />
      </g>
    </svg>
  ),
  'Ibuprofen': (
    <svg viewBox="0 0 120 80" className="w-full h-full">
      <g stroke="currentColor" strokeWidth="1.5" fill="none">
        {/* Benzene ring */}
        <polygon points="40,20 60,10 80,20 80,40 60,50 40,40" />
        <line x1="45" y1="23" x2="45" y2="37" />
        <line x1="55" y1="14" x2="65" y2="14" />
        <line x1="75" y1="23" x2="75" y2="37" />
        {/* Isobutyl group */}
        <line x1="40" y1="30" x2="25" y2="30" />
        <line x1="25" y1="30" x2="15" y2="20" />
        <line x1="25" y1="30" x2="15" y2="40" />
        {/* Propionic acid */}
        <line x1="80" y1="30" x2="95" y2="30" />
        <line x1="95" y1="30" x2="105" y2="20" />
        <circle cx="110" cy="20" r="4" className="fill-rose-100 stroke-rose-400" />
        <line x1="95" y1="30" x2="105" y2="40" />
        <circle cx="110" cy="40" r="4" className="fill-rose-100 stroke-rose-400" />
      </g>
    </svg>
  ),
  'Paracetamol': (
    <svg viewBox="0 0 120 80" className="w-full h-full">
      <g stroke="currentColor" strokeWidth="1.5" fill="none">
        {/* Benzene ring */}
        <polygon points="35,20 55,10 75,20 75,40 55,50 35,40" />
        <line x1="40" y1="23" x2="40" y2="37" />
        <line x1="50" y1="14" x2="60" y2="14" />
        <line x1="70" y1="23" x2="70" y2="37" />
        {/* Hydroxyl group */}
        <line x1="35" y1="30" x2="20" y2="30" />
        <circle cx="15" cy="30" r="5" className="fill-rose-100 stroke-rose-400" />
        {/* Acetamide group */}
        <line x1="75" y1="30" x2="90" y2="30" />
        <circle cx="90" cy="30" r="4" className="fill-blue-100 stroke-blue-400" />
        <line x1="94" y1="30" x2="105" y2="30" />
        <line x1="105" y1="30" x2="110" y2="20" />
        <circle cx="115" cy="15" r="4" className="fill-rose-100 stroke-rose-400" />
      </g>
    </svg>
  ),
  'Metformin': (
    <svg viewBox="0 0 120 80" className="w-full h-full">
      <g stroke="currentColor" strokeWidth="1.5" fill="none">
        {/* Biguanide structure */}
        <line x1="20" y1="40" x2="35" y2="40" />
        <circle cx="35" cy="40" r="5" className="fill-blue-100 stroke-blue-400" />
        <line x1="40" y1="40" x2="55" y2="40" />
        <line x1="55" y1="40" x2="55" y2="25" />
        <circle cx="55" cy="20" r="5" className="fill-blue-100 stroke-blue-400" />
        <line x1="55" y1="40" x2="70" y2="40" />
        <circle cx="70" cy="40" r="5" className="fill-blue-100 stroke-blue-400" />
        <line x1="75" y1="40" x2="90" y2="40" />
        <line x1="90" y1="40" x2="90" y2="25" />
        <circle cx="90" cy="20" r="5" className="fill-blue-100 stroke-blue-400" />
        <line x1="90" y1="40" x2="105" y2="40" />
        <circle cx="105" cy="40" r="5" className="fill-blue-100 stroke-blue-400" />
        {/* Methyl groups */}
        <line x1="20" y1="40" x2="10" y2="30" />
        <line x1="20" y1="40" x2="10" y2="50" />
      </g>
    </svg>
  ),
};

const sizeClasses = {
  sm: 'w-24 h-20',
  md: 'w-32 h-24',
  lg: 'w-40 h-32',
};

export function MoleculeCard({ molecule, size = 'md' }: MoleculeCardProps) {
  return (
    <div className="flex flex-col items-center gap-2 p-3 rounded-xl bg-surface border border-border/50 hover:border-teal/30 transition-colors">
      <div className={`${sizeClasses[size]} text-navy/70`}>
        {moleculeStructures[molecule.name] || (
          <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground font-mono">
            {molecule.smiles.substring(0, 15)}...
          </div>
        )}
      </div>
      <div className="text-center">
        <p className="text-sm font-medium text-foreground">{molecule.name}</p>
        <p className="text-xs font-mono text-muted-foreground">{molecule.formula}</p>
      </div>
    </div>
  );
}
