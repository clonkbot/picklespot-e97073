import React, { useState, useEffect } from 'react'

interface TimeSlot {
  time: string
  available: boolean
  price: number
  court: string
}

interface Venue {
  id: string
  name: string
  address: string
  distance: number
  rating: number
  reviewCount: number
  image: string
  amenities: string[]
  courts: number
  priceRange: string
  slots: TimeSlot[]
}

const mockVenues: Venue[] = [
  {
    id: '1',
    name: 'Ace Pickleball Club',
    address: '1234 Court Street, Downtown',
    distance: 0.8,
    rating: 4.9,
    reviewCount: 247,
    image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=600&h=400&fit=crop',
    amenities: ['Pro Shop', 'Lessons', 'Locker Rooms', 'Cafe'],
    courts: 8,
    priceRange: '$25-40/hr',
    slots: [
      { time: '9:00 AM', available: true, price: 25, court: 'Court 1' },
      { time: '10:00 AM', available: true, price: 25, court: 'Court 2' },
      { time: '11:00 AM', available: false, price: 30, court: 'Court 1' },
      { time: '12:00 PM', available: true, price: 35, court: 'Court 3' },
      { time: '1:00 PM', available: true, price: 35, court: 'Court 1' },
      { time: '2:00 PM', available: false, price: 35, court: 'Court 2' },
      { time: '3:00 PM', available: true, price: 30, court: 'Court 4' },
      { time: '4:00 PM', available: true, price: 40, court: 'Court 1' },
    ]
  },
  {
    id: '2',
    name: 'The Pickle Barn',
    address: '567 Athletic Way, Midtown',
    distance: 1.2,
    rating: 4.7,
    reviewCount: 183,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop',
    amenities: ['Equipment Rental', 'Open Play', 'Tournaments'],
    courts: 6,
    priceRange: '$20-35/hr',
    slots: [
      { time: '9:00 AM', available: false, price: 20, court: 'Court A' },
      { time: '10:00 AM', available: true, price: 20, court: 'Court B' },
      { time: '11:00 AM', available: true, price: 25, court: 'Court A' },
      { time: '12:00 PM', available: true, price: 30, court: 'Court C' },
      { time: '1:00 PM', available: false, price: 30, court: 'Court A' },
      { time: '2:00 PM', available: true, price: 30, court: 'Court B' },
      { time: '3:00 PM', available: true, price: 25, court: 'Court D' },
      { time: '4:00 PM', available: false, price: 35, court: 'Court A' },
    ]
  },
  {
    id: '3',
    name: 'Rally Point Indoor',
    address: '890 Sports Complex Blvd',
    distance: 2.4,
    rating: 4.8,
    reviewCount: 312,
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&h=400&fit=crop',
    amenities: ['Climate Controlled', 'Ball Machine', 'Video Analysis', 'Fitness Center'],
    courts: 12,
    priceRange: '$30-50/hr',
    slots: [
      { time: '9:00 AM', available: true, price: 30, court: 'Premium 1' },
      { time: '10:00 AM', available: true, price: 30, court: 'Premium 2' },
      { time: '11:00 AM', available: true, price: 35, court: 'Standard 1' },
      { time: '12:00 PM', available: false, price: 40, court: 'Premium 1' },
      { time: '1:00 PM', available: true, price: 40, court: 'Standard 2' },
      { time: '2:00 PM', available: true, price: 40, court: 'Premium 3' },
      { time: '3:00 PM', available: false, price: 35, court: 'Standard 1' },
      { time: '4:00 PM', available: true, price: 50, court: 'Premium 1' },
    ]
  },
  {
    id: '4',
    name: 'Dink Dynasty',
    address: '2100 Paddle Lane, Westside',
    distance: 3.1,
    rating: 4.6,
    reviewCount: 156,
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=400&fit=crop',
    amenities: ['Beginner Friendly', 'Group Classes', 'Social Events'],
    courts: 4,
    priceRange: '$18-28/hr',
    slots: [
      { time: '9:00 AM', available: true, price: 18, court: 'Court 1' },
      { time: '10:00 AM', available: false, price: 18, court: 'Court 2' },
      { time: '11:00 AM', available: true, price: 22, court: 'Court 1' },
      { time: '12:00 PM', available: true, price: 25, court: 'Court 3' },
      { time: '1:00 PM', available: true, price: 25, court: 'Court 1' },
      { time: '2:00 PM', available: true, price: 25, court: 'Court 2' },
      { time: '3:00 PM', available: false, price: 22, court: 'Court 4' },
      { time: '4:00 PM', available: true, price: 28, court: 'Court 1' },
    ]
  },
  {
    id: '5',
    name: 'Kitchen Rules Club',
    address: '455 Net Drive, Eastside',
    distance: 4.7,
    rating: 4.9,
    reviewCount: 289,
    image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=600&h=400&fit=crop',
    amenities: ['Olympic Courts', 'Sauna', 'Massage', 'Restaurant'],
    courts: 10,
    priceRange: '$35-60/hr',
    slots: [
      { time: '9:00 AM', available: true, price: 35, court: 'Championship 1' },
      { time: '10:00 AM', available: false, price: 35, court: 'Championship 2' },
      { time: '11:00 AM', available: true, price: 40, court: 'Standard 1' },
      { time: '12:00 PM', available: true, price: 50, court: 'Championship 1' },
      { time: '1:00 PM', available: false, price: 50, court: 'Standard 2' },
      { time: '2:00 PM', available: true, price: 50, court: 'Championship 3' },
      { time: '3:00 PM', available: true, price: 40, court: 'Standard 1' },
      { time: '4:00 PM', available: true, price: 60, court: 'Championship 1' },
    ]
  }
]

const generateWeekDates = () => {
  const dates = []
  const today = new Date()
  for (let i = 0; i < 7; i++) {
    const date = new Date(today)
    date.setDate(today.getDate() + i)
    dates.push({
      day: date.toLocaleDateString('en-US', { weekday: 'short' }),
      date: date.getDate(),
      full: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    })
  }
  return dates
}

function App() {
  const [selectedDate, setSelectedDate] = useState(0)
  const [radiusFilter, setRadiusFilter] = useState(10)
  const [priceFilter, setPriceFilter] = useState<[number, number]>([0, 100])
  const [timeFilter, setTimeFilter] = useState('all')
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null)
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null)
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [bookingConfirmed, setBookingConfirmed] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const weekDates = generateWeekDates()

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 800)
  }, [])

  const filteredVenues = mockVenues.filter(venue => {
    const inRadius = venue.distance <= radiusFilter
    const minPrice = parseInt(venue.priceRange.split('-')[0].replace('$', ''))
    const inPriceRange = minPrice >= priceFilter[0] && minPrice <= priceFilter[1]
    return inRadius && inPriceRange
  }).sort((a, b) => a.distance - b.distance)

  const handleBooking = () => {
    setBookingConfirmed(true)
    setTimeout(() => {
      setShowBookingModal(false)
      setBookingConfirmed(false)
      setSelectedVenue(null)
      setSelectedSlot(null)
    }, 2500)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center court-pattern">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-lime animate-pulse-glow mx-auto mb-4 flex items-center justify-center">
            <span className="text-2xl">🏓</span>
          </div>
          <p className="text-lime font-display text-2xl tracking-wider">LOADING COURTS...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen court-pattern">
      {/* Header */}
      <header className="glass sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <div className="flex items-center gap-2 sm:gap-3 animate-slide-up stagger-1">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl gradient-lime flex items-center justify-center">
                <span className="text-xl sm:text-2xl">🏓</span>
              </div>
              <div>
                <h1 className="font-display text-2xl sm:text-3xl tracking-wider text-lime">PICKLESPOT</h1>
                <p className="text-[10px] sm:text-xs text-white/50 tracking-widest">BOOK COURTS INSTANTLY</p>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-4 animate-slide-up stagger-2">
              <button className="hidden sm:block px-4 py-2 text-sm text-white/70 hover:text-lime transition-colors">
                My Bookings
              </button>
              <button className="gradient-lime text-black px-3 sm:px-6 py-2 sm:py-2.5 rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity">
                Sign In
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-10 sm:py-16 lg:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0e17] via-[#0f172a] to-[#0a0e17]"></div>
        <div className="absolute top-20 right-0 w-96 h-96 bg-lime/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white tracking-tight animate-slide-up stagger-1">
              FIND YOUR <span className="text-lime">COURT</span>
            </h2>
            <p className="mt-4 sm:mt-6 text-base sm:text-lg text-white/60 animate-slide-up stagger-2">
              One search. Every indoor pickleball court near you.
              <br className="hidden sm:block" />
              Book instantly, play sooner.
            </p>
          </div>

          {/* Location Search */}
          <div className="mt-8 sm:mt-12 glass rounded-2xl p-4 sm:p-6 lg:p-8 animate-slide-up stagger-3">
            <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
              <div className="flex-1">
                <label className="text-xs text-white/50 uppercase tracking-wider mb-2 block">Location</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Enter your address or zip code"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 sm:px-5 py-3 sm:py-4 text-white placeholder-white/30 focus:outline-none focus:border-lime/50 transition-colors"
                    defaultValue="Downtown, City Center"
                  />
                  <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-lime" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
              </div>
              
              <div className="w-full lg:w-48">
                <label className="text-xs text-white/50 uppercase tracking-wider mb-2 block">Radius: {radiusFilter} mi</label>
                <input
                  type="range"
                  min="1"
                  max="25"
                  value={radiusFilter}
                  onChange={(e) => setRadiusFilter(parseInt(e.target.value))}
                  className="w-full mt-4 sm:mt-5"
                />
              </div>

              <div className="w-full lg:w-48">
                <label className="text-xs text-white/50 uppercase tracking-wider mb-2 block">Time of Day</label>
                <select
                  value={timeFilter}
                  onChange={(e) => setTimeFilter(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 sm:px-5 py-3 sm:py-4 text-white focus:outline-none focus:border-lime/50 transition-colors appearance-none cursor-pointer"
                >
                  <option value="all">All Times</option>
                  <option value="morning">Morning (6-12)</option>
                  <option value="afternoon">Afternoon (12-5)</option>
                  <option value="evening">Evening (5-10)</option>
                </select>
              </div>
            </div>

            {/* Date Picker */}
            <div className="mt-6 sm:mt-8">
              <label className="text-xs text-white/50 uppercase tracking-wider mb-3 block">Select Date</label>
              <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2 -mx-2 px-2 scrollbar-hide">
                {weekDates.map((date, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedDate(index)}
                    className={`flex-shrink-0 flex flex-col items-center px-4 sm:px-6 py-3 sm:py-4 rounded-xl transition-all duration-300 ${
                      selectedDate === index
                        ? 'gradient-lime text-black'
                        : 'bg-white/5 hover:bg-white/10 text-white/70'
                    }`}
                  >
                    <span className="text-xs font-medium uppercase">{date.day}</span>
                    <span className="text-xl sm:text-2xl font-display mt-1">{date.date}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Venues List */}
      <section className="py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
            <div>
              <h3 className="font-display text-2xl sm:text-3xl text-white">AVAILABLE COURTS</h3>
              <p className="text-white/50 text-sm mt-1">{filteredVenues.length} venues within {radiusFilter} miles</p>
            </div>
            <div className="flex gap-2 sm:gap-3">
              <button className="px-3 sm:px-4 py-2 rounded-lg bg-lime/10 text-lime text-sm font-medium border border-lime/20">
                By Distance
              </button>
              <button className="px-3 sm:px-4 py-2 rounded-lg bg-white/5 text-white/50 text-sm hover:bg-white/10 transition-colors">
                By Price
              </button>
              <button className="px-3 sm:px-4 py-2 rounded-lg bg-white/5 text-white/50 text-sm hover:bg-white/10 transition-colors">
                By Rating
              </button>
            </div>
          </div>

          <div className="space-y-4 sm:space-y-6">
            {filteredVenues.map((venue, index) => (
              <div
                key={venue.id}
                className="venue-card glass rounded-2xl overflow-hidden animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex flex-col lg:flex-row">
                  {/* Venue Image */}
                  <div className="lg:w-72 h-48 lg:h-auto relative">
                    <img
                      src={venue.image}
                      alt={venue.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#0a0e17] via-transparent to-transparent"></div>
                    <div className="absolute bottom-3 left-3 flex items-center gap-2">
                      <span className="bg-lime text-black px-2 py-1 rounded-lg text-xs font-bold">
                        {venue.distance} mi
                      </span>
                    </div>
                  </div>

                  {/* Venue Info */}
                  <div className="flex-1 p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4">
                      <div>
                        <h4 className="font-display text-xl sm:text-2xl text-white">{venue.name}</h4>
                        <p className="text-white/50 text-sm mt-1 flex items-center gap-2">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          </svg>
                          {venue.address}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span className="font-semibold text-white">{venue.rating}</span>
                          <span className="text-white/40 text-sm">({venue.reviewCount})</span>
                        </div>
                        <span className="text-lime font-semibold">{venue.priceRange}</span>
                      </div>
                    </div>

                    {/* Amenities */}
                    <div className="flex flex-wrap gap-2 mt-4">
                      {venue.amenities.map((amenity, i) => (
                        <span key={i} className="px-2 sm:px-3 py-1 bg-white/5 rounded-full text-xs text-white/60">
                          {amenity}
                        </span>
                      ))}
                      <span className="px-2 sm:px-3 py-1 bg-blue-500/20 rounded-full text-xs text-blue-400">
                        {venue.courts} courts
                      </span>
                    </div>

                    {/* Time Slots */}
                    <div className="mt-4 sm:mt-6">
                      <p className="text-xs text-white/50 uppercase tracking-wider mb-3">Available for {weekDates[selectedDate].full}</p>
                      <div className="flex flex-wrap gap-2">
                        {venue.slots.map((slot, i) => (
                          <button
                            key={i}
                            onClick={() => {
                              if (slot.available) {
                                setSelectedVenue(venue)
                                setSelectedSlot(slot)
                                setShowBookingModal(true)
                              }
                            }}
                            className={`time-slot px-3 sm:px-4 py-2 rounded-lg border text-sm font-medium ${
                              slot.available
                                ? 'border-white/20 hover:border-lime bg-white/5'
                                : 'booked border-white/10 bg-white/5'
                            }`}
                          >
                            <span className="block">{slot.time}</span>
                            <span className={`text-xs ${slot.available ? 'text-lime' : 'text-white/30'}`}>
                              ${slot.price}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Court Mini Preview */}
                  <div className="hidden xl:flex flex-col items-center justify-center p-6 border-l border-white/10">
                    <div className="court-mini w-24 h-32 rounded-lg"></div>
                    <p className="text-xs text-white/40 mt-2">{venue.courts} Available</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredVenues.length === 0 && (
            <div className="text-center py-16">
              <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl opacity-50">🏓</span>
              </div>
              <h4 className="font-display text-2xl text-white/50">NO COURTS FOUND</h4>
              <p className="text-white/30 mt-2">Try expanding your search radius or adjusting filters</p>
            </div>
          )}
        </div>
      </section>

      {/* Booking Modal */}
      {showBookingModal && selectedVenue && selectedSlot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => !bookingConfirmed && setShowBookingModal(false)}
          ></div>
          
          <div className="relative glass rounded-2xl w-full max-w-lg p-6 sm:p-8 animate-slide-up">
            {!bookingConfirmed ? (
              <>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-display text-2xl sm:text-3xl text-white">CONFIRM BOOKING</h3>
                  <button
                    onClick={() => setShowBookingModal(false)}
                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="bg-white/5 rounded-xl p-4">
                    <p className="text-white/50 text-xs uppercase tracking-wider">Venue</p>
                    <p className="text-white font-semibold mt-1">{selectedVenue.name}</p>
                    <p className="text-white/50 text-sm">{selectedVenue.address}</p>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-white/5 rounded-xl p-4">
                      <p className="text-white/50 text-xs uppercase tracking-wider">Date</p>
                      <p className="text-white font-semibold mt-1">{weekDates[selectedDate].full}</p>
                    </div>
                    <div className="bg-white/5 rounded-xl p-4">
                      <p className="text-white/50 text-xs uppercase tracking-wider">Time</p>
                      <p className="text-white font-semibold mt-1">{selectedSlot.time}</p>
                    </div>
                    <div className="bg-white/5 rounded-xl p-4">
                      <p className="text-white/50 text-xs uppercase tracking-wider">Court</p>
                      <p className="text-white font-semibold mt-1">{selectedSlot.court}</p>
                    </div>
                  </div>

                  <div className="border-t border-white/10 pt-4 mt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-white/50">Court Rental (1 hour)</span>
                      <span className="text-white">${selectedSlot.price}.00</span>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-white/50">Service Fee</span>
                      <span className="text-white">$2.00</span>
                    </div>
                    <div className="flex justify-between items-center mt-4 pt-4 border-t border-white/10">
                      <span className="text-white font-semibold">Total</span>
                      <span className="text-lime font-display text-2xl">${selectedSlot.price + 2}.00</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleBooking}
                  className="w-full gradient-lime text-black font-semibold py-4 rounded-xl mt-6 hover:opacity-90 transition-opacity"
                >
                  Confirm & Pay ${selectedSlot.price + 2}.00
                </button>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="w-20 h-20 rounded-full gradient-lime flex items-center justify-center mx-auto mb-6 animate-pulse-glow">
                  <svg className="w-10 h-10 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-display text-3xl text-white">BOOKING CONFIRMED!</h3>
                <p className="text-white/50 mt-2">Check your email for details</p>
                <div className="mt-6 bg-white/5 rounded-xl p-4">
                  <p className="text-lime font-semibold">{selectedVenue.name}</p>
                  <p className="text-white/70">{weekDates[selectedDate].full} at {selectedSlot.time}</p>
                  <p className="text-white/50 text-sm">{selectedSlot.court}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="py-8 sm:py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg gradient-lime flex items-center justify-center">
                <span className="text-sm">🏓</span>
              </div>
              <span className="font-display text-xl text-white/50">PICKLESPOT</span>
            </div>
            <div className="flex gap-6 text-sm text-white/30">
              <a href="#" className="hover:text-lime transition-colors">About</a>
              <a href="#" className="hover:text-lime transition-colors">For Venues</a>
              <a href="#" className="hover:text-lime transition-colors">Help</a>
              <a href="#" className="hover:text-lime transition-colors">Privacy</a>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-white/5 text-center">
            <p className="text-white/20 text-xs">
              Requested by @humanbeingET · Built by @clonkbot
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App