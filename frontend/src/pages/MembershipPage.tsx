import { useEffect, useState } from 'react';
import { Award, Crown, Gem, Sparkles, Check } from 'lucide-react';
import { membershipApi, MembershipTier } from '../lib/api';

const iconMap: Record<string, React.ComponentType<{ className?: string; fill?: string }>> = {
  award: Award,
  crown: Crown,
  gem: Gem,
  sparkles: Sparkles,
};

export function MembershipPage() {
  const [tiers, setTiers] = useState<MembershipTier[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTiers();
  }, []);

  const fetchTiers = async () => {
    try {
      const data = await membershipApi.getTiers();
      setTiers(data || []);
    } catch (error) {
      console.error('Error fetching tiers:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-yellow-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-yellow-500 to-yellow-400 bg-clip-text text-transparent">
            Membership Tiers
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Your spending unlocks exclusive benefits and VIP treatment. The more you play, the more you gain.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-16">
          {tiers.map((tier, index) => {
            const Icon = iconMap[tier.icon] || Award;
            const isPremium = tier.name === 'Platinum' || tier.name === 'Diamond';

            return (
              <div
                key={tier.id}
                className={`group relative bg-gradient-to-br from-gray-900 to-black border rounded-xl p-6 transition-all duration-500 transform hover:scale-105 ${isPremium
                    ? 'border-yellow-500 shadow-2xl shadow-yellow-500/20 lg:scale-105'
                    : 'border-yellow-900/30 hover:border-yellow-500/50'
                  }`}
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                {isPremium && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-black px-4 py-1 rounded-full text-xs font-bold">
                    PREMIUM
                  </div>
                )}

                <div className="text-center mb-6">
                  <div className="relative inline-block mb-4">
                    <Icon
                      className="w-16 h-16 mx-auto group-hover:scale-110 transition-transform duration-300"
                      style={{ color: tier.color }}
                      fill={tier.name === 'Gold' || tier.name === 'Diamond' ? tier.color : 'none'}
                    />
                    <div
                      className="absolute inset-0 blur-xl opacity-50 group-hover:opacity-70 transition-opacity"
                      style={{ backgroundColor: tier.color }}
                    />
                  </div>
                  <h3
                    className="text-2xl font-bold mb-2"
                    style={{ color: tier.color }}
                  >
                    {tier.name}
                  </h3>
                  <div className="text-gray-400 text-sm">
                    <p className="font-semibold">${tier.min_spent.toLocaleString()}+</p>
                    {tier.max_spent && (
                      <p>to ${tier.max_spent.toLocaleString()}</p>
                    )}
                    {!tier.max_spent && <p>No limit</p>}
                  </div>
                </div>

                {tier.discount_percentage > 0 && (
                  <div className="text-center mb-4">
                    <div
                      className="inline-block px-4 py-2 rounded-lg font-bold text-lg"
                      style={{
                        backgroundColor: `${tier.color}20`,
                        color: tier.color,
                      }}
                    >
                      {tier.discount_percentage}% OFF
                    </div>
                  </div>
                )}

                <div className="space-y-3">
                  {Array.isArray(tier.benefits) && tier.benefits.map((benefit, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">{benefit}</span>
                    </div>
                  ))}
                </div>

                {tier.priority_booking && (
                  <div className="mt-4 pt-4 border-t border-yellow-900/30">
                    <div className="flex items-center gap-2 text-sm text-yellow-400 font-medium">
                      <Sparkles className="w-4 h-4" />
                      Priority Booking Access
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-gray-900 to-black border border-yellow-900/30 rounded-xl p-8">
            <h2 className="text-3xl font-bold mb-6 text-yellow-400 text-center">
              How Membership Works
            </h2>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl font-bold text-yellow-500">1</span>
                </div>
                <h3 className="font-bold mb-2 text-yellow-400">Play & Spend</h3>
                <p className="text-gray-400 text-sm">
                  Your total spending at Von Casino automatically tracks toward your tier
                </p>
              </div>
              <div>
                <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl font-bold text-yellow-500">2</span>
                </div>
                <h3 className="font-bold mb-2 text-yellow-400">Unlock Tiers</h3>
                <p className="text-gray-400 text-sm">
                  Reach spending thresholds to automatically upgrade to higher tiers
                </p>
              </div>
              <div>
                <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl font-bold text-yellow-500">3</span>
                </div>
                <h3 className="font-bold mb-2 text-yellow-400">Enjoy Benefits</h3>
                <p className="text-gray-400 text-sm">
                  Access exclusive perks, discounts, and VIP treatment immediately
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-400 mb-6">
            Ready to start your journey to Diamond status?
          </p>
          <button className="px-10 py-4 bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-black font-bold text-lg rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500/50">
            Join Von Casino Today
          </button>
        </div>
      </div>
    </div>
  );
}
