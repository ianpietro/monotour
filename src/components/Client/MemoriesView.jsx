import React, { useState, useEffect } from 'react';
import Card from '../UI/Card';
import { Compass, MapPin, Sparkles, Image, ExternalLink, Calendar, Heart, ShieldCheck, Clock, ArrowLeft } from 'lucide-react';
import { formatDateSafely, isMemoriesReleased, getReleaseHour } from '../../dataStore';

const InstagramLogo = ({ size = 20, className = '' }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const MOCK_GALLERY = [
  "https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?auto=format&fit=crop&q=80&w=400",
  "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&q=80&w=400",
  "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&q=80&w=400"
];

export default function MemoriesView({ bookingId, getBooking, faunaFlora, partners, onBack }) {
  const [booking, setBooking] = useState(null);
  const [searchId, setSearchId] = useState(bookingId || '');
  const [gallery, setGallery] = useState(MOCK_GALLERY);
  const [newPhotoUrl, setNewPhotoUrl] = useState('');

  // Helper to extract first name
  const getFirstName = (fullName) => {
    if (!fullName) return '';
    return fullName.trim().split(/\s+/)[0];
  };

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
    window.location.hash = `#/memorias/${searchId.toLowerCase().trim()}`;
  };

  const handleAddPhoto = (e) => {
    e.preventDefault();
    if (!newPhotoUrl) return;
    setGallery(prev => [...prev, newPhotoUrl]);
    setNewPhotoUrl('');
  };

  const handleAddMockPhoto = () => {
    const urls = [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=400",
      "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&q=80&w=400",
      "https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&q=80&w=400"
    ];
    const randomUrl = urls[Math.floor(Math.random() * urls.length)];
    setGallery(prev => [...prev, randomUrl]);
  };

  if (!booking) {
    return (
      <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px' }}>
        <div className="glass-card" style={{ padding: '30px' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '16px', color: 'var(--text-h)' }}>Recordações do Passeio</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '20px', fontSize: '0.9rem' }}>
            Digite o e-mail cadastrado na sua reserva para ver o resumo do seu passeio, curiosidades da floresta, fotos coletivas e indicações locais.
          </p>
          <form onSubmit={handleSearch} style={{ display: 'flex', gap: '10px' }}>
            <input 
              type="email" 
              className="form-control" 
              placeholder="Ex: seu-email@exemplo.com"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              style={{ flex: '1' }}
              required
            />
            <button type="submit" className="btn btn-primary">Ver Memórias</button>
          </form>
        </div>
      </div>
    );
  }

  const released = isMemoriesReleased(booking.date);

  if (!released) {
    const isToday = new Date().toISOString().split('T')[0] === booking.date;
    const releaseHour = getReleaseHour();
    
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
            Olá, <strong>{getFirstName(booking.clientName)}</strong>! Que bom ver você por aqui.
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

          <a 
            href="#/home" 
            className="btn btn-gold" 
            style={{ width: '100%', textDecoration: 'none', marginTop: '10px' }}
          >
            Voltar ao Início
          </a>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
      {onBack && (
        <div style={{ textAlign: 'left', marginBottom: '20px' }}>
          <button 
            onClick={onBack} 
            className="btn btn-secondary"
            style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', fontSize: '0.85rem' }}
          >
            <ArrowLeft size={16} />
            Voltar ao Painel
          </button>
        </div>
      )}
      
      {/* Hero Welcome */}
      <div 
        className="glass-card" 
        style={{ 
          padding: '40px 20px', 
          textAlign: 'center', 
          marginBottom: '30px', 
          background: 'linear-gradient(135deg, rgba(27, 94, 32, 0.08) 0%, rgba(198, 148, 62, 0.08) 100%)',
          border: '1px solid var(--border)'
        }}
      >
        <Sparkles size={32} style={{ color: 'var(--accent-gold)', marginBottom: '12px' }} />
        <h2 style={{ fontSize: '2.2rem', fontFamily: 'var(--font-serif)', fontStyle: 'italic', color: 'var(--text-h)', marginBottom: '10px' }}>
          Memórias de um Dia Incrível!
        </h2>
        <p style={{ color: 'var(--text)', maxWidth: '600px', margin: '0 auto 20px', fontSize: '1rem' }}>
          Olá, <strong>{getFirstName(booking.clientName)}</strong>! Reunimos aqui tudo o que vivemos no nosso passeio fluvial pela foz do Rio Guamá. Guarde esse link para nunca esquecer as histórias que a floresta nos contou.
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Calendar size={16} /> {formatDateSafely(booking.date)}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Compass size={16} /> Rio Guamá & Furo da Paciência
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <ShieldCheck size={16} className="text-emerald-600" /> Grupo de {booking.passengers} Pessoas
          </span>
        </div>
      </div>

      {/* Google Review Callout */}
      <div 
        className="glass-card" 
        style={{ 
          padding: '24px', 
          marginBottom: '30px', 
          textAlign: 'center',
          background: 'linear-gradient(135deg, rgba(255, 184, 0, 0.04) 0%, rgba(122, 28, 74, 0.02) 100%)',
          border: '1px solid rgba(255, 184, 0, 0.22)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '12px'
        }}
      >
        <div style={{ fontSize: '1.5rem' }}>💚✨</div>
        <h3 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-serif)', fontStyle: 'italic', color: 'var(--text-h)', margin: 0 }}>
          Seu coração também ficou na floresta?
        </h3>
        <p style={{ color: 'var(--text)', fontSize: '0.9rem', lineHeight: '1.5', maxWidth: '650px', margin: 0 }}>
          Olá, <strong>{getFirstName(booking.clientName)}</strong>! A nossa maior alegria é compartilhar o saber tradicional e a beleza da Amazônia com você. Se a sua vivência com a comunidade do Combu foi especial, ajude a espalhar essa semente! Deixe uma avaliação carinhosa no Google para apoiar o turismo comunitário e as famílias ribeirinhas que nos receberam.
        </p>
        <a 
          href="https://www.google.com/search?q=Monotour+Bel%C3%A9m#lrd=0x92a48b94ef11749b:0xf13788c0350d2bb0,1" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="btn btn-gold"
          style={{ 
            marginTop: '8px', 
            padding: '12px 28px', 
            fontSize: '0.92rem', 
            boxShadow: '0 4px 10px rgba(255, 184, 0, 0.3)',
            textDecoration: 'none'
          }}
        >
          Escrever Avaliação no Google 🌟
        </a>
      </div>

      {/* Pós-Venda: Lembranças e Novos Roteiros */}
      <div 
        className="glass-card" 
        style={{ 
          padding: '24px 30px', 
          marginBottom: '30px', 
          textAlign: 'left',
          background: 'linear-gradient(135deg, rgba(122, 28, 74, 0.03) 0%, rgba(198, 148, 62, 0.02) 100%)',
          border: '1px solid var(--border)',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px'
        }}
      >
        <div>
          <span style={{ color: 'var(--accent-acai)', fontWeight: '700', textTransform: 'uppercase', fontSize: '0.82rem', letterSpacing: '0.12em', display: 'block', marginBottom: '6px' }}>
            QUER CONTINUAR NAVEGANDO?
          </span>
          <h3 style={{ fontSize: '1.45rem', fontFamily: 'var(--font-serif)', color: 'var(--text-h)', margin: 0 }}>
            Lembranças locais & Próximas aventuras
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '6px', margin: 0 }}>
            Se você quer levar um pedacinho da floresta para casa ou planejar o próximo dia a bordo com a gente, confira o que preparamos:
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }} className="booking-grid">
          
          {/* Lembranças */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <h4 style={{ fontSize: '1.05rem', fontWeight: '700', color: 'var(--text-h)', borderBottom: '1px solid var(--border)', paddingBottom: '6px', margin: 0 }}>
              🎒 Lembranças da Nossa Terra
            </h4>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', border: '1px solid var(--border)', borderRadius: '6px', background: '#fff' }}>
                <div>
                  <span style={{ fontWeight: '600', fontSize: '0.85rem', display: 'block', color: 'var(--text-h)' }}>Chocolate Artesanal (Dona Nena)</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Cacau orgânico feito na Ilha do Combu</span>
                </div>
                <span style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--accent-light)' }}>R$ 25</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', border: '1px solid var(--border)', borderRadius: '6px', background: '#fff' }}>
                <div>
                  <span style={{ fontWeight: '600', fontSize: '0.85rem', display: 'block', color: 'var(--text-h)' }}>Camiseta Samaúma</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Algodão sustentável com estampa local</span>
                </div>
                <span style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--accent-light)' }}>R$ 69</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', border: '1px solid var(--border)', borderRadius: '6px', background: '#fff' }}>
                <div>
                  <span style={{ fontWeight: '600', fontSize: '0.85rem', display: 'block', color: 'var(--text-h)' }}>Garrafa Térmica Monotour</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Para evitar plásticos de uso único no rio</span>
                </div>
                <span style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--accent-light)' }}>R$ 45</span>
              </div>

            </div>
          </div>

          {/* Outros Roteiros */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <h4 style={{ fontSize: '1.05rem', fontWeight: '700', color: 'var(--text-h)', borderBottom: '1px solid var(--border)', paddingBottom: '6px', margin: 0 }}>
              🛶 Outras Vivências com a Gente
            </h4>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', border: '1px solid var(--border)', borderRadius: '6px', background: '#fff' }}>
                <div>
                  <span style={{ fontWeight: '600', fontSize: '0.85rem', display: 'block', color: 'var(--text-h)' }}>Pôr do Sol no Rio Guamá</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Entardecer no rio com queijo do Marajó</span>
                </div>
                <span style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--accent-light)' }}>R$ 120/p</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', border: '1px solid var(--border)', borderRadius: '6px', background: '#fff' }}>
                <div>
                  <span style={{ fontWeight: '600', fontSize: '0.85rem', display: 'block', color: 'var(--text-h)' }}>Centro Histórico a Pé</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Caminhada guiada e visita ao Ver-o-Peso</span>
                </div>
                <span style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--accent-light)' }}>R$ 80/p</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', border: '1px solid var(--border)', borderRadius: '6px', background: '#fff' }}>
                <div>
                  <span style={{ fontWeight: '600', fontSize: '0.85rem', display: 'block', color: 'var(--text-h)' }}>Expedição Cotijuba</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Praias de água doce e ruínas históricas</span>
                </div>
                <span style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--accent-light)' }}>R$ 160/p</span>
              </div>

            </div>
          </div>

        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '4px' }}>
          <a 
            href={`https://wa.me/5591992753444?text=Olá! Estava vendo minhas recordações do passeio e gostaria de encomendar alguns produtos / saber mais sobre as outras vivências.`}
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn btn-gold"
            style={{ padding: '12px 24px', fontSize: '0.88rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
          >
            Encomendar ou Agendar no WhatsApp 💬
          </a>
        </div>

      </div>

      {/* Grid Content */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1.2fr', gap: '30px' }} className="booking-grid">
        
        {/* Left Column: Itinerary and Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          
          {/* Paradas Visitadas */}
          <div className="glass-card" style={{ padding: '24px', textAlign: 'left' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '20px', borderBottom: '1px solid var(--border)', paddingBottom: '8px' }}>
              📍 Onde Navegamos
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', gap: '16px' }}>
                <div style={{ fontWeight: '700', color: 'var(--accent-gold)', fontSize: '1.1rem' }}>1º</div>
                <div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: '600', color: 'var(--text-h)' }}>Sítio do Seu Ladi (Boa Vista do Acará)</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Demonstração de açaí, castanha in natura e caminhada sensorial pelas Samaúmas centenárias.</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '16px' }}>
                <div style={{ fontWeight: '700', color: 'var(--accent-gold)', fontSize: '1.1rem' }}>2º</div>
                <div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: '600', color: 'var(--text-h)' }}>Almoço e Banho de Rio (Dona Rosalina)</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Delícias ribeirinhas no Resto da Ilha, com tempo livre para banho no Furo da Paciência.</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '16px' }}>
                <div style={{ fontWeight: '700', color: 'var(--accent-gold)', fontSize: '1.1rem' }}>3º</div>
                <div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: '600', color: 'var(--text-h)' }}>AME Combu (Associação de Mulheres Extrativistas)</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Saberes tradicionais da floresta na fabricação de produtos medicinais à base de andiroba.</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '16px' }}>
                <div style={{ fontWeight: '700', color: 'var(--accent-gold)', fontSize: '1.1rem' }}>4º</div>
                <div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: '600', color: 'var(--text-h)' }}>Filha do Combu (Dona Nena)</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Degustação de chocolates artesanais orgânicos no meio do igarapé.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Fauna & Flora Cards */}
          <div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '16px', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '8px' }}>
              🌿 Curiosidades que Aprendemos
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textAlign: 'left', marginBottom: '16px' }}>
              Clique nos cards abaixo para virá-los e ler os detalhes que o Leandro contou sobre cada planta ou animal!
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }} className="form-row-mobile">
              {faunaFlora.map(item => (
                <Card key={item.id} item={item} />
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Partners, Recommendations & Photo Gallery */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          
          {/* Partners Instagram */}
          <div className="glass-card" style={{ padding: '24px', textAlign: 'left' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-h)' }}>
              <InstagramLogo size={20} className="text-pink-600" /> Siga os Parceiros
            </h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
              Valorize o fomento à comunidade! Siga e compre diretamente das famílias que nos receberam:
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {partners.map(p => (
                <a 
                  key={p.id}
                  href={`https://instagram.com/${p.handle.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nav-link"
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)' }}
                >
                  <div>
                    <span style={{ fontWeight: '600', display: 'block', fontSize: '0.85rem', color: 'var(--text-h)' }}>{p.name}</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--accent-gold)' }}>{p.handle}</span>
                  </div>
                  <ExternalLink size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Dicas de Belém */}
          <div className="glass-card" style={{ padding: '24px', textAlign: 'left' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-h)' }}>
              <Compass size={20} className="text-amber-500" /> Dicas em Belém
            </h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
              Aproveite o melhor da culinária e cultura paraense na cidade:
            </p>

            <div style={{ marginBottom: '16px' }}>
              <h4 style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-h)', marginBottom: '6px' }}>📍 Gastronomia / Açaí</h4>
              <ul style={{ fontSize: '0.82rem', paddingLeft: '16px', display: 'flex', flexDirection: 'column', gap: '4px', color: 'var(--text)' }}>
                <li><strong>Ver o Açaí:</strong> O melhor açaí tradicional com peixe.</li>
                <li><strong>Iacitata:</strong> Cozinha paraense raiz e fomento alimentar.</li>
                <li><strong>Point do Açaí:</strong> Açaí e peixes na brasa impecáveis.</li>
                <li><strong>Amazônia na Cuia:</strong> Opções locais servidas na cuia típica.</li>
              </ul>
            </div>

            <div>
              <h4 style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-h)', marginBottom: '6px' }}>🎵 Shows e Cultura</h4>
              <ul style={{ fontSize: '0.82rem', paddingLeft: '16px', display: 'flex', flexDirection: 'column', gap: '4px', color: 'var(--text)' }}>
                <li><strong>Espaço Apoena & Casa Apoena:</strong> Carimbó raiz e música regional paraense ao vivo.</li>
                <li><strong>Na Maré:</strong> Visual incrível da orla de Belém com música ao vivo.</li>
              </ul>
            </div>
          </div>

          {/* Collaborative Gallery */}
          <div className="glass-card" style={{ padding: '24px', textAlign: 'left' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-h)' }}>
              <Image size={20} className="text-blue-500" /> Mural de Fotos Coletivo
            </h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
              Adicione fotos do seu grupo para montar a nossa galeria do dia!
            </p>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '16px' }}>
              {gallery.map((url, idx) => (
                <div key={idx} style={{ height: '90px', borderRadius: 'var(--radius-sm)', overflow: 'hidden', border: '1px solid var(--border)' }}>
                  <img src={url} alt={`Mural ${idx}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              ))}
            </div>

            <form onSubmit={handleAddPhoto} style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
              <input 
                type="url" 
                className="form-control" 
                style={{ padding: '6px 10px', fontSize: '0.8rem' }}
                placeholder="Cole URL da foto..."
                value={newPhotoUrl}
                onChange={(e) => setNewPhotoUrl(e.target.value)}
              />
              <button type="submit" className="btn btn-primary" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>Adicionar</button>
            </form>
            <button 
              type="button" 
              onClick={handleAddMockPhoto}
              className="btn btn-secondary" 
              style={{ width: '100%', padding: '6px 12px', fontSize: '0.8rem' }}
            >
              Simular Foto Aleatória do Dia 📸
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
