import { useEffect, useState } from 'react';
import { Calendar, MapPin, Users, Star } from 'lucide-react';
import { eventsApi, Event } from '../lib/api';

export function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'featured'>('all');

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const data = await eventsApi.getAll();
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
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="w-16 h-16 border-t-2 border-b-2 border-yellow-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 text-white bg-black">
      <div className="container px-6 mx-auto">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-5xl font-bold text-transparent md:text-6xl bg-gradient-to-r from-yellow-500 to-yellow-400 bg-clip-text">
            Casino Events
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-gray-400">
            Exclusive tournaments, gala nights, and special celebrations
          </p>
        </div>

        <div className="flex justify-center gap-4 mb-12">
          {['all', 'upcoming', 'featured'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as typeof filter)}
              className={`px-6 py-2.5 rounded-lg font-medium transition-all duration-300 ${filter === f
                ? 'bg-gradient-to-r from-yellow-600 to-yellow-500 text-black'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {filteredEvents.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-xl text-gray-400">No events found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredEvents.map((event, index) => (
              <div
                key={event.id}
                className="relative overflow-hidden transition-all duration-500 transform border group bg-gradient-to-br from-gray-900 to-black border-yellow-900/30 rounded-xl hover:border-yellow-500/50 hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500/20"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                {event.is_featured && (
                  <div className="absolute z-10 flex items-center gap-1 px-3 py-1 text-sm font-bold text-black bg-yellow-500 rounded-full top-4 right-4">
                    <Star className="w-4 h-4" fill="currentColor" />
                    Featured
                  </div>
                )}

                <div className="relative h-48 overflow-hidden">
                  <img
                    src={event.image_url || 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg'}
                    alt={event.title}
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                </div>

                <div className="p-6">
                  <h3 className="mb-3 text-2xl font-bold text-yellow-400">{event.title}</h3>
                  <p className="mb-4 text-gray-400 line-clamp-2">{event.description}</p>

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

                  <button className="w-full px-6 py-3 mt-6 font-bold text-black transition-all duration-300 transform rounded-lg bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 hover:scale-105">
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
