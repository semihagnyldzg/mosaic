import React, { useState } from 'react';

const TICKET_TYPES = [
  { id: 'general', name: 'General Admission', price: 15, desc: 'Full access to all physical exhibit halls and public demonstration zones.' },
  { id: 'afterschool', name: 'After-School Science Lab', price: 45, desc: '2-hour guided laboratory session on electronics, chemistry, or robotics.' },
  { id: 'camp', name: 'STEAM Summer Camp Week', price: 185, desc: '5-day intensive exploration camp covering rocketry, astrophysics, and bio-coding.' }
];

export default function Booking() {
  const [ticketType, setTicketType] = useState('general');
  const [quantity, setQuantity] = useState(1);
  const [selectedDay, setSelectedDay] = useState(15); // Default day
  const [bookedState, setBookedState] = useState(false);

  const selectedTicket = TICKET_TYPES.find(t => t.id === ticketType);
  const totalPrice = selectedTicket.price * quantity;

  // Simple August calendar builder
  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);

  const handleBooking = (e) => {
    e.preventDefault();
    setBookedState(true);
  };

  const resetBooking = () => {
    setBookedState(false);
    setQuantity(1);
    setSelectedDay(15);
  };

  return (
    <section id="booking" style={{ padding: '100px 0', position: 'relative' }}>
      {/* Glow */}
      <div style={{
        position: 'absolute',
        bottom: '10%',
        left: '5%',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(236, 72, 153, 0.08) 0%, transparent 70%)',
        filter: 'blur(30px)',
        zIndex: -1
      }}></div>

      <div className="container">
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h2 style={{ marginBottom: '16px' }}>Book Workshops & Admission Tickets</h2>
          <p style={{ maxWidth: '600px', margin: '0 auto' }}>
            Select your curriculum track, coordinate your dates, and secure enrollment instantly.
          </p>
        </div>

        <form onSubmit={handleBooking} className="glass-panel booking-grid" style={{
          padding: '40px',
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '32px',
          borderRadius: '24px',
          maxWidth: '960px',
          margin: '0 auto',
          textAlign: 'left'
        }}>
          
          {/* Left Panel: Ticket Select & Count */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* Ticket Choices */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>1. SELECT EVENT TYPE</span>
              
              {TICKET_TYPES.map((ticket) => (
                <label
                  key={ticket.id}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '16px',
                    borderRadius: '12px',
                    border: '1px solid',
                    borderColor: ticketType === ticket.id ? 'var(--primary-light)' : 'rgba(255, 255, 255, 0.06)',
                    background: ticketType === ticket.id ? 'rgba(139, 92, 246, 0.08)' : 'rgba(255,255,255,0.01)',
                    cursor: 'pointer',
                    transition: 'all var(--transition-fast)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <input
                        type="radio"
                        name="ticketType"
                        value={ticket.id}
                        checked={ticketType === ticket.id}
                        onChange={() => setTicketType(ticket.id)}
                        style={{ accentColor: 'var(--primary)' }}
                      />
                      <span style={{ fontWeight: 700, color: '#fff' }}>{ticket.name}</span>
                    </div>
                    <span style={{ fontWeight: 800, color: 'var(--secondary)' }}>${ticket.price}</span>
                  </div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginLeft: '22px' }}>{ticket.desc}</p>
                </label>
              ))}
            </div>

            {/* Ticket Quantity */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>2. QUANTITY</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  style={{ width: '40px', height: '40px', padding: 0, borderRadius: '8px', fontSize: '1.2rem' }}
                >
                  -
                </button>
                <span style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', width: '32px', textAlign: 'center' }}>{quantity}</span>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setQuantity(Math.min(10, quantity + 1))}
                  style={{ width: '40px', height: '40px', padding: 0, borderRadius: '8px', fontSize: '1.2rem' }}
                >
                  +
                </button>
              </div>
            </div>

          </div>

          {/* Right Panel: Calendar & Checkout Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* Calendar */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>3. CHOOSE DATE (August 2026)</span>
              
              <div style={{
                background: 'rgba(0,0,0,0.15)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '12px',
                padding: '16px'
              }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '6px', textAlign: 'center', marginBottom: '8px', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>
                  {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => <div key={d}>{d}</div>)}
                </div>
                
                {/* 31 days grid starting on Saturday (so 5 empty slots) */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '6px' }}>
                  {Array.from({ length: 5 }).map((_, idx) => <div key={`empty-${idx}`}></div>)}
                  {daysInMonth.map((day) => (
                    <button
                      key={day}
                      type="button"
                      onClick={() => setSelectedDay(day)}
                      style={{
                        padding: '6px 0',
                        background: selectedDay === day ? 'var(--secondary)' : 'transparent',
                        border: 'none',
                        borderRadius: '6px',
                        color: selectedDay === day ? '#fff' : 'var(--text-primary)',
                        fontSize: '0.85rem',
                        fontWeight: selectedDay === day ? 700 : 500,
                        cursor: 'pointer',
                        transition: 'background 0.2s'
                      }}
                      onMouseEnter={(e) => { if (selectedDay !== day) e.target.style.background = 'rgba(255,255,255,0.05)'; }}
                      onMouseLeave={(e) => { if (selectedDay !== day) e.target.style.background = 'transparent'; }}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Total Box */}
            <div style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '12px',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              marginTop: 'auto'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Selected Track:</span>
                <span style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fff' }}>{selectedTicket.name}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Date:</span>
                <span style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--secondary-light)' }}>August {selectedDay}, 2026</span>
              </div>
              <div style={{ height: '1px', background: 'rgba(255,255,255,0.08)', margin: '4px 0' }}></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff' }}>Total Price:</span>
                <span style={{ fontSize: '1.6rem', fontWeight: 900, color: 'var(--accent-light)' }}>${totalPrice}</span>
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '14px', marginTop: '8px' }}>
                Secure Admission Tickets 🎟️
              </button>
            </div>

          </div>

        </form>
      </div>

      {/* Booking Success Modal */}
      {bookedState && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.7)',
          backdropFilter: 'blur(8px)',
          zIndex: 200,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '24px'
        }}>
          <div className="glass-panel booking-grid" style={{
            padding: '40px',
            maxWidth: '480px',
            width: '100%',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px',
            borderRadius: '24px',
            boxShadow: '0 0 50px rgba(139, 92, 246, 0.25)'
          }}>
            {/* Glowing success circle */}
            <div style={{
              width: '72px',
              height: '72px',
              borderRadius: '50%',
              background: 'rgba(16, 185, 129, 0.1)',
              border: '2px solid var(--success)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '2.2rem',
              boxShadow: '0 0 20px rgba(16, 185, 129, 0.3)'
            }}>
              ✓
            </div>

            <h3 style={{ fontSize: '1.8rem', color: '#fff', margin: 0 }}>Enrollment Confirmed!</h3>
            
            <div style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px dashed rgba(255,255,255,0.1)',
              padding: '12px 24px',
              borderRadius: '8px',
              fontFamily: 'monospace',
              fontSize: '1rem',
              color: 'var(--secondary-light)'
            }}>
              REF: LAB-{Math.floor(100000 + Math.random() * 900000)}
            </div>

            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: 0 }}>
              Your reservation for **{selectedTicket.name} ({quantity} ticket{quantity > 1 ? 's' : ''})** on **August {selectedDay}, 2026** is successful. We have emailed your digital entry pass and preparation guidelines.
            </p>

            <button onClick={resetBooking} className="btn btn-primary" style={{ width: '100%', padding: '12px' }}>
              Awesome!
            </button>
          </div>
        </div>
      )}

      <style>{`
        .booking-grid {
          grid-template-columns: 1fr;
        }
        @media (min-width: 768px) {
          .booking-grid {
            grid-template-columns: 1.1fr 0.9fr !important;
          }
        }
      `}</style>
    </section>
  );
}
