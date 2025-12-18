import { useEffect, useState } from 'react';
import { Sparkles, Trophy, Star, Zap } from 'lucide-react';
import { useNavigation } from '../contexts/NavigationContext';

export function HomePage() {
  const { navigate } = useNavigation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: Trophy,
      title: 'Premium Tables',
      description: 'Book exclusive gaming tables with professional dealers',
    },
    {
      icon: Star,
      title: 'Elite Events',
      description: 'Access to high-stakes tournaments and exclusive gatherings',
    },
    {
      icon: Sparkles,
      title: 'VIP Treatment',
      description: 'Luxury membership tiers with exceptional benefits',
    },
    {
      icon: Zap,
      title: 'Instant Booking',
      description: 'Reserve your spot in seconds with our seamless system',
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />

        <div className="absolute inset-0 opacity-20">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-yellow-500 rounded-full animate-pulse"
              style={{
                width: Math.random() * 4 + 1 + 'px',
                height: Math.random() * 4 + 1 + 'px',
                top: Math.random() * 100 + '%',
                left: Math.random() * 100 + '%',
                animationDelay: Math.random() * 3 + 's',
                animationDuration: Math.random() * 3 + 2 + 's',
              }}
            />
          ))}
        </div>

        <div
          className={`relative z-10 text-center px-6 transition-all duration-1000 transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-500 bg-clip-text text-transparent animate-pulse">
            VON CASINO
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Where luxury meets fortune. Experience the ultimate in high-stakes gaming.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('booking')}
              className="px-8 py-4 bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-black font-bold rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500/50"
            >
              Book a Table
            </button>
            <button
              onClick={() => navigate('events')}
              className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-yellow-500/50 text-yellow-400 font-bold rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              View Events
            </button>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-yellow-500 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-yellow-500 rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      <section className="py-24 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/50 to-black" />
        <div className="container mx-auto relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-yellow-500 to-yellow-400 bg-clip-text text-transparent">
            Why Choose Von Casino
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-8 bg-gradient-to-br from-gray-900 to-black border border-yellow-900/30 rounded-xl hover:border-yellow-500/50 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500/20"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <div className="relative mb-6">
                  <feature.icon className="w-12 h-12 text-yellow-500 group-hover:text-yellow-400 transition-colors" />
                  <div className="absolute inset-0 blur-xl bg-yellow-500/20 group-hover:bg-yellow-400/30 transition-all" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-yellow-400">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-900/10 via-transparent to-black" />
        <div className="container mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-yellow-500 to-yellow-400 bg-clip-text text-transparent">
            Ready to Experience Luxury?
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Join thousands of elite players who trust Von Casino for their gaming experience.
          </p>
          <button
            onClick={() => navigate('membership')}
            className="px-10 py-5 bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-black font-bold text-lg rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500/50"
          >
            Explore Membership Tiers
          </button>
        </div>
      </section>
    </div>
  );
}
