import { useEffect, useState } from 'react';
import { Calendar, Clock, Users, Check } from 'lucide-react';
import { tablesApi, CasinoTable } from '../lib/api';

export function BookingPage() {
  const [tables, setTables] = useState<CasinoTable[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTable, setSelectedTable] = useState<CasinoTable | null>(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [numSeats, setNumSeats] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const [tableFilter, setTableFilter] = useState<string>('all');

  const timeSlots = [
    '10:00-12:00',
    '12:00-14:00',
    '14:00-16:00',
    '16:00-18:00',
    '18:00-20:00',
    '20:00-22:00',
    '22:00-00:00',
  ];

  useEffect(() => {
    fetchTables();
    setSelectedDate(new Date().toISOString().split('T')[0]);
  }, []);

  const fetchTables = async () => {
    try {
      const data = await tablesApi.getAll();

      setTables(data || []);
    } catch (error) {
      console.error('Error fetching tables:', error);
    } finally {
      setLoading(false);
    }
  };

  const tableTypes = ['all', ...Array.from(new Set(tables.map((t) => t.type)))];

  const filteredTables = tables.filter(
    (table) => tableFilter === 'all' || table.type === tableFilter
  );

  const handleBooking = () => {
    if (!selectedTable || !selectedDate || !selectedTimeSlot) {
      alert('Please select a table, date, and time slot');
      return;
    }

    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setSelectedTable(null);
      setSelectedTimeSlot('');
      setNumSeats(1);
    }, 3000);
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
            Book Your Table
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-gray-400">
            Reserve your spot at our premium gaming tables. All bookings are for 2-hour sessions.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {tableTypes.map((type) => (
            <button
              key={type}
              onClick={() => setTableFilter(type)}
              className={`px-6 py-2.5 rounded-lg font-medium capitalize transition-all duration-300 ${tableFilter === type
                ? 'bg-gradient-to-r from-yellow-600 to-yellow-500 text-black'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
            >
              {type}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {filteredTables.map((table) => (
                <div
                  key={table.id}
                  onClick={() => setSelectedTable(table)}
                  className={`group cursor-pointer bg-gradient-to-br from-gray-900 to-black border rounded-xl overflow-hidden transition-all duration-300 transform hover:scale-105 ${selectedTable?.id === table.id
                    ? 'border-yellow-500 shadow-2xl shadow-yellow-500/20'
                    : 'border-yellow-900/30 hover:border-yellow-500/50'
                    }`}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={table.image_url || 'https://images.pexels.com/photos/5922287/pexels-photo-5922287.jpeg'}
                      alt={table.name}
                      className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                    {selectedTable?.id === table.id && (
                      <div className="absolute p-2 text-black bg-yellow-500 rounded-full top-4 right-4">
                        <Check className="w-5 h-5" />
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold text-yellow-400">{table.name}</h3>
                      <span className="px-3 py-1 text-sm font-medium text-yellow-400 capitalize rounded-full bg-yellow-500/20">
                        {table.type}
                      </span>
                    </div>
                    <p className="mb-3 text-sm text-gray-400">{table.description}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Users className="w-4 h-4 text-yellow-500" />
                      Max {table.max_seats} seats
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky p-6 border top-32 bg-gradient-to-br from-gray-900 to-black border-yellow-900/30 rounded-xl">
              <h2 className="mb-6 text-2xl font-bold text-yellow-400">Booking Details</h2>

              {selectedTable ? (
                <div className="space-y-6">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-400">
                      Selected Table
                    </label>
                    <div className="px-4 py-3 border rounded-lg bg-yellow-500/10 border-yellow-500/30">
                      <p className="font-bold text-yellow-400">{selectedTable.name}</p>
                      <p className="text-sm text-gray-400 capitalize">{selectedTable.type}</p>
                    </div>
                  </div>

                  <div>
                    <label className="flex items-center block gap-2 mb-2 text-sm font-medium text-gray-400">
                      <Calendar className="w-4 h-4" />
                      Date
                    </label>
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-3 text-white bg-gray-800 border border-gray-700 rounded-lg focus:border-yellow-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="flex items-center block gap-2 mb-2 text-sm font-medium text-gray-400">
                      <Clock className="w-4 h-4" />
                      Time Slot (2 hours)
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {timeSlots.map((slot) => (
                        <button
                          key={slot}
                          onClick={() => setSelectedTimeSlot(slot)}
                          className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${selectedTimeSlot === slot
                            ? 'bg-yellow-500 text-black'
                            : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                            }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="flex items-center block gap-2 mb-2 text-sm font-medium text-gray-400">
                      <Users className="w-4 h-4" />
                      Number of Seats
                    </label>
                    <input
                      type="number"
                      value={numSeats}
                      onChange={(e) =>
                        setNumSeats(Math.min(selectedTable.max_seats, Math.max(1, parseInt(e.target.value) || 1)))
                      }
                      min="1"
                      max={selectedTable.max_seats}
                      className="w-full px-4 py-3 text-white bg-gray-800 border border-gray-700 rounded-lg focus:border-yellow-500 focus:outline-none"
                    />
                    <p className="mt-1 text-xs text-gray-500">Max: {selectedTable.max_seats} seats</p>
                  </div>

                  <button
                    onClick={handleBooking}
                    disabled={!selectedTimeSlot}
                    className="w-full px-6 py-4 font-bold text-black transition-all duration-300 transform rounded-lg bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 disabled:from-gray-700 disabled:to-gray-600 disabled:cursor-not-allowed hover:scale-105 disabled:transform-none"
                  >
                    Confirm Booking
                  </button>
                </div>
              ) : (
                <div className="py-12 text-center">
                  <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-600" />
                  <p className="text-gray-400">Select a table to begin booking</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-6 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md p-8 text-center transform border border-yellow-500 bg-gradient-to-br from-gray-900 to-black rounded-2xl animate-pulse">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-yellow-500 rounded-full">
              <Check className="w-10 h-10 text-black" />
            </div>
            <h3 className="mb-2 text-2xl font-bold text-yellow-400">Booking Confirmed!</h3>
            <p className="text-gray-400">Your table has been successfully reserved.</p>
          </div>
        </div>
      )}
    </div>
  );
}
