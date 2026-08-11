'use client';

import React, { useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (resetError) throw resetError;

      setMessage('If an account exists, a recovery email has been sent with link resets.');
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to send recovery email.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0A192F] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#172A45] border border-white/5 rounded-xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <div className="text-[#64ffda] text-sm font-semibold tracking-wider uppercase mb-1">⚡ PASSWORD RESET</div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Recover Password</h1>
          <p className="text-[#8892B0] text-sm mt-1">We will send a secure link to reset credentials.</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-3 rounded-md mb-6 text-center font-medium">
            {error}
          </div>
        )}

        {message && (
          <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm p-3 rounded-md mb-6 text-center font-medium">
            {message}
          </div>
        )}

        <form onSubmit={handleReset} className="space-y-6">
          <div>
            <label className="block text-white text-sm font-medium mb-2" htmlFor="email">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#0A192F]/60 border border-white/10 rounded-md py-3 px-4 text-white text-base focus:border-[#64ffda] focus:outline-none transition-colors"
              placeholder="e.g. principal.skinner@springfield.edu"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#64ffda] text-[#0A192F] hover:bg-[#52e0c2] transition-colors py-3.5 px-4 rounded-md font-semibold text-base shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-[#0A192F]/30 border-t-[#0A192F] rounded-full animate-spin"></span>
            ) : (
              'Send Recovery Email'
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <a href="/login" className="text-[#64ffda] hover:underline text-sm font-medium">
            Back to login
          </a>
        </div>
      </div>
    </main>
  );
}
