import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { CartContext } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { language } = useContext(AppContext);
  const { addToCart } = useContext(CartContext);
  const isEn = language === 'en';
  const navigate = useNavigate();

  const handleAddToCart = (e) => {
    e.preventDefault(); // Prevent navigating if wrapped in Link
    const currentUser = JSON.parse(localStorage.getItem('swaraUser') || 'null');
    if (!currentUser) {
      navigate('/login');
      return;
    }
    addToCart(product, 1);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100 dark:border-gray-700">
      <Link to={`/products/${product.id}`} className="block relative overflow-hidden aspect-[4/3]">
        <img 
          src={product.image} 
          alt={isEn ? product.name : product.name_mr}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => { e.target.src = `https://placehold.co/400x300/e67e22/ffffff?text=${encodeURIComponent(product.name)}` }}
        />
        <div className="absolute top-3 left-3 bg-brand-green text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
          {product.category}
        </div>
      </Link>
      <div className="p-5">
        <Link to={`/products/${product.id}`}>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-brand-green transition-colors">
            {isEn ? product.name : product.name_mr}
          </h3>
        </Link>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
          {isEn ? product.description : product.description_mr}
        </p>
        <div className="flex items-center justify-between mt-auto">
          <div className="text-lg font-bold text-brand-green-dark dark:text-brand-green">
            ₹{product.price} <span className="text-sm font-normal text-gray-500">/ {product.unit}</span>
          </div>
          <button 
            onClick={handleAddToCart}
            className="flex items-center justify-center bg-brand-brown hover:bg-brand-brown-light text-white rounded-full p-3 transition-colors shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-brown"
            aria-label="Add to cart"
          >
            <ShoppingCart size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
