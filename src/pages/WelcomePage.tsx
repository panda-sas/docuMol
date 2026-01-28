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

// Hero animation variants
const heroHeadlineVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: 'easeOut',
    },
  },
};

const heroSubheadingVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: 'easeOut',
      delay: 0.15,
    },
  },
};

const heroCTAVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: 'easeOut',
      delay: 0.3,
    },
  },
};

export default function WelcomePage() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Soft emerald radial gradient background */}
      <div className="absolute inset-0 bg-white">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-6xl max-h-[800px] bg-radial from-emerald-100/40 via-emerald-50/20 to-transparent rounded-full blur-3xl pointer-events-none" 
             style={{
               backgroundImage: 'radial-gradient(circle at center, rgba(16, 185, 129, 0.15) 0%, rgba(16, 185, 129, 0.05) 25%, transparent 70%)',
             }}>
        </div>
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

      {/* Hero Section - Sleek Biotech SaaS */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 py-32 text-center space-y-12">
        <motion.div
          className="space-y-8"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.1,
              },
            },
          }}
        >
          {/* Headline */}
          <motion.h1
            className="text-5xl md:text-6xl font-semibold text-slate-900 leading-[1.1] tracking-tight"
            style={{ fontFamily: 'Inter, sans-serif' }}
            variants={heroHeadlineVariants}
          >
            For Scientific Research in TB Drug Discovery
          </motion.h1>

          {/* Subheading */}
          <motion.p
            className="text-base md:text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed"
            style={{ fontFamily: 'Inter, sans-serif' }}
            variants={heroSubheadingVariants}
          >
            Explore, analyze, and retrieve critical insights from R&D documents in seconds.
          </motion.p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center pt-8"
          variants={heroCTAVariants}
          initial="hidden"
          animate="visible"
        >
          <Link to="/dashboard">
            <motion.div
              whileHover={{ scale: 1.02, boxShadow: '0 20px 25px -5px rgba(16, 185, 129, 0.2)' }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <Button
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-10 py-6 text-lg rounded-full font-semibold shadow-lg flex items-center gap-2 transition-all"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Get Started
                <ArrowRight className="w-5 h-5" />
              </Button>
            </motion.div>
          </Link>
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            <Button
              variant="outline"
              className="px-10 py-6 text-lg rounded-full font-semibold border-2 border-emerald-200 text-slate-900 hover:bg-emerald-50 bg-white transition-all"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Learn More
            </Button>
          </motion.div>
        </motion.div>

        {/* Accent line */}
        <motion.div
          className="pt-8 flex justify-center"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
          style={{ transformOrigin: 'center' }}
        >
          <div className="w-12 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent rounded-full"></div>
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
