import { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { CartContext } from '../context/CartContext';
import { ArrowLeft, CheckCircle } from 'lucide-react';

const Checkout = () => {
  const { language } = useContext(AppContext);
  const { cartItems, cartTotal, clearCart } = useContext(CartContext);
  const isEn = language === 'en';
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    address: '',
  });

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 bg-brand-light dark:bg-gray-900 transition-colors">
        <h2 className="text-2xl font-bold mb-4 dark:text-white">{isEn ? 'Your cart is empty' : 'तुमचे कार्ट रिकामे आहे'}</h2>
        <Link to="/products" className="text-brand-green hover:underline flex items-center gap-2">
          <ArrowLeft size={16} /> {isEn ? 'Back to Products' : 'उत्पादनांकडे परत जा'}
        </Link>
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    
    // Create dummy order data
    const orderData = {
      id: 'ORD-' + Math.floor(Math.random() * 1000000),
      customer: formData.name,
      mobile: formData.mobile,
      product: cartItems.map(item => `${item.name} (${item.quantity} ${item.unit})`).join(', '),
      total: cartTotal,
      status: 'Processing',
      date: 'Just Now',
      items: [...cartItems]
    };

    // Persist for owner dashboard
    const existingOrders = JSON.parse(localStorage.getItem('swaraOrders') || '[]');
    localStorage.setItem('swaraOrders', JSON.stringify([orderData, ...existingOrders]));

    // Clear the cart
    clearCart();

    // Navigate to success page with order data
    navigate('/order-success', { state: { order: orderData } });
  };

  return (
    <div className="bg-brand-light dark:bg-gray-900 min-h-screen py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/cart" className="inline-flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-brand-green dark:hover:text-brand-green mb-8 transition-colors">
          <ArrowLeft size={20} /> {isEn ? 'Back to Cart' : 'कार्टकडे परत जा'}
        </Link>

        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          {isEn ? 'Checkout' : 'चेकआउट'}
        </h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Checkout Form */}
          <div className="lg:w-2/3">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-8">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-100 dark:border-gray-700 pb-4">
                {isEn ? 'Delivery Details' : 'वितरण तपशील'}
              </h2>
              
              <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-6">
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
                    {isEn ? 'Mobile Number' : 'मोबाईल क्रमांक'}
                  </label>
                  <input 
                    type="tel" 
                    name="mobile"
                    required
                    value={formData.mobile}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-green"
                    placeholder="+91"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {isEn ? 'Delivery Address' : 'वितरणाचा पत्ता'}
                  </label>
                  <textarea 
                    name="address"
                    required
                    rows="3"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-green resize-none"
                    placeholder={isEn ? "Enter full address with landmark" : "लँडमार्कसह संपूर्ण पत्ता प्रविष्ट करा"}
                  ></textarea>
                </div>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-100 dark:border-gray-700 pb-4">
                {isEn ? 'Product Summary' : 'उत्पादनांचा सारांश'}
              </h2>
              
              <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-3">
                      <span className="font-medium text-gray-900 dark:text-white">
                        {item.quantity}x
                      </span>
                      <span className="text-gray-600 dark:text-gray-400 line-clamp-1">
                        {isEn ? item.name : item.name_mr}
                      </span>
                    </div>
                    <span className="font-medium text-gray-900 dark:text-white">
                      ₹{item.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-gray-100 dark:border-gray-700 pt-4 mb-8 space-y-4">
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>{isEn ? 'Subtotal' : 'एकूण किंमत'}</span>
                  <span>₹{cartTotal}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>{isEn ? 'Delivery' : 'वितरण'}</span>
                  <span className="text-green-500">{isEn ? 'Free' : 'मोफत'}</span>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="text-lg font-bold text-gray-900 dark:text-white">
                    {isEn ? 'Total Amount' : 'एकूण रक्कम'}
                  </span>
                  <span className="text-2xl font-bold text-brand-green-dark dark:text-brand-green">
                    ₹{cartTotal}
                  </span>
                </div>
              </div>

              <button 
                type="submit"
                form="checkout-form"
                className="w-full bg-brand-green hover:bg-brand-green-dark text-white font-bold py-4 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-md"
              >
                <CheckCircle size={20} /> {isEn ? 'Place Order' : 'ऑर्डर द्या'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
