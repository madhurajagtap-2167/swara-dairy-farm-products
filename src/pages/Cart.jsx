import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { CartContext } from '../context/CartContext';
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react';

const Cart = () => {
  const { language } = useContext(AppContext);
  const { cartItems, removeFromCart, updateQuantity, clearCart, cartTotal } = useContext(CartContext);
  const isEn = language === 'en';

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-brand-light dark:bg-gray-900 transition-colors px-4 text-center">
        <div className="w-24 h-24 bg-brand-green/10 text-brand-green rounded-full flex items-center justify-center mb-6">
          <ShoppingBag size={48} />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          {isEn ? 'Your cart is empty' : 'तुमचे कार्ट रिकामे आहे'}
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md">
          {isEn 
            ? "Looks like you haven't added any farm fresh products to your cart yet." 
            : "असे दिसते की तुम्ही अद्याप तुमच्या कार्टमध्ये कोणतीही शेतातील ताजी उत्पादने जोडलेली नाहीत."}
        </p>
        <Link 
          to="/products" 
          className="bg-brand-green hover:bg-brand-green-dark text-white font-bold py-3 px-8 rounded-full transition-colors shadow-lg"
        >
          {isEn ? 'Start Shopping' : 'खरेदी सुरू करा'}
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-brand-light dark:bg-gray-900 min-h-screen py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          {isEn ? 'Shopping Cart' : 'शॉपिंग कार्ट'} ({cartItems.length})
        </h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="lg:w-2/3">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
              <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center hidden sm:flex">
                <span className="text-gray-500 dark:text-gray-400 font-medium">{isEn ? 'Product' : 'उत्पादन'}</span>
                <span className="text-gray-500 dark:text-gray-400 font-medium">{isEn ? 'Quantity & Price' : 'प्रमाण आणि किंमत'}</span>
              </div>
              
              <ul className="divide-y divide-gray-100 dark:divide-gray-700">
                {cartItems.map((item) => (
                  <li key={item.id} className="p-6 flex flex-col sm:flex-row items-center gap-6">
                    <img 
                      src={item.image} 
                      alt={isEn ? item.name : item.name_mr} 
                      className="w-24 h-24 object-cover rounded-xl shadow-sm"
                      onError={(e) => { e.target.src = 'https://placehold.co/100x100/e67e22/ffffff?text=Item' }}
                    />
                    <div className="flex-1 text-center sm:text-left">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                        {isEn ? item.name : item.name_mr}
                      </h3>
                      <p className="text-brand-green font-medium">₹{item.price} / {item.unit}</p>
                    </div>
                    
                    <div className="flex flex-col items-center gap-4 sm:items-end">
                      <div className="flex items-center bg-gray-50 dark:bg-gray-700 rounded-full border border-gray-200 dark:border-gray-600 p-1">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-10 text-center font-bold text-gray-900 dark:text-white">
                          {item.quantity}
                        </span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-bold text-lg text-gray-900 dark:text-white w-24 text-right">
                          ₹{item.price * item.quantity}
                        </span>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                          title={isEn ? 'Remove item' : 'काढून टाका'}
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              
              <div className="p-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-700">
                <button 
                  onClick={clearCart}
                  className="text-red-500 hover:text-red-700 text-sm font-medium transition-colors"
                >
                  {isEn ? 'Clear all items' : 'सर्व उत्पादने काढून टाका'}
                </button>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-100 dark:border-gray-700 pb-4">
                {isEn ? 'Order Summary' : 'ऑर्डरचा सारांश'}
              </h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>{isEn ? 'Subtotal' : 'एकूण किंमत'}</span>
                  <span>₹{cartTotal}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>{isEn ? 'Delivery' : 'वितरण'}</span>
                  <span className="text-green-500">{isEn ? 'Free' : 'मोफत'}</span>
                </div>
              </div>
              
              <div className="border-t border-gray-100 dark:border-gray-700 pt-4 mb-8">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900 dark:text-white">
                    {isEn ? 'Total' : 'एकूण'}
                  </span>
                  <span className="text-2xl font-bold text-brand-green-dark dark:text-brand-green">
                    ₹{cartTotal}
                  </span>
                </div>
              </div>

              <Link 
                to="/checkout"
                className="w-full bg-brand-brown hover:bg-brand-brown-light text-white font-bold py-4 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-md"
              >
                {isEn ? 'Proceed to Checkout' : 'चेकआउटसाठी पुढे जा'} <ArrowRight size={20} />
              </Link>
              
              <div className="mt-4 text-center">
                <Link to="/products" className="text-brand-green hover:underline text-sm font-medium">
                  {isEn ? 'Continue Shopping' : 'खरेदी चालू ठेवा'}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
