import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { LogIn, Mail, Lock } from 'lucide-react';
import logoImg from '../assets/logo.png';

const Login = () => {
  const { language } = useContext(AppContext);
  const isEn = language === 'en';
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError(''); // Clear error on type
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    
    // Check for Owner
    if (formData.email === 'owner@swaradairy.com' && formData.password === 'owner123') {
      localStorage.setItem('swaraUser', JSON.stringify({ name: 'Farm Owner', email: formData.email, role: 'owner' }));
      navigate('/owner-dashboard');
      window.location.reload();
      return;
    }

    // Check for Customer in localStorage
    const storedUserStr = localStorage.getItem('swaraUser');
    if (storedUserStr) {
      const storedUser = JSON.parse(storedUserStr);
      if (storedUser.email === formData.email && storedUser.password === formData.password) {
        // Success
        navigate('/'); // Customers go to home
        window.location.reload();
        return;
      }
    }
    
    setError(isEn ? 'Invalid email or password.' : 'चुकीचा ईमेल किंवा पासवर्ड.');
  };

  return (
    <div className="bg-brand-light dark:bg-gray-900 min-h-screen py-20 flex items-center justify-center transition-colors">
      <div className="max-w-md w-full px-4">
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden">

          {/* Header */}
          <div className="bg-brand-green p-8 text-center text-white">
            <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm p-1 shadow-lg border border-white/30">
              <img src={logoImg} alt="Logo" className="w-full h-full object-contain rounded-full bg-white p-1" />
            </div>
            <h1 className="text-2xl font-bold mb-1">
              {isEn ? 'Welcome Back' : 'पुन्हा स्वागत आहे'}
            </h1>
            <p className="text-green-50 text-sm">
              {isEn ? 'Login to your account' : 'तुमच्या खात्यात लॉगिन करा'}
            </p>
          </div>

          <div className="p-8">
            {error && (
              <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400 text-sm font-medium">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  {isEn ? 'Email Address' : 'ईमेल पत्ता'}
                </label>
                <div className="relative">
                  <Mail size={17} className="absolute left-3 top-3.5 text-gray-400" />
                  <input 
                    type="email" 
                    name="email" 
                    required 
                    value={formData.email} 
                    onChange={handleChange} 
                    className="w-full pl-9 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-green outline-none transition-colors" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  {isEn ? 'Password' : 'पासवर्ड'}
                </label>
                <div className="relative">
                  <Lock size={17} className="absolute left-3 top-3.5 text-gray-400" />
                  <input 
                    type="password" 
                    name="password" 
                    required 
                    value={formData.password} 
                    onChange={handleChange} 
                    className="w-full pl-9 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-green outline-none transition-colors" 
                  />
                </div>
              </div>

              <button type="submit" className="w-full bg-brand-green hover:bg-brand-green-dark text-white font-bold py-3.5 rounded-xl transition-colors shadow-md mt-4">
                {isEn ? 'Login' : 'लॉगिन करा'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {isEn ? "Don't have an account? " : "खाते नाहीये? "}
                <Link to="/signup" className="font-bold text-brand-green hover:text-brand-green-dark">
                  {isEn ? 'Sign up' : 'नोंदणी करा'}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
