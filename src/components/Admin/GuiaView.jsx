import React, { useState, useEffect } from 'react';
import { Calendar, Users, ShieldAlert, Phone, Compass, Info, Check, HelpCircle, MapPin } from 'lucide-react';
import { formatDateSafely } from '../../dataStore';

export default function GuiaView({ bookings, initialDate }) {
  // Get today's date in YYYY-MM-DD format as default
  const getTodayString = () => {
    const today = new Date();
    // Adjust to local timezone
    const offset = today.getTimezoneOffset();
    const localDate = new Date(today.getTime() - (offset * 60 * 1000));
    return localDate.toISOString().split('T')[0];
  };

  // State
  const [selectedDate, setSelectedDate] = useState(initialDate || '2026-06-27');
  const [activeTab, setActiveTab] = useState('lista'); // lista, coletes_dieta, contatos
  const [checkedPassengers, setCheckedPassengers] = useState({});

  useEffect(() => {
    if (initialDate) {
      setSelectedDate(initialDate);
    }
  }, [initialDate]);

  const handleDateChange = (dateVal) => {
    setSelectedDate(dateVal);
    window.location.hash = `#/guia/${dateVal}`;
  };

  const getSimpleWhatsAppLink = (phoneVal) => {
    if (!phoneVal) return '';
    let clean = phoneVal.replace(/\D/g, '');
    if (clean.startsWith('0')) {
      clean = clean.substring(1);
    }
    if (clean.length === 10 || clean.length === 11) {
      clean = '55' + clean;
    }
    return `https://wa.me/${clean}`;
  };

  const getWhatsAppLink = (phone, clientName, language = 'portugues') => {
    if (!phone) return '';
    let clean = phone.replace(/\D/g, '');
    if (clean.length === 10 || clean.length === 11) {
      clean = '55' + clean;
    }
    
    const firstName = clientName ? clientName.trim().split(/\s+/)[0] : '';
    let messageText = '';
    const lang = language ? language.toLowerCase() : 'portugues';
    
    if (lang === 'ingles') {
      messageText = `Hello ${firstName}, this is Leandro from Monotour! We are getting ready for boarding today. How is your arrival going? 🛶🌿`;
    } else if (lang === 'francais') {
      messageText = `Bonjour ${firstName}, c'est Leandro de Monotour! Nous nous préparons pour l'embarquement aujourd'hui. Comment se passe votre arrivée? 🛶🌿`;
    } else if (lang === 'espanhol') {
      messageText = `¡Hola ${firstName}! Soy Leandro de Monotour. Nos estamos preparando para el embarque de hoy. ¿Cómo va su llegada? 🛶🌿`;
    } else {
      messageText = `Olá ${firstName}, aqui é o Leandro da Monotour! Tudo bem? Já estamos nos preparando para o embarque de hoje. Como está a sua chegada? 🛶🌿`;
    }
    
    const message = encodeURIComponent(messageText);
    return `https://wa.me/${clean}?text=${message}`;
  };

  // Load boarding status from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('monotur_boarding_status');
      if (saved) {
        setCheckedPassengers(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Error loading boarding status", e);
    }
  }, []);

  // Save boarding status changes to localStorage
  const handleTogglePassenger = (bookingId, passengerIndex) => {
    const key = `${bookingId}-${passengerIndex}`;
    const updated = {
      ...checkedPassengers,
      [key]: !checkedPassengers[key]
    };
    setCheckedPassengers(updated);
    try {
      localStorage.setItem('monotur_boarding_status', JSON.stringify(updated));
    } catch (e) {
      console.error("Error saving boarding status", e);
    }
  };

  // Filter bookings for the selected date
  const dayBookings = bookings.filter(b => b.date === selectedDate);
  const totalPassengers = dayBookings.reduce((sum, b) => sum + b.passengers, 0);

  // Consolidated life jacket counts
  const jacketCounts = { P: 0, M: 0, G: 0, GG: 0 };
  let dietTrad = 0;
  let dietVeg = 0;
  let dietVegan = 0;
  const allergiesList = [];
  const medicalNotesList = [];

  dayBookings.forEach(b => {
    if (b.fichaCompleted) {
      // Life jackets
      if (b.lifeJacketSizes) {
        b.lifeJacketSizes.forEach(size => {
          const label = size === 'S' ? 'P' : size === 'M' ? 'M' : size === 'L' ? 'G' : 'GG';
          jacketCounts[label] = (jacketCounts[label] || 0) + 1;
        });
      }

      // Diets
      if (b.dietOption === 'vegetariana') dietVeg += b.passengers;
      else if (b.dietOption === 'vegana') dietVegan += b.passengers;
      else dietTrad += b.passengers;

      // Allergies
      if (b.dietaryRestrictions && b.dietaryRestrictions.trim() !== '' && b.dietaryRestrictions.toLowerCase() !== 'nenhuma') {
        allergiesList.push({ clientName: b.clientName, restriction: b.dietaryRestrictions });
      }

      // Medical notes
      if (b.medicalNotes && b.medicalNotes.trim() !== '' && b.medicalNotes.toLowerCase() !== 'nenhuma') {
        medicalNotesList.push({ clientName: b.clientName, note: b.medicalNotes });
      }
    } else {
      // If Ficha not completed, count passengers with default sizes/diets
      jacketCounts['M'] = (jacketCounts['M'] || 0) + b.passengers;
      dietTrad += b.passengers;
    }
  });

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '12px 6px', textAlign: 'left' }}>
      
      {/* Mobile Portal Header */}
      <div 
        className="glass-card" 
        style={{ 
          padding: '20px 16px', 
          background: 'linear-gradient(135deg, #0B4F36 0%, #174230 100%)', 
          color: '#FFFFFF',
          borderRadius: 'var(--radius-md)',
          boxShadow: 'var(--shadow-md)',
          marginBottom: '20px',
          border: 'none'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
          <Compass className="logo-monkey" size={28} style={{ color: '#FFB800' }} />
          <div>
            <h1 style={{ fontSize: '1.4rem', fontWeight: '800', margin: 0, letterSpacing: '0.05em' }}>MONOTUR GUIA</h1>
            <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.8)', fontWeight: '500' }}>
              Painel de Bordo em Tempo Real para Leandro
            </span>
          </div>
        </div>

        {/* Date selection & Counter */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', fontWeight: '600' }}>DATA DO ROTEIRO:</span>
            <input 
              type="date" 
              className="form-control" 
              style={{ 
                padding: '4px 8px', 
                fontSize: '0.85rem', 
                background: 'rgba(255,255,255,0.15)', 
                border: '1px solid rgba(255,255,255,0.25)', 
                color: '#fff',
                borderRadius: '4px'
              }}
              value={selectedDate}
              onChange={(e) => handleDateChange(e.target.value)}
            />
          </div>

          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', fontWeight: '600', display: 'block' }}>TOTAL GERAL:</span>
            <strong style={{ fontSize: '1.6rem', color: '#FFB800', fontWeight: '800' }}>
              {totalPassengers} Pessoas
            </strong>
          </div>
        </div>
      </div>

      {/* Sync Warning Banner if people disagree */}
      {totalPassengers === 16 && selectedDate === '2026-06-27' && (
        <div 
          style={{ 
            background: 'rgba(230, 149, 0, 0.08)', 
            border: '1px solid rgba(230, 149, 0, 0.3)', 
            borderRadius: 'var(--radius-md)', 
            padding: '12px 14px', 
            marginBottom: '20px', 
            display: 'flex', 
            gap: '10px', 
            alignItems: 'flex-start',
            fontSize: '0.82rem',
            lineHeight: '1.4'
          }}
        >
          <ShieldAlert size={20} className="text-amber-600" style={{ flexShrink: 0, marginTop: '2px' }} />
          <div>
            <strong style={{ color: 'var(--accent-gold)', display: 'block', marginBottom: '2px' }}>Aviso de Operação - Lotação Atualizada</strong>
            <span>Leandro, hoje o grupo está com <strong>16 pessoas no total</strong>. Anteriormente a estimativa era menor devido a novas reservas adicionadas na véspera. Use a lista abaixo para conferir todos os nomes.</span>
          </div>
        </div>
      )}

      {/* Portal Tabs */}
      <div 
        style={{ 
          display: 'flex', 
          background: 'rgba(0, 0, 0, 0.02)', 
          border: '1px solid var(--border)',
          borderRadius: '8px', 
          overflow: 'hidden', 
          marginBottom: '20px'
        }}
      >
        <button
          onClick={() => setActiveTab('lista')}
          style={{
            flex: 1,
            padding: '12px 8px',
            border: 'none',
            background: activeTab === 'lista' ? 'var(--accent-light)' : 'none',
            color: activeTab === 'lista' ? '#fff' : 'var(--text-muted)',
            fontWeight: '600',
            fontSize: '0.85rem',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
        >
          📝 Checklist de Embarque
        </button>
        <button
          onClick={() => setActiveTab('coletes_dieta')}
          style={{
            flex: 1,
            padding: '12px 8px',
            border: 'none',
            background: activeTab === 'coletes_dieta' ? 'var(--accent-light)' : 'none',
            color: activeTab === 'coletes_dieta' ? '#fff' : 'var(--text-muted)',
            fontWeight: '600',
            fontSize: '0.85rem',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
        >
          🎒 Coletes & Dieta
        </button>
        <button
          onClick={() => setActiveTab('contatos')}
          style={{
            flex: 1,
            padding: '12px 8px',
            border: 'none',
            background: activeTab === 'contatos' ? 'var(--accent-light)' : 'none',
            color: activeTab === 'contatos' ? '#fff' : 'var(--text-muted)',
            fontWeight: '600',
            fontSize: '0.85rem',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
        >
          📞 Contatos Úteis
        </button>
      </div>

      {/* Tab Contents */}
      {dayBookings.length === 0 ? (
        <div className="glass-card" style={{ padding: '40px 20px', textAlign: 'center', color: 'var(--text-muted)' }}>
          <Calendar size={40} style={{ opacity: 0.3, marginBottom: '12px' }} />
          <p style={{ margin: 0, fontSize: '0.9rem' }}>Nenhum passeio cadastrado para esta data no sistema.</p>
        </div>
      ) : (
        <>
          {/* TAB 1: BOARDING CHECKLIST */}
          {activeTab === 'lista' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {dayBookings.map((b) => {
                // Determine if this booking has passenger details
                const travelers = b.fichaCompleted && b.passengerDetails && b.passengerDetails.length > 0
                  ? b.passengerDetails 
                  : Array(b.passengers).fill(0).map((_, i) => ({ name: `Passageiro ${i + 1} (${b.clientName})`, size: 'M' }));

                return (
                  <div 
                    key={b.id} 
                    className="glass-card" 
                    style={{ 
                      padding: '16px',
                      borderLeft: b.fichaCompleted ? '4px solid var(--accent-light)' : '4px solid var(--danger)'
                    }}
                  >
                    {/* Reservation header */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid rgba(0,0,0,0.04)', paddingBottom: '10px', marginBottom: '12px' }}>
                      <div>
                        <strong style={{ fontSize: '0.95rem', color: 'var(--text-h)', display: 'block' }}>
                          Grupo: {b.clientName}
                        </strong>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>
                          Código: <strong>{b.id}</strong> ({b.passengers} pax)
                        </span>
                        {b.phone && (
                          <a 
                            href={getWhatsAppLink(b.phone, b.clientName, b.language)}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ 
                              display: 'inline-flex', 
                              alignItems: 'center', 
                              gap: '4px', 
                              fontSize: '0.72rem', 
                              color: '#1b803f', 
                              fontWeight: '650', 
                              textDecoration: 'none',
                              marginTop: '6px',
                              background: 'rgba(37, 211, 102, 0.08)',
                              padding: '4px 8px',
                              borderRadius: '4px',
                              border: '1px solid rgba(37, 211, 102, 0.2)'
                            }}
                          >
                            💬 WhatsApp: {b.phone}
                          </a>
                        )}
                      </div>
                      
                      <span className={`badge ${b.fichaCompleted ? 'badge-success' : 'badge-danger'}`} style={{ fontSize: '0.7rem', padding: '2px 8px' }}>
                        {b.fichaCompleted ? 'Ficha OK' : 'Sem Ficha'}
                      </span>
                    </div>

                    {/* Traveler list with boarding toggles */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {travelers.map((traveler, idx) => {
                        const isChecked = !!checkedPassengers[`${b.id}-${idx}`];
                        return (
                          <div 
                            key={idx}
                            onClick={() => handleTogglePassenger(b.id, idx)}
                            style={{ 
                              display: 'flex', 
                              alignItems: 'center', 
                              justifyContent: 'space-between',
                              padding: '10px 12px',
                              background: isChecked ? 'rgba(27, 94, 32, 0.05)' : 'rgba(0, 0, 0, 0.02)',
                              border: isChecked ? '1px solid var(--accent-light)' : '1px solid var(--border)',
                              borderRadius: '6px',
                              cursor: 'pointer',
                              transition: 'all 0.15s'
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                              <div 
                                style={{ 
                                  width: '20px', 
                                  height: '20px', 
                                  borderRadius: '4px', 
                                  border: isChecked ? 'none' : '2px solid var(--text-muted)',
                                  background: isChecked ? 'var(--accent-light)' : 'transparent',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  color: '#fff'
                                }}
                              >
                                {isChecked && <Check size={14} strokeWidth={3} />}
                              </div>
                              <span style={{ 
                                fontSize: '0.88rem', 
                                fontWeight: '550', 
                                color: isChecked ? 'var(--text-h)' : 'var(--text)',
                                textDecoration: isChecked ? 'line-through' : 'none',
                                opacity: isChecked ? 0.7 : 1
                              }}>
                                {traveler.name}
                              </span>
                            </div>

                            <span className="badge badge-accent" style={{ fontSize: '0.7rem', padding: '1px 6px' }}>
                              Colete {traveler.size === 'S' ? 'P' : traveler.size === 'M' ? 'M' : traveler.size === 'L' ? 'G' : 'GG'}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* TAB 2: COLETES & DIETA */}
          {activeTab === 'coletes_dieta' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              {/* Coletes Tally */}
              <div className="glass-card" style={{ padding: '20px' }}>
                <h3 style={{ fontSize: '1rem', color: 'var(--text-h)', marginBottom: '14px', borderBottom: '1px solid var(--border)', paddingBottom: '8px' }}>
                  🎒 Coletes Salva-vidas Consolidados
                </h3>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {['S', 'M', 'L', 'XL'].map(size => {
                    const count = jacketCounts[size === 'S' ? 'P' : size === 'M' ? 'M' : size === 'L' ? 'G' : 'GG'] || 0;
                    const label = size === 'S' ? 'P' : size === 'M' ? 'M' : size === 'L' ? 'G' : 'GG';
                    return (
                      <div 
                        key={size}
                        style={{ 
                          flex: 1, 
                          padding: '12px 8px', 
                          borderRadius: '6px', 
                          background: count > 0 ? 'rgba(27, 94, 32, 0.08)' : 'rgba(0,0,0,0.02)',
                          border: count > 0 ? '1px solid var(--accent-light)' : '1px solid var(--border)',
                          textAlign: 'center'
                        }}
                      >
                        <strong style={{ fontSize: '1.5rem', display: 'block', color: count > 0 ? 'var(--accent-light)' : 'var(--text-muted)' }}>
                          {count}
                        </strong>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '500' }}>
                          Tamanho {label}
                        </span>
                      </div>
                    );
                  })}
                </div>
                <div style={{ marginTop: '12px', fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Info size={14} className="text-emerald-600" />
                  <span>Passageiros sem ficha preenchida recebem colete M por padrão.</span>
                </div>
              </div>

              {/* Diets Tally */}
              <div className="glass-card" style={{ padding: '20px' }}>
                <h3 style={{ fontSize: '1rem', color: 'var(--text-h)', marginBottom: '14px', borderBottom: '1px solid var(--border)', paddingBottom: '8px' }}>
                  🍽️ Almoço Dona Rosalina (Porções)
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginBottom: '16px' }}>
                  <div style={{ padding: '12px 8px', background: 'rgba(0,0,0,0.02)', border: '1px solid var(--border)', borderRadius: '6px', textAlign: 'center' }}>
                    <strong style={{ fontSize: '1.3rem', display: 'block', color: 'var(--text-h)' }}>{dietTrad}</strong>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Tradicional</span>
                  </div>
                  <div style={{ padding: '12px 8px', background: dietVeg > 0 ? 'rgba(27, 94, 32, 0.05)' : 'rgba(0,0,0,0.02)', border: dietVeg > 0 ? '1px solid var(--accent-light)' : '1px solid var(--border)', borderRadius: '6px', textAlign: 'center' }}>
                    <strong style={{ fontSize: '1.3rem', display: 'block', color: dietVeg > 0 ? 'var(--accent-light)' : 'var(--text-h)' }}>{dietVeg}</strong>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Vegetariano</span>
                  </div>
                  <div style={{ padding: '12px 8px', background: dietVegan > 0 ? 'rgba(27, 94, 32, 0.05)' : 'rgba(0,0,0,0.02)', border: dietVegan > 0 ? '1px solid var(--accent-light)' : '1px solid var(--border)', borderRadius: '6px', textAlign: 'center' }}>
                    <strong style={{ fontSize: '1.3rem', display: 'block', color: dietVegan > 0 ? 'var(--accent-light)' : 'var(--text-h)' }}>{dietVegan}</strong>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Vegano</span>
                  </div>
                </div>

                {/* Allergies Alerts */}
                {allergiesList.length > 0 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--text-h)', textTransform: 'uppercase' }}>
                      ⚠️ ALERGIAS GRAVES DETECTADAS:
                    </span>
                    {allergiesList.map((a, idx) => {
                      const isCamarao = a.restriction.toLowerCase().includes('camarão') || a.restriction.toLowerCase().includes('shrimp');
                      return (
                        <div 
                          key={idx} 
                          style={{ 
                            background: isCamarao ? 'rgba(211, 47, 47, 0.08)' : 'rgba(198, 148, 62, 0.08)',
                            border: isCamarao ? '1px solid rgba(211, 47, 47, 0.25)' : '1px solid rgba(198, 148, 62, 0.25)',
                            borderRadius: '6px',
                            padding: '10px 12px',
                            fontSize: '0.82rem'
                          }}
                        >
                          <strong style={{ color: isCamarao ? 'var(--danger)' : 'var(--text-h)' }}>{a.clientName}:</strong> {a.restriction}
                        </div>
                      );
                    })}
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => {
                    const number = "5591983119988"; // Dona Rosalina
                    const dateFormatted = formatDateSafely(selectedDate);
                    
                    const allergiesText = allergiesList.length > 0
                      ? '\n\n⚠️ *Restrições/Alergias importantes:*' + allergiesList.map(a => `\n• ${a.clientName}: ${a.restriction}`).join('')
                      : '';
                      
                    const msgText = `*MONOTUR - ALMOÇO DO PASSEIO* 🍽️🛶\nData: *${dateFormatted}*\n\nOlá Dona Rosa! Segue o resumo das porções do passeio:\n- *Tradicional:* ${dietTrad}\n- *Vegetariano:* ${dietVeg}\n- *Vegano:* ${dietVegan}${allergiesText}\n\nPor favor, confirme o recebimento! Obrigado!`;
                    
                    const encodedMsg = encodeURIComponent(msgText);
                    window.open(`https://api.whatsapp.com/send?phone=${number}&text=${encodedMsg}`, '_blank');
                  }}
                  className="btn btn-gold"
                  style={{ 
                    marginTop: '16px', 
                    width: '100%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    gap: '8px', 
                    fontSize: '0.85rem' 
                  }}
                >
                  💬 Enviar Pedido para Dona Rosa (WhatsApp)
                </button>
              </div>

              {/* Medical conditions */}
              {medicalNotesList.length > 0 && (
                <div className="glass-card" style={{ padding: '20px' }}>
                  <h3 style={{ fontSize: '1.1rem', color: 'var(--text-h)', marginBottom: '12px' }}>
                    🩺 Fatores Médicos de Atenção
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {medicalNotesList.map((m, idx) => (
                      <div 
                        key={idx} 
                        style={{ 
                          background: 'rgba(0,0,0,0.02)', 
                          border: '1px solid var(--border)', 
                          borderRadius: '6px', 
                          padding: '10px 12px',
                          fontSize: '0.82rem',
                          color: 'var(--text)'
                        }}
                      >
                        <strong>{m.clientName}:</strong> {m.note}
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          )}

          {/* TAB 3: CONTACTS */}
          {activeTab === 'contatos' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {dayBookings.map((b) => (
                <div key={b.id} className="glass-card" style={{ padding: '16px', textAlign: 'left' }}>
                  <strong style={{ fontSize: '0.95rem', color: 'var(--text-h)', display: 'block', marginBottom: '8px' }}>
                    {b.clientName}
                  </strong>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 10px', background: 'rgba(0,0,0,0.02)', borderRadius: '4px' }} className="form-row-mobile">
                      <span style={{ color: 'var(--text-muted)' }}>Telefone Principal:</span>
                      <a 
                        href={getWhatsAppLink(b.phone, b.clientName, b.language)}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: '#1b803f', fontWeight: '650', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}
                      >
                        💬 {b.phone}
                      </a>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 10px', background: 'rgba(0,0,0,0.02)', borderRadius: '4px' }}>
                      <span style={{ color: 'var(--text-muted)' }}>Emergência:</span>
                      {b.emergencyContact ? (
                        <a 
                          href={getSimpleWhatsAppLink(b.emergencyContact)} 
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: '#1b803f', fontWeight: '650', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}
                        >
                          💬 {b.emergencyContact}
                        </a>
                      ) : (
                        <span style={{ fontStyle: 'italic', color: 'var(--danger)' }}>Não informado</span>
                      )}
                    </div>

                    {b.fichaCompleted && (
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 10px', background: 'rgba(0,0,0,0.02)', borderRadius: '4px' }}>
                        <span style={{ color: 'var(--text-muted)' }}>Opção de Imagem:</span>
                        <strong style={{ color: b.imageConsent ? 'var(--accent-light)' : 'var(--danger)' }}>
                          {b.imageConsent ? 'Autorizado' : 'Não Autorizado'}
                        </strong>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* Administrative Contacts */}
              <div 
                className="glass-card" 
                style={{ 
                  padding: '16px', 
                  background: 'rgba(27,94,32,0.02)', 
                  border: '1px dashed var(--accent-light)',
                  marginTop: '10px'
                }}
              >
                <strong style={{ fontSize: '0.9rem', color: 'var(--text-h)', display: 'block', marginBottom: '8px' }}>
                  ☎️ Contatos de Apoio Monotur
                </strong>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Raquel (Escritório):</span>
                    <a 
                      href={getSimpleWhatsAppLink('(91) 98124-5566')}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: '#1b803f', fontWeight: '700', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                    >
                      💬 (91) 98124-5566
                    </a>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Dona Rosalina (Restaurante):</span>
                    <a 
                      href={getSimpleWhatsAppLink('(91) 98311-9988')}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: '#1b803f', fontWeight: '700', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                    >
                      💬 (91) 98311-9988
                    </a>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Assoc. Barqueiros (Porto):</span>
                    <a 
                      href={getSimpleWhatsAppLink('(91) 98777-2233')}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: '#1b803f', fontWeight: '700', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                    >
                      💬 (91) 98777-2233
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* Copy view link helper */}
      <div style={{ textAlign: 'center', marginTop: '30px', paddingBottom: '20px' }}>
        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '10px' }}>
          Este portal carrega dados atualizados automaticamente a partir do banco local da Monotur.
        </p>
        <a 
          href="#/admin" 
          className="btn btn-secondary" 
          style={{ padding: '8px 16px', fontSize: '0.8rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
        >
          Ir para Painel Administrador
        </a>
      </div>

    </div>
  );
}
