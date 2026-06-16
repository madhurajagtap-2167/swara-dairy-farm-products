import { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

const Contact = () => {
  const { language } = useContext(AppContext);
  const isEn = language === 'en';

  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(isEn ? 'Message Sent! We will contact you soon.' : 'संदेश पाठवला! आम्ही लवकरच आपल्याशी संपर्क साधू.');
    setFormData({ name: '', phone: '', message: '' });
  };

  const openWhatsApp = () => {
    window.open('https://wa.me/918975411768', '_blank');
  };

  return (
    <div className="bg-brand-light dark:bg-gray-900 min-h-screen py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {isEn ? 'Contact Us' : 'आमच्याशी संपर्क साधा'}
          </h1>
          <div className="w-24 h-1 bg-brand-green mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {isEn 
              ? 'Have questions about our products or want to start a daily milk subscription? Get in touch with us!' 
              : 'आमच्या उत्पादनांबद्दल प्रश्न आहेत किंवा दररोजच्या दुधाची सदस्यता सुरू करायची आहे? आमच्याशी संपर्क साधा!'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {isEn ? 'Farm Location & Details' : 'शेत आणि संपर्क माहिती'}
              </h2>
              
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <div className="bg-brand-green/10 p-3 rounded-full text-brand-green mt-1 flex-shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-1">{isEn ? 'Address' : 'पत्ता'}</h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {isEn ? 'Wadgaon Haveli, Maharashtra 415115' : 'वडगाव हवेली, महाराष्ट्र ४१५११५'}
                    </p>
                  </div>
                </li>
                
                <li className="flex items-start gap-4">
                  <div className="bg-brand-green/10 p-3 rounded-full text-brand-green mt-1 flex-shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-1">{isEn ? 'Phone' : 'फोन'}</h3>
                    <p className="text-gray-600 dark:text-gray-400">+91 89754 11768</p>
                  </div>
                </li>
                
                <li className="flex items-start gap-4">
                  <div className="bg-brand-green/10 p-3 rounded-full text-brand-green mt-1 flex-shrink-0">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-1">{isEn ? 'Email' : 'ईमेल'}</h3>
                    <p className="text-gray-600 dark:text-gray-400">madhurajagtap275@gmail.com</p>
                  </div>
                </li>
                
                <li className="flex items-start gap-4">
                  <div className="bg-brand-green/10 p-3 rounded-full text-brand-green mt-1 flex-shrink-0">
                    <Clock size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-1">{isEn ? 'Visiting Hours' : 'भेटण्याची वेळ'}</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {isEn ? 'Mon-Sat: 6:00 AM - 6:00 PM' : 'सोम-शनि: सकाळी ६:०० ते संध्याकाळी ६:००'}
                    </p>
                  </div>
                </li>
              </ul>

              <button 
                onClick={openWhatsApp}
                className="mt-8 w-full bg-[#25D366] hover:bg-[#1ebd5a] text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-3 transition-colors shadow-md"
              >
                <img src="https://cdn-icons-png.flaticon.com/512/124/124034.png" alt="WhatsApp" className="w-6 h-6 invert" />
                {isEn ? 'Chat on WhatsApp' : 'WhatsApp वर संपर्क साधा'}
              </button>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white dark:bg-gray-800 p-8 md:p-10 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              {isEn ? 'Send us a Message' : 'आम्हाला संदेश पाठवा'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {isEn ? 'Full Name' : 'संपूर्ण नाव'}
                </label>
                <input 
                  type="text" 
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-green"
                  placeholder={isEn ? "John Doe" : "उदा. रमेश पाटील"}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {isEn ? 'Phone Number' : 'फोन नंबर'}
                </label>
                <input 
                  type="tel" 
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-green"
                  placeholder="+91"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {isEn ? 'Message / Inquiry' : 'संदेश / चौकशी'}
                </label>
                <textarea 
                  name="message"
                  required
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-green resize-none"
                  placeholder={isEn ? "How can we help you?" : "आम्ही आपली कशी मदत करू शकतो?"}
                ></textarea>
              </div>
              
              <button 
                type="submit"
                className="w-full bg-brand-brown hover:bg-brand-brown-light text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-md"
              >
                <Send size={20} /> {isEn ? 'Send Message' : 'संदेश पाठवा'}
              </button>
            </form>
          </div>

        </div>

        {/* Google Maps Embed */}
        <div className="mt-12 w-full h-[400px] rounded-3xl overflow-hidden relative shadow-sm border border-gray-100 dark:border-gray-700">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30485.164775273483!2d74.23041345193707!3d17.23597370201403!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc1782299d1bb0f%3A0xef26716b17e15ca1!2sWadgaon%20Haveli%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1781598517004!5m2!1sen!2sin" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Swara Dairy Farm Location"
          ></iframe>
        </div>

      </div>
    </div>
  );
};

export default Contact;
