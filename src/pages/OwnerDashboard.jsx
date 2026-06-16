import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { Package, Users, ShoppingBag, TrendingUp, Search, Info } from 'lucide-react';

// Static Mock Data for Monitoring
const MOCK_ORDERS = [
  { id: 'ORD-001', customer: 'Ramesh Patil', mobile: '+91 9876543210', product: 'Cow Milk (2L), Eggs (1 Dozen)', total: 240, status: 'Delivered', date: 'Today, 07:30 AM' },
  { id: 'ORD-002', customer: 'Anita Sharma', mobile: '+91 8765432109', product: 'Buffalo Milk (1L)', total: 80, status: 'Processing', date: 'Today, 08:15 AM' },
  { id: 'ORD-003', customer: 'Vikas Joshi', mobile: '+91 7654321098', product: 'Chicken (1Kg), Coconut (2)', total: 340, status: 'Delivered', date: 'Yesterday' },
  { id: 'ORD-004', customer: 'Priya Deshmukh', mobile: '+91 6543210987', product: 'Cow Milk (1L)', total: 70, status: 'Delivered', date: 'Yesterday' },
];

const OwnerDashboard = () => {
  const { language } = useContext(AppContext);
  const isEn = language === 'en';
  const navigate = useNavigate();
  const [liveOrders, setLiveOrders] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('swaraUser'));
    if (!user || user.role !== 'owner') {
      navigate('/login');
      return;
    }
    const storedOrders = JSON.parse(localStorage.getItem('swaraOrders') || '[]');
    setLiveOrders(storedOrders);
  }, [navigate]);

  const allOrders = [...liveOrders, ...MOCK_ORDERS];
  
  // Calculate dynamic stats based on base values + live data
  const totalOrders = 156 + liveOrders.length;
  const recentBuyers = 42 + liveOrders.length;
  const purchasedProducts = 189 + liveOrders.reduce((sum, order) => sum + order.items.reduce((s, item) => s + item.quantity, 0), 0);
  const todayRevenue = 3450 + liveOrders.reduce((sum, order) => sum + order.total, 0);

  return (
    <div className="bg-brand-light dark:bg-gray-900 min-h-screen py-10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Banner */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-brand-green-dark dark:text-brand-green mb-4">
            {isEn ? 'Owner Dashboard' : 'मालक डॅशबोर्ड'}
          </h1>
          <div className="bg-brand-brown/10 border-l-4 border-brand-brown p-4 rounded-r-lg flex items-start gap-3">
            <Info className="text-brand-brown flex-shrink-0 mt-0.5" size={20} />
            <div>
              <p className="text-brand-brown-dark font-medium">
                {isEn ? 'Monitoring View Only' : 'केवळ देखरेख दृश्य'}
              </p>
              <p className="text-sm text-brand-brown-dark/80">
                {isEn ? 'You cannot purchase products from the Owner Dashboard. This portal is strictly for order analysis and monitoring.' : 'तुम्ही मालक डॅशबोर्डवरून उत्पादने खरेदी करू शकत नाही. हे पोर्टल काटेकोरपणे ऑर्डर विश्लेषण आणि देखरेखीसाठी आहे.'}
              </p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-xl">
                <Package size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{isEn ? 'Total Orders' : 'एकूण ऑर्डर्स'}</p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{totalOrders}</h3>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-xl">
                <TrendingUp size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{isEn ? 'Order Summary (Today)' : 'ऑर्डर सारांश (आज)'}</p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">₹{todayRevenue.toLocaleString()}</h3>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 rounded-xl">
                <Users size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{isEn ? 'Recent Buyers' : 'अलीकडील खरेदीदार'}</p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{recentBuyers}</h3>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 rounded-xl">
                <ShoppingBag size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{isEn ? 'Purchased Products' : 'खरेदी केलेली उत्पादने'}</p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{purchasedProducts}</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Orders Table */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {isEn ? 'Recent Orders & Customers' : 'अलीकडील ऑर्डर्स आणि ग्राहक'}
            </h2>
            <div className="relative">
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder={isEn ? "Search by name or mobile..." : "नाव किंवा मोबाईल शोधा..."}
                className="pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-green w-full sm:w-64"
              />
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-900/50 text-gray-500 dark:text-gray-400 text-sm uppercase tracking-wider">
                  <th className="p-4 font-medium">{isEn ? 'Order ID' : 'ऑर्डर आयडी'}</th>
                  <th className="p-4 font-medium">{isEn ? 'Customer Name' : 'ग्राहकाचे नाव'}</th>
                  <th className="p-4 font-medium">{isEn ? 'Mobile Number' : 'मोबाईल क्रमांक'}</th>
                  <th className="p-4 font-medium">{isEn ? 'Purchased Product' : 'खरेदी केलेले उत्पादन'}</th>
                  <th className="p-4 font-medium">{isEn ? 'Total' : 'एकूण'}</th>
                  <th className="p-4 font-medium">{isEn ? 'Status' : 'स्थिती'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {allOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <td className="p-4 text-sm font-bold text-brand-green-dark dark:text-brand-green">{order.id}</td>
                    <td className="p-4 text-sm font-medium text-gray-900 dark:text-white">{order.customer}</td>
                    <td className="p-4 text-sm text-gray-600 dark:text-gray-400">{order.mobile}</td>
                    <td className="p-4 text-sm text-gray-600 dark:text-gray-400">{order.product}</td>
                    <td className="p-4 text-sm font-bold text-gray-900 dark:text-white">₹{order.total}</td>
                    <td className="p-4 text-sm">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        order.status === 'Delivered' 
                          ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                          : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default OwnerDashboard;
