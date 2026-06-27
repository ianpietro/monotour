import React, { useState, useEffect } from 'react';
import { Compass, Calendar, Users, ShieldAlert, Heart, Eye, ArrowLeft, Phone, AlertCircle, CheckCircle, HelpCircle } from 'lucide-react';
import { formatDateSafely } from '../../dataStore';

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

export default function BriefingView({ bookingId, getBooking }) {
  const [booking, setBooking] = useState(null);
  const [searchId, setSearchId] = useState(bookingId || '');

  useEffect(() => {
    if (bookingId) {
      const b = getBooking(bookingId);
      if (b) {
        setBooking(b);
      }
    }
  }, [bookingId, getBooking]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchId) return;
    window.location.hash = `#/admin/briefing/${searchId.toUpperCase()}`;
  };

  // Calculate consolidated life jacket counts
  const getLifeJacketSummary = () => {
    if (!booking || !booking.lifeJacketSizes) return {};
    const summary = {};
    booking.lifeJacketSizes.forEach(size => {
      summary[size] = (summary[size] || 0) + 1;
    });
    return summary;
  };

  if (!booking) {
    return (
      <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px' }}>
        <div className="glass-card" style={{ padding: '30px' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '16px', color: 'var(--text-h)' }}>Briefing de Embarque</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '20px', fontSize: '0.9rem' }}>
            Digite o código da reserva (ex: MT-1045) para puxar a ficha de briefing consolidade para o passeio.
          </p>
          <form onSubmit={handleSearch} style={{ display: 'flex', gap: '10px' }}>
            <input 
              type="text" 
              className="form-control" 
              placeholder="Ex: MT-1045"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              style={{ flex: '1', textTransform: 'uppercase' }}
              required
            />
            <button type="submit" className="btn btn-primary">Buscar</button>
          </form>
        </div>
      </div>
    );
  }

  const jacketSummary = getLifeJacketSummary();
  const hasAlergias = booking.dietaryRestrictions && booking.dietaryRestrictions.trim() !== '' && booking.dietaryRestrictions.toLowerCase() !== 'nenhuma';
  const isCamaraoAlert = hasAlergias && booking.dietaryRestrictions.toLowerCase().includes('camarão');

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto', padding: '10px' }}>
      
      {/* Header controls */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <a href="#/admin" className="btn btn-secondary" style={{ padding: '8px 14px', fontSize: '0.85rem' }}>
          <ArrowLeft size={16} /> Voltar ao Painel
        </a>
        <span className="badge badge-accent">Briefing de Operações</span>
      </div>

      {/* Main card */}
      <div className="glass-card" style={{ padding: '30px', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        {/* Reservation Header */}
        <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <h2 style={{ fontSize: '1.8rem', color: 'var(--text-h)', marginBottom: '4px' }}>{booking.clientName}</h2>
              <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', display: 'block' }}>Código: <strong>{booking.id}</strong></span>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span className={`badge ${booking.fichaCompleted ? 'badge-success' : 'badge-danger'}`} style={{ fontSize: '0.8rem' }}>
                {booking.fichaCompleted ? 'Ficha Entregue' : 'Ficha Pendente'}
              </span>
            </div>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1.2fr', gap: '14px', marginTop: '16px', fontSize: '0.9rem', color: 'var(--text)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Calendar size={16} className="text-emerald-600" />
              <span>{formatDateSafely(booking.date)}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Users size={16} className="text-emerald-600" />
              <span>{booking.passengers} passageiros</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Compass size={16} className="text-emerald-600" />
              <span>Idioma: <strong style={{ textTransform: 'uppercase' }}>{booking.language}</strong></span>
            </div>
          </div>
        </div>

        {/* If Ficha is pending, warn Leandro */}
        {!booking.fichaCompleted && (
          <div style={{ background: 'rgba(211, 47, 47, 0.06)', border: '1px solid rgba(211, 47, 47, 0.2)', borderRadius: 'var(--radius-md)', padding: '16px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
            <ShieldAlert size={24} className="text-red-500" style={{ flexShrink: 0 }} />
            <div>
              <h4 style={{ color: 'var(--danger)', fontSize: '0.95rem', fontWeight: '600', marginBottom: '4px' }}>Ficha de Segurança não preenchida</h4>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
                O cliente ainda não informou as preferências alimentares, tamanhos de coletes e contatos de emergência. Recomendamos solicitar o preenchimento ou verificar manualmente antes de subir a bordo.
              </p>
            </div>
          </div>
        )}

        {booking.fichaCompleted && (
          <>
            {/* Coletes Section */}
            <div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '12px', color: 'var(--text-h)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                🎒 Coletes Salva-vidas Necessários
              </h3>
              
              {/* Coletes consolidation checklist */}
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '16px' }}>
                {['S', 'M', 'L', 'XL'].map(size => {
                  const count = jacketSummary[size] || 0;
                  const label = size === 'S' ? 'P' : size === 'M' ? 'M' : size === 'L' ? 'G' : 'GG';
                  return (
                    <div 
                      key={size} 
                      style={{ 
                        flex: '1', 
                        minWidth: '70px',
                        padding: '10px', 
                        background: count > 0 ? 'rgba(27, 94, 32, 0.08)' : 'rgba(0, 0, 0, 0.02)',
                        border: count > 0 ? '1px solid var(--accent-light)' : '1px solid var(--border)',
                        borderRadius: 'var(--radius-sm)',
                        textAlign: 'center'
                      }}
                    >
                      <span style={{ fontSize: '1.4rem', fontWeight: '700', color: count > 0 ? 'var(--accent-light)' : 'var(--text-muted)', display: 'block' }}>{count}</span>
                      <span style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--text-muted)' }}>Tamanho {label}</span>
                    </div>
                  );
                })}
              </div>

              {/* Passengers Breakdown */}
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border)' }}>
                    <th style={{ padding: '8px 4px', textAlign: 'left', color: 'var(--text-muted)' }}>Nome do Passageiro</th>
                    <th style={{ padding: '8px 4px', textAlign: 'center', color: 'var(--text-muted)', width: '100px' }}>Colete</th>
                  </tr>
                </thead>
                <tbody>
                  {(booking.passengerDetails || []).map((p, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.03)' }}>
                      <td style={{ padding: '8px 4px', fontWeight: '550' }}>{p.name}</td>
                      <td style={{ padding: '8px 4px', textAlign: 'center' }}>
                        <span className="badge badge-accent" style={{ padding: '2px 8px' }}>
                          {p.size === 'S' ? 'P' : p.size === 'M' ? 'M' : p.size === 'L' ? 'G' : 'GG'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Alimentação Section */}
            <div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '12px', color: 'var(--text-h)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                🍽️ Almoço (Dona Rosalina)
              </h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }} className="form-row-mobile">
                <div style={{ padding: '14px', background: 'rgba(27, 94, 32, 0.04)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase', fontWeight: '500' }}>Opção Cardápio</span>
                  <strong style={{ fontSize: '1rem', color: 'var(--accent-light)', textTransform: 'capitalize' }}>
                    {booking.dietOption || 'Tradicional'}
                  </strong>
                </div>

                <div 
                  style={{ 
                    padding: '14px', 
                    background: isCamaraoAlert ? 'rgba(211, 47, 47, 0.08)' : hasAlergias ? 'rgba(198, 148, 62, 0.08)' : 'rgba(0, 0, 0, 0.02)', 
                    borderRadius: 'var(--radius-sm)', 
                    border: isCamaraoAlert ? '1px solid rgba(211, 47, 47, 0.3)' : '1px solid var(--border)'
                  }}
                >
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase', fontWeight: '500' }}>Restrições / Alergias</span>
                  <strong style={{ fontSize: '0.9rem', color: isCamaraoAlert ? 'var(--danger)' : 'var(--text-h)' }}>
                    {hasAlergias ? booking.dietaryRestrictions : 'Nenhuma'}
                  </strong>
                </div>
              </div>

              {isCamaraoAlert && (
                <div style={{ display: 'flex', gap: '8px', background: 'rgba(211, 47, 47, 0.06)', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(211, 47, 47, 0.15)', marginTop: '12px', fontSize: '0.8rem', color: 'var(--danger)', alignItems: 'center' }}>
                  <ShieldAlert size={16} />
                  <span><strong>ATENÇÃO:</strong> Alergia a Camarão declarada! Alertar a cozinha da Dona Rosalina para contaminação cruzada.</span>
                </div>
              )}
            </div>

            {/* Health & Emergency contact */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '20px' }} className="form-row-mobile">
              <div>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '8px', color: 'var(--text-h)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  📞 Emergência
                </h3>
                <div style={{ padding: '12px', background: 'rgba(0, 0, 0, 0.02)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '4px' }}>
                    <Phone size={12} /> Contato do Responsável
                  </span>
                  {booking.emergencyContact ? (
                    <a 
                      href={getSimpleWhatsAppLink(booking.emergencyContact)}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ fontSize: '0.88rem', color: '#1b803f', fontWeight: '700', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                    >
                      💬 {booking.emergencyContact}
                    </a>
                  ) : (
                    <strong style={{ fontSize: '0.88rem', color: 'var(--text-h)', display: 'block' }}>Não informado</strong>
                  )}
                </div>
              </div>

              <div>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '8px', color: 'var(--text-h)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  🩺 Condições Médicas
                </h3>
                <div style={{ padding: '12px', background: 'rgba(0, 0, 0, 0.02)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '4px' }}>
                    <AlertCircle size={12} /> Fatores de Atenção
                  </span>
                  <strong style={{ fontSize: '0.88rem', color: 'var(--text-h)', display: 'block' }}>
                    {booking.medicalNotes && booking.medicalNotes.trim() !== '' ? booking.medicalNotes : 'Nenhum declarado'}
                  </strong>
                </div>
              </div>
            </div>

            {/* Image Consent */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 20px', background: 'rgba(27, 94, 32, 0.02)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Eye size={20} className="text-emerald-600" />
                <div>
                  <strong style={{ fontSize: '0.9rem', color: 'var(--text-h)', display: 'block' }}>Divulgação nas Redes Sociais</strong>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Autorização de uso de imagem</span>
                </div>
              </div>
              <div>
                {booking.imageConsent ? (
                  <span className="badge badge-success" style={{ gap: '4px' }}><CheckCircle size={14} /> AUTORIZADO</span>
                ) : (
                  <span className="badge badge-danger" style={{ gap: '4px' }}><ShieldAlert size={14} /> NÃO AUTORIZADO</span>
                )}
              </div>
            </div>
          </>
        )}

      </div>
    </div>
  );
}
