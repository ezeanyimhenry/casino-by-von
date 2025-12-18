import { NavigationProvider, useNavigation } from './contexts/NavigationContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { EventsPage } from './pages/EventsPage';
import { BookingPage } from './pages/BookingPage';
import { MembershipPage } from './pages/MembershipPage';

function AppContent() {
  const { currentPage } = useNavigation();

  return (
    <>
      <Header />
      {currentPage === 'home' && <HomePage />}
      {currentPage === 'events' && <EventsPage />}
      {currentPage === 'booking' && <BookingPage />}
      {currentPage === 'membership' && <MembershipPage />}
      <Footer />
    </>
  );
}

function App() {
  return (
    <NavigationProvider>
      <AppContent />
    </NavigationProvider>
  );
}

export default App;
