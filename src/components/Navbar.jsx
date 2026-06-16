import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Menu, X, LogIn, LogOut, User, Languages } from 'lucide-react';
import { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { CartContext } from '../context/CartContext';
import logoImg from '../assets/logo.png';

const Navbar = () => {
  const { language, toggleLanguage } = useContext(AppContext);
  const { cartItems } = useContext(CartContext);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const currentUser = JSON.parse(localStorage.getItem('swaraUser') || 'null');

  const handleLogout = () => {
    localStorage.removeItem('swaraUser');
    navigate('/');
    window.location.reload();
  };

  const navLinks = [
    { name: language === 'en' ? 'Home' : 'मुख्यपृष्ठ', path: '/' },
    { name: language === 'en' ? 'Products' : 'उत्पादने', path: '/products', hideForOwner: true },
    { name: language === 'en' ? 'About' : 'आमच्याबद्दल', path: '/about' },
    { name: language === 'en' ? 'Contact' : 'संपर्क', path: '/contact' },
  ].filter(link => !(currentUser?.role === 'owner' && link.hideForOwner));

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 transition-colors duration-300">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo - Left */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <img
              src={logoImg}
              alt="Swara Dairy"
              className="h-10 w-10 object-contain rounded-full bg-brand-green/10 p-1"
              onError={(e) => { e.target.src = 'https://placehold.co/100x100/2ecc71/ffffff?text=SD'; }}
            />
            <span className="font-bold text-xl text-brand-green-dark">Swara Dairy</span>
          </Link>

          {/* Centered Nav Links - Desktop */}
          <div className="hidden md:flex flex-1 justify-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-gray-700 hover:text-brand-green font-medium transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4 flex-shrink-0">
            <button
              onClick={toggleLanguage}
              className="p-2 text-gray-600 hover:text-brand-green transition-colors flex items-center gap-1 font-medium text-sm"
            >
              <Languages size={20} />
              <span className="hidden md:inline">{language === 'en' ? 'मराठी' : 'EN'}</span>
            </button>

            <Link to="/cart" className="relative p-2 text-gray-600 hover:text-brand-green transition-colors">
              <ShoppingCart size={22} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-brand-brown rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>

            {currentUser ? (
              <div className="hidden md:flex items-center gap-2">
                {currentUser.role === 'owner' && (
                  <Link
                    to="/owner-dashboard"
                    className="flex items-center gap-1 text-sm font-bold text-brand-green-dark bg-brand-green/10 px-3 py-1.5 rounded-full"
                  >
                    <User size={16} /> Dashboard
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-red-500 px-2 py-1.5"
                >
                  <LogOut size={16} /> {language === 'en' ? 'Logout' : 'बाहेर पडा'}
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="hidden md:flex items-center gap-1.5 text-gray-700 hover:text-brand-green font-medium transition-colors"
              >
                <LogIn size={18} /> {language === 'en' ? 'Login' : 'लॉगिन'}
              </Link>
            )}

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsOpen(true)}
              className="md:hidden p-2 text-gray-600"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Mobile Sidebar Menu (Slide from Left) */}
      <div 
        className={`fixed top-0 left-0 w-64 h-full bg-white z-50 transform transition-transform duration-300 ease-in-out md:hidden shadow-xl flex flex-col ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <span className="font-bold text-lg text-brand-green-dark">Menu</span>
          <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-brand-green">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4 px-4 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="block px-4 py-3 rounded-xl text-base font-medium text-gray-700 hover:bg-gray-50"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="p-4 border-t border-gray-200">
          <button
            onClick={() => { toggleLanguage(); setIsOpen(false); }}
            className="flex items-center gap-2 w-full px-4 py-3 rounded-xl text-base font-medium text-gray-700 hover:bg-gray-50 mb-4"
          >
            <Languages size={18} />
            {language === 'en' ? 'मराठी मध्ये बदला' : 'Switch to English'}
          </button>
          
          {currentUser ? (
            <div className="space-y-3">
              {currentUser.role === 'owner' && (
                <Link to="/owner-dashboard" onClick={() => setIsOpen(false)} className="flex items-center gap-2 px-4 py-3 rounded-xl text-brand-green-dark bg-brand-green/10 font-bold">
                  <User size={18} /> Dashboard
                </Link>
              )}
              <button onClick={() => { handleLogout(); setIsOpen(false); }} className="flex items-center gap-2 w-full px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 font-medium">
                <LogOut size={18} /> {language === 'en' ? 'Logout' : 'बाहेर पडा'}
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 px-4 py-3 rounded-xl text-base font-bold text-gray-700 hover:bg-gray-50"
            >
              <LogIn size={18} /> {language === 'en' ? 'Login' : 'लॉगिन'}
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
