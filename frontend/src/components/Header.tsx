import { Sparkles } from 'lucide-react';
import { useNavigation } from '../contexts/NavigationContext';

export function Header() {
  const { currentPage, navigate } = useNavigation();

  const navItems = [
    { id: 'home' as const, label: 'Home' },
    { id: 'events' as const, label: 'Events' },
    { id: 'booking' as const, label: 'Book a Table' },
    { id: 'membership' as const, label: 'Membership' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-lg border-b border-yellow-900/30">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <button
            onClick={() => navigate('home')}
            className="flex items-center gap-3 group"
          >
            <div className="relative">
              <Sparkles className="w-8 h-8 text-yellow-500 group-hover:text-yellow-400 transition-colors" />
              <div className="absolute inset-0 blur-lg bg-yellow-500/30 group-hover:bg-yellow-400/40 transition-all" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-500 bg-clip-text text-transparent">
              VON CASINO
            </span>
          </button>

          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => navigate(item.id)}
                className={`relative py-2 font-medium transition-all duration-300 ${
                  currentPage === item.id
                    ? 'text-yellow-500'
                    : 'text-gray-300 hover:text-yellow-400'
                }`}
              >
                {item.label}
                {currentPage === item.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-yellow-500 to-transparent animate-pulse" />
                )}
              </button>
            ))}
          </nav>

          <button className="hidden md:block px-6 py-2.5 bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-black font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-yellow-500/50">
            Sign In
          </button>

          <button className="md:hidden text-yellow-500">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
