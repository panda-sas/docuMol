## Overview
A modular AI platform that ingests, parses, and indexes thousands of legacy and modern R&D documents in pharma, converting complex, unstructured content into searchable, structured insights. It extracts molecular structures, links image and text data, summarizes at multiple levels, and makes buried research findable for drug discovery teams.

## Problem:
Pharma R&D teams lose countless hours redoing past work because institutional knowledge is trapped in legacy documents, PowerPoints, PDFs, and Word files with embedded graphs, chemical diagrams, and outdated formats.

## Goal:
Create a central intelligence layer that opens these documents through automated extraction, SMILES conversion, tagging, and search, so every discovery can build on everything that came before.

## Target Audience
•	Data Scientists – Use structured knowledge for model training and hypothesis validation.
•	AI Engineers – Integrate extracted content into NLP/LLM workflows.
•	R&D Analysts – Surface old results, molecular trials, or experimental outcomes.
•	Project & Portfolio Managers – Trace past initiatives or competitive compound research.

## Core Features
•	Multi-format ingestion (PDF, PPT, Word, TXT)
•	AI-based parsing (text, tables, diagrams, metadata)
•	Molecular image detection + SMILES conversion
•	Contextual linking of image + surrounding text
•	Auto-tagging with controlled scientific vocabulary
•	3-level summarization engine (short / medium / detailed)
•	AI-enhanced search: keyword, concept, and image-derived
•	Document lineage + version control

## System overview
The system comprises four modular layers:
1.	Ingestion Layer: Accepts and queues documents from various formats.
2.	Parsing & Extraction Layer:
   - Text extraction (OCR for scanned files)
   - Table, graph, and diagram detection
   - Metadata and image linking
3.	Molecular Understanding Layer:
   - Image recognition for chemical structures
   - SMILES conversion (e.g., using RDKit or OSRA)
4.	Summarization + Tagging Layer:
   - Multi-depth summarization (short/medium/detailed)
   - NER-based tagging with pharma-specific vocabularies
5.	Search & Access Layer:
   - AI-optimized full-text and concept search
   - Indexing via Elasticsearch or similar vector+keyword hybrid

## Conceptual Data Model 
•	Document: id, title, file_type, ingest_date, source
•	Page: document_id, page_number, content, summary_short, summary_medium, summary_detailed
•	ImageBlock: page_id, image_url, type (graph, molecule, etc.), linked_text_span
•	Molecule: image_id, SMILES, name_guess, matched_entities
•	Tag: document_id, tag_type, tag_value, source (NER/manual)

## Document handling
Format and Extraction Strategy
• PDF- PDF parser + OCR fallback for scanned images. Extracts text, layout, images, embedded tables, and annotations.
• Word (.doc/.docx)-	XML-based parsing for layout, headings, images, captions.
• PowerPoint (.ppt/.pptx) - Slide-by-slide parsing; capture speaker notes, visual hierarchy, image alignment.
• Notepad (.txt)- Basic text capture with line structure awareness.
• Each document is parsed into structured JSON with element-level granularity.
 
## Image and molecular processing
•	Image Parsing: Detect diagrams, graphs, charts using object detection models (e.g., YOLOv8 or Segment Anything).
•	OCR Layer: Applied on diagrams with labels, low-quality scans, or rasterized text.
•	Molecular Detection:
o	Classify images likely to be chemical structures.
o	Convert to SMILES via cheminformatics tools (OSRA + RDKit pipeline).
o	Cross-validate against text references for consistency.
Why SMILES? Enables integration into computational chemistry tools, ML pipelines, and cross-document molecule linking.
 
## Summarization and metadata
•	Multi-Resolution Summarization:
o	Short: 1–2 lines per page (fast scanning).
o	Medium: 1 paragraph per section (narrative overview).
o	Detailed: Multi-paragraph summaries with technical fidelity.
•	Metadata Extraction:
o	Title, authors, date, version, lab affiliation
o	Presentation-specific fields: conference name, presenter, session ID
•	Tagging System:
o	Entity tagging via pharma NER models (targets, genes, molecules, diseases)
o	Topic modeling (e.g., LDA or transformer-based)
o	Manual override for expert correction
 
## Searchability
•	Search Engine: Hybrid search using Elasticsearch + vector embeddings (e.g., OpenSearch or Weaviate).
•	Query Types:
o	Keyword (e.g., “VEGF inhibitors”)
o	Concept (e.g., “mechanism of action for antibody X”)
o	Visual (e.g., molecular image → related compounds)
•	Ranking:
o	Prioritize documents by recency, scientific relevance, and citation density.
o	Context-aware snippet previews from summaries.
 
## Data output
•	Document Index:
o	Stored in DAIKON and linked to targets, screens, projects and portfolios
•	Search Index:
o	Textual + vectorized elements
•	Access Layer:
o	REST API for downstream systems
o	Web dashboard for researchers
o	Downloadable summaries and SMILES files

## Advanced AI Features
## Ask Research Assistant
1. Interactive Q&A interface for natural language queries.
Users can ask questions like:
- “What models was BTZ-043 tested on?”
- “List all studies targeting InhA.”
- “Show me molecules effective against MDR-TB.”

System returns relevant answers by matching user queries against extracted document content (titles, tags, molecules, metadata, summaries).
- *Value:* Removes search friction, especially for non-technical users.
- *Application:* Rapid navigation through document corpus for R&D teams.
## Semantic Molecule Matching
2. Search from molecule-derived images using SMILES linkage.
Users can upload or select a molecule image; system identifies similar molecules and retrieves documents where they appear, directly or in text/structure.

- *Value:* Bridges image content and molecular informatics.
- *Application:* Allows chemists to find relevant studies even from visual cues (e.g., diagrams from old scanned slides).
## Document Similarity & Clustering
3. Automatic suggestion of “Related Documents.”
Uses shared tags (proteins, pathways), molecules, or experimental context to suggest similar documents when viewing any research asset.

- *Value:* Surfaces hidden linkages across studies.
- *Application:* Encourages knowledge reuse and cross-team collaboration.
## Visual + Interactive UI Features
4. Search bar with predictive chips + mock answer previews.
Implemented directly in dashboard view. Users can explore predefined questions and simulate AI responses without backend integration.

- *Value:* Demonstrates intelligence upfront.
- *Application:* Early-stage validation and stakeholder demo readiness.
<img width="468" height="622" alt="image" src="https://github.com/user-attachments/assets/2c969be1-aa0d-411c-a77c-45714e28ca2a" />


This prototype is built using Lovable.
**URL**: 
https://documolrep.lovable.app/

