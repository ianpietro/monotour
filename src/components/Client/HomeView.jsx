import React, { useState } from 'react';
import { 
  Compass, 
  Heart, 
  Users, 
  Globe, 
  ArrowRight, 
  Eye, 
  Leaf, 
  Shield, 
  CheckCircle, 
  Info, 
  Sparkles, 
  MessageCircle, 
  ChevronDown, 
  ChevronUp, 
  Check, 
  Coffee, 
  Utensils, 
  MapPin, 
  Star,
  ShieldCheck,
  Calendar
} from 'lucide-react';

export default function HomeView() {
  const [activeTab, setActiveTab] = useState('comunidade');
  const [openFaq, setOpenFaq] = useState(null);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const tabsContent = {
    comunidade: {
      title: "Turismo de Base Comunitária (TBC)",
      quote: "A comunidade não é o cenário do passeio. Ela é a nossa anfitriã.",
      text: "Diferente das agências tradicionais que apenas passam pelas ilhas, a Monotour integra o visitante à rotina e à economia local. Desenvolvemos o turismo de base comunitária, onde os moradores ribeirinhos definem como querem receber os visitantes, lideram as apresentações e são remunerados diretamente. Isso gera pertencimento, orgulho e preservação da cultura local.",
      impact: "Cerca de 60% do valor de cada reserva é distribuído diretamente entre os parceiros locais (alimentação, guias, artesãos e pilotos)."
    },
    libras: {
      title: "Acessibilidade Comunicacional (Libras)",
      quote: "A floresta tem voz, e queremos que todos possam ouvi-la.",
      text: "Acreditamos que a Amazônia e suas riquezas devem ser acessíveis a todos. Por isso, a Monotour é pioneira na inclusão comunicacional, oferecendo guias e intérpretes especializados em Libras (Língua Brasileira de Sinais) sob demanda. Todo o nosso roteiro, desde a explicação sobre as Samaúmas até a história da extração do cacau, é traduzido com profundo respeito e precisão.",
      impact: "Primeira agência de turismo fluvial receptivo do Pará totalmente adaptada e acolhedora para a comunidade surda."
    },
    bioeconomia: {
      title: "Floresta em Pé e Bioeconomia",
      quote: "A floresta vale muito mais em pé do que derrubada.",
      text: "Nosso passeio demonstra a viabilidade prática da bioeconomia. No Sítio do Seu Ladi, mostramos o extrativismo sustentável do açaí e da castanha. Na AME Combu, apoiamos a produção de óleos e cosméticos medicinais a partir da andiroba. Com a Dona Nena, vivenciamos o cacau orgânico. Cada parada mostra que a conservação ambiental gera renda e dignidade.",
      impact: "Apoiamos ativamente o desenvolvimento sustentável e a preservação de Samaúmas e seringueiras centenárias."
    }
  };

  const faqItems = [
    {
      q: "O passeio inclui alimentação?",
      a: "Sim! Um almoço ribeirinho completo preparado pela Dona Rosalina (peixe frito, caldeirada paraense, opções vegetarianas/veganas) está 100% incluso no valor da reserva, bem como água a bordo."
    },
    {
      q: "Como é a segurança a bordo da embarcação?",
      a: "Navegamos em uma lancha confortável, totalmente legalizada, com marinheiro experiente da própria comunidade, extintores de incêndio e coletes salva-vidas homologados pela Marinha em todos os tamanhos (P, M, G, GG) ajustados individualmente."
    },
    {
      q: "O passeio é acessível para pessoas surdas?",
      a: "Sim! Somos pioneiros em acessibilidade comunicacional na região. Oferecemos suporte completo com guias intérpretes de Libras (Língua Brasileira de Sinais) sob demanda no momento da reserva."
    },
    {
      q: "Qual é a duração e o que devo levar?",
      a: "O passeio dura aproximadamente 8 horas (das 09h00 às 17h00). Recomendamos levar roupas leves, calçado fechado confortável para a caminhada na floresta, repelente, protetor solar e casaco leve para o vento do fim de tarde."
    },
    {
      q: "O que acontece em caso de chuva?",
      a: "Em Belém, a chuva faz parte da nossa rotina e chove quase todo dia! É um evento normal, diário e super bem-vindo para refrescar a floresta. Nossas embarcações possuem cobertura de lona protetora de alta resistência e o passeio ocorre normalmente. Afinal, ver e ouvir a chuva na floresta é uma experiência linda e muito típica. Apenas em caso de tempestades ou eventos climáticos extremos nós remarcamos o passeio sem custos ou devolvemos o valor integral."
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '70px', maxWidth: '1100px', margin: '0 auto', padding: '10px 15px', color: 'var(--text)' }}>
      
      {/* Hero Section */}
      <section 
        className="glass-card" 
        style={{ 
          padding: '80px 40px', 
          textAlign: 'center', 
          backgroundImage: 'linear-gradient(180deg, rgba(11, 79, 54, 0.5) 0%, rgba(11, 79, 54, 0.85) 100%), url("/assets/combu_nature_tour.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '24px',
          position: 'relative',
          overflow: 'hidden',
          minHeight: '620px',
          justifyContent: 'center',
          boxShadow: 'var(--shadow-lg)'
        }}
      >
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '850px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
          <span 
            className="badge" 
            style={{ 
              fontSize: '0.85rem', 
              textTransform: 'uppercase', 
              letterSpacing: '0.12em', 
              padding: '8px 20px', 
              fontWeight: '700', 
              background: 'var(--accent-gold)', 
              color: '#000',
              borderRadius: '20px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 4px 10px rgba(0,0,0,0.15)'
            }}
          >
            <Sparkles size={14} /> Imersão Cultural de Base Comunitária
          </span>
          <h1 
            style={{ 
              fontSize: '3.6rem', 
              fontFamily: 'var(--font-serif)', 
              color: '#FFFFFF', 
              lineHeight: '1.15', 
              fontWeight: '700',
              textShadow: '0 3px 6px rgba(0,0,0,0.4)',
              margin: '10px 0 5px 0'
            }}
          >
            Passeio Ilha do Combu & Rio Guamá
          </h1>
          <p style={{ fontSize: '1.25rem', color: '#F3F4F6', maxWidth: '750px', lineHeight: '1.6', textShadow: '0 2px 4px rgba(0,0,0,0.3)', fontWeight: '400' }}>
            Navegue pelos furos fluviais, caminhe sob as Samaúmas centenárias, conheça o extrativismo local de açaí e castanha, e veja a produção de cacau orgânico com os próprios produtores. Uma vivência inesquecível a apenas 15 minutos de Belém.
          </p>
          
          {/* Google Trust Rating Badge */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', background: 'rgba(0,0,0,0.35)', padding: '10px 20px', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(255,255,255,0.12)', margin: '8px 0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
              <strong style={{ fontSize: '1.05rem', color: '#fff' }}>Monotour Belém</strong>
              <span style={{ fontSize: '1.05rem', fontWeight: '800', color: 'var(--accent-gold)' }}>5,0</span>
              <div style={{ display: 'flex', color: 'var(--accent-gold)', gap: '1px' }}>
                {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" style={{ border: 'none' }} />)}
              </div>
              <a 
                href="https://www.google.com/search?q=Monotour+Bel%C3%A9m#lrd=0x92a48b94ef11749b:0xf13788c0350d2bb0,1" 
                target="_blank" 
                rel="noopener noreferrer" 
                style={{ fontSize: '0.85rem', color: '#93c5fd', fontWeight: '600', textDecoration: 'underline' }}
              >
                491 avaliações no Google
              </a>
            </div>
            <span style={{ fontSize: '0.75rem', color: '#e5e7eb' }}>Agência de turismo em Belém, Pará</span>
          </div>

          <div style={{ display: 'flex', gap: '16px', marginTop: '24px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button 
              onClick={() => window.location.hash = '#/reserva'} 
              className="btn btn-gold"
              style={{ 
                padding: '18px 36px', 
                fontSize: '1.1rem',
                fontWeight: '700',
                border: 'none',
                boxShadow: '0 5px 15px rgba(255, 184, 0, 0.4)',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.2s ease-in-out',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              Garantir Minha Vaga <ArrowRight size={18} />
            </button>
            <button 
              onClick={() => scrollToSection('roteiro')} 
              className="btn"
              style={{ 
                padding: '18px 36px', 
                fontSize: '1.1rem',
                fontWeight: '600',
                border: '2px solid rgba(255, 255, 255, 0.5)',
                background: 'rgba(255, 255, 255, 0.1)',
                color: '#FFFFFF',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.2s ease-in-out',
                backdropFilter: 'blur(5px)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                e.currentTarget.style.border = '2px solid #FFFFFF';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.border = '2px solid rgba(255, 255, 255, 0.5)';
              }}
            >
              Ver Roteiro Detalhado
            </button>
          </div>
        </div>
      </section>

      {/* O Manifesto Section */}
      <section id="manifesto" style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '40px', alignItems: 'center', textAlign: 'left' }} className="booking-grid">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <span style={{ color: 'var(--accent-acai)', fontWeight: '700', textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '0.12em', display: 'block' }}>
            🌿 TURISMO COM PROPÓSITO
          </span>
          <h2 style={{ fontSize: '2.6rem', fontFamily: 'var(--font-serif)', color: 'var(--text-h)', lineHeight: '1.2' }}>
            Conexão e Impacto Social
          </h2>
          <p style={{ color: 'var(--text)', fontSize: '1.1rem', lineHeight: '1.7' }}>
            A Monotour nasceu de uma inconformidade. Percebemos que o turismo convencional em Belém costumava usar as ilhas apenas como cenário exótico, deixando quase nada de retorno financeiro e social para os verdadeiros guardiões da floresta.
          </p>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: '1.6' }}>
            Nossa missão é inverter essa lógica: integrar o viajante com respeito, gerando renda justa direta para barqueiros, extrativistas e cozinheiros locais ribeirinhos.
          </p>
        </div>

        <div 
          className="glass-card" 
          style={{ 
            padding: '36px 28px', 
            background: 'linear-gradient(135deg, rgba(11, 79, 54, 0.05) 0%, rgba(122, 28, 74, 0.03) 100%)', 
            borderLeft: '6px solid var(--accent-light)',
            boxShadow: 'var(--shadow-md)',
            borderRadius: 'var(--radius-md)',
            textAlign: 'left'
          }}
        >
          <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '1.3rem', color: 'var(--text-h)', lineHeight: '1.6', marginBottom: '20px' }}>
            "Nós não levamos você para olhar a floresta de longe. Nós te levamos para caminhar descalço sob a sombra das Samaúmas centenárias, ouvir a história das andirobeiras, saborear o açaí batido na hora com quem o extrai, e provar o chocolate orgânico produzido no próprio igarapé."
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ width: '40px', height: '1.5px', background: 'var(--accent-acai)' }}></span>
            <span style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-h)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Leandro e Raquel (Mono & Monodama)
            </span>
          </div>
        </div>
      </section>

      {/* Selo de Elogios - 4 Pilares da Experiência */}
      <section style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '30px' }}>
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <span style={{ color: 'var(--accent-acai)', fontWeight: '700', textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '0.12em' }}>
            MÉDIA 5.0 ESTRELAS NO GOOGLE
          </span>
          <h2 style={{ fontSize: '2.4rem', fontFamily: 'var(--font-serif)', color: 'var(--text-h)' }}>
            O que as pessoas mais elogiam no nosso passeio
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>
            Olhando as nossas 491 avaliações de 5 estrelas no Google, percebemos que o que realmente toca os viajantes são estes detalhes:
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }} className="booking-grid">
          
          <div className="glass-card" style={{ padding: '24px', display: 'flex', gap: '16px', flexDirection: 'column', background: '#fff', border: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ background: 'rgba(122, 28, 74, 0.08)', color: 'var(--accent-acai)', padding: '10px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Users size={24} />
              </div>
              <strong style={{ fontSize: '1.1rem', color: 'var(--text-h)', fontWeight: '650' }}>Encontro com as famílias locais</strong>
            </div>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: '1.6', margin: 0 }}>
              Aqui não tem nada ensaiado. Você vai entrar na casa das pessoas, conversar de perto com o Seu Ladi, provar o chocolate da Dona Nena e almoçar na Dona Rosa. É um dia compartilhado com quem vive no rio, do jeito que é de verdade.
            </p>
          </div>

          <div className="glass-card" style={{ padding: '24px', display: 'flex', gap: '16px', flexDirection: 'column', background: '#fff', border: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ background: 'rgba(11, 79, 54, 0.08)', color: 'var(--accent-light)', padding: '10px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Sparkles size={24} />
              </div>
              <strong style={{ fontSize: '1.1rem', color: 'var(--text-h)', fontWeight: '650' }}>A prosa do Leandro e da Raquel</strong>
            </div>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: '1.6', margin: 0 }}>
              O Leandro e a Raquel não são aqueles guias tradicionais que só mostram caminhos. Eles conhecem cada canto, planta e história do lugar. O papo é leve, carinhoso e você vai sair daqui entendendo os segredos de árvores gigantes como a Samaúma.
            </p>
          </div>

          <div className="glass-card" style={{ padding: '24px', display: 'flex', gap: '16px', flexDirection: 'column', background: '#fff', border: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ background: 'rgba(255, 184, 0, 0.08)', color: '#d99e00', padding: '10px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Utensils size={24} />
              </div>
              <strong style={{ fontSize: '1.1rem', color: 'var(--text-h)', fontWeight: '650' }}>Almoço com os pés na água</strong>
            </div>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: '1.6', margin: 0 }}>
              O almoço no Restô da Ilha, feito pela Dona Rosa, é daqueles de comer rezando. Peixe frito na hora, temperos da terra e aquela brisa boa do rio. É para saborear sem pressa, de pés descalços e descansando na rede depois.
            </p>
          </div>

          <div className="glass-card" style={{ padding: '24px', display: 'flex', gap: '16px', flexDirection: 'column', background: '#fff', border: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ background: 'rgba(11, 79, 54, 0.08)', color: 'var(--accent-light)', padding: '10px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CheckCircle size={24} />
              </div>
              <strong style={{ fontSize: '1.1rem', color: 'var(--text-h)', fontWeight: '650' }}>Cuidado, respeito e lancha boa</strong>
            </div>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: '1.6', margin: 0 }}>
              Valorizamos de verdade quem trabalha conosco: todo ribeirinho e barqueiro recebe de forma justa. Nossas lanchas são rápidas, seguras e muito confortáveis, com coletes adequados para todos e guiamento completo em Libras.
            </p>
          </div>

        </div>
      </section>

      {/* O que está incluso */}
      <section style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '30px' }}>
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <span style={{ color: 'var(--accent-acai)', fontWeight: '700', textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '0.12em' }}>
            COMPLETO E EXCLUSIVO
          </span>
          <h2 style={{ fontSize: '2.4rem', fontFamily: 'var(--font-serif)', color: 'var(--text-h)' }}>
            O que está incluso na sua experiência
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>
            Tudo foi pensado para que sua única preocupação seja absorver a floresta e relaxar:
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          <div className="glass-card" style={{ padding: '24px', display: 'flex', gap: '16px', alignItems: 'flex-start', background: '#fff', border: '1px solid var(--border)' }}>
            <div style={{ background: 'rgba(11, 79, 54, 0.08)', color: 'var(--accent-light)', padding: '10px', borderRadius: '8px' }}>
              <Compass size={24} />
            </div>
            <div>
              <strong style={{ fontSize: '1.05rem', color: 'var(--text-h)', display: 'block', marginBottom: '4px' }}>Transporte Fluvial</strong>
              <span style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: '1.5', display: 'block' }}>
                Navegação segura em lancha confortável de ida e volta, partindo de Belém.
              </span>
            </div>
          </div>

          <div className="glass-card" style={{ padding: '24px', display: 'flex', gap: '16px', alignItems: 'flex-start', background: '#fff', border: '1px solid var(--border)' }}>
            <div style={{ background: 'rgba(11, 79, 54, 0.08)', color: 'var(--accent-light)', padding: '10px', borderRadius: '8px' }}>
              <Utensils size={24} />
            </div>
            <div>
              <strong style={{ fontSize: '1.05rem', color: 'var(--text-h)', display: 'block', marginBottom: '4px' }}>Almoço Ribeirinho Completo</strong>
              <span style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: '1.5', display: 'block' }}>
                Refeição deliciosa com peixe fresco, farinha d'água e guarnições locais preparados artesanalmente pela Dona Rosalina.
              </span>
            </div>
          </div>

          <div className="glass-card" style={{ padding: '24px', display: 'flex', gap: '16px', alignItems: 'flex-start', background: '#fff', border: '1px solid var(--border)' }}>
            <div style={{ background: 'rgba(11, 79, 54, 0.08)', color: 'var(--accent-light)', padding: '10px', borderRadius: '8px' }}>
              <Leaf size={24} />
            </div>
            <div>
              <strong style={{ fontSize: '1.05rem', color: 'var(--text-h)', display: 'block', marginBottom: '4px' }}>Degustação de Cacau e Chocolate</strong>
              <span style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: '1.5', display: 'block' }}>
                Visita guiada e degustação no famoso sítio de chocolate orgânico artesanal de Dona Nena na Ilha do Combu.
              </span>
            </div>
          </div>

          <div className="glass-card" style={{ padding: '24px', display: 'flex', gap: '16px', alignItems: 'flex-start', background: '#fff', border: '1px solid var(--border)' }}>
            <div style={{ background: 'rgba(11, 79, 54, 0.08)', color: 'var(--accent-light)', padding: '10px', borderRadius: '8px' }}>
              <Users size={24} />
            </div>
            <div>
              <strong style={{ fontSize: '1.05rem', color: 'var(--text-h)', display: 'block', marginBottom: '4px' }}>Condutores do Território</strong>
              <span style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: '1.5', display: 'block' }}>
                Mediação conduzida por Leandro e Raquel, com profundo conhecimento da fauna, flora e vivência local.
              </span>
            </div>
          </div>

          <div className="glass-card" style={{ padding: '24px', display: 'flex', gap: '16px', alignItems: 'flex-start', background: '#fff', border: '1px solid var(--border)' }}>
            <div style={{ background: 'rgba(11, 79, 54, 0.08)', color: 'var(--accent-light)', padding: '10px', borderRadius: '8px' }}>
              <Globe size={24} />
            </div>
            <div>
              <strong style={{ fontSize: '1.05rem', color: 'var(--text-h)', display: 'block', marginBottom: '4px' }}>Intérprete de Libras</strong>
              <span style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: '1.5', display: 'block' }}>
                Agência pioneira em acessibilidade fluvial, oferecendo guias intérpretes de Libras sob demanda.
              </span>
            </div>
          </div>

          <div className="glass-card" style={{ padding: '24px', display: 'flex', gap: '16px', alignItems: 'flex-start', background: '#fff', border: '1px solid var(--border)' }}>
            <div style={{ background: 'rgba(11, 79, 54, 0.08)', color: 'var(--accent-light)', padding: '10px', borderRadius: '8px' }}>
              <ShieldCheck size={24} />
            </div>
            <div>
              <strong style={{ fontSize: '1.05rem', color: 'var(--text-h)', display: 'block', marginBottom: '4px' }}>Segurança Garantida</strong>
              <span style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: '1.5', display: 'block' }}>
                Seguro viagem individual contra acidentes e coletes salva-vidas homologados de uso obrigatório a bordo.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Filosofia de Trabalho Section */}
      <section className="glass-card" style={{ padding: '45px 35px', textAlign: 'left' }}>
        <div style={{ marginBottom: '30px', maxWidth: '700px' }}>
          <span style={{ color: 'var(--accent-acai)', fontWeight: '700', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '0.12em', display: 'block', marginBottom: '6px' }}>
            NOSSOS PILARES
          </span>
          <h3 style={{ fontSize: '2rem', color: 'var(--text-h)', fontFamily: 'var(--font-serif)', marginBottom: '8px' }}>
            Nossa Filosofia de Trabalho
          </h3>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>
            Clique nas abas abaixo para entender em detalhes a nossa operação e o nosso compromisso com quem vive na Amazônia Fluvial:
          </p>
        </div>

        {/* Tab Headers */}
        <div 
          style={{ 
            display: 'flex', 
            borderBottom: '1px solid var(--border)', 
            gap: '10px', 
            marginBottom: '28px',
            overflowX: 'auto',
            paddingBottom: '2px'
          }}
          className="custom-scrollbar"
        >
          {Object.keys(tabsContent).map(tabKey => (
            <button
              key={tabKey}
              onClick={() => setActiveTab(tabKey)}
              style={{
                padding: '12px 20px',
                background: 'none',
                border: 'none',
                borderBottom: activeTab === tabKey ? '3px solid var(--accent-light)' : '3px solid transparent',
                color: activeTab === tabKey ? 'var(--accent-light)' : 'var(--text-muted)',
                fontWeight: activeTab === tabKey ? '700' : '500',
                fontSize: '1rem',
                cursor: 'pointer',
                transition: 'all 0.2s',
                whiteSpace: 'nowrap'
              }}
            >
              {tabsContent[tabKey].title}
            </button>
          ))}
        </div>

        {/* Tab Body */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 0.7fr', gap: '30px' }} className="booking-grid">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <p style={{ fontStyle: 'italic', color: 'var(--accent-acai)', fontWeight: '600', fontSize: '1.15rem', fontFamily: 'var(--font-serif)' }}>
              "{tabsContent[activeTab].quote}"
            </p>
            <p style={{ fontSize: '1rem', lineHeight: '1.7', color: 'var(--text)' }}>
              {tabsContent[activeTab].text}
            </p>
          </div>
          <div 
            style={{ 
              background: 'rgba(11, 79, 54, 0.03)', 
              border: '1px solid var(--border)', 
              borderRadius: 'var(--radius-md)', 
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: '12px'
            }}
          >
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--accent-acai)', fontWeight: '700', display: 'block', letterSpacing: '0.05em' }}>
              Impacto Local Direto
            </span>
            <p style={{ fontSize: '0.95rem', fontWeight: '600', color: 'var(--text-h)', lineHeight: '1.6', margin: 0 }}>
              {tabsContent[activeTab].impact}
            </p>
          </div>
        </div>
      </section>

      {/* Imersão Visual Section */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: '40px', textAlign: 'left' }}>
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}>
          <span style={{ color: 'var(--accent-acai)', fontWeight: '700', textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '0.12em' }}>
            VIVÊNCIAS SENSORIAIS
          </span>
          <h2 style={{ fontSize: '2.4rem', fontFamily: 'var(--font-serif)', color: 'var(--text-h)', marginTop: '8px' }}>
            Sabores e Saberes da Ilha
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.02rem', marginTop: '6px' }}>
            Mais que contemplar a paisagem, você irá provar a Amazônia em sua forma mais pura e autêntica:
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }} className="booking-grid">
          
          <div className="glass-card" style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column', border: '1px solid var(--border)' }}>
            <img 
              src="/assets/typical_paraense_food.png" 
              alt="Peixe frito com guarnições e farinha na Ilha do Combu" 
              style={{ width: '100%', height: '320px', objectFit: 'cover' }}
            />
            <div style={{ padding: '24px', textAlign: 'left' }}>
              <span 
                style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--accent-acai)', fontWeight: '700', letterSpacing: '0.05em' }}
              >
                GASTRONOMIA RIBEIRINHA
              </span>
              <h4 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--text-h)', margin: '6px 0 10px 0' }}>
                O Legítimo Peixe Frito com Acompanhamentos
              </h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                Dona Rosalina nos recebe em seu sítio com o almoço tradicional: peixe fresco pescado na região, dourado na frigideira, servido com a clássica farinha d'água de Bragança e guarnições locais. Um ritual de sabor sagrado nas ilhas de Belém.
              </p>
            </div>
          </div>

          <div className="glass-card" style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column', border: '1px solid var(--border)' }}>
            <img 
              src="/assets/combu_cacao_experience.png" 
              alt="Colheita de Cacau Orgânico na Ilha do Combu" 
              style={{ width: '100%', height: '320px', objectFit: 'cover' }}
            />
            <div style={{ padding: '24px', textAlign: 'left' }}>
              <span 
                style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--accent-acai)', fontWeight: '700', letterSpacing: '0.05em' }}
              >
                BIOECONOMIA CRIATIVA
              </span>
              <h4 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--text-h)', margin: '6px 0 10px 0' }}>
                O Cacau da Dona Nena
              </h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                Caminhamos pelas trilhas de cacau selvagem e aprendemos como as sementes são fermentadas e secas no sol. Dona Nena (conhecida nacionalmente) compartilha os segredos de seu chocolate 100% orgânico e rústico, mantendo a floresta de pé e produtiva.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Seção 4: O Roteiro Exclusivo (A Vivência) */}
      <section id="roteiro" style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '30px' }}>
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}>
          <span style={{ color: 'var(--accent-acai)', fontWeight: '700', textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '0.12em' }}>
            CRONOGRAMA DO DIA
          </span>
          <h2 style={{ fontSize: '2.4rem', fontFamily: 'var(--font-serif)', color: 'var(--text-h)', marginTop: '8px' }}>
            O Roteiro da Imersão
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.02rem', marginTop: '6px' }}>
            Um dia inteiro vivenciando o ritmo calmo das águas e das comunidades tradicionais:
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div className="glass-card" style={{ padding: '24px', display: 'flex', gap: '20px', alignItems: 'flex-start', background: '#fff', border: '1px solid var(--border)' }}>
            <div style={{ background: 'rgba(11, 79, 54, 0.08)', color: 'var(--accent-light)', padding: '10px', borderRadius: '8px', fontWeight: '700', fontSize: '1.1rem', width: '50px', height: '50px', display: 'grid', placeContent: 'center', flexShrink: 0 }}>
              09:00
            </div>
            <div>
              <h4 style={{ fontSize: '1.15rem', fontWeight: '700', color: 'var(--text-h)', marginBottom: '6px' }}>
                Embarque e Galeria Street River
              </h4>
              <p style={{ fontSize: '0.92rem', color: 'var(--text)', lineHeight: '1.6' }}>
                Iniciamos nossa navegação pelos furos do Rio Guamá. No trajeto, cruzamos a primeira galeria de arte urbana a céu aberto da Amazônia (Street River), onde as fachadas de palafitas ribeirinhas viram telas gigantes de grafiteiros renomados, contando a história visual e identitária das ilhas.
              </p>
            </div>
          </div>

          <div className="glass-card" style={{ padding: '24px', display: 'flex', gap: '20px', alignItems: 'flex-start', background: '#fff', border: '1px solid var(--border)' }}>
            <div style={{ background: 'rgba(11, 79, 54, 0.08)', color: 'var(--accent-light)', padding: '10px', borderRadius: '8px', fontWeight: '700', fontSize: '1.1rem', width: '50px', height: '50px', display: 'grid', placeContent: 'center', flexShrink: 0 }}>
              10:30
            </div>
            <div>
              <h4 style={{ fontSize: '1.15rem', fontWeight: '700', color: 'var(--text-h)', marginBottom: '6px' }}>
                Extrativismo e a Rainha Samaúma (Boa Vista do Acará)
              </h4>
              <p style={{ fontSize: '0.92rem', color: 'var(--text)', lineHeight: '1.6' }}>
                Nossa primeira parada é no Sítio do Seu Ladi. Aqui, vivenciamos o extrativismo do açaí e da castanha-do-pará (com degustação dela fresca, direto da casca). Em seguida, fazemos uma caminhada leve e silenciosa pela floresta secundária para conhecer cipós medicinais, plantas aromáticas e abraçar as Samaúmas, as árvores rainhas da Amazônia.
              </p>
            </div>
          </div>

          <div className="glass-card" style={{ padding: '24px', display: 'flex', gap: '20px', alignItems: 'flex-start', background: '#fff', border: '1px solid var(--border)' }}>
            <div style={{ background: 'rgba(11, 79, 54, 0.08)', color: 'var(--accent-light)', padding: '10px', borderRadius: '8px', fontWeight: '700', fontSize: '1.1rem', width: '50px', height: '50px', display: 'grid', placeContent: 'center', flexShrink: 0 }}>
              12:30
            </div>
            <div>
              <h4 style={{ fontSize: '1.15rem', fontWeight: '700', color: 'var(--text-h)', marginBottom: '6px' }}>
                Almoço Ribeirinho e Banho no Furo da Paciência
              </h4>
              <p style={{ fontSize: '0.92rem', color: 'var(--text)', lineHeight: '1.6' }}>
                Aportamos no restaurante Resto da Ilha, sob os cuidados de Dona Rosalina e suas irmãs. Elas nos servem uma autêntica refeição ribeirinha (peixe frito, caldeirada e guarnições locais) com ingredientes frescos. Depois, temos tempo livre para banho de rio no Furo da Paciência e descanso em redes sob a brisa da mata.
              </p>
            </div>
          </div>

          <div className="glass-card" style={{ padding: '24px', display: 'flex', gap: '20px', alignItems: 'flex-start', background: '#fff', border: '1px solid var(--border)' }}>
            <div style={{ background: 'rgba(11, 79, 54, 0.08)', color: 'var(--accent-light)', padding: '10px', borderRadius: '8px', fontWeight: '700', fontSize: '1.1rem', width: '50px', height: '50px', display: 'grid', placeContent: 'center', flexShrink: 0 }}>
              15:30
            </div>
            <div>
              <h4 style={{ fontSize: '1.15rem', fontWeight: '700', color: 'var(--text-h)', marginBottom: '6px' }}>
                Andirobeiras da AME e o Chocolate da Dona Nena
              </h4>
              <p style={{ fontSize: '0.92rem', color: 'var(--text)', lineHeight: '1.6' }}>
                Navegamos para a Ilha do Combu. Visitamos a Associação de Mulheres Extrativistas (AME) para aprender sobre a extração da semente de andiroba na confecção de fitoterápicos. Fechamos as visitas no sítio da Dona Nena (Filha do Combu), provando seu famoso cacau orgânico artesanal reconhecido nacionalmente. No retorno às 17h, apreciamos o entardecer fluvial, com chances de avistar tucanos, preguiças e macacos em seu habitat.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Depoimentos / Social Proof */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: '30px', textAlign: 'left' }}>
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}>
          <span style={{ color: 'var(--accent-acai)', fontWeight: '700', textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '0.12em' }}>
            DEPOIMENTOS DE VIAJANTES
          </span>
          <h2 style={{ fontSize: '2.4rem', fontFamily: 'var(--font-serif)', color: 'var(--text-h)', marginTop: '8px', marginBottom: '8px' }}>
            Quem já viveu o Combu conosco
          </h2>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(11, 79, 54, 0.05)', padding: '6px 14px', borderRadius: '4px', border: '1px solid var(--border)', fontSize: '0.88rem' }}>
            <strong style={{ color: 'var(--text-h)' }}>Monotour Belém</strong>
            <span style={{ fontWeight: '800', color: '#c6943e' }}>5,0</span>
            <div style={{ display: 'flex', color: '#c6943e', gap: '1px' }}>
              {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="currentColor" style={{ border: 'none' }} />)}
            </div>
            <span style={{ color: 'var(--text-muted)' }}>491 avaliações no Google (100% recomendada)</span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }} className="booking-grid">
          
          {/* Review 1: Juliana Pinheiro */}
          <div className="glass-card" style={{ padding: '20px', background: '#fff', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <strong style={{ fontSize: '0.9rem', color: 'var(--text-h)' }}>Juliana Pinheiro</strong>
                <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Local Guide • 12 avaliações</span>
              </div>
              <div style={{ display: 'flex', gap: '2px', color: '#c6943e' }}>
                {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="currentColor" style={{ border: 'none' }} />)}
              </div>
            </div>
            <p style={{ fontSize: '0.85rem', fontStyle: 'italic', color: 'var(--text)', lineHeight: '1.55', margin: 0, marginBottom: '8px' }}>
              "Foi uma das experiências mais maravilhosas que já vivi! Me senti acolhida, abraçada e muito bem recebida. Equipe querida, divertida e calorosa... Amei ter explorado o Combu com a Monotour. 🌹"
            </p>
            <a 
              href="https://www.google.com/search?q=Monotour+Bel%C3%A9m#lrd=0x92a48f538c5670bf:0xb2011b8420db3937,1,,,," 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ fontSize: '0.72rem', color: 'var(--accent-gold)', textDecoration: 'none', fontWeight: '600', alignSelf: 'flex-end', marginTop: 'auto', display: 'inline-flex', alignItems: 'center', gap: '2px' }}
            >
              Ver no Google ↗
            </a>
          </div>

          {/* Review 2: Idalice Santos */}
          <div className="glass-card" style={{ padding: '20px', background: '#fff', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <strong style={{ fontSize: '0.9rem', color: 'var(--text-h)' }}>Idalice Santos</strong>
                <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Local Guide • 18 avaliações</span>
              </div>
              <div style={{ display: 'flex', gap: '2px', color: '#c6943e' }}>
                {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="currentColor" style={{ border: 'none' }} />)}
              </div>
            </div>
            <p style={{ fontSize: '0.85rem', fontStyle: 'italic', color: 'var(--text)', lineHeight: '1.55', margin: 0, marginBottom: '8px' }}>
              "A Monotour é muito mais que um passeio, é uma imersão cultural. Gratidão ao Leandro, à Raquel, ao Seu Ladi, à d. Nena (chocolate espetacular) e à d. Rosa (almoço maravilhoso). Valeu cada segundo!"
            </p>
            <a 
              href="https://www.google.com/search?q=Monotour+Bel%C3%A9m#lrd=0x92a48f538c5670bf:0xb2011b8420db3937,1,,,," 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ fontSize: '0.72rem', color: 'var(--accent-gold)', textDecoration: 'none', fontWeight: '600', alignSelf: 'flex-end', marginTop: 'auto', display: 'inline-flex', alignItems: 'center', gap: '2px' }}
            >
              Ver no Google ↗
            </a>
          </div>

          {/* Review 3: Rafaella Nascimento */}
          <div className="glass-card" style={{ padding: '20px', background: '#fff', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <strong style={{ fontSize: '0.9rem', color: 'var(--text-h)' }}>Rafaella Nascimento</strong>
                <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>7 avaliações • 1 foto</span>
              </div>
              <div style={{ display: 'flex', gap: '2px', color: '#c6943e' }}>
                {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="currentColor" style={{ border: 'none' }} />)}
              </div>
            </div>
            <p style={{ fontSize: '0.85rem', fontStyle: 'italic', color: 'var(--text)', lineHeight: '1.55', margin: 0, marginBottom: '8px' }}>
              "Buscávamos uma imersão que fosse além do passeio básico, e a Monotour foi maravilhosa. Contato real com a natureza, moradores e atmosfera da ilha. Saímos com a sensação de ter realmente vivido o Combu."
            </p>
            <a 
              href="https://www.google.com/search?q=Monotour+Bel%C3%A9m#lrd=0x92a48f538c5670bf:0xb2011b8420db3937,1,,,," 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ fontSize: '0.72rem', color: 'var(--accent-gold)', textDecoration: 'none', fontWeight: '600', alignSelf: 'flex-end', marginTop: 'auto', display: 'inline-flex', alignItems: 'center', gap: '2px' }}
            >
              Ver no Google ↗
            </a>
          </div>

          {/* Review 4: Thaís Alves */}
          <div className="glass-card" style={{ padding: '20px', background: '#fff', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <strong style={{ fontSize: '0.9rem', color: 'var(--text-h)' }}>Thaís Alves</strong>
                <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Local Guide • 71 avaliações</span>
              </div>
              <div style={{ display: 'flex', gap: '2px', color: '#c6943e' }}>
                {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="currentColor" style={{ border: 'none' }} />)}
              </div>
            </div>
            <p style={{ fontSize: '0.85rem', fontStyle: 'italic', color: 'var(--text)', lineHeight: '1.55', margin: 0, marginBottom: '8px' }}>
              "Dia incrível e confortável com a Monotour. Bastante informação e contato com pessoas excepcionais ao longo do passeio. Destaque para o almoço maravilhoso com opção vegana no Restaurante da Rosa!"
            </p>
            <a 
              href="https://www.google.com/search?q=Monotour+Bel%C3%A9m#lrd=0x92a48f538c5670bf:0xb2011b8420db3937,1,,,," 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ fontSize: '0.72rem', color: 'var(--accent-gold)', textDecoration: 'none', fontWeight: '600', alignSelf: 'flex-end', marginTop: 'auto', display: 'inline-flex', alignItems: 'center', gap: '2px' }}
            >
              Ver no Google ↗
            </a>
          </div>

          {/* Review 5: Camila Louis Oliveira */}
          <div className="glass-card" style={{ padding: '20px', background: '#fff', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <strong style={{ fontSize: '0.9rem', color: 'var(--text-h)' }}>Camila Louis</strong>
                <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>5 avaliações • 6 fotos</span>
              </div>
              <div style={{ display: 'flex', gap: '2px', color: '#c6943e' }}>
                {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="currentColor" style={{ border: 'none' }} />)}
              </div>
            </div>
            <p style={{ fontSize: '0.85rem', fontStyle: 'italic', color: 'var(--text)', lineHeight: '1.55', margin: 0, marginBottom: '8px' }}>
              "Passeio maravilhoso, seguro e responsável. A acolhida foi fantástica, o almoço estava incrível e a empresa valoriza e respeita de verdade a comunidade local. Recomendo de olhos fechados!"
            </p>
            <a 
              href="https://www.google.com/search?q=Monotour+Bel%C3%A9m#lrd=0x92a48f538c5670bf:0xb2011b8420db3937,1,,,," 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ fontSize: '0.72rem', color: 'var(--accent-gold)', textDecoration: 'none', fontWeight: '600', alignSelf: 'flex-end', marginTop: 'auto', display: 'inline-flex', alignItems: 'center', gap: '2px' }}
            >
              Ver no Google ↗
            </a>
          </div>

          {/* Review 6: Manoela das Graças */}
          <div className="glass-card" style={{ padding: '20px', background: '#fff', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <strong style={{ fontSize: '0.9rem', color: 'var(--text-h)' }}>Manoela das Graças</strong>
                <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>2 avaliações • 18 fotos</span>
              </div>
              <div style={{ display: 'flex', gap: '2px', color: '#c6943e' }}>
                {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="currentColor" style={{ border: 'none' }} />)}
              </div>
            </div>
            <p style={{ fontSize: '0.85rem', fontStyle: 'italic', color: 'var(--text)', lineHeight: '1.55', margin: 0, marginBottom: '8px' }}>
              "Recomendo demais! Os guias são acolhedores, a comida no Restô da Dona Rosa é sem explicação de tão boa, e o Seu Ladi é um fofo! Amei todo o roteiro e recomendo de olhos fechados!"
            </p>
            <a 
              href="https://www.google.com/search?q=Monotour+Bel%C3%A9m#lrd=0x92a48f538c5670bf:0xb2011b8420db3937,1,,,," 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ fontSize: '0.72rem', color: 'var(--accent-gold)', textDecoration: 'none', fontWeight: '600', alignSelf: 'flex-end', marginTop: 'auto', display: 'inline-flex', alignItems: 'center', gap: '2px' }}
            >
              Ver no Google ↗
            </a>
          </div>

        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: '30px', textAlign: 'left', maxWidth: '800px', margin: '0 auto', width: '100%' }}>
        <div style={{ textAlign: 'center' }}>
          <span style={{ color: 'var(--accent-acai)', fontWeight: '700', textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '0.12em' }}>
            DÚVIDAS FREQUENTES
          </span>
          <h2 style={{ fontSize: '2.4rem', fontFamily: 'var(--font-serif)', color: 'var(--text-h)', marginTop: '8px' }}>
            Perguntas Frequentes
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '10px' }}>
          {faqItems.map((item, index) => {
            const isOpen = openFaq === index;
            return (
              <div 
                key={index} 
                className="glass-card" 
                style={{ 
                  padding: '0', 
                  overflow: 'hidden', 
                  background: '#fff', 
                  border: '1px solid var(--border)',
                  borderRadius: '8px'
                }}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  style={{
                    width: '100%',
                    padding: '18px 24px',
                    background: isOpen ? 'rgba(11, 79, 54, 0.03)' : 'none',
                    border: 'none',
                    textAlign: 'left',
                    fontSize: '1.02rem',
                    fontWeight: '650',
                    color: 'var(--text-h)',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    transition: 'background 0.2s'
                  }}
                >
                  <span>{item.q}</span>
                  {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>
                
                {isOpen && (
                  <div 
                    style={{ 
                      padding: '18px 24px', 
                      borderTop: '1px solid var(--border)', 
                      fontSize: '0.92rem', 
                      color: 'var(--text-muted)', 
                      lineHeight: '1.6' 
                    }}
                  >
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Convite para Ação / CTA Footer */}
      <section style={{ textAlign: 'center', paddingBottom: '30px' }}>
        <div 
          className="glass-card" 
          style={{ 
            padding: '50px 40px', 
            background: 'linear-gradient(135deg, #0B4F36 0%, #174230 100%)', 
            color: '#FFFFFF',
            border: 'none',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-lg)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px'
          }}
        >
          <Sparkles size={36} style={{ color: 'var(--accent-gold)' }} />
          <h3 style={{ fontSize: '2.2rem', fontFamily: 'var(--font-serif)', color: '#FFFFFF', fontWeight: '700' }}>
            Pronto para vivenciar a floresta de verdade?
          </h3>
          <p style={{ fontSize: '1.1rem', color: '#E5E7EB', maxWidth: '600px', lineHeight: '1.6', margin: '0 0 10px 0' }}>
            Reserve com antecedência para garantir vaga na lancha confortável com Leandro e Raquel. Roteiro de dia completo com almoço típico e taxas inclusas.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '1.5rem', color: 'var(--accent-gold)', fontWeight: '800' }}>
              R$ 350,00 por passageiro
            </span>
            <span style={{ fontSize: '0.8rem', color: '#D1D5DB', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Pix • Cartão de Crédito • PayPal • Mercado Pago
            </span>
          </div>
          <button 
            onClick={() => window.location.hash = '#/reserva'} 
            className="btn btn-gold" 
            style={{ 
              padding: '16px 40px', 
              fontSize: '1.1rem', 
              fontWeight: '700',
              boxShadow: '0 4px 15px rgba(255, 184, 0, 0.4)',
              marginTop: '10px'
            }}
          >
            Iniciar Minha Reserva <ArrowRight size={18} />
          </button>
        </div>
      </section>

    </div>
  );
}
