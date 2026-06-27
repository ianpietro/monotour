import React from 'react';
import { Compass, Heart, Users, Sparkles, ShieldCheck, ArrowRight } from 'lucide-react';

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
          O que a gente acredita
        </h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', maxWidth: '700px', lineHeight: '1.6', margin: 0 }}>
          Conheça a história da Monotour e como criamos um jeito diferente de viajar, focado em ouvir quem mora na ilha, proteger a floresta e receber todo mundo com acessibilidade em Libras.
        </p>
      </section>

      {/* 2. A HISTÓRIA E ESSÊNCIA */}
      <section className="booking-grid" style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '40px', marginBottom: '50px', alignItems: 'center', textAlign: 'left' }}>
        <div>
          <span style={{ color: 'var(--accent-acai)', fontWeight: '700', textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '0.12em', display: 'block', marginBottom: '8px' }}>
            QUEM CRIOU
          </span>
          <h2 style={{ fontSize: '2.2rem', fontFamily: 'var(--font-serif)', color: 'var(--text-h)', marginBottom: '20px' }}>
            A história de Leandro & Raquel
          </h2>
          <p style={{ fontSize: '1rem', color: 'var(--text)', lineHeight: '1.7', marginBottom: '16px' }}>
            A Monotour nasceu do nosso amor profundo por Belém, pelas ilhas e pela cultura paraense. Como casal de amazônidas, víamos o turismo convencional muitas vezes tratar a floresta e as pessoas como meras atrações comerciais. Decidimos fazer diferente: queríamos um passeio que respeitasse o tempo do rio, valorizasse os saberes locais e trouxesse as comunidades ribeirinhas para o centro da história.
          </p>
          <blockquote style={{ borderLeft: '4px solid var(--accent-acai)', paddingLeft: '20px', margin: '24px 0', fontStyle: 'italic', color: 'var(--text-h)', fontSize: '1.1rem', fontWeight: '500' }}>
            "Mais do que levar pessoas de barco, a nossa vontade é aproximar histórias e criar laços de afeto e respeito. Acreditamos que a floresta só fica de pé se quem cuida dela for respeitado e valorizado."
          </blockquote>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="glass-card" style={{ padding: '30px', background: '#fff', border: '1px solid var(--border)' }}>
            <h3 style={{ fontSize: '1.2rem', color: 'var(--text-h)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Heart size={20} className="text-pink-600" /> Respeito e afeto na beira do rio
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: '1.6', margin: 0 }}>
              Quando visitamos o Seu Ladi no sítio dele, provamos o chocolate da Dona Nena ou sentamos para almoçar na Dona Rosa, não estamos visitando 'pontos turísticos'. Estamos sendo recebidos por famílias parceiras, em suas casas, ouvindo histórias reais de quem vive a Amazônia no dia a dia.
            </p>
          </div>
          <div className="glass-card" style={{ padding: '30px', background: '#fff', border: '1px solid var(--border)' }}>
            <h3 style={{ fontSize: '1.2rem', color: 'var(--text-h)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldCheck size={20} className="text-emerald-700" /> Dinheiro que fica na comunidade
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: '1.6', margin: 0 }}>
              Fazemos questão de remunerar cada parceiro, barqueiro e morador de forma justa e direta. Acreditamos no turismo que fortalece a economia da própria ilha, gerando renda e mantendo vivas as tradições e a culinária local.
            </p>
          </div>
        </div>
      </section>

      {/* 3. MANIFESTO E CRENÇAS */}
      <section className="glass-card" style={{ padding: '40px 30px', marginBottom: '50px', background: 'rgba(11, 79, 54, 0.02)', border: '1px solid var(--border)', textAlign: 'left' }}>
        <h2 style={{ fontSize: '1.8rem', fontFamily: 'var(--font-serif)', color: 'var(--text-h)', marginBottom: '30px', textAlign: 'center' }}>
          O que a gente acredita e pratica todos os dias
        </h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }} className="booking-grid">
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--text-h)', marginBottom: '8px' }}>🌱 1. Voz ativa para quem mora aqui</h4>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: '1.6', margin: 0 }}>
              Os moradores das ilhas são os verdadeiros guardiões da floresta. Por isso, são eles que contam suas próprias histórias, do jeito que elas são, sem roteiros artificiais.
            </p>
          </div>
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--text-h)', marginBottom: '8px' }}>🤟 2. Acessibilidade de verdade em Libras</h4>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: '1.6', margin: 0 }}>
              Somos a única agência em Belém totalmente preparada para receber e guiar viajantes surdos em Libras. Queremos que a experiência de sentir a Amazônia seja acessível a todos.
            </p>
          </div>
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--text-h)', marginBottom: '8px' }}>🌿 3. Floresta em pé e valorizada</h4>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: '1.6', margin: 0 }}>
              Apoiamos e incentivamos o extrativismo artesanal — como a produção orgânica de cacau e o açaí colhido na hora. Mostramos que a floresta viva gera mais valor do que derrubada.
            </p>
          </div>
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--text-h)', marginBottom: '8px' }}>🛶 4. Sem pressa e com segurança</h4>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: '1.6', margin: 0 }}>
              Nossos passeios são feitos em lanchas rápidas e cobertas, garantindo total conforto. Mas navegamos sem correria, com tempo de sobra para banho de rio, conversas longas e descanso.
            </p>
          </div>
        </div>
      </section>

      {/* 4. A VOZ DOS CLIENTES (GOOGLE REVIEWS STUDY) */}
      <section style={{ marginBottom: '50px', textAlign: 'left' }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <span style={{ color: 'var(--accent-acai)', fontWeight: '700', textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '0.12em', display: 'block', marginBottom: '8px' }}>
            QUEM JÁ FOI
          </span>
          <h2 style={{ fontSize: '2.2rem', fontFamily: 'var(--font-serif)', color: 'var(--text-h)', margin: 0 }}>
            O que as pessoas contam sobre a vivência
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '8px' }}>
            Ficamos muito felizes em ver que o carinho e o cuidado que colocamos no passeio são sentidos por quem nos visita:
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }} className="booking-grid">
          
          <div className="glass-card" style={{ padding: '24px', background: '#fff', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', gap: '2px', color: '#c6943e', marginBottom: '4px' }}>
              {[...Array(5)].map((_, i) => <span key={i}>★</span>)}
            </div>
            <p style={{ fontSize: '0.88rem', fontStyle: 'italic', color: 'var(--text)', lineHeight: '1.6', margin: 0, marginBottom: '6px' }}>
              "Estávamos procurando uma agência que nos proporcionasse uma experiência mais imersiva, que fosse além do passeio básico, e a Monotour foi simplesmente maravilhosa nisso. Tivemos contato real com a natureza e com a cultura local... Saímos com a sensação de ter realmente vivido o Combu, e não apenas visitado."
            </p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '8px' }}>
              <strong style={{ fontSize: '0.8rem', color: 'var(--text-h)' }}>— Rafaella Nascimento</strong>
              <a 
                href="https://www.google.com/search?q=Monotour+Bel%C3%A9m#lrd=0x92a48f538c5670bf:0xb2011b8420db3937,1,,,," 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ fontSize: '0.72rem', color: 'var(--accent-gold)', textDecoration: 'none', fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '2px' }}
              >
                Ver no Google ↗
              </a>
            </div>
          </div>

          <div className="glass-card" style={{ padding: '24px', background: '#fff', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', gap: '2px', color: '#c6943e', marginBottom: '4px' }}>
              {[...Array(5)].map((_, i) => <span key={i}>★</span>)}
            </div>
            <p style={{ fontSize: '0.88rem', fontStyle: 'italic', color: 'var(--text)', lineHeight: '1.6', margin: 0, marginBottom: '6px' }}>
              "A Monotour é muito mais que um passeio, é uma imersão cultural, uma vivência. Valeu cada momento no dia de hoje, conhecendo um pouco mais do meu Brasil. Gratidão ao senhor Ladi, d. Nena, d. Rosa... Raquel é uma paraense arretada com sangue nos olhos para defender sua terra e cultura."
            </p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '8px' }}>
              <strong style={{ fontSize: '0.8rem', color: 'var(--text-h)' }}>— Idalice Santos</strong>
              <a 
                href="https://www.google.com/search?q=Monotour+Bel%C3%A9m#lrd=0x92a48f538c5670bf:0xb2011b8420db3937,1,,,," 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ fontSize: '0.72rem', color: 'var(--accent-gold)', textDecoration: 'none', fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '2px' }}
              >
                Ver no Google ↗
              </a>
            </div>
          </div>

          <div className="glass-card" style={{ padding: '24px', background: '#fff', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', gap: '2px', color: '#c6943e', marginBottom: '4px' }}>
              {[...Array(5)].map((_, i) => <span key={i}>★</span>)}
            </div>
            <p style={{ fontSize: '0.88rem', fontStyle: 'italic', color: 'var(--text)', lineHeight: '1.6', margin: 0, marginBottom: '6px' }}>
              "Foi uma das experiências mais maravilhosas que já vivi! Me senti acolhida, abraçada e muito bem recebida. Que equipe querida, divertida, calorosa... Queria poder ficar mais, conhecer mais, aprender mais. Amei estar com a equipe Monotour e ter explorado o Combu com vocês."
            </p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '8px' }}>
              <strong style={{ fontSize: '0.8rem', color: 'var(--text-h)' }}>— Juliana Pinheiro</strong>
              <a 
                href="https://www.google.com/search?q=Monotour+Bel%C3%A9m#lrd=0x92a48f538c5670bf:0xb2011b8420db3937,1,,,," 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ fontSize: '0.72rem', color: 'var(--accent-gold)', textDecoration: 'none', fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '2px' }}
              >
                Ver no Google ↗
              </a>
            </div>
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
          Venha viver o Combu com a gente
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '600px', margin: 0 }}>
          Navegue com a gente e conheça o rio, os sabores e as histórias da ilha pelos olhos de quem vive e protege este lugar todos os dias.
        </p>
        <button 
          onClick={() => window.location.hash = '#/reserva'} 
          className="btn btn-gold"
          style={{ padding: '14px 30px', fontSize: '1rem', marginTop: '8px' }}
        >
          Quero reservar meu passeio <ArrowRight size={16} />
        </button>
      </section>

    </div>
  );
}
