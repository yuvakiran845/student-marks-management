import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../context/useAuth";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // ✅ Pass role to login if your backend supports it
      const result = await login(email, password, role);
      console.log("Login result:", result); // debug

      if (result?.success && result?.user?.role) {
        // ✅ Navigate based on role
        navigate(result.user.role === 'admin' ? '/admin' : '/student');
      } else {
        setError(result?.error || 'Invalid email, password or role');
      }
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false); // ✅ Always stop loading
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-600 via-purple-600 to-accent-600 flex items-center justify-center p-4 animate-fade-in">
      <div className="glass-effect rounded-2xl p-8 w-full max-w-md shadow-2xl border animate-bounce-in">
        <div className="text-center mb-8">
          <div className="mb-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <span className="text-3xl">🎓</span>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2 animate-slide-up">Student Marks Portal</h1>
          <p className="text-gray-300">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Role Selector */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Role</label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="student"
                  checked={role === 'student'}
                  onChange={(e) => setRole(e.target.value)}
                  className="mr-2"
                />
                <span className="text-white">Student</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="admin"
                  checked={role === 'admin'}
                  onChange={(e) => setRole(e.target.value)}
                  className="mr-2"
                />
                <span className="text-white">Admin</span>
              </label>
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field bg-white/5 border-white/20 text-white placeholder-gray-400 focus:ring-blue-400"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field bg-white/5 border-white/20 text-white placeholder-gray-400 focus:ring-blue-400"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="text-red-400 text-sm text-center">{error}</div>
          )}

          {/* Sign In Button */}
          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="loading-spinner w-5 h-5 mr-2 animate-spin border-2 border-white rounded-full border-t-transparent"></div>
                Signing in...
              </div>
            ) : (
              'Sign In'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
