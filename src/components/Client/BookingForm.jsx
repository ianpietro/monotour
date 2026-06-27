import React, { useState, useEffect } from 'react';
import { calculateTotal, PAYMENT_METHODS, formatDateSafely } from '../../dataStore';
import { Calendar, Users, Globe, CreditCard, CheckCircle, ArrowRight, ShieldCheck, Heart } from 'lucide-react';

export default function BookingForm({ onBookingSuccess }) {
  const [formData, setFormData] = useState({
    clientName: '',
    email: '',
    phone: '',
    date: '',
    passengers: 2,
    language: 'portugues',
    paymentMethod: 'pix'
  });

  const [pricing, setPricing] = useState({
    subtotal: 700,
    interpreterFee: 0,
    gatewayFee: 0,
    totalPaid: 700
  });

  const [isPaid, setIsPaid] = useState(false);
  const [newBookingId, setNewBookingId] = useState(null);

  // Recalculate price in real-time when passengers, language, or payment method changes
  useEffect(() => {
    const calc = calculateTotal(
      formData.passengers,
      formData.language,
      formData.paymentMethod
    );
    setPricing(calc);
  }, [formData.passengers, formData.language, formData.paymentMethod]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'passengers' ? parseInt(value) || 1 : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate inputs
    if (!formData.clientName || !formData.email || !formData.phone || !formData.date) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    // Create a new booking ID
    const bookingId = `MT-${Math.floor(1000 + Math.random() * 9000)}`;
    
    // Save to booking list
    const newBooking = {
      id: bookingId,
      ...formData,
      ...pricing,
      status: 'pago',
      fichaCompleted: false
    };

    setNewBookingId(bookingId);
    setIsPaid(true);
    
    if (onBookingSuccess) {
      onBookingSuccess(newBooking);
    }
  };

  // Get current date string for min date (today)
  const getTodayString = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  if (isPaid) {
    return (
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
        <div className="glass-card" style={{ padding: '40px 30px', textAlign: 'center' }}>
          <div style={{ display: 'inline-grid', placeContent: 'center', background: 'var(--success-bg)', color: 'var(--success)', width: '70px', height: '70px', borderRadius: '50%', marginBottom: '24px' }}>
            <CheckCircle size={36} />
          </div>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '8px', color: 'var(--text-h)' }}>Reserva Confirmada!</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>
            Seu pagamento foi processado com sucesso. Código da reserva: <strong style={{ color: 'var(--text-h)' }}>{newBookingId}</strong>
          </p>

          <div style={{ background: 'rgba(27, 94, 32, 0.03)', border: '1px dashed var(--border)', borderRadius: 'var(--radius-md)', padding: '20px', textAlign: 'left', marginBottom: '30px' }}>
            <h4 style={{ marginBottom: '12px', fontSize: '1rem', color: 'var(--text-h)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldCheck size={18} className="text-emerald-600" /> Resumo do Passeio
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '0.9rem', color: 'var(--text)' }}>
              <div><strong>Cliente:</strong> {formData.clientName}</div>
              <div><strong>Data:</strong> {formatDateSafely(formData.date)}</div>
              <div><strong>Passageiros:</strong> {formData.passengers} pessoas</div>
              <div><strong>Idioma:</strong> {formData.language.toUpperCase()}</div>
              <div><strong>Forma de Pagamento:</strong> {PAYMENT_METHODS[formData.paymentMethod]?.name}</div>
              <div><strong>Total Pago:</strong> R$ {pricing.totalPaid.toFixed(2)}</div>
            </div>
          </div>

          <div style={{ background: 'rgba(198, 148, 62, 0.05)', border: '1px solid rgba(198, 148, 62, 0.2)', borderRadius: 'var(--radius-md)', padding: '20px', textAlign: 'left', marginBottom: '30px' }}>
            <h4 style={{ color: 'var(--accent-gold)', marginBottom: '8px', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Heart size={18} /> Ação Necessária: Ficha do Viajante
            </h4>
            <p style={{ fontSize: '0.85rem', lineHeight: '1.5', color: 'var(--text)' }}>
              Para garantir a sua segurança (coletes salva-vidas adequados) e o cardápio do almoço ribeirinho (alergias/restrições), preencha a ficha do viajante agora mesmo.
            </p>
          </div>

          <a 
            href={`#/ficha/${newBookingId}`} 
            className="btn btn-gold" 
            style={{ width: '100%', textDecoration: 'none' }}
          >
            Preencher Ficha do Viajante <ArrowRight size={18} />
          </a>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '8px', fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}>
          Reserve sua Imersão Fluvial
        </h2>
        <p style={{ color: 'var(--text-muted)' }}>
          Viva o melhor passeio pelas ilhas, furos e igarapés de Belém com a Monotour
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '30px', alignItems: 'start' }} className="booking-grid">
        {/* Form Column */}
        <form onSubmit={handleSubmit} className="glass-card" style={{ padding: '30px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '16px', borderBottom: '1px solid var(--border)', paddingBottom: '10px' }}>
            Dados de Contato e Tour
          </h3>
          
          <div className="form-group">
            <label className="form-label">Nome Completo *</label>
            <input 
              type="text" 
              name="clientName" 
              className="form-control" 
              placeholder="Ex: João Silva"
              value={formData.clientName}
              onChange={handleChange}
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="form-row-mobile">
            <div className="form-group">
              <label className="form-label">E-mail *</label>
              <input 
                type="email" 
                name="email" 
                className="form-control" 
                placeholder="Ex: joao@email.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">WhatsApp *</label>
              <input 
                type="tel" 
                name="phone" 
                className="form-control" 
                placeholder="Ex: (91) 99999-9999"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '16px' }} className="form-row-mobile">
            <div className="form-group">
              <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Calendar size={16} /> Data do Passeio *
              </label>
              <input 
                type="date" 
                name="date" 
                className="form-control" 
                min={getTodayString()}
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Users size={16} /> Pessoas *
              </label>
              <input 
                type="number" 
                name="passengers" 
                className="form-control" 
                min="1" 
                max="25"
                value={formData.passengers}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Globe size={16} /> Necessidade de Intérprete
            </label>
            <select 
              name="language" 
              className="form-control" 
              value={formData.language}
              onChange={handleChange}
            >
              <option value="portugues">Português (Incluso)</option>
              <option value="ingles">Inglês (+ R$ 300,00)</option>
              <option value="espanhol">Espanhol (+ R$ 300,00)</option>
              <option value="francais">Francês (+ R$ 300,00)</option>
              <option value="libras">Libras (Língua Brasileira de Sinais) (+ R$ 300,00)</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CreditCard size={16} /> Forma de Pagamento *
            </label>
            <select 
              name="paymentMethod" 
              className="form-control" 
              value={formData.paymentMethod}
              onChange={handleChange}
            >
              <option value="pix">Pix (Sem taxas - Recomendado)</option>
              <option value="link">Cartão via Link (Taxa 3.5% + R$ 0.50)</option>
              <option value="paypal">PayPal (Taxa 4.5% + R$ 1.00)</option>
              <option value="mercadopago">Mercado Pago (Taxa 3.99%)</option>
              <option value="inter">Transferência Internacional Inter (Taxa 1.5% + R$ 5.00)</option>
            </select>
            {formData.paymentMethod !== 'pix' && (
              <span style={{ fontSize: '0.8rem', color: 'var(--accent-gold)', marginTop: '4px' }}>
                * A operadora de pagamento inclui taxas adicionais ao valor final da reserva.
              </span>
            )}
          </div>

          <button 
            type="submit" 
            className="btn btn-primary" 
            style={{ marginTop: '16px', width: '100%' }}
          >
            Confirmar e Pagar R$ {pricing.totalPaid.toFixed(2)}
          </button>
        </form>

        {/* Pricing Summary Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="glass-card" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '16px', borderBottom: '1px solid var(--border)', paddingBottom: '10px' }}>
              Resumo Financeiro
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Passeio ({formData.passengers} x R$ 350)</span>
                <span style={{ color: 'var(--text-h)', fontWeight: '600' }}>R$ {pricing.subtotal.toFixed(2)}</span>
              </div>
              
              {pricing.interpreterFee > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Intérprete ({formData.language.toUpperCase()})</span>
                  <span style={{ color: 'var(--text-h)', fontWeight: '600' }}>R$ {pricing.interpreterFee.toFixed(2)}</span>
                </div>
              )}
              
              {pricing.gatewayFee > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Taxas Administrativas</span>
                  <span style={{ color: 'var(--text-h)', fontWeight: '600' }}>R$ {pricing.gatewayFee.toFixed(2)}</span>
                </div>
              )}
              
              <div style={{ borderTop: '1px solid var(--border)', marginTop: '8px', paddingTop: '12px', display: 'flex', justifyContent: 'space-between', fontSize: '1.15rem', fontWeight: '700' }}>
                <span style={{ color: 'var(--text-h)' }}>Total</span>
                <span style={{ color: 'var(--accent-light)' }}>R$ {pricing.totalPaid.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="glass-card" style={{ padding: '20px', background: 'rgba(27, 94, 32, 0.02)' }}>
            <h4 style={{ fontSize: '0.95rem', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              ℹ️ Informações de Reserva
            </h4>
            <ul style={{ fontSize: '0.82rem', paddingLeft: '16px', display: 'flex', flexDirection: 'column', gap: '6px', color: 'var(--text-muted)' }}>
              <li><strong>Antecedência:</strong> Para reservas com mais de 15 dias, pedimos 50% de sinal (restante em 72h). Dentro de 14 dias, o valor é 100%.</li>
              <li><strong>Devoluções:</strong> Havendo acréscimo de pessoas no grupo de embarque principal, devolvemos a diferença cabível.</li>
              <li><strong>Almoço:</strong> O valor do almoço na Dona Rosa já está incluso no valor por passageiro!</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
