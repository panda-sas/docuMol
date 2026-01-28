import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Beaker, Upload, Zap, Search, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

export default function WelcomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-navy/5 via-background to-teal/5">
      {/* Header */}
      <header className="border-b border-border/40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-teal text-white">
              <Beaker className="w-6 h-6" />
            </div>
            <span className="text-2xl font-bold text-foreground">DocuStore</span>
          </Link>
          <Link to="/dashboard">
            <Button className="bg-navy hover:bg-navy/90 text-white">
              Sign In
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-6 py-20 text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight">
            AI-powered assistant for TB drug discovery
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Search smarter. Extract insights. Accelerate research.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Link to="/dashboard">
            <Button className="bg-teal hover:bg-teal/90 text-white px-8 py-6 text-lg rounded-lg flex items-center gap-2">
              Get Started
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
          <Button
            variant="outline"
            className="px-8 py-6 text-lg rounded-lg border-teal/30 hover:bg-teal/5"
          >
            Learn More
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Feature 1 */}
          <motion.div
            className="space-y-4 p-6 rounded-2xl border border-border/30 bg-card hover:border-teal/30 hover:shadow-lg hover:shadow-teal/5 transition-all"
            variants={cardVariants}
          >
            <div className="w-12 h-12 rounded-xl bg-navy/10 text-navy flex items-center justify-center">
              <Upload className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold text-foreground">Upload TB research documents</h3>
            <p className="text-muted-foreground">
              Support for PDF, Word, and PowerPoint formats. Automatically processed and indexed for instant search.
            </p>
          </motion.div>

          {/* Feature 2 */}
          <motion.div
            className="space-y-4 p-6 rounded-2xl border border-border/30 bg-card hover:border-teal/30 hover:shadow-lg hover:shadow-teal/5 transition-all"
            variants={cardVariants}
          >
            <div className="w-12 h-12 rounded-xl bg-teal/10 text-teal flex items-center justify-center">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold text-foreground">Automatically extract molecules, entities & summaries</h3>
            <p className="text-muted-foreground">
              AI-powered extraction of molecular structures, proteins, pathways, and auto-generated summaries.
            </p>
          </motion.div>

          {/* Feature 3 */}
          <motion.div
            className="space-y-4 p-6 rounded-2xl border border-border/30 bg-card hover:border-teal/30 hover:shadow-lg hover:shadow-teal/5 transition-all"
            variants={cardVariants}
          >
            <div className="w-12 h-12 rounded-xl bg-violet/10 text-violet-600 flex items-center justify-center">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold text-foreground">Ask questions and find similar studies</h3>
            <p className="text-muted-foreground">
              Semantic search by molecule, protein, or SMILES. Find related documents instantly.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-6 py-20 text-center">
        <div className="space-y-6 p-8 md:p-12 rounded-3xl border border-border/30 bg-gradient-to-br from-navy/5 to-teal/5">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Ready to accelerate your TB research?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join researchers who are using DocuStore to unlock insights from their document libraries.
          </p>
          <Link to="/dashboard">
            <Button className="bg-teal hover:bg-teal/90 text-white px-8 py-6 text-lg rounded-lg">
              Start exploring now
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 mt-20">
        <div className="max-w-7xl mx-auto px-6 py-8 text-center text-muted-foreground text-sm">
          <p>DocuStore © 2026. AI-powered document intelligence for pharmaceutical research.</p>
        </div>
      </footer>
    </div>
  );
}
