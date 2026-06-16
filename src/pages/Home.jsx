import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { ArrowRight, Leaf, ShieldCheck, Truck, Clock, Star, MapPin, Phone, Mail } from 'lucide-react';
import productsData from '../data/products.json';
import logoImg from '../assets/logo.png';

const Home = () => {
  const { language } = useContext(AppContext);
  const isEn = language === 'en';

  const featuredProducts = productsData.filter(p => ['1', '2', '6', '7', '8'].includes(p.id));

  const features = [
    { icon: <Leaf size={32} className="text-brand-green" />, title: isEn ? 'Fresh Products' : 'ताजी उत्पादने', desc: isEn ? '100% natural and fresh from our farm.' : 'आमच्या शेतातील १००% नैसर्गिक आणि ताजे.' },
    { icon: <ShieldCheck size={32} className="text-brand-green" />, title: isEn ? 'Quality Guaranteed' : 'गुणवत्तेची हमी', desc: isEn ? 'Rigorous quality checks for every batch.' : 'प्रत्येक बॅचसाठी कठोर गुणवत्ता तपासणी.' },
    { icon: <Truck size={32} className="text-brand-green" />, title: isEn ? 'Farm Direct' : 'थेट शेतातून', desc: isEn ? 'No middlemen. Directly from our farm to your home.' : 'कोणतेही मध्यस्थ नाहीत. थेट आमच्या शेतातून तुमच्या घरी.' },
    { icon: <Clock size={32} className="text-brand-green" />, title: isEn ? 'Local Delivery' : 'स्थानिक वितरण', desc: isEn ? 'Fast and reliable morning deliveries.' : 'जलद आणि खात्रीशीर सकाळचे वितरण.' },
  ];

  const testimonials = [
    { name: 'Ramesh Patil', review: isEn ? "The best cow milk I've ever tasted. Reminds me of my village!" : "मी आतापर्यंत चाखलेले सर्वोत्तम गाईचे दूध. माझ्या गावाची आठवण करून दिली!" },
    { name: 'Anita Sharma', review: isEn ? "Very fresh eggs and chicken. The quality is unmatched." : "खूप ताजी अंडी आणि चिकन. गुणवत्ता अतुलनीय आहे." },
    { name: 'Vikas Joshi', review: isEn ? "Timely delivery every single morning. Highly recommended." : "रोज सकाळी वेळेवर वितरण. अत्यंत शिफारसीय." },
  ];

  return (
    <div className="bg-brand-light dark:bg-gray-900 min-h-screen transition-colors">
      
      {/* 1. Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden py-24 mt-16">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&q=80" 
            alt="Farm Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50 dark:bg-black/70"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
          <img 
            src={logoImg}
            alt="Swara Dairy Logo" 
            className="h-24 w-24 md:h-32 md:w-32 object-contain bg-white/10 backdrop-blur-md rounded-full p-2 mb-6 border border-white/20 shadow-2xl"
          />
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
            Swara Dairy & Farm Products
          </h1>
          <p className="text-lg md:text-2xl text-green-50 mb-8 max-w-2xl font-light drop-shadow-md">
            {isEn 
              ? 'Pure, fresh, and natural farm products delivered directly from our family to yours.' 
              : 'शुद्ध, ताजे आणि नैसर्गिक शेती उत्पादने आमच्या कुटुंबाकडून थेट तुमच्यापर्यंत.'}
          </p>
          <Link 
            to="/products"
            className="bg-brand-green hover:bg-brand-green-dark text-white font-bold py-4 px-8 rounded-full flex items-center gap-2 transition-all transform hover:scale-105 shadow-xl text-lg"
          >
            {isEn ? 'Shop Now' : 'आता खरेदी करा'} <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* 2. Featured Products */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {isEn ? 'Featured Products' : 'वैशिष्ट्यीकृत उत्पादने'}
          </h2>
          <div className="w-24 h-1 bg-brand-green mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {featuredProducts.map((product) => (
            <Link key={product.id} to={`/products/${product.id}`} className="group bg-white dark:bg-gray-800 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 overflow-hidden transform hover:-translate-y-1">
              <div className="aspect-square overflow-hidden bg-gray-50 dark:bg-gray-900">
                <img 
                  src={product.image} 
                  alt={isEn ? product.name : product.name_mr} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-5 text-center">
                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1">
                  {isEn ? product.name : product.name_mr}
                </h3>
                <p className="text-brand-green-dark dark:text-brand-green font-bold">₹{product.price} <span className="text-sm font-normal text-gray-500 dark:text-gray-400">/ {isEn ? product.unit : (product.unit === 'Liter' ? 'लिटर' : product.unit === 'Piece' ? 'नग' : product.unit === 'Kg' ? 'किलो' : 'डझन')}</span></p>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link to="/products" className="inline-flex items-center gap-2 text-brand-green font-bold hover:underline">
            {isEn ? 'View All Products' : 'सर्व उत्पादने पहा'} <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* 3. Why Choose Us */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {isEn ? 'Why Choose Swara Dairy?' : 'स्वरा डेअरी का निवडावी?'}
            </h2>
            <div className="w-24 h-1 bg-brand-green mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <div key={idx} className="bg-gray-50 dark:bg-gray-900 p-8 rounded-3xl text-center border border-gray-100 dark:border-gray-700 hover:border-brand-green transition-colors">
                <div className="bg-white dark:bg-gray-800 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. About Farm Story */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="lg:w-1/2">
            <img 
              src="https://images.unsplash.com/photo-1516253593875-bd7ba052fbc5?auto=format&fit=crop&w=800&q=80" 
              alt="Farm Life" 
              className="rounded-3xl shadow-xl w-full h-[250px] md:h-[400px] object-cover"
            />
          </div>
          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              {isEn ? 'Our Family Farm Story' : 'आमच्या कौटुंबिक शेताची कहाणी'}
            </h2>
            <div className="w-24 h-1 bg-brand-green rounded-full mb-8"></div>
            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-6">
              {isEn 
                ? "Swara Dairy & Farm Products is built on generations of farming tradition. We believe that the purest food comes from happy animals and sustainable farming practices." 
                : "स्वरा डेअरी अँड फार्म प्रॉडक्ट्स पिढ्यानपिढ्या चालत आलेल्या शेतीच्या परंपरेवर आधारित आहे. आमचा विश्वास आहे की सर्वात शुद्ध अन्न आनंदी प्राणी आणि शाश्वत शेती पद्धतींमधून मिळते."}
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-8">
              {isEn 
                ? "From our grass-fed cows and buffaloes to our free-range poultry and lush coconut groves, every product we sell is nurtured with love and delivered fresh to your doorstep." 
                : "आमच्या गवतावर चरणाऱ्या गाई-म्हशींपासून ते मोकळ्या वातावरणातील कुक्कुटपालन आणि नारळाच्या बागांपर्यंत, आम्ही विकत असलेले प्रत्येक उत्पादन प्रेमाने जोपासले जाते आणि थेट तुमच्या दारापर्यंत ताजे वितरित केले जाते."}
            </p>
            <Link to="/about" className="inline-flex items-center gap-2 bg-brand-brown hover:bg-brand-brown-light text-white font-bold py-3 px-6 rounded-full transition-colors">
              {isEn ? 'Read More' : 'अधिक वाचा'}
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Testimonials */}
      <section className="py-20 bg-brand-green/5 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {isEn ? 'What Our Customers Say' : 'आमचे ग्राहक काय म्हणतात'}
            </h2>
            <div className="w-24 h-1 bg-brand-green mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <div key={idx} className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 relative">
                <div className="flex gap-1 text-yellow-400 mb-4">
                  <Star size={20} fill="currentColor" />
                  <Star size={20} fill="currentColor" />
                  <Star size={20} fill="currentColor" />
                  <Star size={20} fill="currentColor" />
                  <Star size={20} fill="currentColor" />
                </div>
                <p className="text-gray-600 dark:text-gray-300 italic mb-6">"{t.review}"</p>
                <div className="flex items-center gap-3 mt-auto">
                  <div className="w-10 h-10 bg-brand-green/20 rounded-full flex items-center justify-center text-brand-green font-bold">
                    {t.name.charAt(0)}
                  </div>
                  <span className="font-bold text-gray-900 dark:text-white">{t.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Contact Section (Embedded) */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-brand-green-dark rounded-3xl p-8 md:p-12 text-white shadow-2xl relative overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs><pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="2" fill="currentColor"/></pattern></defs>
              <rect x="0" y="0" width="100%" height="100%" fill="url(#dots)" />
            </svg>
          </div>

          <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-12">
            <div className="md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                {isEn ? 'Need Daily Milk Delivery?' : 'दररोज दूध हवे आहे का?'}
              </h2>
              <p className="text-green-50 text-lg mb-8 max-w-md">
                {isEn 
                  ? 'Contact us directly on WhatsApp to start your daily subscription or place an order.' 
                  : 'तुमची दैनिक सदस्यता सुरू करण्यासाठी किंवा ऑर्डर देण्यासाठी आमच्याशी थेट WhatsApp वर संपर्क साधा.'}
              </p>
              <button 
                onClick={() => window.open('https://wa.me/918975411768', '_blank')}
                className="bg-[#25D366] hover:bg-[#1ebd5a] text-white font-bold py-4 px-8 rounded-full flex items-center gap-3 transition-colors shadow-lg"
              >
                <img src="https://cdn-icons-png.flaticon.com/512/124/124034.png" alt="WhatsApp" className="w-6 h-6 invert" />
                {isEn ? 'Order on WhatsApp' : 'WhatsApp वर ऑर्डर करा'}
              </button>
            </div>
            
            <div className="md:w-1/2 space-y-6 bg-white/10 p-8 rounded-2xl backdrop-blur-sm border border-white/20 w-full">
              <div className="flex items-center gap-4">
                <div className="bg-white/20 p-3 rounded-full"><Phone size={24} /></div>
                <div>
                  <p className="text-green-100 text-sm">{isEn ? 'Call Us' : 'आम्हाला कॉल करा'}</p>
                  <p className="font-bold text-lg">+91 89754 11768</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-white/20 p-3 rounded-full"><Mail size={24} /></div>
                <div>
                  <p className="text-green-100 text-sm">{isEn ? 'Email Us' : 'आम्हाला ईमेल करा'}</p>
                  <p className="font-bold text-lg">madhurajagtap275@gmail.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-white/20 p-3 rounded-full"><MapPin size={24} /></div>
                <div>
                  <p className="text-green-100 text-sm">{isEn ? 'Farm Location' : 'शेताचे ठिकाण'}</p>
                  <p className="font-bold">Wadgaon Haveli, Maharashtra 415115</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
