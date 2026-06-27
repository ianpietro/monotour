import React, { useState, useEffect } from 'react';
import { 
  Compass, 
  Sparkles, 
  ClipboardCheck, 
  ArrowLeft, 
  Clock, 
  Calendar, 
  ShieldCheck, 
  Lock, 
  CheckCircle, 
  AlertCircle,
  LogOut
} from 'lucide-react';
import { formatDateSafely, isMemoriesReleased, getReleaseHour } from '../../dataStore';
import TravelForm from './TravelForm';
import MemoriesView from './MemoriesView';

export default function ClientAreaView({ bookingId, initialSection, getBooking, updateBooking, faunaFlora, partners }) {
  const [booking, setBooking] = useState(null);
  const [searchId, setSearchId] = useState(bookingId || '');
  const [activeSection, setActiveSection] = useState('dashboard'); // 'dashboard', 'ficha', 'memorias'
  const [showLockedMessage, setShowLockedMessage] = useState(false);

  // Helper to extract first name
  const getFirstName = (fullName) => {
    if (!fullName) return '';
    return fullName.trim().split(/\s+/)[0];
  };

  // Sync booking when URL param changes or on mount
  useEffect(() => {
    if (bookingId) {
      const b = getBooking(bookingId);
      if (b) {
        setBooking(b);
        setSearchId(bookingId);
        
        // Route to the requested section if specified in url
        if (initialSection === 'ficha') {
          setActiveSection('ficha');
          setShowLockedMessage(false);
        } else if (initialSection === 'memorias') {
          if (isMemoriesReleased(b.date)) {
            setActiveSection('memorias');
            setShowLockedMessage(false);
          } else {
            setActiveSection('dashboard');
            setShowLockedMessage(true);
          }
        } else {
          setActiveSection('dashboard');
          setShowLockedMessage(false);
        }
      } else {
        setBooking(null);
      }
    } else {
      setBooking(null);
    }
  }, [bookingId, getBooking, initialSection]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchId) return;
    window.location.hash = `#/cliente/${searchId.toLowerCase().trim()}`;
  };

  const handleLogout = () => {
    setBooking(null);
    setSearchId('');
    setActiveSection('dashboard');
    setShowLockedMessage(false);
    window.location.hash = '#/cliente';
  };

  const handleUpdateBookingLocal = (id, updatedBooking) => {
    // Call parent updater
    updateBooking(id, updatedBooking);
    // Sync local state
    setBooking(updatedBooking);
  };

  // If not logged in / booking not found
  if (!booking) {
    return (
      <div style={{ maxWidth: '500px', margin: '40px auto', padding: '20px' }}>
        <div className="glass-card" style={{ padding: '40px 30px', textAlign: 'center' }}>
          <div 
            style={{ 
              display: 'inline-grid', 
              placeContent: 'center', 
              background: 'rgba(27, 94, 32, 0.08)', 
              color: 'var(--primary)', 
              width: '70px', 
              height: '70px', 
              borderRadius: '50%', 
              marginBottom: '24px' 
            }}
          >
            <Compass size={36} className="logo-monkey" />
          </div>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '12px', color: 'var(--text-h)', fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}>
            Área do Cliente
          </h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '30px', fontSize: '0.92rem', lineHeight: '1.6' }}>
            Acesse o portal para preencher sua Ficha de Segurança e Alimentação ou para visualizar as Recordações e o Roteiro Vivo do seu passeio.
          </p>
          <form onSubmit={handleSearch} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <input 
              type="email" 
              className="form-control" 
              placeholder="Ex: seu-email@exemplo.com"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              style={{ width: '100%', textAlign: 'center' }}
              required
            />
            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '12px' }}>
              Acessar Minha Reserva
            </button>
          </form>
        </div>
      </div>
    );
  }

  const firstName = getFirstName(booking.clientName);
  const released = isMemoriesReleased(booking.date);
  const releaseHour = getReleaseHour();

  // If locked screen is triggered
  if (showLockedMessage) {
    const isToday = new Date().toISOString().split('T')[0] === booking.date;

    return (
      <div style={{ maxWidth: '600px', margin: '40px auto', padding: '20px' }}>
        <div 
          className="glass-card" 
          style={{ 
            padding: '40px 30px', 
            textAlign: 'center',
            background: 'linear-gradient(135deg, rgba(27, 94, 32, 0.04) 0%, rgba(198, 148, 62, 0.03) 100%)',
            border: '1px solid var(--border)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px'
          }}
        >
          <div 
            style={{ 
              display: 'inline-grid', 
              placeContent: 'center', 
              background: 'rgba(198, 148, 62, 0.1)', 
              color: 'var(--accent-gold)', 
              width: '80px', 
              height: '80px', 
              borderRadius: '50%', 
              marginBottom: '8px'
            }}
          >
            <Clock size={40} />
          </div>

          <h2 style={{ fontSize: '1.8rem', fontFamily: 'var(--font-serif)', fontStyle: 'italic', color: 'var(--text-h)', margin: 0 }}>
            {isToday ? "Preparando suas Recordações..." : "Passeio Agendado!"}
          </h2>

          <p style={{ color: 'var(--text)', fontSize: '1rem', lineHeight: '1.6', margin: 0 }}>
            Olá, <strong>{firstName}</strong>! Que bom ver você por aqui.
          </p>

          {isToday ? (
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: '1.6', margin: 0 }}>
              O seu passeio está acontecendo <strong>hoje ({formatDateSafely(booking.date)})</strong>! Sua página de recordações personalizada, contendo as curiosidades contadas pelo Leandro, fotos coletivas e indicações, estará disponível hoje a partir das <strong>{releaseHour}</strong> (após o término do passeio).
            </p>
          ) : (
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: '1.6', margin: 0 }}>
              Seu passeio está agendado para o dia <strong>{formatDateSafely(booking.date)}</strong>. A sua página de recordações estará disponível a partir das <strong>{releaseHour}</strong> do dia do passeio.
            </p>
          )}

          <div style={{ background: 'rgba(27, 94, 32, 0.03)', border: '1px dashed var(--border)', borderRadius: 'var(--radius-md)', padding: '16px 20px', width: '100%', textAlign: 'left', marginTop: '10px' }}>
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', fontWeight: '600', marginBottom: '4px' }}>Dica Monotur</span>
            <p style={{ fontSize: '0.85rem', color: 'var(--text)', lineHeight: '1.4', margin: 0 }}>
              Aproveite ao máximo a sua vivência com a comunidade ribeirinha! Caminhe sob as Samaúmas, tome banho de rio e experimente o cacau. Estaremos registrando tudo para você guardar de lembrança. 🛶🌿
            </p>
          </div>

          <button 
            type="button"
            onClick={() => setShowLockedMessage(false)}
            className="btn btn-gold" 
            style={{ width: '100%', marginTop: '10px' }}
          >
            Voltar ao Painel
          </button>
        </div>
      </div>
    );
  }

  // Render Subsections
  if (activeSection === 'ficha') {
    return (
      <TravelForm 
        bookingId={booking.id}
        getBooking={getBooking}
        updateBooking={handleUpdateBookingLocal}
        onBack={() => setActiveSection('dashboard')}
      />
    );
  }

  if (activeSection === 'memorias') {
    return (
      <MemoriesView 
        bookingId={booking.id}
        getBooking={getBooking}
        faunaFlora={faunaFlora}
        partners={partners}
        onBack={() => setActiveSection('dashboard')}
      />
    );
  }

  // Render Dashboard
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      
      {/* Welcome & Logout Header */}
      <div 
        style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: '24px', 
          flexWrap: 'wrap',
          gap: '12px'
        }}
      >
        <div style={{ textAlign: 'left' }}>
          <h1 style={{ fontSize: '2rem', color: 'var(--text-h)', fontFamily: 'var(--font-serif)', fontStyle: 'italic', margin: 0 }}>
            Olá, {firstName}!
          </h1>
          <p style={{ color: 'var(--text-muted)', margin: '4px 0 0' }}>
            Bem-vindo ao seu portal de viagem Monotur.
          </p>
        </div>

        <button 
          onClick={handleLogout}
          className="btn btn-secondary"
          style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', fontSize: '0.85rem' }}
        >
          <LogOut size={16} />
          Sair da Reserva
        </button>
      </div>

      {/* Booking Summary Card */}
      <div 
        className="glass-card" 
        style={{ 
          padding: '24px', 
          marginBottom: '32px', 
          textAlign: 'left',
          background: 'linear-gradient(135deg, rgba(27, 94, 32, 0.03) 0%, rgba(198, 148, 62, 0.03) 100%)',
          border: '1px solid var(--border)'
        }}
      >
        <h2 style={{ fontSize: '1.15rem', color: 'var(--text-h)', fontWeight: '600', marginBottom: '16px', borderBottom: '1px solid var(--border)', paddingBottom: '8px' }}>
          Resumo do Seu Passeio
        </h2>
        <div 
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', 
            gap: '20px' 
          }}
        >
          <div>
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', fontWeight: '600', marginBottom: '4px' }}>Roteiro</span>
            <span style={{ fontSize: '0.95rem', fontWeight: '500', color: 'var(--text-h)' }}>Foz do Guamá e Ilha do Combu</span>
          </div>
          <div>
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', fontWeight: '600', marginBottom: '4px' }}>Data</span>
            <span style={{ fontSize: '0.95rem', fontWeight: '500', color: 'var(--text-h)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Calendar size={16} className="text-emerald-700" />
              {formatDateSafely(booking.date)}
            </span>
          </div>
          <div>
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', fontWeight: '600', marginBottom: '4px' }}>Viajantes</span>
            <span style={{ fontSize: '0.95rem', fontWeight: '500', color: 'var(--text-h)' }}>{booking.passengers} {booking.passengers === 1 ? 'pessoa' : 'pessoas'}</span>
          </div>
          <div>
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', fontWeight: '600', marginBottom: '4px' }}>Pagamento</span>
            <span className="badge badge-success" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <CheckCircle size={12} />
              Confirmado
            </span>
          </div>
        </div>
      </div>

      {/* Grid Menu Options */}
      <div 
        style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '24px' 
        }}
      >
        
        {/* Card Option A: Traveler Form */}
        <div 
          className="glass-card" 
          style={{ 
            padding: '30px', 
            textAlign: 'left',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '20px',
            border: '1px solid var(--border)',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease'
          }}
        >
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div 
                style={{ 
                  background: 'rgba(27, 94, 32, 0.08)', 
                  color: 'var(--primary)', 
                  padding: '12px', 
                  borderRadius: '12px' 
                }}
              >
                <ClipboardCheck size={28} />
              </div>
              
              {booking.fichaCompleted ? (
                <span 
                  className="badge badge-success"
                  style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', padding: '4px 8px' }}
                >
                  <CheckCircle size={12} />
                  Preenchido
                </span>
              ) : (
                <span 
                  className="badge badge-warning"
                  style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', padding: '4px 8px' }}
                >
                  <AlertCircle size={12} />
                  Pendente
                </span>
              )}
            </div>
            
            <h3 style={{ fontSize: '1.25rem', color: 'var(--text-h)', fontWeight: '600', marginBottom: '8px' }}>
              Ficha do Viajante
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: '1.5', margin: 0 }}>
              Informe os tamanhos dos coletes salva-vidas de cada viajante, restrições alimentares e contatos de emergência para garantirmos a sua segurança e conforto.
            </p>
          </div>

          <button 
            onClick={() => setActiveSection('ficha')}
            className="btn btn-primary"
            style={{ width: '100%', padding: '10px' }}
          >
            {booking.fichaCompleted ? 'Editar Ficha' : 'Preencher Ficha'}
          </button>
        </div>

        {/* Card Option B: Memories / Post-Tour */}
        <div 
          className="glass-card" 
          style={{ 
            padding: '30px', 
            textAlign: 'left',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '20px',
            border: '1px solid var(--border)'
          }}
        >
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div 
                style={{ 
                  background: 'rgba(198, 148, 62, 0.08)', 
                  color: 'var(--accent-gold)', 
                  padding: '12px', 
                  borderRadius: '12px' 
                }}
              >
                <Sparkles size={28} />
              </div>

              {released ? (
                <span 
                  className="badge badge-accent"
                  style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', padding: '4px 8px' }}
                >
                  <CheckCircle size={12} />
                  Liberado
                </span>
              ) : (
                <span 
                  className="badge"
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '4px', 
                    fontSize: '0.75rem', 
                    padding: '4px 8px',
                    background: 'rgba(0, 0, 0, 0.05)',
                    color: 'var(--text-muted)' 
                  }}
                >
                  <Lock size={12} />
                  Bloqueado
                </span>
              )}
            </div>

            <h3 style={{ fontSize: '1.25rem', color: 'var(--text-h)', fontWeight: '600', marginBottom: '8px' }}>
              Recordações do Passeio
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: '1.5', margin: 0 }}>
              Acesse as curiosidades da floresta ensinadas no dia, fotos coletivas do seu grupo, redes sociais dos parceiros locais e as melhores dicas da culinária de Belém.
            </p>
          </div>

          <button 
            onClick={() => {
              if (released) {
                setActiveSection('memorias');
              } else {
                setShowLockedMessage(true);
              }
            }}
            className={released ? "btn btn-gold" : "btn btn-secondary"}
            style={{ 
              width: '100%', 
              padding: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            {!released && <Lock size={16} />}
            {released ? 'Ver Recordações' : `Disponível às ${releaseHour}`}
          </button>
        </div>

      </div>

    </div>
  );
}
