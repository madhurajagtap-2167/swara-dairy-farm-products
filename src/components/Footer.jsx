import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail } from 'lucide-react';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const Footer = () => {
  const { language } = useContext(AppContext);
  const isEn = language === 'en';

  return (
    <footer className="bg-brand-green-dark text-white pt-12 pb-8 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Info */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <img src="/src/assets/logo.png" alt="Swara Dairy" className="h-12 w-12 bg-white rounded-full p-1 object-contain" onError={(e) => { e.target.src = 'https://placehold.co/100x100/2ecc71/ffffff?text=Swara' }} />
              <span className="font-bold text-2xl tracking-wide">Swara Dairy</span>
            </Link>
            <p className="text-green-100 mb-4">
              {isEn 
                ? 'Providing fresh, organic, and pure farm products directly from our family farm to your home.'
                : 'आमच्या शेतातील ताजी, सेंद्रिय आणि शुद्ध उत्पादने थेट तुमच्या घरापर्यंत पोहोचवत आहोत.'}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-brand-brown-light transition-colors text-sm underline">Facebook</a>
              <a href="#" className="text-white hover:text-brand-brown-light transition-colors text-sm underline">Instagram</a>
              <a href="#" className="text-white hover:text-brand-brown-light transition-colors text-sm underline">Twitter</a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-green-500 pb-2 inline-block">
              {isEn ? 'Quick Links' : 'महत्त्वाचे दुवे'}
            </h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-green-100 hover:text-white transition-colors">{isEn ? 'Home' : 'मुख्यपृष्ठ'}</Link></li>
              <li><Link to="/products" className="text-green-100 hover:text-white transition-colors">{isEn ? 'Products' : 'उत्पादने'}</Link></li>
              <li><Link to="/about" className="text-green-100 hover:text-white transition-colors">{isEn ? 'About Us' : 'आमच्याबद्दल'}</Link></li>
              <li><Link to="/contact" className="text-green-100 hover:text-white transition-colors">{isEn ? 'Contact Us' : 'संपर्क'}</Link></li>
              <li><Link to="/login" className="text-green-100 hover:text-white transition-colors">{isEn ? 'Portal Login' : 'पोर्टल लॉगिन'}</Link></li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-green-500 pb-2 inline-block">
              {isEn ? 'Our Products' : 'आमची उत्पादने'}
            </h3>
            <ul className="space-y-2">
              <li><Link to="/products" className="text-green-100 hover:text-white transition-colors">{isEn ? 'Dairy Products' : 'दुग्धजन्य पदार्थ'}</Link></li>
              <li><Link to="/products" className="text-green-100 hover:text-white transition-colors">{isEn ? 'Poultry & Eggs' : 'पोल्ट्री आणि अंडी'}</Link></li>
              <li><Link to="/products" className="text-green-100 hover:text-white transition-colors">{isEn ? 'Fresh Coconuts' : 'ताजे नारळ'}</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-green-500 pb-2 inline-block">
              {isEn ? 'Contact Info' : 'संपर्क माहिती'}
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={20} className="mt-1 flex-shrink-0" />
                <span className="text-green-100">{isEn ? 'Wadgaon Haveli, Maharashtra 415115' : 'वडगाव हवेली, महाराष्ट्र ४१५११५'}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={20} className="flex-shrink-0" />
                <span className="text-green-100">+91 89754 11768</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={20} className="flex-shrink-0" />
                <span className="text-green-100">madhurajagtap275@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-green-600 pt-8 text-center text-green-200 text-sm">
          <p>&copy; {new Date().getFullYear()} Swara Dairy & Farm Products. {isEn ? 'All rights reserved.' : 'सर्व हक्क राखीव.'}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
