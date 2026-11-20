// src/components/admin/AdminLogin.jsx
import React, { useState } from 'react';
import { useAdmin } from '../../hooks/useAdmin.jsx';
import { LogIn, Eye, EyeOff } from 'lucide-react';

export default function AdminLogin() {
  const { login } = useAdmin();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0F29] flex items-center justify-center p-4">
      <div className="w-full max-w-sm glass-effect rounded-2xl p-8 border border-[#ECC46C]/30 shadow-2xl">
        <div className="text-center mb-8">
          <p className="font-cursive text-2xl text-[#ECC46C] mb-1">87 Ahangama</p>
          <h1 className="font-serif text-2xl font-bold text-white">Admin Panel</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs text-gray-300 font-semibold mb-1.5 uppercase tracking-wider">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2.5 bg-[#0D1638] border border-[#ECC46C]/30 rounded-lg text-white text-sm focus:outline-none focus:border-[#ECC46C] placeholder-gray-500"
              placeholder="admin@87ahangama.com"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-300 font-semibold mb-1.5 uppercase tracking-wider">Password</label>
            <div className="relative">
              <input
                type={showPw ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2.5 pr-11 bg-[#0D1638] border border-[#ECC46C]/30 rounded-lg text-white text-sm focus:outline-none focus:border-[#ECC46C] placeholder-gray-500"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPw(v => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#ECC46C]"
              >
                {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {error && (
            <p className="text-red-400 text-xs text-center bg-red-400/10 py-2 px-3 rounded-lg border border-red-400/20">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full min-h-[44px] bg-gradient-to-r from-[#D7AD50] to-[#ECC46C] hover:from-[#ECC46C] hover:to-[#D7AD50] text-[#0A0F29] font-bold text-sm uppercase tracking-wider rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-60"
          >
            <LogIn className="w-4 h-4" />
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
