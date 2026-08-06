import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import TalentNetwork3D from '../components/3d/TalentNetwork3D';
import LandingBackground3D from '../components/3d/LandingBackground3D';
import UrlUnfurler from '../components/UrlUnfurler';
import EnrichmentModal from '../components/EnrichmentModal';
import {
  Sparkles,
  ArrowRight,
  Zap,
  ShieldCheck,
  Search,
  Cpu,
  TrendingUp,
  Check,
  CheckCircle2,
  Users,
  Code2,
  Globe,
  Star,
  ChevronRight,
  Database,
  SlidersHorizontal,
  BookmarkCheck,
  Layers,
  Terminal,
  Share2,
  Download,
  Building,
  Award,
  MousePointerClick,
  Box
} from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();
  const [demoUnfurledData, setDemoUnfurledData] = useState(null);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [billingCycle, setBillingCycle] = useState('monthly'); // 'monthly' | 'annual'

  const handleDemoUnfurl = (metadata) => {
    setDemoUnfurledData(metadata);
    setIsDemoModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-['Plus_Jakarta_Sans',sans-serif] selection:bg-[#368dff] selection:text-white overflow-x-hidden relative">
      
      {/* 3D WebGL Background Canvas Spanning Entire Landing Page */}
      <LandingBackground3D />

      {/* Background Soft Glow Orbs */}
      <div className="fixed top-0 left-1/4 w-[600px] h-[600px] bg-blue-100/50 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-[600px] h-[600px] bg-emerald-100/50 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-50/40 rounded-full blur-[140px] pointer-events-none" />

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column Text & CTA */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left z-10">
            
            {/* Tag Badge */}
            <div className="inline-flex items-center space-x-2.5 px-4 py-2 rounded-full bg-white/90 border border-slate-200 shadow-md text-xs font-bold text-slate-800 backdrop-blur-md">
              <Box className="w-4 h-4 text-[#368dff] animate-spin" style={{ animationDuration: '8s' }} />
              <span className="text-[#368dff] font-black">TALENTLYNX SIGNAL ENGINE</span>
              <span className="text-slate-300">•</span>
              <span className="text-slate-600 font-semibold">Interactive Talent Discovery</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.12] text-slate-900">
              Unfurl Social Profiles.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#368dff] via-indigo-600 to-[#00a962]">
                Discover & Score Tech Talent
              </span>{' '}
              Instantly.
            </h1>

            <p className="text-base sm:text-lg text-slate-600 font-medium max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Extract rich Open Graph metadata from GitHub, LinkedIn, X, Behance, and personal portfolios. Auto-tag technical skills, score candidate relevance, and build high-performing engineering pipelines.
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link
                to="/register"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-[#368dff] to-[#00a962] text-white font-extrabold text-sm shadow-xl shadow-[#368dff]/25 hover:shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center space-x-2 cursor-pointer group"
              >
                <span>Start Free Workspace</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <button
                type="button"
                onClick={() => {
                  const demoSection = document.getElementById('interactive-demo');
                  demoSection?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white/90 hover:bg-white text-slate-800 border border-slate-200 font-bold text-sm shadow-sm hover:shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer backdrop-blur-md"
              >
                <Sparkles className="w-4 h-4 text-[#368dff]" />
                <span>Try Live Demo</span>
              </button>
            </div>

            {/* Micro stats */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-600 font-bold border-t border-slate-200/80">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#00a962]" />
                <span>Zero API Keys Needed</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#368dff]" />
                <span>SQLite DB Engine</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-purple-600" />
                <span>Real-Time Fit Scoring</span>
              </div>
            </div>

          </div>

          {/* Right Column Interactive 3D WebGL Canvas */}
          <div className="lg:col-span-6 relative flex justify-center items-center z-10">
            <div className="w-full max-w-lg lg:max-w-none h-[440px] sm:h-[520px] rounded-3xl bg-white/85 border border-slate-200/90 backdrop-blur-xl shadow-2xl relative overflow-hidden group">
              <div className="absolute top-4 left-4 z-20 flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/95 border border-slate-200 text-xs font-extrabold text-slate-800 shadow-sm">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Interactive Talent Graph</span>
              </div>

              {/* 3D WebGL Canvas Component */}
              <TalentNetwork3D />

              <div className="absolute bottom-3 left-0 right-0 text-center text-xs text-slate-500 font-bold pointer-events-none">
                ✨ Drag mouse to rotate candidate network & hover nodes
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Metrics Banner */}
      <section className="relative z-10 border-y border-slate-200/90 bg-white/80 backdrop-blur-md py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-4 rounded-2xl bg-white/90 border border-slate-200 shadow-sm hover:scale-105 transition-transform">
            <div className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">50,000+</div>
            <div className="text-xs sm:text-sm font-bold text-slate-600 mt-1">Profiles Unfurled</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/90 border border-slate-200 shadow-sm hover:scale-105 transition-transform">
            <div className="text-3xl sm:text-4xl font-black text-[#368dff] tracking-tight">99.4%</div>
            <div className="text-xs sm:text-sm font-bold text-slate-600 mt-1">Metadata Accuracy</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/90 border border-slate-200 shadow-sm hover:scale-105 transition-transform">
            <div className="text-3xl sm:text-4xl font-black text-[#00a962] tracking-tight">100%</div>
            <div className="text-xs sm:text-sm font-bold text-slate-600 mt-1">SQLite DB Engine</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/90 border border-slate-200 shadow-sm hover:scale-105 transition-transform">
            <div className="text-3xl sm:text-4xl font-black text-purple-600 tracking-tight">&lt; 150ms</div>
            <div className="text-xs sm:text-sm font-bold text-slate-600 mt-1">Parsing Speed</div>
          </div>
        </div>
      </section>

      {/* Interactive Unfurl Demo Section */}
      <section id="interactive-demo" className="relative z-10 py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs font-black text-[#368dff]">
            <Zap className="w-3.5 h-3.5" />
            <span>LIVE DEMO PARSER</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
            Unfurl Any Social Profile Link
          </h2>
          <p className="text-slate-600 text-sm sm:text-base font-medium">
            Paste a GitHub, LinkedIn, Behance, X, or Portfolio link below to test our Open Graph parser and AI signal enrichment engine live in your browser.
          </p>
        </div>

        {/* Embedded Unfurler Container */}
        <div className="p-2 sm:p-4 rounded-3xl bg-white/95 border border-slate-200 shadow-xl backdrop-blur-md">
          <UrlUnfurler onUnfurlSuccess={handleDemoUnfurl} />
        </div>
      </section>

      {/* How It Works 3-Step 3D Visual Flow */}
      <section className="relative z-10 py-20 bg-slate-100/70 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-extrabold text-[#00a962]">
              <MousePointerClick className="w-3.5 h-3.5" />
              <span>INTERACTIVE WORKFLOW</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
              How TalentLynx Works
            </h2>
            <p className="text-slate-600 text-sm sm:text-base font-medium">
              Transform raw social profile links into rich engineering candidate data in 3 simple steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 [perspective:1000px]">
            
            {/* Step 1 */}
            <div className="p-8 rounded-3xl bg-white/95 border border-slate-200 shadow-md relative group hover:shadow-2xl transition-all duration-500 hover:[transform:rotateX(4deg)_rotateY(-4deg)_translateZ(10px)] card-3d-smooth">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 text-[#368dff] font-black text-lg flex items-center justify-center mb-6 shadow-sm">
                01
              </div>
              <h3 className="text-xl font-extrabold text-slate-900 mb-2">Paste Profile Link</h3>
              <p className="text-slate-600 text-sm leading-relaxed font-medium">
                Copy candidate profile URLs from GitHub, LinkedIn, Behance, X/Twitter, or custom portfolio domains.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-8 rounded-3xl bg-white/95 border border-slate-200 shadow-md relative group hover:shadow-2xl transition-all duration-500 hover:[transform:rotateX(4deg)_rotateY(-4deg)_translateZ(10px)] card-3d-smooth">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 text-[#00a962] font-black text-lg flex items-center justify-center mb-6 shadow-sm">
                02
              </div>
              <h3 className="text-xl font-extrabold text-slate-900 mb-2">Signal & Open Graph Enrichment</h3>
              <p className="text-slate-600 text-sm leading-relaxed font-medium">
                Extract Open Graph avatars, headlines, bios, and calculate candidate relevance match scores and skill tags.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-8 rounded-3xl bg-white/95 border border-slate-200 shadow-md relative group hover:shadow-2xl transition-all duration-500 hover:[transform:rotateX(4deg)_rotateY(-4deg)_translateZ(10px)] card-3d-smooth">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-200 text-purple-600 font-black text-lg flex items-center justify-center mb-6 shadow-sm">
                03
              </div>
              <h3 className="text-xl font-extrabold text-slate-900 mb-2">Pipeline & Shortlist</h3>
              <p className="text-slate-600 text-sm leading-relaxed font-medium">
                Save candidate profiles to your recruitment dashboard, filter by skills, and export candidates to CSV.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Feature Highlights Grid */}
      <section className="relative z-10 py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
            Built for Modern High-Growth Technical Recruiters
          </h2>
          <p className="text-slate-600 text-sm sm:text-base font-medium">
            Everything you need to discover, score, and manage top software engineering talent.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 [perspective:1000px]">
          
          {/* Feature 1 */}
          <div className="p-8 rounded-3xl bg-white/95 border border-slate-200 hover:border-[#368dff]/50 hover:shadow-2xl transition-all duration-500 hover:[transform:rotateX(4deg)_rotateY(-4deg)_translateZ(10px)] card-3d-smooth group">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Globe className="w-6 h-6 text-[#368dff]" />
            </div>
            <h3 className="text-xl font-extrabold text-slate-900 mb-2">Multi-Platform Parsing</h3>
            <p className="text-slate-600 text-sm leading-relaxed font-medium">
              Extract rich avatars, headlines, bios, and public signals from GitHub repositories, LinkedIn profiles, X handles, and developer portfolios.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="p-8 rounded-3xl bg-white/95 border border-slate-200 hover:border-[#00a962]/50 hover:shadow-2xl transition-all duration-500 hover:[transform:rotateX(4deg)_rotateY(-4deg)_translateZ(10px)] card-3d-smooth group">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Cpu className="w-6 h-6 text-[#00a962]" />
            </div>
            <h3 className="text-xl font-extrabold text-slate-900 mb-2">AI Signal Enrichment</h3>
            <p className="text-slate-600 text-sm leading-relaxed font-medium">
              Automatically generate technical skill tags, determine seniority levels, and score candidate relevance against your open engineering roles.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="p-8 rounded-3xl bg-white/95 border border-slate-200 hover:border-purple-300 hover:shadow-2xl transition-all duration-500 hover:[transform:rotateX(4deg)_rotateY(-4deg)_translateZ(10px)] card-3d-smooth group">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-200 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <BookmarkCheck className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-extrabold text-slate-900 mb-2">Shortlist & Pipeline</h3>
            <p className="text-slate-600 text-sm leading-relaxed font-medium">
              Organize candidates into shortlists, search across skills or locations, and view profiles in dual Grid or tabular view.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="p-8 rounded-3xl bg-white/95 border border-slate-200 hover:border-amber-300 hover:shadow-2xl transition-all duration-500 hover:[transform:rotateX(4deg)_rotateY(-4deg)_translateZ(10px)] card-3d-smooth group">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Award className="w-6 h-6 text-[#d97706]" />
            </div>
            <h3 className="text-xl font-extrabold text-slate-900 mb-2">Seniority Fit Scoring</h3>
            <p className="text-slate-600 text-sm leading-relaxed font-medium">
              Evaluate candidates from Junior to Executive level with algorithmic relevance match scoring from 0% to 100%.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="p-8 rounded-3xl bg-white/95 border border-slate-200 hover:border-[#368dff]/50 hover:shadow-2xl transition-all duration-500 hover:[transform:rotateX(4deg)_rotateY(-4deg)_translateZ(10px)] card-3d-smooth group">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Download className="w-6 h-6 text-[#368dff]" />
            </div>
            <h3 className="text-xl font-extrabold text-slate-900 mb-2">Instant CSV Export</h3>
            <p className="text-slate-600 text-sm leading-relaxed font-medium">
              Export your candidate discovery lists directly to CSV format for seamless import into ATS tools like Greenhouse, Lever, or Notion.
            </p>
          </div>

          {/* Feature 6 */}
          <div className="p-8 rounded-3xl bg-white/95 border border-slate-200 hover:border-[#00a962]/50 hover:shadow-2xl transition-all duration-500 hover:[transform:rotateX(4deg)_rotateY(-4deg)_translateZ(10px)] card-3d-smooth group">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-6 h-6 text-[#00a962]" />
            </div>
            <h3 className="text-xl font-extrabold text-slate-900 mb-2">SQLite Database Engine</h3>
            <p className="text-slate-600 text-sm leading-relaxed font-medium">
              High-performance, zero-config file database ensures instant local development and effortless cloud host deployment.
            </p>
          </div>

        </div>
      </section>

      {/* Pricing Section */}
      <section className="relative z-10 py-20 bg-slate-100/60 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
              Simple, Transparent Pricing
            </h2>
            <p className="text-slate-600 text-sm sm:text-base font-medium">
              Choose the plan that best fits your talent discovery volume.
            </p>

            {/* Billing Cycle Toggle Switch */}
            <div className="pt-2 flex items-center justify-center space-x-3 text-xs font-extrabold">
              <span className={billingCycle === 'monthly' ? 'text-slate-900' : 'text-slate-500'}>Monthly</span>
              <button
                type="button"
                onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')}
                className="w-12 h-6 rounded-full bg-slate-200 p-1 flex items-center transition-colors cursor-pointer"
              >
                <div className={`w-4 h-4 rounded-full bg-[#368dff] transition-transform ${billingCycle === 'annual' ? 'translate-x-6' : ''}`} />
              </button>
              <span className={billingCycle === 'annual' ? 'text-slate-900 flex items-center space-x-1.5' : 'text-slate-500'}>
                <span>Annual Billing</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black">Save 20%</span>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 [perspective:1000px]">
            
            {/* Starter Plan */}
            <div className="p-8 rounded-3xl bg-white/95 border border-slate-200 flex flex-col justify-between shadow-md hover:shadow-2xl transition-all duration-500 hover:[transform:rotateX(4deg)_rotateY(-4deg)_translateZ(10px)] card-3d-smooth">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Starter</h3>
                <div className="mt-4 flex items-baseline">
                  <span className="text-4xl font-black text-slate-900">$0</span>
                  <span className="text-slate-500 text-xs font-semibold ml-2">/ forever free</span>
                </div>
                <p className="text-xs text-slate-600 font-medium mt-2">Perfect for individual technical recruiters.</p>
                <ul className="mt-6 space-y-3 text-xs text-slate-700 font-medium">
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-[#00a962]" />
                    <span>Up to 100 Profile Unfurls/month</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-[#00a962]" />
                    <span>Basic OpenGraph Metadata Parsing</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-[#00a962]" />
                    <span>Candidate Shortlist Board</span>
                  </li>
                </ul>
              </div>
              <Link
                to="/register"
                className="mt-8 w-full py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-900 text-xs font-extrabold text-center transition-colors block cursor-pointer"
              >
                Get Started Free
              </Link>
            </div>

            {/* Pro Plan (Highlighted Card) */}
            <div className="p-8 rounded-3xl bg-white/95 border-2 border-[#368dff] relative flex flex-col justify-between shadow-2xl shadow-[#368dff]/15 transition-all duration-500 hover:[transform:rotateX(4deg)_rotateY(-4deg)_translateZ(12px)] card-3d-smooth">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-gradient-to-r from-[#368dff] to-[#00a962] text-[10px] font-black uppercase text-white tracking-wider shadow-md">
                MOST POPULAR
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Pro Team</h3>
                <div className="mt-4 flex items-baseline">
                  <span className="text-4xl font-black text-slate-900">
                    {billingCycle === 'annual' ? '$39' : '$49'}
                  </span>
                  <span className="text-slate-500 text-xs font-semibold ml-2">/ month</span>
                </div>
                <p className="text-xs text-slate-600 font-medium mt-2">Ideal for fast-scaling engineering teams.</p>
                <ul className="mt-6 space-y-3 text-xs text-slate-700 font-medium">
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-[#368dff]" />
                    <span>Unlimited Profile Unfurls</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-[#368dff]" />
                    <span>AI Skill Tagging & Seniority Scoring</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-[#368dff]" />
                    <span>3D Interactive Talent Network View</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-[#368dff]" />
                    <span>CSV Candidate Export & API Access</span>
                  </li>
                </ul>
              </div>
              <Link
                to="/register"
                className="mt-8 w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#368dff] to-[#00a962] text-white text-xs font-extrabold text-center hover:shadow-lg transition-all block cursor-pointer"
              >
                Start 14-Day Free Trial
              </Link>
            </div>

            {/* Enterprise Plan */}
            <div className="p-8 rounded-3xl bg-white/95 border border-slate-200 flex flex-col justify-between shadow-md hover:shadow-2xl transition-all duration-500 hover:[transform:rotateX(4deg)_rotateY(-4deg)_translateZ(10px)] card-3d-smooth">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Enterprise</h3>
                <div className="mt-4 flex items-baseline">
                  <span className="text-4xl font-black text-slate-900">
                    {billingCycle === 'annual' ? '$159' : '$199'}
                  </span>
                  <span className="text-slate-500 text-xs font-semibold ml-2">/ month</span>
                </div>
                <p className="text-xs text-slate-600 font-medium mt-2">Custom compliance & private deployment.</p>
                <ul className="mt-6 space-y-3 text-xs text-slate-700 font-medium">
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-purple-600" />
                    <span>Dedicated Private Proxy Parsers</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-purple-600" />
                    <span>ATS Integrations (Greenhouse, Lever)</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-purple-600" />
                    <span>24/7 Dedicated SLA Support</span>
                  </li>
                </ul>
              </div>
              <Link
                to="/register"
                className="mt-8 w-full py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-900 text-xs font-extrabold text-center transition-colors block cursor-pointer"
              >
                Contact Sales
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-200 bg-white py-12 text-slate-600 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#368dff] to-[#00a962] flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-extrabold text-slate-900 text-base tracking-tight">TalentLynx</span>
          </div>
          <div className="font-medium text-slate-500">
            © {new Date().getFullYear()} TalentLynx Signal Engine. All rights reserved.
          </div>
          <div className="flex items-center space-x-6 font-bold">
            <Link to="/login" className="hover:text-slate-900 transition-colors">Login</Link>
            <Link to="/register" className="hover:text-slate-900 transition-colors">Sign Up</Link>
            <Link to="/dashboard" className="hover:text-slate-900 transition-colors">Dashboard</Link>
          </div>
        </div>
      </footer>

      {/* Demo Enrichment Modal */}
      <EnrichmentModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
        unfurledData={demoUnfurledData}
        onSaveCandidate={async () => {
          setIsDemoModalOpen(false);
          navigate('/dashboard');
        }}
      />

    </div>
  );
}
