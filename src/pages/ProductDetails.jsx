import { useState, useContext, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { CartContext } from '../context/CartContext';
import productsData from '../data/products.json';
import { ArrowLeft, Minus, Plus, ShoppingCart, CheckCircle } from 'lucide-react';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { language } = useContext(AppContext);
  const { addToCart } = useContext(CartContext);
  const isEn = language === 'en';

  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const product = productsData.find(p => p.id === parseInt(id));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-2xl font-bold mb-4">{isEn ? 'Product not found' : 'उत्पादन सापडले नाही'}</h2>
        <button onClick={() => navigate('/products')} className="text-brand-green hover:underline flex items-center gap-2">
          <ArrowLeft size={16} /> {isEn ? 'Back to Products' : 'उत्पादनांकडे परत जा'}
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    const currentUser = JSON.parse(localStorage.getItem('swaraUser') || 'null');
    if (!currentUser) {
      navigate('/login');
      return;
    }
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const decreaseQuantity = () => setQuantity(prev => Math.max(1, prev - 1));
  const increaseQuantity = () => setQuantity(prev => prev + 1);

  return (
    <div className="bg-brand-light dark:bg-gray-900 min-h-screen py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/products" className="inline-flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-brand-green dark:hover:text-brand-green mb-8 transition-colors">
          <ArrowLeft size={20} /> {isEn ? 'Back to Products' : 'उत्पादनांकडे परत जा'}
        </Link>

        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {/* Image Section */}
            <div className="relative h-[400px] md:h-auto border-r border-gray-100 dark:border-gray-700">
              <img 
                src={product.image} 
                alt={isEn ? product.name : product.name_mr}
                className="w-full h-full object-cover"
                onError={(e) => { e.target.src = `https://placehold.co/800x600/e67e22/ffffff?text=${encodeURIComponent(product.name)}` }}
              />
              <div className="absolute top-4 left-4 bg-brand-green text-white text-sm font-bold px-4 py-1.5 rounded-full shadow-md">
                {product.category}
              </div>
            </div>

            {/* Details Section */}
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {isEn ? product.name : product.name_mr}
              </h1>
              
              <div className="text-3xl font-bold text-brand-green-dark dark:text-brand-green mb-6">
                ₹{product.price} <span className="text-lg font-normal text-gray-500">/ {product.unit}</span>
              </div>

              <p className="text-gray-600 dark:text-gray-300 text-lg mb-8 leading-relaxed">
                {isEn ? product.description : product.description_mr}
              </p>

              <div className="flex items-center mb-8 bg-gray-50 dark:bg-gray-700 w-max rounded-full p-1 border border-gray-200 dark:border-gray-600">
                <button 
                  onClick={decreaseQuantity}
                  className="w-10 h-10 flex items-center justify-center rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  <Minus size={18} />
                </button>
                <span className="w-12 text-center font-bold text-lg text-gray-900 dark:text-white">
                  {quantity}
                </span>
                <button 
                  onClick={increaseQuantity}
                  className="w-10 h-10 flex items-center justify-center rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  <Plus size={18} />
                </button>
              </div>

              <div className="flex gap-4">
                <button 
                  onClick={handleAddToCart}
                  className={`flex-1 flex items-center justify-center gap-2 py-4 px-8 rounded-full font-bold text-lg transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 ${
                    added 
                      ? 'bg-green-500 text-white' 
                      : 'bg-brand-brown hover:bg-brand-brown-light text-white'
                  }`}
                >
                  {added ? (
                    <>
                      <CheckCircle size={24} /> {isEn ? 'Added' : 'जोडले'}
                    </>
                  ) : (
                    <>
                      <ShoppingCart size={24} /> {isEn ? 'Add to Cart' : 'कार्टमध्ये जोडा'}
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
