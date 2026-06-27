import React from 'react';
import { Compass, Heart, Users, Sparkles, ShieldCheck, ArrowRight, MessageSquare } from 'lucide-react';

export default function SobreView() {
  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
      
      {/* 1. HERO SECTION */}
      <section 
        className="glass-card" 
        style={{ 
          padding: '60px 30px', 
          textAlign: 'center', 
          marginBottom: '40px', 
          background: 'linear-gradient(135deg, rgba(11, 79, 54, 0.08) 0%, rgba(122, 28, 74, 0.05) 100%)',
          border: '1px solid var(--border)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px'
        }}
      >
        <Compass size={40} className="logo-monkey" style={{ marginBottom: '8px' }} />
        <h1 style={{ fontSize: '3rem', fontFamily: 'var(--font-serif)', fontStyle: 'italic', color: 'var(--text-h)', margin: 0 }}>
          Nossa Alma & Propósito
        </h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', maxWidth: '700px', lineHeight: '1.6', margin: 0 }}>
          Descubra a história e a filosofia por trás do ecoturismo de base comunitária da Monotour, unindo preservação, respeito às comunidades e acessibilidade em Libras.
        </p>
      </section>

      {/* 2. A HISTÓRIA E ESSÊNCIA */}
      <section className="booking-grid" style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '40px', marginBottom: '50px', alignItems: 'center', textAlign: 'left' }}>
        <div>
          <span style={{ color: 'var(--accent-acai)', fontWeight: '700', textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '0.12em', display: 'block', marginBottom: '8px' }}>
            QUEM CONDUZ
          </span>
          <h2 style={{ fontSize: '2.2rem', fontFamily: 'var(--font-serif)', color: 'var(--text-h)', marginBottom: '20px' }}>
            Leandro & Raquel (Mono & Monodama)
          </h2>
          <p style={{ fontSize: '1rem', color: 'var(--text)', lineHeight: '1.7', marginBottom: '16px' }}>
            Fundada pelo casal Leandro e Raquel Ferreira, a Monotour nasceu de uma paixão profunda pelas riquezas naturais e culturais do Pará. Diante do turismo tradicional de massa, que muitas vezes enxerga a floresta de forma exploratória, eles decidiram criar uma alternativa que valorizasse quem realmente vive e protege esse ecossistema.
          </p>
          <blockquote style={{ borderLeft: '4px solid var(--accent-acai)', paddingLeft: '20px', margin: '24px 0', fontStyle: 'italic', color: 'var(--text-h)', fontSize: '1.1rem', fontWeight: '500' }}>
            "Mais do que um passeio de barco, criamos pontes de afeto e respeito entre quem visita e quem vive na floresta. Acreditamos que a Amazônia só permanece em pé se as suas comunidades forem valorizadas."
          </blockquote>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="glass-card" style={{ padding: '30px', background: '#fff', border: '1px solid var(--border)' }}>
            <h3 style={{ fontSize: '1.2rem', color: 'var(--text-h)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Heart size={20} className="text-pink-600" /> Sensibilidade Social
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: '1.6', margin: 0 }}>
              Nossos parceiros locais — Seu Ladi no extrativismo de açaí, Dona Nena no cacau orgânico, Dona Rosa na cozinha do Restô da Ilha e a associação de barqueiros — não são "atrações turísticas". São famílias reais, nossos sócios, que nos recebem em suas casas para compartilhar histórias de vida.
            </p>
          </div>
          <div className="glass-card" style={{ padding: '30px', background: '#fff', border: '1px solid var(--border)' }}>
            <h3 style={{ fontSize: '1.2rem', color: 'var(--text-h)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldCheck size={20} className="text-emerald-700" /> Turismo de Impacto Comunitário
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: '1.6', margin: 0 }}>
              Garantimos um repasse financeiro justo e direto para cada morador envolvido no roteiro. O turismo de base comunitária da Monotour é uma ferramenta ativa de geração de renda e fortalecimento da bioeconomia local.
            </p>
          </div>
        </div>
      </section>

      {/* 3. MANIFESTO E CRENÇAS */}
      <section className="glass-card" style={{ padding: '40px 30px', marginBottom: '50px', background: 'rgba(11, 79, 54, 0.02)', border: '1px solid var(--border)', textAlign: 'left' }}>
        <h2 style={{ fontSize: '1.8rem', fontFamily: 'var(--font-serif)', color: 'var(--text-h)', marginBottom: '30px', textAlign: 'center' }}>
          No que Acreditamos (Nosso Manifesto)
        </h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }} className="booking-grid">
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--text-h)', marginBottom: '8px' }}>🌱 1. Protagonismo Local</h4>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: '1.6', margin: 0 }}>
              Os moradores das ilhas são os guardiões da Amazônia. Damos a eles o controle e a voz principal sobre as narrativas que os cercam.
            </p>
          </div>
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--text-h)', marginBottom: '8px' }}>🤟 2. Acessibilidade Comunicacional</h4>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: '1.6', margin: 0 }}>
              A Monotour é a única agência em Belém com atendimento e roteiros totalmente acessíveis em Libras, garantindo que o turismo na floresta seja verdadeiramente para todos.
            </p>
          </div>
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--text-h)', marginBottom: '8px' }}>🌿 3. Bioeconomia em Pé</h4>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: '1.6', margin: 0 }}>
              Valorizamos o extrativismo consciente de produtos da floresta (como andiroba, cacau e castanha), provando que o ecoturismo e a preservação ambiental são financeiramente sustentáveis.
            </p>
          </div>
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--text-h)', marginBottom: '8px' }}>🛶 4. Conexão Genuína</h4>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: '1.6', margin: 0 }}>
              Evitamos o turismo comercial estressante. Navegamos em lanchas rápidas e confortáveis, mas sem pressa, permitindo tempo para banho de rio, escuta atenta das Samaúmas e contemplação.
            </p>
          </div>
        </div>
      </section>

      {/* 4. A VOZ DOS CLIENTES (GOOGLE REVIEWS STUDY) */}
      <section style={{ marginBottom: '50px', textAlign: 'left' }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <span style={{ color: 'var(--accent-acai)', fontWeight: '700', textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '0.12em', display: 'block', marginBottom: '8px' }}>
            PROVA SOCIAL
          </span>
          <h2 style={{ fontSize: '2.2rem', fontFamily: 'var(--font-serif)', color: 'var(--text-h)', margin: 0 }}>
            A Voz de Quem já Navegou Conosco
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '8px' }}>
            Nossa sensibilidade e impacto são refletidos no carinho das mais de 491 avaliações de 5 estrelas no Google:
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }} className="booking-grid">
          
          <div className="glass-card" style={{ padding: '24px', background: '#fff', border: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', gap: '2px', color: '#c6943e', marginBottom: '10px' }}>
              {[...Array(5)].map((_, i) => <span key={i}>★</span>)}
            </div>
            <p style={{ fontSize: '0.88rem', fontStyle: 'italic', color: 'var(--text)', lineHeight: '1.6', marginBottom: '12px' }}>
              "Estávamos procurando uma agência que nos proporcionasse uma experiência mais imersiva, que fosse além do passeio básico, e a Monotour foi simplesmente maravilhosa nisso. Tivemos contato real com a natureza e com a cultura local... Saímos com a sensação de ter realmente vivido o Combu, e não apenas visitado."
            </p>
            <strong style={{ fontSize: '0.8rem', color: 'var(--text-h)' }}>— Rafaella Nascimento</strong>
          </div>

          <div className="glass-card" style={{ padding: '24px', background: '#fff', border: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', gap: '2px', color: '#c6943e', marginBottom: '10px' }}>
              {[...Array(5)].map((_, i) => <span key={i}>★</span>)}
            </div>
            <p style={{ fontSize: '0.88rem', fontStyle: 'italic', color: 'var(--text)', lineHeight: '1.6', marginBottom: '12px' }}>
              "A Monotour é muito mais que um passeio, é uma imersão cultural, uma vivência. Valeu cada momento no dia de hoje, conhecendo um pouco mais do meu Brasil. Gratidão ao senhor Ladi, d. Nena, d. Rosa... Raquel é uma paraense arretada com sangue nos olhos para defender sua terra e cultura."
            </p>
            <strong style={{ fontSize: '0.8rem', color: 'var(--text-h)' }}>— Idalice Santos</strong>
          </div>

          <div className="glass-card" style={{ padding: '24px', background: '#fff', border: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', gap: '2px', color: '#c6943e', marginBottom: '10px' }}>
              {[...Array(5)].map((_, i) => <span key={i}>★</span>)}
            </div>
            <p style={{ fontSize: '0.88rem', fontStyle: 'italic', color: 'var(--text)', lineHeight: '1.6', marginBottom: '12px' }}>
              "Foi uma das experiências mais maravilhosas que já vivi! Me senti acolhida, abraçada e muito bem recebida. Que equipe querida, divertida, calorosa... Queria poder ficar mais, conhecer mais, aprender mais. Amei estar com a equipe Monotour e ter explorado o Combu com vocês."
            </p>
            <strong style={{ fontSize: '0.8rem', color: 'var(--text-h)' }}>— Juliana Pinheiro</strong>
          </div>

        </div>
      </section>

      {/* 5. FINAL CALL TO ACTION */}
      <section 
        className="glass-card" 
        style={{ 
          padding: '40px 20px', 
          textAlign: 'center', 
          background: 'linear-gradient(135deg, rgba(11, 79, 54, 0.06) 0%, rgba(198, 148, 62, 0.05) 100%)',
          border: '1px solid var(--border)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px'
        }}
      >
        <Sparkles size={28} style={{ color: 'var(--accent-gold)' }} />
        <h2 style={{ fontSize: '1.8rem', fontFamily: 'var(--font-serif)', color: 'var(--text-h)', margin: 0 }}>
          Viva essa Experiência no Combu
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '600px', margin: 0 }}>
          Navegue conosco e descubra a força, os sabores e as histórias da floresta do ponto de vista de quem a protege todos os dias.
        </p>
        <button 
          onClick={() => window.location.hash = '#/reserva'} 
          className="btn btn-gold"
          style={{ padding: '14px 30px', fontSize: '1rem', marginTop: '8px' }}
        >
          Agendar Minha Vivência <ArrowRight size={16} />
        </button>
      </section>

    </div>
  );
}
