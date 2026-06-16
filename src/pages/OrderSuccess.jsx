import { useContext } from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { CheckCircle, Package, ArrowRight, Home } from 'lucide-react';

const OrderSuccess = () => {
  const { language } = useContext(AppContext);
  const isEn = language === 'en';
  const location = useLocation();
  const order = location.state?.order;

  if (!order) {
    return <Navigate to="/products" replace />;
  }

  const handleWhatsAppOrder = () => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const phoneNumber = '919876543210';
    
    let message = isEn ? `*New Order - Swara Dairy*\n\n` : `*नवीन ऑर्डर - स्वरा डेअरी*\n\n`;
    message += isEn ? `Order ID: ${order.orderId}\n` : `ऑर्डर आयडी: ${order.orderId}\n`;
    message += isEn ? `Name: ${order.customer.name}\n` : `नाव: ${order.customer.name}\n`;
    message += isEn ? `Mobile: ${order.customer.mobile}\n` : `मोबाईल: ${order.customer.mobile}\n`;
    message += isEn ? `Address: ${order.customer.address}\n\n` : `पत्ता: ${order.customer.address}\n\n`;
    
    message += isEn ? `*Products:*\n` : `*उत्पादने:*\n`;
    order.items.forEach(item => {
      const itemName = isEn ? item.name : item.name_mr;
      message += `- ${item.quantity}x ${itemName} (₹${item.price * item.quantity})\n`;
    });
    
    message += `\n*Total Amount: ₹${order.total}*`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = isMobile 
      ? `whatsapp://send?phone=${phoneNumber}&text=${encodedMessage}`
      : `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;
      
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="bg-brand-light dark:bg-gray-900 min-h-screen py-16 transition-colors flex items-center justify-center">
      <div className="max-w-3xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700 text-center relative">
          
          <div className="bg-brand-green py-12 px-8 text-white relative overflow-hidden">
            <div className="relative z-10 flex flex-col items-center">
              <div className="bg-white text-brand-green w-20 h-20 rounded-full flex items-center justify-center mb-6 shadow-lg">
                <CheckCircle size={48} />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                {isEn ? 'Thank You for Your Order!' : 'तुमच्या ऑर्डरसाठी धन्यवाद!'}
              </h1>
              <p className="text-green-50 text-lg">
                {isEn ? `Order ID: ${order.orderId}` : `ऑर्डर आयडी: ${order.orderId}`}
              </p>
            </div>
            
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="confetti" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                    <circle cx="20" cy="20" r="5" fill="currentColor"/>
                    <rect x="60" y="40" width="8" height="8" transform="rotate(45 64 44)" fill="currentColor"/>
                    <polygon points="80,80 85,90 75,90" fill="currentColor"/>
                  </pattern>
                </defs>
                <rect x="0" y="0" width="100%" height="100%" fill="url(#confetti)" />
              </svg>
            </div>
          </div>

          <div className="p-8 md:p-12">
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-2xl p-6 mb-8 text-left inline-block w-full max-w-md mx-auto">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2 border-b border-gray-200 dark:border-gray-600 pb-2">
                <Package size={20} />
                {isEn ? 'Order Details' : 'ऑर्डर तपशील'}
              </h3>
              
              <ul className="space-y-3 mb-4">
                {order.items.map(item => (
                  <li key={item.id} className="flex justify-between text-gray-700 dark:text-gray-300 text-sm">
                    <span>{item.quantity}x {isEn ? item.name : item.name_mr}</span>
                    <span className="font-medium">₹{item.price * item.quantity}</span>
                  </li>
                ))}
              </ul>
              
              <div className="flex justify-between items-center border-t border-gray-200 dark:border-gray-600 pt-3">
                <span className="font-bold text-gray-900 dark:text-white">
                  {isEn ? 'Total Amount paid:' : 'एकूण रक्कम भरली:'}
                </span>
                <span className="font-bold text-lg text-brand-green-dark dark:text-brand-green">
                  ₹{order.total}
                </span>
              </div>
            </div>

            <div className="mb-10 p-4 bg-brand-green/10 border border-brand-green/20 rounded-xl max-w-md mx-auto">
              <p className="text-brand-green-dark dark:text-brand-green font-medium">
                {isEn 
                  ? 'Your order has been received. Estimated delivery is tomorrow morning between 6:00 AM - 8:00 AM.' 
                  : 'तुमची ऑर्डर प्राप्त झाली आहे. अंदाजित वितरण उद्या सकाळी ६:०० ते ८:०० च्या दरम्यान आहे.'}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button 
                onClick={handleWhatsAppOrder}
                className="bg-[#25D366] hover:bg-[#1ebd5a] text-white font-bold py-3 px-6 rounded-full flex items-center justify-center gap-2 transition-colors shadow-md"
              >
                <img src="https://cdn-icons-png.flaticon.com/512/124/124034.png" alt="WhatsApp" className="w-5 h-5 invert" />
                {isEn ? 'Order on WhatsApp' : 'WhatsApp वर ऑर्डर करा'}
              </button>
              
              <Link 
                to="/"
                className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-bold py-3 px-6 rounded-full flex items-center justify-center gap-2 transition-colors"
              >
                <Home size={20} /> {isEn ? 'Back to Home' : 'मुख्यपृष्ठावर परत जा'}
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
