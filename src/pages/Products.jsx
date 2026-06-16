import { useState, useContext, useMemo } from 'react';
import { AppContext } from '../context/AppContext';
import ProductCard from '../components/ProductCard';
import productsData from '../data/products.json';
import { Search, Filter } from 'lucide-react';

const Products = () => {
  const { language } = useContext(AppContext);
  const isEn = language === 'en';

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...new Set(productsData.map(p => p.category))];

  const filteredProducts = useMemo(() => {
    return productsData.filter((product) => {
      const matchCategory = selectedCategory === 'All' || product.category === selectedCategory;
      const searchLower = searchTerm.toLowerCase();
      const matchSearch = product.name.toLowerCase().includes(searchLower) || 
                          product.name_mr.includes(searchTerm) ||
                          product.category.toLowerCase().includes(searchLower);
      return matchCategory && matchSearch;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="bg-brand-light dark:bg-gray-900 min-h-screen py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {isEn ? 'Our Farm Products' : 'आमची शेती उत्पादने'}
          </h1>
          <div className="w-24 h-1 bg-brand-green mx-auto rounded-full"></div>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
          {/* Categories */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
            <Filter size={20} className="text-gray-500 mr-2 flex-shrink-0" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === cat 
                    ? 'bg-brand-green text-white shadow-md' 
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-brand-green/10 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
                }`}
              >
                {cat === 'All' ? (isEn ? 'All Products' : 'सर्व उत्पादने') : cat}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full md:w-72">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder={isEn ? "Search products..." : "उत्पादने शोधा..."}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-200 dark:border-gray-700 rounded-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-transparent transition-all shadow-sm"
            />
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-xl text-gray-500 dark:text-gray-400">
              {isEn ? 'No products found matching your search.' : 'तुमच्या शोध निकषांशी जुळणारी कोणतीही उत्पादने आढळली नाहीत.'}
            </p>
            <button 
              onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }}
              className="mt-4 text-brand-green hover:underline font-medium"
            >
              {isEn ? 'Clear filters' : 'फिल्टर साफ करा'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
