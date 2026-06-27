import React, { useState, useEffect } from 'react';
import { Shield, Eye, MapPin, CheckCircle, Apple, AlertCircle, Globe, ArrowLeft } from 'lucide-react';

const TRANSLATIONS = {
  pt: {
    formTitle: "Ficha do Viajante",
    subtitle: "Precisamos de alguns detalhes para preparar seu passeio de forma segura e deliciosa.",
    searchTitle: "Ficha do Viajante",
    searchSubtitle: "Digite o e-mail cadastrado na reserva para preencher suas informações de segurança e alimentação.",
    searchPlaceholder: "Ex: seu-email@exemplo.com",
    searchButton: "Buscar",
    geoTitle: "Origem Geográfica",
    city: "Cidade *",
    state: "Estado",
    country: "País *",
    safetyTitle: "Segurança (Coletes Salva-vidas)",
    safetyDesc: "Para garantir que todos embarquem com o colete salva-vidas perfeitamente ajustado, informe o nome e o tamanho de colete de cada viajante.",
    travelerLabel: "Nome do Viajante",
    jacketSize: "Tamanho de Colete",
    sizeS: "P (Até 50kg)",
    sizeM: "M (50kg a 75kg)",
    sizeL: "G (75kg a 100kg)",
    sizeXL: "GG (Mais de 100kg)",
    emergencyLabel: "Contato de Emergência (Nome e Telefone) *",
    medicalLabel: "Notas Médicas ou Condições Especiais (Opcional)",
    medicalPlaceholder: "Ex: Asma, hipertensão, dificuldades motoras...",
    dietTitle: "Preferências Alimentares (Almoço na Ilha)",
    dietDesc: "O almoço ribeirinho é feito de forma artesanal. Diga-nos se possui restrições ou se prefere pratos alternativos.",
    dietType: "Estilo de Alimentação",
    dietTrad: "Tradicional (Peixe frito/caldeirada, açaí, carne)",
    dietVeg: "Vegetariana (Ovos, legumes, arroz, feijão)",
    dietVegan: "Vegana (Sem qualquer ingrediente animal)",
    allergyLabel: "Alergias ou Intolerâncias (Destaque se houver alergia a camarão)",
    allergyPlaceholder: "Ex: Alergia grave a camarão, intolerância a lactose...",
    imageTitle: "Autorização de Imagem",
    imageLabel: "Autorizo a Monotour a registrar fotos e vídeos durante o passeio e compartilhá-los em suas redes sociais e materiais promocionais.",
    submitButton: "Enviar Ficha do Viajante",
    successTitle: "Ficha Concluída!",
    successDesc: "Agradecemos pelas informações. Elas já foram repassadas ao guia Leandro e aos cozinheiros locais parceiros.",
    successNextTitle: "O que acontece agora?",
    successNext1: "Nosso barco estará com os coletes ajustados para vocês.",
    successNext2: "Dona Rosa já está sabendo de suas preferências alimentares.",
    successNext3: "Na véspera do passeio, você receberá a confirmação climática de Belém e o ponto de embarque.",
    btnHome: "Voltar ao Início",
    btnMemories: "Ver Roteiro Vivo"
  },
  en: {
    formTitle: "Traveler Form",
    subtitle: "We need a few details to prepare your tour safely and deliciously.",
    searchTitle: "Traveler Form",
    searchSubtitle: "Enter the email registered with your booking to fill in your safety and dietary information.",
    searchPlaceholder: "E.g., your-email@example.com",
    searchButton: "Search",
    geoTitle: "Geographical Origin",
    city: "City *",
    state: "State / Province",
    country: "Country *",
    safetyTitle: "Safety (Life Jackets)",
    safetyDesc: "To ensure everyone boards with a perfectly adjusted life jacket, please provide each traveler's name and life jacket size.",
    travelerLabel: "Traveler Name",
    jacketSize: "Jacket Size",
    sizeS: "S (Up to 50kg / 110lbs)",
    sizeM: "M (50kg to 75kg / 110-165lbs)",
    sizeL: "L (75kg to 100kg / 165-220lbs)",
    sizeXL: "XL (Over 100kg / 220lbs)",
    emergencyLabel: "Emergency Contact (Name and Phone) *",
    medicalLabel: "Medical Notes or Special Conditions (Optional)",
    medicalPlaceholder: "E.g., Asthma, high blood pressure, physical difficulties...",
    dietTitle: "Dietary Preferences (Island Lunch)",
    dietDesc: "The local river lunch is prepared in an artisanal way. Let us know if you have restrictions or prefer alternative meals.",
    dietType: "Diet Style",
    dietTrad: "Traditional (Fried fish/stew, fresh açaí, beef)",
    dietVeg: "Vegetarian (Eggs, vegetables, rice, beans)",
    dietVegan: "Vegan (No animal products of any kind)",
    allergyLabel: "Allergies or Intolerances (Highlight if allergic to shrimp)",
    allergyPlaceholder: "E.g., Severe shrimp allergy, lactose intolerance...",
    imageTitle: "Image & Media Consent",
    imageLabel: "I authorize Monotour to take photos and videos during the tour and share them on social media and promotional materials.",
    submitButton: "Submit Traveler Form",
    successTitle: "Form Completed!",
    successDesc: "Thank you for the information. It has already been shared with our guide Leandro and the local partner cooks.",
    successNextTitle: "What happens now?",
    successNext1: "Our boat will be prepared with the correct life jacket sizes.",
    successNext2: "Dona Rosa has been notified of your dietary preferences.",
    successNext3: "On the eve of the tour, you will receive weather confirmation and the boarding details.",
    btnHome: "Back to Home",
    btnMemories: "View Live Itinerary"
  }
};

export default function TravelForm({ bookingId, getBooking, updateBooking, onBack }) {
  const [booking, setBooking] = useState(null);
  const [searchId, setSearchId] = useState(bookingId || '');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [lang, setLang] = useState('pt'); // pt or en

  // Helper to extract first name
  const getFirstName = (fullName) => {
    if (!fullName) return '';
    return fullName.trim().split(/\s+/)[0];
  };

  // Form states
  const [formData, setFormData] = useState({
    originCity: '',
    originState: '',
    originCountry: 'Brasil',
    dietaryRestrictions: '',
    dietOption: 'tradicional', // tradicional, vegetariana, vegana
    lifeJacketSizes: [],
    passengerDetails: [], // Array of { name: '', size: 'M' }
    imageConsent: true,
    medicalNotes: '',
    emergencyContact: ''
  });

  const t = TRANSLATIONS[lang];

  useEffect(() => {
    if (bookingId) {
      const b = getBooking(bookingId);
      if (b) {
        setBooking(b);
        // Pre-fill if already completed
        setFormData({
          originCity: b.originCity || '',
          originState: b.originState || '',
          originCountry: b.originCountry || (lang === 'pt' ? 'Brasil' : 'Brazil'),
          dietaryRestrictions: b.dietaryRestrictions || '',
          dietOption: b.dietOption || 'tradicional',
          lifeJacketSizes: b.lifeJacketSizes || Array(b.passengers).fill('M'),
          passengerDetails: b.passengerDetails || Array(b.passengers).fill(0).map((_, i) => ({ 
            name: i === 0 ? b.clientName : (lang === 'pt' ? `Viajante ${i + 1}` : `Traveler ${i + 1}`), 
            size: 'M' 
          })),
          imageConsent: b.imageConsent !== undefined ? b.imageConsent : true,
          medicalNotes: b.medicalNotes || '',
          emergencyContact: b.emergencyContact || ''
        });
      }
    }
  }, [bookingId, getBooking, lang]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchId) return;
    window.location.hash = `#/ficha/${searchId.toLowerCase().trim()}`;
  };

  const handlePassengerChange = (idx, field, val) => {
    const updated = [...formData.passengerDetails];
    updated[idx] = {
      ...updated[idx],
      [field]: val
    };
    
    const sizes = updated.map(p => p.size);

    setFormData(prev => ({
      ...prev,
      passengerDetails: updated,
      lifeJacketSizes: sizes
    }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.originCity || !formData.originCountry || !formData.emergencyContact) {
      alert(lang === 'pt' ? 'Por favor, preencha os campos obrigatórios.' : 'Please fill in the required fields.');
      return;
    }

    const updatedBooking = {
      ...booking,
      ...formData,
      fichaCompleted: true
    };

    updateBooking(booking.id, updatedBooking);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
        <div className="glass-card" style={{ padding: '40px 30px', textAlign: 'center' }}>
          <div style={{ display: 'inline-grid', placeContent: 'center', background: 'var(--success-bg)', color: 'var(--success)', width: '70px', height: '70px', borderRadius: '50%', marginBottom: '24px' }}>
            <CheckCircle size={36} />
          </div>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '8px', color: 'var(--text-h)' }}>{t.successTitle}</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>
            {t.successDesc}
          </p>
          
          <div style={{ background: 'rgba(14, 138, 67, 0.02)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '20px', fontSize: '0.9rem', color: 'var(--text)', textAlign: 'left', marginBottom: '30px' }}>
            <p style={{ marginBottom: '10px' }}><strong>{t.successNextTitle}</strong></p>
            <ul style={{ paddingLeft: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li>{t.successNext1}</li>
              <li>{t.successNext2}</li>
              <li>{t.successNext3}</li>
            </ul>
          </div>

          {onBack ? (
            <button 
              type="button" 
              onClick={onBack} 
              className="btn btn-primary"
              style={{ width: '100%', padding: '12px' }}
            >
              {lang === 'pt' ? 'Voltar ao Painel' : 'Back to Dashboard'}
            </button>
          ) : (
            <>
              <a href="#/reserva" className="btn btn-secondary" style={{ marginRight: '10px' }}>{t.btnHome}</a>
              <a href={`#/memorias/${booking.id}`} className="btn btn-primary">{t.btnMemories}</a>
            </>
          )}
        </div>
      </div>
    );
  }

  // Not found/Search view
  if (!booking) {
    return (
      <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px' }}>
        {/* Language selector in search */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
          <button 
            type="button" 
            onClick={() => setLang(lang === 'pt' ? 'en' : 'pt')} 
            className="btn btn-secondary"
            style={{ padding: '6px 12px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <Globe size={14} /> {lang === 'pt' ? 'English' : 'Português'}
          </button>
        </div>

        <div className="glass-card" style={{ padding: '30px' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '16px', color: 'var(--text-h)' }}>{t.searchTitle}</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '20px', fontSize: '0.9rem', lineHeight: '1.5' }}>
            {t.searchSubtitle}
          </p>
          <form onSubmit={handleSearch} style={{ display: 'flex', gap: '10px' }}>
            <input 
              type="email" 
              className="form-control" 
              placeholder={t.searchPlaceholder}
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              style={{ flex: '1' }}
              required
            />
            <button type="submit" className="btn btn-primary">{t.searchButton}</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto', padding: '20px' }}>
      
      {/* Header controls with language switch */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        {onBack ? (
          <button 
            type="button" 
            onClick={onBack} 
            className="btn btn-secondary"
            style={{ padding: '6px 12px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <ArrowLeft size={14} /> {lang === 'pt' ? 'Voltar ao Painel' : 'Back to Dashboard'}
          </button>
        ) : (
          <span className="badge badge-accent">ID: {booking.id}</span>
        )}
        
        <button 
          type="button" 
          onClick={() => setLang(lang === 'pt' ? 'en' : 'pt')} 
          className="btn btn-secondary"
          style={{ padding: '6px 12px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <Globe size={14} /> {lang === 'pt' ? 'In English' : 'Em Português'}
        </button>
      </div>

      <div style={{ textAlign: 'left', marginBottom: '30px' }}>
        <h2 style={{ fontSize: '2rem', color: 'var(--text-h)', marginBottom: '6px' }}>{t.formTitle}</h2>
        <p style={{ color: 'var(--text-muted)' }}>
          {lang === 'pt' 
            ? `Olá, ${getFirstName(booking.clientName)}! ${t.subtitle}` 
            : `Hello, ${getFirstName(booking.clientName)}! ${t.subtitle}`}
        </p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        {/* Origin Section */}
        <div className="glass-card" style={{ padding: '24px', textAlign: 'left' }}>
          <h3 style={{ fontSize: '1.15rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-h)' }}>
            <MapPin size={20} className="text-emerald-600" /> {t.geoTitle}
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 0.6fr 1fr', gap: '16px' }} className="form-row-mobile">
            <div className="form-group">
              <label className="form-label">{t.city}</label>
              <input 
                type="text" 
                name="originCity" 
                className="form-control" 
                placeholder="Ex: Belém / Miami"
                value={formData.originCity}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">{t.state}</label>
              <input 
                type="text" 
                name="originState" 
                className="form-control" 
                placeholder="Ex: PA / FL"
                value={formData.originState}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label className="form-label">{t.country}</label>
              <input 
                type="text" 
                name="originCountry" 
                className="form-control" 
                placeholder="Ex: Brasil / USA"
                value={formData.originCountry}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

        {/* Safety & Life Jackets Section */}
        <div className="glass-card" style={{ padding: '24px', textAlign: 'left' }}>
          <h3 style={{ fontSize: '1.15rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-h)' }}>
            <Shield size={20} className="text-emerald-600" /> {t.safetyTitle}
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '16px', lineHeight: '1.5' }}>
            {t.safetyDesc}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {formData.passengerDetails.map((passenger, idx) => (
              <div 
                key={idx} 
                style={{ 
                  display: 'grid', 
                  gridTemplateColumns: '1fr 0.5fr', 
                  gap: '16px', 
                  alignItems: 'center',
                  background: 'rgba(14, 138, 67, 0.02)',
                  padding: '12px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border)'
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--text-muted)' }}>
                    {t.travelerLabel} {idx + 1}
                  </span>
                  <input 
                    type="text" 
                    className="form-control"
                    style={{ padding: '8px 12px' }}
                    value={passenger.name}
                    placeholder={`${t.travelerLabel} ${idx + 1}`}
                    onChange={(e) => handlePassengerChange(idx, 'name', e.target.value)}
                    required
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--text-muted)' }}>{t.jacketSize}</span>
                  <select 
                    className="form-control"
                    style={{ padding: '8px 12px' }}
                    value={passenger.size}
                    onChange={(e) => handlePassengerChange(idx, 'size', e.target.value)}
                  >
                    <option value="S">{t.sizeS}</option>
                    <option value="M">{t.sizeM}</option>
                    <option value="L">{t.sizeL}</option>
                    <option value="XL">{t.sizeXL}</option>
                  </select>
                </div>
              </div>
            ))}
          </div>

          <div className="form-group" style={{ marginTop: '20px' }}>
            <label className="form-label">{t.emergencyLabel}</label>
            <input 
              type="text" 
              name="emergencyContact" 
              className="form-control" 
              placeholder="Ex: Maria (91) 99999-8888"
              value={formData.emergencyContact}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">{t.medicalLabel}</label>
            <textarea 
              name="medicalNotes" 
              className="form-control" 
              placeholder={t.medicalPlaceholder}
              value={formData.medicalNotes}
              onChange={handleChange}
              rows="2"
            />
          </div>
        </div>

        {/* Dietary Section */}
        <div className="glass-card" style={{ padding: '24px', textAlign: 'left' }}>
          <h3 style={{ fontSize: '1.15rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-h)' }}>
            <Apple size={20} className="text-emerald-600" /> {t.dietTitle}
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '16px', lineHeight: '1.5' }}>
            {t.dietDesc}
          </p>

          <div className="form-group">
            <label className="form-label">{t.dietType}</label>
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
              <label className="checkbox-label">
                <input 
                  type="radio" 
                  name="dietOption" 
                  value="tradicional"
                  checked={formData.dietOption === 'tradicional'}
                  onChange={handleChange}
                  className="checkbox-input"
                  style={{ borderRadius: '50%' }}
                />
                {t.dietTrad}
              </label>
              <label className="checkbox-label">
                <input 
                  type="radio" 
                  name="dietOption" 
                  value="vegetariana"
                  checked={formData.dietOption === 'vegetariana'}
                  onChange={handleChange}
                  className="checkbox-input"
                  style={{ borderRadius: '50%' }}
                />
                {t.dietVeg}
              </label>
              <label className="checkbox-label">
                <input 
                  type="radio" 
                  name="dietOption" 
                  value="vegana"
                  checked={formData.dietOption === 'vegana'}
                  onChange={handleChange}
                  className="checkbox-input"
                  style={{ borderRadius: '50%' }}
                />
                {t.dietVegan}
              </label>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <AlertCircle size={16} className="text-amber-500" /> {t.allergyLabel}
            </label>
            <input 
              type="text" 
              name="dietaryRestrictions" 
              className="form-control" 
              placeholder={t.allergyPlaceholder}
              value={formData.dietaryRestrictions}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Media Consent Section */}
        <div className="glass-card" style={{ padding: '24px', textAlign: 'left' }}>
          <h3 style={{ fontSize: '1.15rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-h)' }}>
            <Eye size={20} className="text-emerald-600" /> {t.imageTitle}
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <label className="checkbox-label" style={{ alignItems: 'flex-start' }}>
              <input 
                type="checkbox" 
                name="imageConsent" 
                checked={formData.imageConsent}
                onChange={handleChange}
                className="checkbox-input"
                style={{ marginTop: '3px' }}
              />
              <span style={{ fontSize: '0.9rem', lineHeight: '1.4' }}>
                {t.imageLabel}
              </span>
            </label>
          </div>
        </div>

        <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
          {t.submitButton}
        </button>
      </form>
    </div>
  );
}
