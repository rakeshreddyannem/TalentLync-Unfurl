import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthBackground3D from '../components/3d/AuthBackground3D';
import {
  Sparkles,
  Mail,
  Lock,
  ArrowRight,
  Eye,
  EyeOff,
  AlertCircle,
  Loader2,
  CheckCircle2
} from 'lucide-react';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in both email and password.');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Failed to sign in. Check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setEmail('demo@talentlync.io');
    setPassword('DemoPass123!');
    try {
      setLoading(true);
      setError(null);
      await login('demo@talentlync.io', 'DemoPass123!');
      navigate('/dashboard');
    } catch (err) {
      setError('Demo login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex items-center justify-center p-4 relative overflow-hidden font-sans selection:bg-[#368dff]">
      
      {/* 3D WebGL Ambient Background */}
      <AuthBackground3D />

      {/* Decorative Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-100/60 rounded-full blur-3xl pointer-events-none" />

      {/* Login Card Container */}
      <div className="w-full max-w-md bg-white/95 border border-slate-200 rounded-3xl p-8 backdrop-blur-xl shadow-2xl z-10 relative">
        
        {/* Header Branding */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2.5 mb-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#368dff] to-[#00a962] flex items-center justify-center shadow-md shadow-[#368dff]/20 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-extrabold text-2xl tracking-tight text-slate-900">
              Talent<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#368dff] to-[#00a962]">Lynx</span>
            </span>
          </Link>
          <h1 className="text-xl font-extrabold text-slate-900">Welcome Back</h1>
          <p className="text-xs text-slate-500 font-medium mt-1">Sign in to your candidate signal pipeline</p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center space-x-2.5">
            <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Demo Quick Button */}
        <button
          type="button"
          onClick={handleDemoLogin}
          className="w-full mb-6 py-3 px-4 rounded-2xl bg-blue-50 hover:bg-blue-100 border border-blue-200 text-[#368dff] text-xs font-extrabold transition-all flex items-center justify-center space-x-2 shadow-xs cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-[#368dff]" />
          <span>⚡ One-Click Demo Recruiter Login</span>
        </button>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200" /></div>
          <div className="relative flex justify-center text-[10px] uppercase"><span className="bg-white px-2 text-slate-400 font-bold">Or sign in with email</span></div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Work Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                required
                className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 text-xs placeholder-slate-400 focus:outline-none focus:border-[#368dff] focus:bg-white transition-all font-medium"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-700">Password</label>
              <a href="#forgot" onClick={(e) => { e.preventDefault(); alert('Password reset link sent to your email.'); }} className="text-[11px] text-[#368dff] hover:underline font-bold">Forgot?</a>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full pl-10 pr-10 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 text-xs placeholder-slate-400 focus:outline-none focus:border-[#368dff] focus:bg-white transition-all font-medium"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-600 font-medium pt-1">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded bg-slate-100 border-slate-300 text-[#368dff] focus:ring-0" />
              <span>Remember me</span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-[#368dff] to-[#00a962] text-white font-extrabold text-xs shadow-lg shadow-[#368dff]/20 hover:shadow-xl active:scale-[0.99] transition-all flex items-center justify-center space-x-2 disabled:opacity-50 mt-2 cursor-pointer"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin text-white" />
            ) : (
              <>
                <span>Sign In to Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Footer Link */}
        <div className="mt-8 text-center text-xs text-slate-600 font-medium">
          Don't have an account?{' '}
          <Link to="/register" className="font-extrabold text-[#368dff] hover:underline">
            Create an account
          </Link>
        </div>

      </div>
    </div>
  );
}
