export interface Molecule {
  id: string;
  name: string;
  smiles: string;
  formula: string;
}

export interface DocumentTag {
  id: string;
  label: string;
  type: 'molecule' | 'protein' | 'pathway' | 'method' | 'disease';
  description?: string;
}

export interface DocumentPage {
  id: string;
  pageNumber: number;
  text: string;
  images: string[];
}

export interface User {
  id: string;
  name: string;
  avatar?: string;
}

export interface DocumentComment {
  id: string;
  text: string;
  author: User;
  createdAt: Date;
}

export interface DocumentFeedback {
  rating: number;
  preference: 'like' | 'dislike' | 'maybe' | null;
  comment: string;
  comments: DocumentComment[];
}

export interface PharmaDocument {
  id: string;
  title: string;
  fileName: string;
  fileType: 'pdf' | 'ppt' | 'docx';
  uploadedAt: Date;
  pageCount: number;
  shortSummary: string;
  mediumSummary: string;
  tags: DocumentTag[];
  molecules: Molecule[];
  pages: DocumentPage[];
  feedback: DocumentFeedback;
  status: 'processing' | 'ready' | 'error';
  lastEditedBy?: User;
  lastEditedAt?: Date;
}

export const mockUsers: User[] = [
  { id: 'user-1', name: 'Dr. Sarah Chen' },
  { id: 'user-2', name: 'James Miller' },
  { id: 'user-3', name: 'Emily Watson' },
];

export const currentUser: User = mockUsers[0];

export const molecules: Molecule[] = [
  {
    id: 'mol-1',
    name: 'Aspirin',
    smiles: 'CC(=O)OC1=CC=CC=C1C(=O)O',
    formula: 'C₉H₈O₄',
  },
  {
    id: 'mol-2',
    name: 'Caffeine',
    smiles: 'CN1C=NC2=C1C(=O)N(C(=O)N2C)C',
    formula: 'C₈H₁₀N₄O₂',
  },
  {
    id: 'mol-3',
    name: 'Ibuprofen',
    smiles: 'CC(C)CC1=CC=C(C=C1)C(C)C(=O)O',
    formula: 'C₁₃H₁₈O₂',
  },
  {
    id: 'mol-4',
    name: 'Paracetamol',
    smiles: 'CC(=O)NC1=CC=C(O)C=C1',
    formula: 'C₈H₉NO₂',
  },
  {
    id: 'mol-5',
    name: 'Metformin',
    smiles: 'CN(C)C(=N)NC(=N)N',
    formula: 'C₄H₁₁N₅',
  },
];

export const sampleTags: DocumentTag[] = [
  { id: 'tag-1', label: 'IL-6', type: 'protein', description: 'Interleukin-6, a pro-inflammatory cytokine' },
  { id: 'tag-2', label: 'COX-2', type: 'protein', description: 'Cyclooxygenase-2, enzyme involved in inflammation' },
  { id: 'tag-3', label: 'NF-κB', type: 'pathway', description: 'Nuclear factor kappa B signaling pathway' },
  { id: 'tag-4', label: 'HPLC', type: 'method', description: 'High-performance liquid chromatography' },
  { id: 'tag-5', label: 'Rheumatoid Arthritis', type: 'disease', description: 'Autoimmune inflammatory disease' },
  { id: 'tag-6', label: 'Mass Spectrometry', type: 'method', description: 'Analytical technique for molecular identification' },
];

export const mockDocuments: PharmaDocument[] = [
  {
    id: 'doc-1',
    title: 'Anti-inflammatory Drug Efficacy Study',
    fileName: 'anti_inflammatory_study_2024.pdf',
    fileType: 'pdf',
    uploadedAt: new Date('2024-01-15'),
    pageCount: 24,
    shortSummary: 'Comparative analysis of COX-2 inhibitors in treating rheumatoid arthritis, demonstrating 40% improvement in patient outcomes.',
    mediumSummary: 'This comprehensive study evaluates the efficacy of selective COX-2 inhibitors compared to traditional NSAIDs in treating rheumatoid arthritis. The research involved 450 patients over 12 months, measuring inflammatory markers including IL-6 and TNF-α. Results showed a 40% improvement in patient-reported outcomes with reduced gastrointestinal side effects. The study also examined molecular binding affinities using computational docking simulations.',
    tags: [sampleTags[0], sampleTags[1], sampleTags[4]],
    molecules: [molecules[0], molecules[2]],
    pages: [
      { id: 'p1', pageNumber: 1, text: 'Introduction to anti-inflammatory therapeutics...', images: [] },
      { id: 'p2', pageNumber: 2, text: 'Methodology and patient selection criteria...', images: [] },
    ],
    feedback: { 
      rating: 4, 
      preference: 'like', 
      comment: '',
      comments: [
        { id: 'c1', text: 'Excellent methodology section', author: mockUsers[1], createdAt: new Date('2024-01-16') }
      ]
    },
    status: 'ready',
    lastEditedBy: mockUsers[1],
    lastEditedAt: new Date('2024-01-18'),
  },
  {
    id: 'doc-2',
    title: 'Novel Drug Delivery Systems Review',
    fileName: 'drug_delivery_review.pdf',
    fileType: 'pdf',
    uploadedAt: new Date('2024-01-20'),
    pageCount: 18,
    shortSummary: 'Review of nanoparticle-based drug delivery mechanisms targeting specific cellular pathways.',
    mediumSummary: 'A systematic review of emerging nanoparticle-based drug delivery systems, focusing on liposomal formulations and polymer conjugates. The paper discusses targeting mechanisms via NF-κB pathway modulation and presents analytical methods including HPLC and mass spectrometry for characterization. Clinical applications in oncology and autoimmune diseases are highlighted.',
    tags: [sampleTags[2], sampleTags[3], sampleTags[5]],
    molecules: [molecules[3], molecules[4]],
    pages: [
      { id: 'p1', pageNumber: 1, text: 'Overview of nanoparticle technologies...', images: [] },
    ],
    feedback: { rating: 5, preference: null, comment: '', comments: [] },
    status: 'ready',
    lastEditedBy: mockUsers[2],
    lastEditedAt: new Date('2024-01-22'),
  },
  {
    id: 'doc-3',
    title: 'Caffeine Metabolism Pathways',
    fileName: 'caffeine_metabolism.pptx',
    fileType: 'ppt',
    uploadedAt: new Date('2024-02-01'),
    pageCount: 32,
    shortSummary: 'Presentation on cytochrome P450 enzyme involvement in caffeine metabolism.',
    mediumSummary: 'Detailed presentation exploring the metabolic pathways of caffeine through cytochrome P450 enzymes, particularly CYP1A2. Covers pharmacokinetic variations across populations, drug-drug interactions, and genetic polymorphisms affecting metabolism rates. Includes analytical methods for plasma caffeine quantification.',
    tags: [sampleTags[3], sampleTags[5]],
    molecules: [molecules[1]],
    pages: [],
    feedback: { rating: 0, preference: null, comment: '', comments: [] },
    status: 'ready',
  },
];
