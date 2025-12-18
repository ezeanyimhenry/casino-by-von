import { Sparkles, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-black to-gray-900 border-t border-yellow-900/30 text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-6 h-6 text-yellow-500" />
              <span className="text-xl font-bold bg-gradient-to-r from-yellow-500 to-yellow-400 bg-clip-text text-transparent">
                VON CASINO
              </span>
            </div>
            <p className="text-gray-400 text-sm">
              Where luxury meets fortune. Experience the ultimate in high-stakes gaming.
            </p>
          </div>

          <div>
            <h3 className="text-yellow-400 font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-yellow-400 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition-colors">Gaming Rules</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition-colors">Responsible Gaming</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-yellow-400 font-bold mb-4">Services</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-yellow-400 transition-colors">Table Booking</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition-colors">VIP Lounge</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition-colors">Dining</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition-colors">Accommodations</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-yellow-400 font-bold mb-4">Contact</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-yellow-500" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-yellow-500" />
                <span>info@voncasino.com</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-yellow-500" />
                <span>Las Vegas, NV</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-yellow-900/30 pt-8 text-center text-sm text-gray-500">
          <p>&copy; 2024 Von Casino. All rights reserved.</p>
          <p className="mt-2">Must be 21 or older. Gamble responsibly.</p>
        </div>
      </div>
    </footer>
  );
}
