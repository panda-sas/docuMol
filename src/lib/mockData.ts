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
  {
    id: 'tag-1',
    label: 'InhA',
    type: 'protein',
    description: 'Enoyl-ACP reductase, a key Mycobacterium tuberculosis enzyme targeted by TB drugs',
  },
  {
    id: 'tag-2',
    label: 'DprE1',
    type: 'protein',
    description: 'Decaprenylphosphoryl-β-D-ribose 2′-epimerase, essential for mycobacterial cell wall synthesis',
  },
  {
    id: 'tag-3',
    label: 'MDR-TB',
    type: 'disease',
    description: 'Multi-drug resistant tuberculosis, resistant to at least isoniazid and rifampicin',
  },
  {
    id: 'tag-4',
    label: 'HPLC',
    type: 'method',
    description: 'High-performance liquid chromatography used for compound purity and quantification',
  },
  {
    id: 'tag-5',
    label: 'Murine TB Model',
    type: 'model',
    description: 'Mouse infection model used for in vivo evaluation of anti-tuberculosis compounds',
  },
  {
    id: 'tag-6',
    label: 'Mass Spectrometry',
    type: 'method',
    description: 'Analytical technique for molecular identification and metabolite profiling',
  },
];


export const mockDocuments: PharmaDocument[] = [
  {
    id: 'doc-1',
    title: 'Preclinical Evaluation of BTZ-043 Against Drug-Resistant Tuberculosis',
    fileName: 'btz043_preclinical_mdr_tb_2023.pdf',
    fileType: 'pdf',
    uploadedAt: new Date('2023-11-12'),
    pageCount: 28,
    shortSummary:
      'Preclinical assessment of the benzothiazinone BTZ-043 demonstrating strong activity against MDR-TB in murine infection models.',
    mediumSummary:
      'This study evaluates the preclinical efficacy of BTZ-043, a DprE1 inhibitor, against drug-resistant Mycobacterium tuberculosis strains. In vivo murine TB models showed significant bacterial load reduction in lung tissue after four weeks of treatment. Pharmacokinetic profiling and target engagement analyses support BTZ-043 as a promising lead compound for MDR-TB therapy. Analytical validation was performed using HPLC and mass spectrometry.',
    tags: [sampleTags[0], sampleTags[1], sampleTags[2], sampleTags[4]],
    molecules: [molecules[0]],
    pages: [
      {
        id: 'p1',
        pageNumber: 1,
        text: 'Introduction to benzothiazinones and their role in targeting mycobacterial cell wall synthesis...',
        images: [],
      },
      {
        id: 'p2',
        pageNumber: 2,
        text: 'Description of murine TB infection models and dosing regimens...',
        images: [],
      },
    ],
    feedback: {
      rating: 5,
      preference: 'like',
      comment: '',
      comments: [
        {
          id: 'c1',
          text: 'Strong in vivo efficacy data; recommend progression to lead optimization.',
          author: mockUsers[1],
          createdAt: new Date('2023-11-14'),
        },
      ],
    },
    status: 'ready',
    lastEditedBy: mockUsers[1],
    lastEditedAt: new Date('2023-11-15'),
  },
  {
    id: 'doc-2',
    title: 'Targeting DprE1 for Tuberculosis Drug Discovery: A Consortium Review',
    fileName: 'dpre1_target_review_tbdda.pdf',
    fileType: 'pdf',
    uploadedAt: new Date('2024-01-08'),
    pageCount: 22,
    shortSummary:
      'Consortium review of DprE1 as a validated drug target for tuberculosis, summarizing recent inhibitor classes and challenges.',
    mediumSummary:
      'This TB Drug Discovery Accelerator consortium review summarizes progress in targeting DprE1, an essential enzyme in Mycobacterium tuberculosis cell wall biosynthesis. The document covers multiple inhibitor scaffolds, resistance mechanisms, and structure–activity relationships. Analytical approaches including HPLC and mass spectrometry are discussed for compound validation. Implications for MDR-TB drug development are highlighted.',
    tags: [sampleTags[1], sampleTags[2], sampleTags[3], sampleTags[5]],
    molecules: [molecules[2], molecules[3]],
    pages: [
      {
        id: 'p1',
        pageNumber: 1,
        text: 'Overview of DprE1 biology and essentiality in M. tuberculosis...',
        images: [],
      },
    ],
    feedback: {
      rating: 4,
      preference: null,
      comment: '',
      comments: [],
    },
    status: 'ready',
    lastEditedBy: mockUsers[2],
    lastEditedAt: new Date('2024-01-10'),
  },
  {
    id: 'doc-3',
    title: 'Pharmacokinetic Profiling of Anti-TB Compounds in Murine Models',
    fileName: 'pk_profiling_tb_compounds.pptx',
    fileType: 'ppt',
    uploadedAt: new Date('2024-02-02'),
    pageCount: 34,
    shortSummary:
      'Presentation summarizing pharmacokinetic and exposure data for multiple TB-active compounds in murine models.',
    mediumSummary:
      'This presentation reviews pharmacokinetic studies conducted on a panel of TB-active compounds, including BTZ-043 analogs. Data include plasma concentration–time profiles, tissue distribution, and clearance rates in murine TB infection models. Mass spectrometry–based quantification methods were used to support exposure–response analysis.',
    tags: [sampleTags[4], sampleTags[5]],
    molecules: [molecules[0], molecules[1]],
    pages: [],
    feedback: {
      rating: 0,
      preference: null,
      comment: '',
      comments: [],
    },
    status: 'ready',
  },
];

