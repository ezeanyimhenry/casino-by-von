import { useEffect, useState } from 'react';
import { Calendar, MapPin, Users, Star } from 'lucide-react';
import { supabase, Event } from '../lib/supabase';

export function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'featured'>('all');

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('event_date', { ascending: true });

      if (error) throw error;
      setEvents(data || []);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredEvents = events.filter((event) => {
    const eventDate = new Date(event.event_date);
    const now = new Date();

    if (filter === 'upcoming') {
      return eventDate >= now;
    }
    if (filter === 'featured') {
      return event.is_featured;
    }
    return true;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
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
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-yellow-500 to-yellow-400 bg-clip-text text-transparent">
            Casino Events
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Exclusive tournaments, gala nights, and special celebrations
          </p>
        </div>

        <div className="flex justify-center gap-4 mb-12">
          {['all', 'upcoming', 'featured'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as typeof filter)}
              className={`px-6 py-2.5 rounded-lg font-medium transition-all duration-300 ${
                filter === f
                  ? 'bg-gradient-to-r from-yellow-600 to-yellow-500 text-black'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {filteredEvents.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-gray-400">No events found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event, index) => (
              <div
                key={event.id}
                className="group relative bg-gradient-to-br from-gray-900 to-black border border-yellow-900/30 rounded-xl overflow-hidden hover:border-yellow-500/50 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500/20"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                {event.is_featured && (
                  <div className="absolute top-4 right-4 z-10 bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                    <Star className="w-4 h-4" fill="currentColor" />
                    Featured
                  </div>
                )}

                <div className="relative h-48 overflow-hidden">
                  <img
                    src={event.image_url || 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg'}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-3 text-yellow-400">{event.title}</h3>
                  <p className="text-gray-400 mb-4 line-clamp-2">{event.description}</p>

                  <div className="space-y-2 text-sm text-gray-400">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-yellow-500" />
                      {formatDate(event.event_date)}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-yellow-500" />
                      {event.location}
                    </div>
                    {event.capacity && (
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-yellow-500" />
                        Capacity: {event.capacity}
                      </div>
                    )}
                  </div>

                  <button className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-black font-bold rounded-lg transition-all duration-300 transform hover:scale-105">
                    Register Interest
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
