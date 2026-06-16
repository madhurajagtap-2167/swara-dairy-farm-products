import { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { PlusCircle, Package, CheckCircle, LogOut, Image as ImageIcon, Info } from 'lucide-react';

const SellerDashboard = () => {
  const { language } = useContext(AppContext);
  const isEn = language === 'en';

  const currentUser = JSON.parse(localStorage.getItem('swaraUser') || 'null');

  const handleLogout = () => {
    localStorage.removeItem('swaraUser');
    window.location.href = '/';
  };

  const [formData, setFormData] = useState({
    name: '',
    name_mr: '',
    category: 'Dairy',
    price: '',
    unit: 'Liter',
    description: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: '', name_mr: '', category: 'Dairy', price: '', unit: 'Liter', description: '' });
  };

  return (
    <div className="bg-brand-light min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {isEn ? 'Seller Portal' : 'विक्रेता पोर्टल'}
            </h1>
            <p className="text-gray-500 mt-1">
              {isEn ? `Welcome, ${currentUser?.name || 'Seller'}` : `स्वागत आहे, ${currentUser?.name || 'विक्रेता'}`}
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-500 bg-red-50 hover:bg-red-100 rounded-full transition-colors"
          >
            <LogOut size={16} /> {isEn ? 'Logout' : 'बाहेर पडा'}
          </button>
        </div>

        {/* Info Banner */}
        <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-2xl mb-8">
          <Info size={20} className="text-blue-600 mt-0.5 flex-shrink-0" />
          <p className="text-blue-700 text-sm">
            {isEn
              ? 'As a Seller, you can add new products for sale. You cannot place customer orders. Fill in the form below and click Publish.'
              : 'विक्रेता म्हणून, तुम्ही विक्रीसाठी नवीन उत्पादने जोडू शकता. तुम्ही ग्राहकांच्या ऑर्डर देऊ शकत नाही. खालील फॉर्म भरा आणि प्रकाशित करा वर क्लिक करा.'}
          </p>
        </div>

        {/* Success Banner */}
        {submitted && (
          <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-2xl mb-6">
            <CheckCircle size={20} className="text-green-600 flex-shrink-0" />
            <p className="text-green-700 text-sm font-medium">
              {isEn ? 'Product submitted successfully! (UI only — no backend)' : 'उत्पादन यशस्वीरित्या सादर केले! (फक्त UI — बॅकएंड नाही)'}
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Add Product Form */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2 border-b border-gray-100 pb-4">
              <PlusCircle className="text-brand-green" size={22} />
              {isEn ? 'Add New Product' : 'नवीन उत्पादन जोडा'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    {isEn ? 'Product Name (English)' : 'उत्पादनाचे नाव (इंग्रजी)'}
                  </label>
                  <input
                    type="text" name="name" required value={formData.name} onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 focus:ring-2 focus:ring-brand-green outline-none"
                    placeholder="e.g. Goat Milk"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    {isEn ? 'Product Name (Marathi)' : 'उत्पादनाचे नाव (मराठी)'}
                  </label>
                  <input
                    type="text" name="name_mr" required value={formData.name_mr} onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 focus:ring-2 focus:ring-brand-green outline-none"
                    placeholder="उदा. शेळीचे दूध"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    {isEn ? 'Category' : 'श्रेणी'}
                  </label>
                  <select
                    name="category" value={formData.category} onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 focus:ring-2 focus:ring-brand-green outline-none appearance-none"
                  >
                    <option value="Dairy">Dairy</option>
                    <option value="Eggs">Eggs</option>
                    <option value="Poultry">Poultry</option>
                    <option value="Coconut Products">Coconut Products</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    {isEn ? 'Price (₹)' : 'किंमत (₹)'}
                  </label>
                  <input
                    type="number" name="price" required min="1" value={formData.price} onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 focus:ring-2 focus:ring-brand-green outline-none"
                    placeholder="e.g. 80"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    {isEn ? 'Unit' : 'एकक'}
                  </label>
                  <select
                    name="unit" value={formData.unit} onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 focus:ring-2 focus:ring-brand-green outline-none appearance-none"
                  >
                    <option value="Liter">Liter</option>
                    <option value="Kg">Kg</option>
                    <option value="Piece">Piece</option>
                    <option value="Dozen">Dozen</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  {isEn ? 'Product Description' : 'उत्पादनाचे वर्णन'}
                </label>
                <textarea
                  name="description" required rows="3" value={formData.description} onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 focus:ring-2 focus:ring-brand-green outline-none resize-none"
                  placeholder={isEn ? 'Describe the product briefly...' : 'उत्पादनाचे थोडक्यात वर्णन करा...'}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  {isEn ? 'Product Image' : 'उत्पादनाची प्रतिमा'}
                </label>
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors">
                  <ImageIcon size={28} className="text-gray-400 mb-2" />
                  <span className="text-sm text-gray-500">{isEn ? 'Click to upload image' : 'प्रतिमा अपलोड करण्यासाठी क्लिक करा'}</span>
                  <input type="file" accept="image/*" className="hidden" />
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-brand-green hover:bg-brand-green-dark text-white font-bold py-4 rounded-xl transition-colors shadow-md flex justify-center items-center gap-2"
              >
                <CheckCircle size={20} />
                {isEn ? 'Publish Product' : 'उत्पादन प्रकाशित करा'}
              </button>
            </form>
          </div>

          {/* Right Panel — Empty Listings */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 h-fit">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2 border-b border-gray-100 pb-4">
              <Package size={20} className="text-brand-brown" />
              {isEn ? 'My Listings' : 'माझी यादी'}
            </h2>
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="bg-gray-100 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <Package size={28} className="text-gray-400" />
              </div>
              <p className="text-gray-500 text-sm font-medium mb-1">
                {isEn ? 'No products added yet' : 'अद्याप कोणतीही उत्पादने जोडलेली नाहीत'}
              </p>
              <p className="text-gray-400 text-xs">
                {isEn ? 'Products you add will appear here.' : 'तुम्ही जोडलेली उत्पादने येथे दिसतील.'}
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;
