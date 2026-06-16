import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { Award, Users, Sprout, Heart } from 'lucide-react';

const About = () => {
  const { language } = useContext(AppContext);
  const isEn = language === 'en';

  const stats = [
    { icon: <Sprout size={32} />, value: '15+', label: isEn ? 'Years Experience' : 'वर्षांचा अनुभव' },
    { icon: <Heart size={32} />, value: '10k+', label: isEn ? 'Happy Families' : 'समाधानी कुटुंबे' },
    { icon: <Award size={32} />, value: '100%', label: isEn ? 'Organic Guarantee' : 'सेंद्रिय हमी' },
    { icon: <Users size={32} />, value: '50+', label: isEn ? 'Farm Workers' : 'शेतकरी कामगार' },
  ];

  return (
    <div className="bg-brand-light dark:bg-gray-900 min-h-screen transition-colors">
      {/* Hero */}
      <div className="relative py-20 bg-brand-green-dark overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="leaf-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <path d="M50 15c-15-15-35-15-35 5 0 20 20 30 35 45 15-15 35-25 35-45 0-20-20-20-35-5z" fill="currentColor"/>
              </pattern>
            </defs>
            <rect x="0" y="0" width="100%" height="100%" fill="url(#leaf-pattern)" />
          </svg>
        </div>
        <div className="relative max-w-4xl mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {isEn ? 'Our Story' : 'आमची कथा'}
          </h1>
          <p className="text-xl md:text-2xl text-green-50 max-w-3xl mx-auto leading-relaxed">
            {isEn 
              ? 'Swara Dairy is a family-owned farm dedicated to providing pure, unadulterated, and fresh farm products to our community.' 
              : 'स्वरा डेअरी हा कुटुंबाच्या मालकीचा शेती व्यवसाय आहे, जो आमच्या समुदायाला शुद्ध आणि ताजी शेती उत्पादने प्रदान करण्यासाठी समर्पित आहे.'}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <img 
              src="/src/assets/hero-farm.jpg" 
              alt="Our Farm" 
              className="rounded-3xl shadow-xl w-full h-[400px] object-cover"
              onError={(e) => { e.target.src = 'https://placehold.co/800x600/2ecc71/ffffff?text=Our+Farm' }}
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              {isEn ? 'Generations of Farming Heritage' : 'शेतीचा पिढ्यानपिढ्या चालत आलेला वारसा'}
            </h2>
            <div className="space-y-4 text-lg text-gray-600 dark:text-gray-300">
              <p>
                {isEn 
                  ? 'Located in the lush green belts of Maharashtra, Swara Farms started as a humble endeavor with just a few cows and a passion for agriculture.' 
                  : 'महाराष्ट्राच्या हिरव्यागार पट्ट्यात वसलेल्या स्वरा फार्म्सची सुरुवात केवळ काही गाई आणि शेतीच्या आवडीने एका नम्र प्रयत्नासह झाली.'}
              </p>
              <p>
                {isEn 
                  ? 'Today, we have expanded our operations to include premium poultry farming, fresh egg production, and coconut cultivation, all while maintaining our strict organic and ethical farming standards.' 
                  : 'आज, आम्ही प्रीमियम कुक्कुटपालन, ताजी अंडी उत्पादन आणि नारळ लागवड समाविष्ट करण्यासाठी आमच्या ऑपरेशन्सचा विस्तार केला आहे, हे सर्व आमचे कठोर सेंद्रिय आणि नैतिक शेतीचे मानक राखून केले आहे.'}
              </p>
              <p>
                {isEn 
                  ? 'Our cows and buffaloes are grass-fed and roam freely, ensuring the highest quality milk. Our poultry is raised in a stress-free environment, and our coconuts are naturally grown without synthetic fertilizers.' 
                  : 'आमच्या गाई आणि म्हशी गवत खातात आणि मुक्तपणे फिरतात, ज्यामुळे उच्च प्रतीचे दूध मिळते. आमची पोल्ट्री तणावमुक्त वातावरणात वाढवली जाते आणि आमचे नारळ कृत्रिम खतांशिवाय नैसर्गिकरित्या वाढवले जातात.'}
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 text-center flex flex-col items-center">
              <div className="text-brand-green mb-4 bg-brand-green/10 p-4 rounded-full">
                {stat.icon}
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{stat.value}</div>
              <div className="text-gray-500 dark:text-gray-400 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
