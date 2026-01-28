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
    },
  },
};

// Hero animation variants
const heroHeadlineVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
    },
  },
};

const heroSubheadingVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: 0.2,
    },
  },
};

const heroCTAVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: 0.4,
    },
  },
};

// Molecule Mesh Background Component (Placeholder)
const MoleculeMeshBackground = () => (
  <svg
    className="absolute inset-0 w-full h-full"
    viewBox="0 0 1000 1000"
    preserveAspectRatio="xMidYMid slice"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <filter id="blur">
        <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
      </filter>
    </defs>
    {/* Animated molecule nodes */}
    <g opacity="0.15" fill="none" stroke="rgb(16, 185, 129)" strokeWidth="1.5">
      {/* Network of lines */}
      <line x1="100" y1="100" x2="300" y2="200" />
      <line x1="300" y1="200" x2="500" y2="150" />
      <line x1="500" y1="150" x2="700" y2="300" />
      <line x1="700" y1="300" x2="800" y2="500" />
      <line x1="800" y1="500" x2="600" y2="700" />
      <line x1="600" y1="700" x2="400" y2="750" />
      <line x1="400" y1="750" x2="200" y2="600" />
      <line x1="200" y1="600" x2="100" y2="100" />
      
      {/* Additional interconnections */}
      <line x1="300" y1="200" x2="600" y2="700" />
      <line x1="500" y1="150" x2="800" y2="500" />
      <line x1="700" y1="300" x2="200" y2="600" />
      
      {/* Molecular nodes (circles) */}
      <circle cx="100" cy="100" r="4" fill="rgb(16, 185, 129)" />
      <circle cx="300" cy="200" r="4" fill="rgb(16, 185, 129)" />
      <circle cx="500" cy="150" r="4" fill="rgb(16, 185, 129)" />
      <circle cx="700" cy="300" r="4" fill="rgb(16, 185, 129)" />
      <circle cx="800" cy="500" r="4" fill="rgb(16, 185, 129)" />
      <circle cx="600" cy="700" r="4" fill="rgb(16, 185, 129)" />
      <circle cx="400" cy="750" r="4" fill="rgb(16, 185, 129)" />
      <circle cx="200" cy="600" r="4" fill="rgb(16, 185, 129)" />
    </g>
  </svg>
);

export default function WelcomePage() {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-white">
      {/* Full-width Animated Molecule Mesh Background */}
      <div className="absolute inset-0 -z-20">
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        >
          <MoleculeMeshBackground />
        </motion.div>
        
        {/* Soft gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-white/30 to-white/90" />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-emerald-100/40 backdrop-blur-sm bg-white/80">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-600 text-white shadow-sm">
              <Beaker className="w-6 h-6" />
            </div>
            <span className="text-2xl font-bold text-slate-900" style={{ fontFamily: 'Inter, sans-serif' }}>DocuStore</span>
          </Link>
          <Link to="/dashboard">
            <Button className="bg-slate-900 hover:bg-slate-800 text-white shadow-sm">
              Sign In
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section - Full Height, Centered */}
      <section className="relative z-0 flex-1 flex items-center justify-center px-6 py-20 md:py-32">
        <motion.div
          className="max-w-3xl mx-auto text-center space-y-8"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2,
              },
            },
          }}
        >
          {/* Headline */}
          <motion.h1
            className="text-5xl md:text-6xl lg:text-7xl font-semibold text-slate-900 leading-[1.15] tracking-tight"
            style={{ fontFamily: 'Inter, sans-serif' }}
            variants={heroHeadlineVariants}
          >
            AI For Scientific Research in TB Drug Discovery
          </motion.h1>

          {/* Subheading */}
          <motion.p
            className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed font-light"
            style={{ fontFamily: 'Inter, sans-serif' }}
            variants={heroSubheadingVariants}
          >
            Explore, analyze, and retrieve critical insights from R&D documents in seconds.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            className="pt-4 flex justify-center"
            variants={heroCTAVariants}
          >
            <Link to="/dashboard">
              <motion.div
                whileHover={{ scale: 1.05, boxShadow: '0 25px 50px -12px rgba(16, 185, 129, 0.25)' }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              >
                <Button
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-12 py-7 text-lg rounded-full font-semibold shadow-xl flex items-center gap-3 transition-all"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  Start exploring
                  <motion.div
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.div>
                </Button>
              </motion.div>
            </Link>
          </motion.div>

          {/* Decorative accent line */}
          <motion.div
            className="pt-8 flex justify-center"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 1, delay: 0.6, ease: 'easeOut' }}
            style={{ transformOrigin: 'center' }}
          >
            <div className="w-16 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 py-20">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Feature 1 */}
          <motion.div
            className="space-y-4 p-8 rounded-2xl border border-emerald-100 bg-white/50 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-100/50 transition-all duration-300 backdrop-blur-sm"
            variants={cardVariants}
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <Upload className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900" style={{ fontFamily: 'Inter, sans-serif' }}>Upload research documents</h3>
            <p className="text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
              Support for PDF, Word, and PowerPoint formats. Automatically processed and indexed for instant search.
            </p>
          </motion.div>

          {/* Feature 2 */}
          <motion.div
            className="space-y-4 p-8 rounded-2xl border border-emerald-100 bg-white/50 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-100/50 transition-all duration-300 backdrop-blur-sm"
            variants={cardVariants}
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900" style={{ fontFamily: 'Inter, sans-serif' }}>Extract molecules & entities</h3>
            <p className="text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
              AI-powered extraction of molecular structures, proteins, pathways, and auto-generated summaries.
            </p>
          </motion.div>

          {/* Feature 3 */}
          <motion.div
            className="space-y-4 p-8 rounded-2xl border border-emerald-100 bg-white/50 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-100/50 transition-all duration-300 backdrop-blur-sm"
            variants={cardVariants}
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900" style={{ fontFamily: 'Inter, sans-serif' }}>Semantic search</h3>
            <p className="text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
              Search by molecule, protein, or SMILES. Find related documents with AI-powered matching.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 py-20 text-center">
        <motion.div
          className="space-y-8 p-12 rounded-3xl border border-emerald-100 bg-gradient-to-br from-white via-emerald-50/30 to-white shadow-xl"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900" style={{ fontFamily: 'Inter, sans-serif' }}>
            Ready to transform your research?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
            Join research teams unlocking insights from legacy documents with AI-powered intelligence.
          </p>
          <Link to="/dashboard">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white px-10 py-6 text-lg rounded-full font-semibold shadow-lg transition-all"
                style={{ fontFamily: 'Inter, sans-serif' }}>
                Start exploring now
              </Button>
            </motion.div>
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-emerald-100/40 mt-20 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-8 text-center text-gray-500 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
          <p>DocuStore © 2026. AI-powered document intelligence for pharmaceutical research.</p>
        </div>
      </footer>
    </div>
  );
}
