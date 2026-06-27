import React, { useState, useEffect } from 'react';
import { loadState, saveState } from './dataStore';
import HomeView from './components/Client/HomeView';
import BookingForm from './components/Client/BookingForm';
import ClientAreaView from './components/Client/ClientAreaView';
import Dashboard from './components/Admin/Dashboard';
import BriefingView from './components/Admin/BriefingView';
import GuiaView from './components/Admin/GuiaView';
import { Compass, Users, LayoutDashboard, Calendar, ClipboardCheck } from 'lucide-react';

export default function App() {
  const [state, setState] = useState({
    faunaFlora: [],
    partners: [],
    bookings: []
  });

  // State-based Hash Router
  const [currentRoute, setCurrentRoute] = useState({
    view: 'home', // home, reserva, ficha, memorias, admin, briefing
    param: null
  });

  // Load state from localStorage on init
  useEffect(() => {
    const loaded = loadState();
    setState(loaded);
    saveState(loaded); // Save initially to ensure structure is written
  }, []);

  // Hash Routing Logic
  useEffect(() => {
    const parseHash = () => {
      const hash = window.location.hash || '#/home';
      const parts = hash.split('/');
      
      const view = parts[1] || 'home';
      const param = parts[2] || null;

      setCurrentRoute({ view, param });
    };

    // Parse on load and on change
    parseHash();
    window.addEventListener('hashchange', parseHash);
    
    return () => {
      window.removeEventListener('hashchange', parseHash);
    };
  }, []);

  const handleAddBooking = (newBooking) => {
    setState(prev => {
      const updated = {
        ...prev,
        bookings: [newBooking, ...prev.bookings]
      };
      saveState(updated);
      return updated;
    });
  };

  const handleUpdateBooking = (id, updatedBooking) => {
    setState(prev => {
      const updated = {
        ...prev,
        bookings: prev.bookings.map(b => b.id === id ? updatedBooking : b)
      };
      saveState(updated);
      return updated;
    });
  };

  const handleUpdatePartners = (updatedPartners) => {
    setState(prev => {
      const updated = {
        ...prev,
        partners: updatedPartners
      };
      saveState(updated);
      return updated;
    });
  };

  const renderView = () => {
    switch (currentRoute.view) {
      case 'home':
        return <HomeView />;
      case 'reserva':
        return <BookingForm onBookingSuccess={handleAddBooking} />;
      case 'cliente':
      case 'ficha':
      case 'memorias':
        return (
          <ClientAreaView 
            bookingId={currentRoute.param} 
            initialSection={currentRoute.view}
            getBooking={(idOrEmail) => {
              if (!idOrEmail) return undefined;
              const target = idOrEmail.toLowerCase().trim();
              return state.bookings.find(b => 
                b.id.toLowerCase() === target || 
                (b.email && b.email.toLowerCase().trim() === target)
              );
            }}
            updateBooking={handleUpdateBooking}
            faunaFlora={state.faunaFlora}
            partners={state.partners}
          />
        );
      case 'guia':
        return (
          <GuiaView 
            bookings={state.bookings}
            initialDate={currentRoute.param}
          />
        );
      case 'admin':
        if (currentRoute.param === 'briefing') {
          // Fallback route hash style #/admin/briefing/:id
          const parts = window.location.hash.split('/');
          const bId = parts[3] || null;
          return (
            <BriefingView 
              bookingId={bId}
              getBooking={(id) => state.bookings.find(b => b.id === id)}
            />
          );
        }
        return (
          <Dashboard 
            bookings={state.bookings} 
            partners={state.partners}
            addBooking={handleAddBooking}
            updateBooking={handleUpdateBooking}
            updatePartners={handleUpdatePartners}
          />
        );
      default:
        return <HomeView />;
    }
  };

  return (
    <>
      {/* Premium Header */}
      <header className="header">
        <div className="container header-container">
          <div className="logo">
            <Compass className="logo-monkey" size={28} />
            <div>
              <span className="logo-monkey">MONO</span>
              <span className="logo-tour">TOUR</span>
            </div>
          </div>

          <nav className="nav-links">
            <a 
              href="#/home" 
              className={`nav-link ${currentRoute.view === 'home' ? 'active' : ''}`}
            >
              Início
            </a>
            <a 
              href="#/reserva" 
              className={`nav-link ${currentRoute.view === 'reserva' ? 'active' : ''}`}
            >
              Fazer Reserva
            </a>
            <a 
              href="#/cliente" 
              className={`nav-link ${['cliente', 'ficha', 'memorias'].includes(currentRoute.view) ? 'active' : ''}`}
            >
              Área do Cliente
            </a>
            <a 
              href="#/admin" 
              className={`nav-link ${currentRoute.view === 'admin' ? 'active' : ''}`}
              style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              <LayoutDashboard size={16} /> Painel Admin
            </a>
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="main-content">
        <div className="container">
          {renderView()}
        </div>
      </main>

      {/* Premium Footer */}
      <footer className="footer">
        <div className="container">
          <p style={{ marginBottom: '8px' }}>
            © {new Date().getFullYear()} <strong>Agência Monotour Belém</strong>. Pará – Amazônia – Brasil.
          </p>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            Ecoturismo de propósito, sustentabilidade local e acessibilidade comunicacional.
          </p>
        </div>
      </footer>
    </>
  );
}
