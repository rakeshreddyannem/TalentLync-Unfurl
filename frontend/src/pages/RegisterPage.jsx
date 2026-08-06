import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthBackground3D from '../components/3d/AuthBackground3D';
import {
  Sparkles,
  User,
  Mail,
  Lock,
  Building,
  Briefcase,
  ArrowRight,
  Eye,
  EyeOff,
  AlertCircle,
  Loader2,
  CheckCircle2
} from 'lucide-react';

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('Senior Talent Scout');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getPasswordStrength = () => {
    if (!password) return 0;
    let score = 0;
    if (password.length >= 6) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError('Please fill in all required fields.');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      await register({
        name,
        email,
        company,
        role,
        password
      });
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  const strength = getPasswordStrength();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex items-center justify-center p-4 relative overflow-hidden font-sans selection:bg-[#00a962]">
      
      {/* 3D WebGL Ambient Background */}
      <AuthBackground3D />

      {/* Decorative Glow */}
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-emerald-100/60 rounded-full blur-3xl pointer-events-none" />

      {/* Register Card Container */}
      <div className="w-full max-w-lg bg-white/95 border border-slate-200 rounded-3xl p-8 backdrop-blur-xl shadow-2xl z-10 relative">
        
        {/* Header Branding */}
        <div className="text-center mb-6">
          <Link to="/" className="inline-flex items-center space-x-2.5 mb-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#368dff] to-[#00a962] flex items-center justify-center shadow-md shadow-[#00a962]/20 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-extrabold text-2xl tracking-tight text-slate-900">
              Talent<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#368dff] to-[#00a962]">Lynx</span>
            </span>
          </Link>
          <h1 className="text-xl font-extrabold text-slate-900">Create Workspace Account</h1>
          <p className="text-xs text-slate-500 font-medium mt-1">Start unfurling & enriching technical candidate signals</p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center space-x-2.5">
            <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Full Name *</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Sarah Connor"
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 text-xs placeholder-slate-400 focus:outline-none focus:border-[#00a962] focus:bg-white transition-all font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Work Email *</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="sarah@techcorp.io"
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 text-xs placeholder-slate-400 focus:outline-none focus:border-[#00a962] focus:bg-white transition-all font-medium"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Company / Organization</label>
              <div className="relative">
                <Building className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Vertex AI Labs"
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 text-xs placeholder-slate-400 focus:outline-none focus:border-[#00a962] focus:bg-white transition-all font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Role Title</label>
              <div className="relative">
                <Briefcase className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="Head of Talent"
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 text-xs placeholder-slate-400 focus:outline-none focus:border-[#00a962] focus:bg-white transition-all font-medium"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Password *</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimum 6 characters"
                required
                className="w-full pl-10 pr-10 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 text-xs placeholder-slate-400 focus:outline-none focus:border-[#00a962] focus:bg-white transition-all font-medium"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {/* Password Strength Indicator */}
            {password && (
              <div className="mt-2 flex items-center space-x-2">
                <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden flex space-x-1 border border-slate-200">
                  <div className={`h-full flex-1 ${strength >= 1 ? 'bg-rose-500' : 'bg-transparent'}`} />
                  <div className={`h-full flex-1 ${strength >= 2 ? 'bg-amber-500' : 'bg-transparent'}`} />
                  <div className={`h-full flex-1 ${strength >= 3 ? 'bg-[#368dff]' : 'bg-transparent'}`} />
                  <div className={`h-full flex-1 ${strength >= 4 ? 'bg-[#00a962]' : 'bg-transparent'}`} />
                </div>
                <span className="text-[10px] text-slate-500 font-bold">
                  {strength <= 1 ? 'Weak' : strength === 2 ? 'Fair' : strength === 3 ? 'Good' : 'Strong'}
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-2 text-xs text-slate-600 font-medium pt-2">
            <input type="checkbox" required defaultChecked className="rounded bg-slate-100 border-slate-300 text-[#00a962] focus:ring-0" />
            <span>I agree to the Terms of Service & Privacy Policy</span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-[#00a962] to-[#368dff] text-white font-extrabold text-xs shadow-lg shadow-[#00a962]/20 hover:shadow-xl active:scale-[0.99] transition-all flex items-center justify-center space-x-2 disabled:opacity-50 mt-2 cursor-pointer"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin text-white" />
            ) : (
              <>
                <span>Create Free TalentLynx Account</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Footer Link */}
        <div className="mt-6 text-center text-xs text-slate-600 font-medium">
          Already have an account?{' '}
          <Link to="/login" className="font-extrabold text-[#00a962] hover:underline">
            Sign In
          </Link>
        </div>

      </div>
    </div>
  );
}
