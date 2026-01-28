# DocuStore: AI Coding Agent Instructions

## Project Overview
**DocuStore** is a pharma-research document intelligence platform that ingests, parses, and indexes R&D documents (PDF, Word, PowerPoint) using AI to extract molecular structures, auto-summarize content, and enable AI-enhanced search. The frontend is a React + TypeScript SPA built with Vite, Tailwind CSS, and shadcn/ui components.

**Problem Solved**: Pharma R&D teams lose institutional knowledge trapped in legacy documents. DocuStore makes buried research findable through automated extraction, SMILES conversion, tagging, and search.

## Architecture Overview

### Frontend Stack
- **Framework**: React 18 with TypeScript (strict mode disabled per config)
- **Build Tool**: Vite with React SWC compiler
- **Styling**: Tailwind CSS (custom pharma color scheme: navy, teal, violet)
- **UI Components**: shadcn/ui (Radix UI primitives) + custom components
- **State Management**: React hooks + TanStack React Query for server state
- **Routing**: React Router v6 (app structure in `App.tsx`)
- **Development Server**: Vite dev server on port 8080 with HMR disabled for overlay

### Core Data Model (mockData.ts)
The system represents pharma research documents with this structure:
```
PharmaDocument
├── Basic metadata (id, title, fileType, uploadedAt, pageCount)
├── Summaries (shortSummary, mediumSummary)
├── Pages[] (text, images per page)
├── Tags[] (molecule, protein, pathway, method, disease)
├── Molecules[] (name, SMILES string, formula)
├── Feedback (rating, preference, comments with user metadata)
└── Status (processing | ready | error)
```

This structure directly maps to README's "Conceptual Data Model" and reflects the processing pipeline.

### Page Structure & Routing
- **Dashboard** (`/`): Lists documents with stats (count, tags, molecules), filterable search
- **Upload** (`/upload`): Drag-drop zone, displays processing steps (text extraction → AI summarization → entity recognition)
- **Search** (`/search`): Full-text search interface (not yet detailed in component files)
- **Document Viewer** (`/document/:id`): Per-document detail page (structure in route but component not shown)
- **Layout**: Fixed 64px left sidebar with navigation + main content area

## Developer Workflows

### Development
```bash
bun dev      # Start Vite dev server (port 8080)
bun build    # Vite production build
bun lint     # Run ESLint (unused vars warnings disabled)
```

### Testing
```bash
bun test         # Run Vitest (jsdom environment)
bun test:watch   # Watch mode
```
- Test setup: `src/test/setup.ts`
- Test files: `**/*.test.ts` or `**/*.spec.ts`
- ESLint rule: `"@typescript-eslint/no-unused-vars": "off"` (disabled)

### Configuration Notes
- **Path Alias**: `@/` → `src/` (configured in tsconfig.json, vite.config.ts, vitest.config.ts)
- **TypeScript Strictness**: `noImplicitAny: false`, `strictNullChecks: false`, `noUnusedLocals: false` (permissive by design, likely Lovable-generated)
- **Tailwind**: Dark mode via class strategy, custom sidebar colors (navy, teal, violet)
- **ESLint**: Minimal setup (ESM config, React hooks + refresh rules enforced)

## Component Patterns & Conventions

### UI Components (shadcn/ui)
Located in `src/components/ui/`. These are Radix UI-wrapped components with Tailwind styling. **Do not modify** unless fixing bugs. Examples: `button.tsx`, `card.tsx`, `dialog.tsx`, `form.tsx`.

### Custom Components
- **Layout.tsx**: Wraps pages with sidebar (fixed 64px width) and main content
- **AppSidebar.tsx**: Fixed navigation sidebar with Home/Upload/Search links; uses `useLocation()` for active state highlighting
- **DocumentCard.tsx**: Displays single document with:
  - Toggle between short/medium summaries
  - Tag chips (see `TagChip.tsx`)
  - Molecule gallery (see `MoleculeCard.tsx`)
  - Feedback/rating panel (see `FeedbackPanel.tsx`)
  - Comment section (see `CommentSection.tsx`)
  - Edit metadata (last edited by, date)
- **SearchInput.tsx**: Generic search field; used in Dashboard for title/summary/tag filtering
- **UploadZone.tsx**: Drag-drop file upload area
- **MoleculeCard.tsx**: Displays molecule (name, SMILES, formula) in gallery format
- **TagChip.tsx**: Badge-like display for document tags with type coloring
- **CommentSection.tsx**, **FeedbackPanel.tsx**: User feedback and threaded comments

### Key Patterns
1. **Props with Callbacks**: Components accept `onFeedbackChange`, `onDocumentUpdate` to lift state up (Dashboard page manages document state)
2. **Avatar Component**: Uses `getInitials()` helper for user display
3. **Date Formatting**: Custom `formatEditDate()` for relative dates ("today", "2 days ago")
4. **Animation**: Staggered card animations with CSS `animation-delay` (see `animate-fade-up` in Index.tsx)
5. **Conditional Icons**: Icon selection based on data (e.g., `Presentation` for PPT, `FileText` for PDF)

## Integration Points

### React Router Conventions
- Routes defined in `App.tsx`
- Comment in App.tsx: **"ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE"**
- Use `Link` from React Router (not HTML `<a>`)
- `useLocation()` for route detection (sidebar active state example)

### TanStack React Query
- **QueryClient** instance created and provided in App via `QueryClientProvider`
- Not actively used in current code (mock data only), but configured for future API integration
- When adding backend APIs: use hooks pattern with `useQuery`/`useMutation`

### Styling Conventions
- **Tailwind First**: No CSS files except index.css (global) and App.css
- **Color Scheme**: Custom palette defined in tailwind.config.ts:
  - Navy (`bg-navy`, `text-navy`)
  - Teal (`bg-teal`, `text-teal`)
  - Violet (`text-violet-600`, `bg-violet-100`)
  - Muted states (`text-muted-foreground`, `bg-muted`)
- **Layout**: Grid `grid-cols-1 md:grid-cols-3` for responsive cards; flex for layouts
- **Spacing**: Standard Tailwind scales (p-8, gap-4, mb-6, etc.)
- **Rounded Corners**: Consistent `rounded-2xl`, `rounded-xl` for cards and buttons

## Common Tasks & Patterns

### Adding a New Page
1. Create `src/pages/NewPage.tsx`, export default component
2. Import Layout and wrap content
3. Add route in `App.tsx` (BEFORE the catch-all `*` route)
4. Add NavLink to AppSidebar navItems array if needed

### Adding a New Component
1. Create in `src/components/` or `src/components/ui/` (UI if Radix-based)
2. Use TypeScript interfaces for props
3. Import shadcn/ui components from `@/components/ui/`
4. Use Tailwind classes for styling; import Lucide icons (`lucide-react`)

### Filtering/Searching Documents
- Pattern: useState for query, filter mockDocuments with `.filter()` and `.some()` for tag matching (see Index.tsx)
- Future: Replace mock data with React Query `useQuery` for backend

### Managing Document State
- Lift state to page level (e.g., `setDocuments` in Index.tsx)
- Pass handlers to child components (`onFeedbackChange`)
- Update document with spread operator: `{ ...doc, feedback, lastEditedBy, lastEditedAt }`

### Working with Icons
- Import from `lucide-react` (e.g., `FileText`, `Upload`, `Search`, `Beaker`)
- Use consistent sizing: `w-5 h-5`, `w-4.5 h-4.5`, `w-4 h-4`
- Wrap with icon-specific styling (e.g., `bg-navy/5 text-navy`)

## Project Context: Pharma Domain
- **Target Users**: Data scientists, AI engineers, R&D analysts, product managers
- **Document Types**: PDF (with OCR), Word (.docx), PowerPoint (.pptx), plaintext (.txt)
- **Extracted Entities**: Molecules (via SMILES), proteins, pathways, diseases, methods
- **Summarization Levels**: Short (1-2 lines), Medium (paragraph), Detailed (multi-paragraph)
- **Core Feature**: AI search (keyword + concept + image-derived)

## Version & Branch Info
- **Current Branch**: v1.0.0
- **Default Branch**: main
- **Built with**: Lovable (component tagger plugin in vite.config.ts)

## Important Notes
- No existing `.cursorrules`, `.windsurfrules`, or agent-specific files found
- Mock data used throughout (no backend integration yet); QueryClient configured for future API calls
- TypeScript compilation is permissive (loose null/implicit-any checks)—maintain this for Lovable compatibility
- Sidebar is **fixed 64px width**; main content uses `ml-64` margin
