import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, googleLogin } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await login(email, password);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-purple-300 rounded-full mix-blend-overlay filter blur-3xl opacity-50 animate-blob"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-indigo-300 rounded-full mix-blend-overlay filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
            </div>

            <div className="max-w-xl w-full space-y-10 bg-white/95 backdrop-blur-xl p-12 rounded-3xl shadow-2xl border border-white/50 z-10">
                <div className="text-center">
                    <h2 className="mt-2 text-5xl font-extrabold text-gray-900 tracking-tight">
                        Welcome Back
                    </h2>
                    <p className="mt-4 text-lg text-gray-600">
                        Sign in to continue your flow.
                    </p>
                </div>
                {error && (
                    <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-lg text-base font-medium">
                        {error}
                    </div>
                )}
                <form className="mt-10 space-y-8" onSubmit={handleSubmit}>
                    <div className="space-y-6">
                        <div>
                            <input
                                type="email"
                                required
                                className="appearance-none relative block w-full px-6 py-4 bg-gray-50 border border-gray-200 placeholder-gray-400 text-gray-900 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-lg"
                                placeholder="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <input
                                type="password"
                                required
                                className="appearance-none relative block w-full px-6 py-4 bg-gray-50 border border-gray-200 placeholder-gray-400 text-gray-900 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-lg"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="group relative w-full flex justify-center py-4 px-6 border border-transparent text-lg font-bold rounded-2xl text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transform transition-all duration-200 hover:shadow-xl active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Signing In...' : 'Sign In'}
                        </button>
                    </div>
                </form>

                <div className="mt-8">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-white text-gray-500 text-base">Or continue with</span>
                        </div>
                    </div>
                    <div className="mt-8 flex justify-center w-full">
                        <div className="w-full flex justify-center">
                            <GoogleLogin
                                onSuccess={credentialResponse => {
                                    googleLogin(credentialResponse.credential)
                                        .then(() => navigate('/'))
                                        .catch(err => setError('Google Login Failed'));
                                }}
                                onError={() => {
                                    setError('Google Login Failed');
                                }}
                                width="350"
                                size="large"
                                theme="filled_blue"
                                shape="pill"
                            />
                        </div>
                    </div>
                </div>

                <div className="text-center mt-6">
                    <p className="text-base text-gray-600">
                        Don't have an account? <Link to="/register" className="font-bold text-indigo-600 hover:text-indigo-500 hover:underline transition-colors">Sign up</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
