import React, { useState } from 'react';
import { DonutChart, BarChart } from '../UI/ChartMock';
import { 
  calculatePartnerPayouts, 
  getBasePrice, 
  getInterpreterRate, 
  saveBasePrice, 
  saveInterpreterRate,
  TOURS,
  PAYMENT_METHODS,
  formatDateSafely,
  getReleaseHour,
  saveReleaseHour
} from '../../dataStore';
import { 
  DollarSign, 
  MapPin, 
  Users, 
  Heart, 
  ExternalLink, 
  Calendar, 
  Check, 
  AlertTriangle, 
  ArrowRight, 
  Plus, 
  Edit2, 
  Settings, 
  MessageSquare, 
  X, 
  Compass, 
  FileText,
  Clock,
  Filter
} from 'lucide-react';

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

export default function Dashboard({ bookings, partners, addBooking, updateBooking, updatePartners }) {
  // Filters State
  const [filterType, setFilterType] = useState('all'); // all, day, week, month
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('06'); // default to June (06) as mock bookings are in June
  const [selectedTour, setSelectedTour] = useState('all'); // all or tourId

  // Modals state
  const [isRatesModalOpen, setIsRatesModalOpen] = useState(false);
  const [editingBooking, setEditingBooking] = useState(null);
  
  // Rates form state
  const [ratesForm, setRatesForm] = useState({
    basePrice: getBasePrice(),
    interpreterRate: getInterpreterRate(),
    releaseHour: getReleaseHour(),
    seuladi: partners.find(p => p.id === 'seuladi')?.payoutRate || 40,
    donarosa: partners.find(p => p.id === 'donarosa')?.payoutRate || 75,
    ame: partners.find(p => p.id === 'ame')?.payoutRate || 20,
    donanena: partners.find(p => p.id === 'donanena')?.payoutRate || 35,
    barqueiro: partners.find(p => p.id === 'barqueiro')?.payoutRate || 50
  });

  // Briefing alert date state (defaults to "tomorrow", mock: 2026-06-27 or next date)
  const [briefingAlertDate, setBriefingAlertDate] = useState('2026-06-27');

  // 1. Filter bookings based on type, day, week, month, and tour selection
  const getFilteredBookings = () => {
    return bookings.filter(b => {
      // Tour Filter
      if (selectedTour !== 'all' && b.tourId !== selectedTour) {
        return false;
      }

      // Date Filters
      if (filterType === 'all') return true;
      
      if (filterType === 'day') {
        return b.date === selectedDay;
      }
      
      if (filterType === 'month') {
        if (!b.date || typeof b.date !== 'string') return false;
        const [, m] = b.date.split('-');
        return m === selectedMonth;
      }

      if (filterType === 'week') {
        if (!selectedDay) return true;
        // Filter bookings in the same calendar week as selectedDay
        const targetDate = new Date(selectedDay);
        const bookingDate = new Date(b.date);
        
        // Calculate difference in time
        const diffTime = Math.abs(bookingDate - targetDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        // Safe check: within 3 days before or after (forming a 7-day week scope)
        return diffDays <= 3;
      }

      return true;
    });
  };

  const filteredBookings = getFilteredBookings();

  // 2. Calculations based on FILTERED bookings
  const totalRevenue = filteredBookings.reduce((sum, b) => sum + (b.subtotal || 0) + (b.interpreterFee || 0), 0);
  const totalPaidWithFees = filteredBookings.reduce((sum, b) => sum + (b.totalPaid || 0), 0);
  const totalGatewayFees = filteredBookings.reduce((sum, b) => sum + (b.gatewayFee || 0), 0);
  
  let totalLocalPayout = 0;
  const partnerPayoutTotals = {};
  partners.forEach(p => {
    partnerPayoutTotals[p.id] = 0;
  });

  filteredBookings.forEach(b => {
    const payouts = calculatePartnerPayouts(b, partners);
    totalLocalPayout += payouts.totalLocalPayout;
    payouts.breakdown.forEach(item => {
      partnerPayoutTotals[item.partnerId] = (partnerPayoutTotals[item.partnerId] || 0) + item.amount;
    });
  });

  const netMonoturProfit = totalRevenue - totalLocalPayout;

  // Donut chart calculations
  const financialChartData = [
    { label: "Sítio Seu Ladi", value: partnerPayoutTotals.seuladi || 0, color: "hsl(142, 60%, 25%)", isCurrency: true },
    { label: "Dona Rosa (Almoço)", value: partnerPayoutTotals.donarosa || 0, color: "hsl(142, 50%, 35%)", isCurrency: true },
    { label: "AME Andirobeiras", value: partnerPayoutTotals.ame || 0, color: "hsl(142, 40%, 45%)", isCurrency: true },
    { label: "Dona Nena Chocolate", value: partnerPayoutTotals.donanena || 0, color: "hsl(142, 30%, 55%)", isCurrency: true },
    { label: "Pilotos (Barco)", value: partnerPayoutTotals.barqueiro || 0, color: "hsl(142, 20%, 65%)", isCurrency: true },
    { label: "Margem Monotur", value: netMonoturProfit > 0 ? netMonoturProfit : 0, color: "hsl(43, 90%, 50%)", isCurrency: true },
    { label: "Taxas de Operadoras", value: totalGatewayFees, color: "hsl(14, 82%, 52%)", isCurrency: true }
  ];

  // Lead sources calculations
  const leadSourceCounts = {};
  filteredBookings.forEach(b => {
    if (b.leadSource) {
      leadSourceCounts[b.leadSource] = (leadSourceCounts[b.leadSource] || 0) + 1;
    }
  });

  const leadChartData = Object.keys(leadSourceCounts).map(source => ({
    label: source,
    value: leadSourceCounts[source]
  })).sort((a, b) => b.value - a.value);

  // Geographic calculations
  const originCounts = {
    "Local (Belém)": 0,
    "Nacional (Outros)": 0,
    "Internacional": 0
  };

  filteredBookings.forEach(b => {
    if (b.fichaCompleted) {
      const country = b.originCountry?.toLowerCase().trim();
      const state = b.originState?.toUpperCase().trim();
      
      if (country !== 'brasil' && country !== 'brazil' && country !== '') {
        originCounts["Internacional"] += b.passengers;
      } else if (state === 'PA' || b.originCity?.toLowerCase() === 'belém' || b.originCity?.toLowerCase() === 'belem') {
        originCounts["Local (Belém)"] += b.passengers;
      } else {
        originCounts["Nacional (Outros)"] += b.passengers;
      }
    }
  });

  const originChartData = [
    { label: "Local (Belém)", value: originCounts["Local (Belém)"], color: "hsl(142, 70%, 20%)" },
    { label: "Nacional (Outros)", value: originCounts["Nacional (Outros)"], color: "hsl(43, 90%, 50%)" },
    { label: "Internacional", value: originCounts["Internacional"], color: "hsl(200, 70%, 40%)" }
  ].filter(item => item.value > 0);

  // 3. Night-before Briefing WhatsApp Generator
  const getBriefingAlertSummary = () => {
    const alertBookings = bookings.filter(b => b.date === briefingAlertDate);
    const totalPassengers = alertBookings.reduce((sum, b) => sum + b.passengers, 0);
    const completedFichas = alertBookings.filter(b => b.fichaCompleted).length;
    const tourCounts = {};
    
    alertBookings.forEach(b => {
      const tName = TOURS.find(t => t.id === b.tourId)?.name || "Passeio Monotur";
      tourCounts[tName] = (tourCounts[tName] || 0) + b.passengers;
    });

    return {
      date: briefingAlertDate,
      bookingsCount: alertBookings.length,
      totalPassengers,
      completedFichas,
      tourCounts,
      bookingsList: alertBookings
    };
  };

  const briefingSummary = getBriefingAlertSummary();

  const handleGenerateWhatsAppBriefing = () => {
    if (briefingSummary.totalPassengers === 0) {
      alert('Nenhum roteiro agendado para esta data!');
      return;
    }

    // Consolidated life jackets counts
    const jacketCounts = { P: 0, M: 0, G: 0, GG: 0 };
    let dietTrad = 0;
    let dietVeg = 0;
    let dietVegan = 0;
    const allergies = [];
    let imageYes = 0;
    let imageNo = 0;

    briefingSummary.bookingsList.forEach(b => {
      if (b.fichaCompleted) {
        if (b.lifeJacketSizes) {
          b.lifeJacketSizes.forEach(size => {
            const label = size === 'S' ? 'P' : size === 'M' ? 'M' : size === 'L' ? 'G' : 'GG';
            jacketCounts[label] = (jacketCounts[label] || 0) + 1;
          });
        }
        
        if (b.dietOption === 'vegetariana') dietVeg += b.passengers;
        else if (b.dietOption === 'vegana') dietVegan += b.passengers;
        else dietTrad += b.passengers;

        if (b.dietaryRestrictions && b.dietaryRestrictions.trim() !== '' && b.dietaryRestrictions.toLowerCase() !== 'nenhuma') {
          allergies.push(`${b.clientName}: ${b.dietaryRestrictions}`);
        }

        if (b.imageConsent) imageYes += b.passengers;
        else imageNo += b.passengers;
      } else {
        // If Ficha not completed, count passengers as pending sizes/diets
        jacketCounts['M'] = (jacketCounts['M'] || 0) + b.passengers; // default fallback
        dietTrad += b.passengers;
        imageYes += b.passengers;
      }
    });

    // Build the formatted text
    const dateFormatted = formatDateSafely(briefingSummary.date);
    const toursText = Object.entries(briefingSummary.tourCounts)
      .map(([name, pax]) => `  - *${name}:* ${pax} pessoas`)
      .join('\n');

    const text = 
`*MONOTOUR - BRIEFING DE VÉSPERA* 🌿
📅 *Roteiro de Amanhã:* ${dateFormatted}
👥 *Total Geral:* ${briefingSummary.totalPassengers} pessoas em ${briefingSummary.bookingsCount} reservas

*Roteiros:*
${toursText}

🎒 *COLETES SALVA-VIDAS (Consolidado):*
- P (S): ${jacketCounts.P}
- M (M): ${jacketCounts.M}
- G (L): ${jacketCounts.G}
- GG (XL): ${jacketCounts.GG}

🍽️ *ALMOÇOS RIBEIRINHOS (Dona Rosa):*
- Tradicional: ${dietTrad}
- Vegetariano: ${dietVeg}
- Vegano: ${dietVegan}

⚠️ *ALERGIAS / RESTRIÇÕES:*
${allergies.length > 0 ? allergies.map(a => `• ${a}`).join('\n') : 'Nenhuma restrição declarada.'}

📸 *AUTORIZAÇÃO DE IMAGEM:*
- Sim: ${imageYes} pessoas
- Não: ${imageNo} pessoas

🔗 *Acessar portal online (tempo real):*
http://localhost:5173/#/guia/${briefingSummary.date}`;

    const encodedText = encodeURIComponent(text);
    // WhatsApp number for Leandro (from PDF: 91 992753444)
    window.open(`https://api.whatsapp.com/send?phone=5591992753444&text=${encodedText}`, '_blank');
  };

  // 4. Save Rates Changes
  const handleSaveRates = (e) => {
    e.preventDefault();
    saveBasePrice(ratesForm.basePrice);
    saveInterpreterRate(ratesForm.interpreterRate);
    saveReleaseHour(ratesForm.releaseHour);
    
    // Update payout rates in the partners array
    const updatedPartners = partners.map(p => {
      const newRate = ratesForm[p.id];
      return {
        ...p,
        payoutRate: newRate !== undefined ? parseInt(newRate) : p.payoutRate
      };
    });

    updatePartners(updatedPartners);
    setIsRatesModalOpen(false);
    alert('Valores e repasses atualizados com sucesso!');
  };

  // 5. Save Booking Changes (Admin Edit Modal)
  const handleSaveBooking = (e) => {
    e.preventDefault();
    if (!editingBooking) return;

    // Recalculate financial breakdown for this booking based on its edited state
    const basePrice = getBasePrice();
    const interpreterRate = getInterpreterRate();
    
    const subtotal = editingBooking.passengers * basePrice;
    const interpreterFee = editingBooking.language !== 'portugues' ? interpreterRate : 0;
    const rawTotal = subtotal + interpreterFee;
    
    const gateway = PAYMENT_METHODS[editingBooking.paymentMethod] || PAYMENT_METHODS.pix;
    const gatewayFee = (rawTotal * (gateway.feePercent / 100)) + gateway.flatFee;
    const totalPaid = rawTotal + gatewayFee;

    const updated = {
      ...editingBooking,
      subtotal,
      interpreterFee,
      gatewayFee: parseFloat(gatewayFee.toFixed(2)),
      totalPaid: parseFloat(totalPaid.toFixed(2)),
      // Sync lifeJacketSizes array if passengers count changed
      lifeJacketSizes: editingBooking.lifeJacketSizes.length !== editingBooking.passengers
        ? Array(editingBooking.passengers).fill('M')
        : editingBooking.lifeJacketSizes
    };

    updateBooking(editingBooking.id, updated);
    setEditingBooking(null);
    alert('Reserva atualizada com sucesso!');
  };

  // Simulated addition of a new booking
  const handleAddMockBooking = () => {
    const mockLeadSources = ["Instagram", "Google Search", "TripAdvisor", "Indicação"];
    const mockCities = [
      { city: "Belém", state: "PA", country: "Brasil" },
      { city: "Rio de Janeiro", state: "RJ", country: "Brasil" },
      { city: "Paris", state: "Île-de-France", country: "França" }
    ];
    
    const randomLocation = mockCities[Math.floor(Math.random() * mockCities.length)];
    const passengersCount = Math.floor(2 + Math.random() * 4);
    const chosenMethod = ["pix", "link", "paypal"][Math.floor(Math.random() * 3)];
    const chosenTour = TOURS[Math.floor(Math.random() * TOURS.length)].id;

    const basePrice = getBasePrice();
    const subtotal = passengersCount * basePrice;

    const newMockBooking = {
      id: `MT-${Math.floor(1000 + Math.random() * 9000)}`,
      date: briefingAlertDate, // Add to briefing alert date so we can test easily!
      clientName: ["Pedro Alvares", "Marie Curie", "Julia Santos"][Math.floor(Math.random() * 3)],
      email: "cliente.mock@email.com",
      phone: "(91) 98888-1111",
      passengers: passengersCount,
      language: "portugues",
      paymentMethod: chosenMethod,
      status: "pago",
      tourId: chosenTour,
      totalPaid: subtotal,
      subtotal,
      interpreterFee: 0,
      gatewayFee: 0,
      originCity: randomLocation.city,
      originState: randomLocation.state,
      originCountry: randomLocation.country,
      leadSource: mockLeadSources[Math.floor(Math.random() * mockLeadSources.length)],
      dietaryRestrictions: "Nenhuma",
      dietOption: "tradicional",
      lifeJacketSizes: Array(passengersCount).fill('M'),
      passengerDetails: Array(passengersCount).fill(0).map((_, i) => ({ name: `Viajante ${i + 1}`, size: 'M' })),
      imageConsent: true,
      medicalNotes: "",
      emergencyContact: "Contato (91) 98888-0000",
      fichaCompleted: true
    };

    addBooking(newMockBooking);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
      
      {/* Page Title */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
        <div style={{ textAlign: 'left' }}>
          <h2 style={{ fontSize: '2rem', color: 'var(--text-h)' }}>Painel Administrativo</h2>
          <p style={{ color: 'var(--text-muted)' }}>Gestão financeira, fomento comunitário e mapeamento geográfico</p>
        </div>
        
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button 
            className="btn btn-secondary" 
            style={{ padding: '10px 20px', fontSize: '0.85rem' }}
            onClick={() => {
              if (window.confirm("Deseja resetar os dados locais do navegador para a simulação padrão de 16 viajantes em 27/06/2026?")) {
                localStorage.removeItem("monotur_bookings");
                localStorage.removeItem("monotur_partners");
                localStorage.removeItem("monotur_fauna_flora");
                localStorage.removeItem("monotur_boarding_status");
                localStorage.removeItem("monotur_base_price");
                localStorage.removeItem("monotur_interpreter_rate");
                window.location.reload();
              }
            }}
          >
            🔄 Resetar Simulação (16 pax)
          </button>
          
          <button 
            className="btn btn-primary" 
            style={{ padding: '10px 20px', fontSize: '0.85rem' }}
            onClick={() => setIsRatesModalOpen(true)}
          >
            <Settings size={16} /> Editar Preços & Repasses
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
        <div className="glass-card" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px', textAlign: 'left', borderLeft: '4px solid var(--accent)' }}>
          <div style={{ background: 'rgba(14, 138, 67, 0.06)', color: 'var(--accent)', padding: '12px', borderRadius: 'var(--radius-md)' }}>
            <DollarSign size={24} />
          </div>
          <div>
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', fontWeight: '600' }}>
              Faturamento Bruto
            </span>
            <span style={{ fontSize: '1.4rem', fontWeight: '700', color: 'var(--text-h)' }}>
              R$ {totalRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </span>
          </div>
        </div>

        <div className="glass-card" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px', textAlign: 'left', borderLeft: '4px solid var(--accent-gold)' }}>
          <div style={{ background: 'rgba(230, 149, 0, 0.06)', color: 'var(--accent-gold)', padding: '12px', borderRadius: 'var(--radius-md)' }}>
            <Heart size={24} />
          </div>
          <div>
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', fontWeight: '600' }}>
              Fomento Local
            </span>
            <span style={{ fontSize: '1.4rem', fontWeight: '700', color: 'var(--text-h)' }}>
              R$ {totalLocalPayout.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </span>
          </div>
        </div>

        <div className="glass-card" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px', textAlign: 'left', borderLeft: '4px solid var(--accent-acai)' }}>
          <div style={{ background: 'rgba(111, 44, 93, 0.06)', color: 'var(--accent-acai)', padding: '12px', borderRadius: 'var(--radius-md)' }}>
            <DollarSign size={24} />
          </div>
          <div>
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', fontWeight: '600' }}>
              Margem Monotur
            </span>
            <span style={{ fontSize: '1.4rem', fontWeight: '700', color: 'var(--text-h)' }}>
              R$ {netMonoturProfit.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </span>
          </div>
        </div>

        <div className="glass-card" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px', textAlign: 'left', borderLeft: '4px solid var(--accent-urucum)' }}>
          <div style={{ background: 'rgba(216, 67, 21, 0.06)', color: 'var(--accent-urucum)', padding: '12px', borderRadius: 'var(--radius-md)' }}>
            <Users size={24} />
          </div>
          <div>
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', fontWeight: '600' }}>
              Total de Passageiros
            </span>
            <span style={{ fontSize: '1.4rem', fontWeight: '700', color: 'var(--text-h)' }}>
              {filteredBookings.reduce((sum, b) => sum + b.passengers, 0)} pessoas
            </span>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '30px' }} className="booking-grid">
        {/* Financial Payout Chart */}
        <div className="glass-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <h3 style={{ fontSize: '1.1rem', color: 'var(--text-h)' }}>Distribuição do Faturamento & Impacto Local</h3>
            <button 
              onClick={() => setIsRatesModalOpen(true)}
              className="btn btn-secondary" 
              style={{ padding: '6px 12px', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              <Edit2 size={12} /> Editar Repasses
            </button>
          </div>
          <DonutChart 
            data={financialChartData} 
            title="" 
            totalLabel="Giro Total"
          />
        </div>

        {/* Analytics Section (Origins & Leads) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          {/* Geographical Origin Chart */}
          <div className="glass-card" style={{ padding: '24px' }}>
            <DonutChart 
              data={originChartData.length > 0 ? originChartData : [{ label: "Sem Fichas Entregues", value: 1, color: "#ccc" }]}
              title="Origem Geográfica dos Viajantes (Fichas Preenchidas)"
              totalLabel="Pessoas"
            />
          </div>

          {/* Lead Source Bar Chart */}
          <div className="glass-card" style={{ padding: '24px' }}>
            <BarChart 
              data={leadChartData.length > 0 ? leadChartData : [{ label: "Sem dados", value: 0 }]} 
              title="Canais de Atração (Origem dos Leads)" 
            />
          </div>
        </div>
      </div>

      {/* ⚠️ Night-before Briefing Action Section */}
      <div 
        className="glass-card" 
        style={{ 
          padding: '24px', 
          background: 'rgba(230, 149, 0, 0.03)', 
          border: '1px solid rgba(230, 149, 0, 0.3)',
          textAlign: 'left'
        }}
      >
        <h3 style={{ fontSize: '1.2rem', color: 'var(--text-h)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Clock size={20} className="text-amber-500" /> Ações de Véspera (Briefing WhatsApp do Guia)
        </h3>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
          Evite furos de comunicação! Gere um lembrete consolidado contendo o número exato de passageiros, tamanhos de coletes e restrições alimentares e envie diretamente para o WhatsApp do guia Leandro na noite anterior.
        </p>
        
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: '600' }}>Data do Passeio:</span>
            <input 
              type="date" 
              className="form-control" 
              style={{ padding: '6px 12px', fontSize: '0.85rem' }} 
              value={briefingAlertDate}
              onChange={(e) => setBriefingAlertDate(e.target.value)}
            />
          </div>

          <button 
            type="button" 
            onClick={handleAddMockBooking} 
            className="btn btn-secondary"
            style={{ padding: '8px 14px', fontSize: '0.85rem' }}
          >
            + Adicionar Cliente nesta Data
          </button>
          
          <button 
            type="button" 
            onClick={handleGenerateWhatsAppBriefing}
            className="btn btn-gold"
            style={{ padding: '8px 16px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <MessageSquare size={16} /> Gerar & Enviar Briefing ao Leandro ({briefingSummary.totalPassengers} pessoas)
          </button>

          <a 
            href={`#/guia/${briefingAlertDate}`}
            className="btn btn-secondary"
            style={{ padding: '8px 16px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}
          >
            <Compass size={16} /> Visualizar Portal do Guia
          </a>
        </div>

        {briefingSummary.totalPassengers > 0 ? (
          <div style={{ background: 'rgba(255,255,255,0.7)', borderRadius: 'var(--radius-sm)', padding: '12px', marginTop: '14px', fontSize: '0.82rem', border: '1px solid var(--border)' }}>
            <strong>Resumo detectado para {formatDateSafely(briefingSummary.date)}:</strong> {briefingSummary.bookingsCount} reservas com {briefingSummary.totalPassengers} passageiros. ({briefingSummary.completedFichas} fichas de segurança entregues).
          </div>
        ) : (
          <div style={{ marginTop: '14px', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            Nenhum passeio agendado no sistema para esta data. Use o botão acima para mockar reservas se desejar testar.
          </div>
        )}
      </div>

      {/* Bookings Table with FILTERS shifted down here */}
      <div className="glass-card" style={{ padding: '24px', overflowX: 'auto' }}>
        
        {/* Table Header and Filters */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '20px', borderBottom: '1px solid var(--border)', paddingBottom: '16px' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
            <h3 style={{ fontSize: '1.25rem', color: 'var(--text-h)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FileText size={20} className="text-emerald-600" /> Histórico & Filtros de Reservas
            </h3>
            <span className="badge badge-accent">{filteredBookings.length} reservas listadas</span>
          </div>

          {/* Filters controls */}
          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center' }} className="filters-container">
            
            {/* Filter by Tour */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Filter size={14} className="text-emerald-600" />
              <span style={{ fontSize: '0.85rem', fontWeight: '600' }}>Roteiro:</span>
              <select 
                className="form-control" 
                style={{ padding: '6px 12px', fontSize: '0.85rem' }}
                value={selectedTour}
                onChange={(e) => setSelectedTour(e.target.value)}
              >
                <option value="all">Todos os Roteiros</option>
                {TOURS.map(t => (
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))}
              </select>
            </div>

            {/* Filter Type */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: '600' }}>Filtrar por:</span>
              <select 
                className="form-control" 
                style={{ padding: '6px 12px', fontSize: '0.85rem' }}
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option value="all">Todos (Sem filtro de data)</option>
                <option value="day">Por Dia Único</option>
                <option value="week">Por Semana (± 3 dias)</option>
                <option value="month">Por Mês</option>
              </select>
            </div>

            {/* Sub-selectors depending on type */}
            {filterType === 'day' && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '0.85rem' }}>Data:</span>
                <input 
                  type="date" 
                  className="form-control" 
                  style={{ padding: '6px 12px', fontSize: '0.85rem' }}
                  value={selectedDay}
                  onChange={(e) => setSelectedDay(e.target.value)}
                />
              </div>
            )}

            {filterType === 'week' && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '0.85rem' }}>Data de Referência:</span>
                <input 
                  type="date" 
                  className="form-control" 
                  style={{ padding: '6px 12px', fontSize: '0.85rem' }}
                  value={selectedDay}
                  onChange={(e) => setSelectedDay(e.target.value)}
                />
              </div>
            )}

            {filterType === 'month' && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '0.85rem' }}>Selecione o Mês:</span>
                <select 
                  className="form-control" 
                  style={{ padding: '6px 12px', fontSize: '0.85rem' }}
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                >
                  <option value="01">Janeiro</option>
                  <option value="02">Fevereiro</option>
                  <option value="03">Março</option>
                  <option value="04">Abril</option>
                  <option value="05">Maio</option>
                  <option value="06">Junho</option>
                  <option value="07">Julho</option>
                  <option value="08">Agosto</option>
                  <option value="09">Setembro</option>
                  <option value="10">Outubro</option>
                  <option value="11">Novembro</option>
                  <option value="12">Dezembro</option>
                </select>
              </div>
            )}

          </div>

        </div>
        
        {/* Bookings Table */}
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '700px' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--border)', paddingBottom: '10px' }}>
              <th style={{ padding: '12px 10px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>CÓDIGO</th>
              <th style={{ padding: '12px 10px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>DATA</th>
              <th style={{ padding: '12px 10px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>ROTEIRO</th>
              <th style={{ padding: '12px 10px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>CLIENTE</th>
              <th style={{ padding: '12px 10px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>VIAJANTES</th>
              <th style={{ padding: '12px 10px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>VALOR</th>
              <th style={{ padding: '12px 10px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>FICHA VIAJANTE</th>
              <th style={{ padding: '12px 10px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>AÇÕES</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.map((b) => (
              <tr key={b.id} style={{ borderBottom: '1px solid var(--border)', transition: 'background 0.2s' }}>
                <td style={{ padding: '14px 10px', fontWeight: '700', color: 'var(--text-h)' }}>{b.id}</td>
                <td style={{ padding: '14px 10px', fontSize: '0.9rem' }}>{formatDateSafely(b.date)}</td>
                <td style={{ padding: '14px 10px', fontSize: '0.85rem', fontWeight: '500' }}>
                  {TOURS.find(t => t.id === b.tourId)?.name || 'Outro Roteiro'}
                </td>
                <td style={{ padding: '14px 10px' }}>
                  <div style={{ fontWeight: '600', color: 'var(--text-h)' }}>{b.clientName}</div>
                  {b.phone ? (
                    <a 
                      href={getSimpleWhatsAppLink(b.phone)}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ fontSize: '0.75rem', color: '#1b803f', fontWeight: '600', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '2px' }}
                    >
                      💬 {b.phone}
                    </a>
                  ) : (
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Sem telefone</div>
                  )}
                </td>
                <td style={{ padding: '14px 10px', textAlign: 'center' }}>
                  <span className="badge badge-accent">{b.passengers} pax</span>
                  {b.language !== 'portugues' && (
                    <span 
                      className="badge" 
                      style={{ background: 'rgba(111, 44, 93, 0.1)', color: 'var(--accent-acai)', marginLeft: '4px', fontSize: '0.7rem' }}
                    >
                      {b.language.toUpperCase()}
                    </span>
                  )}
                </td>
                <td style={{ padding: '14px 10px' }}>
                  <span style={{ fontSize: '0.9rem', display: 'block', fontWeight: '600' }}>R$ {b.totalPaid.toFixed(2)}</span>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>via {b.paymentMethod.toUpperCase()}</span>
                </td>
                <td style={{ padding: '14px 10px' }}>
                  {b.fichaCompleted ? (
                    <span className="badge badge-success" style={{ gap: '4px' }}><Check size={12} /> Preenchida</span>
                  ) : (
                    <span className="badge badge-danger" style={{ gap: '4px' }}><AlertTriangle size={12} /> Pendente</span>
                  )}
                </td>
                <td style={{ padding: '14px 10px' }}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <a 
                      href={`#/admin/briefing/${b.id}`} 
                      className="btn btn-secondary" 
                      style={{ padding: '6px 12px', fontSize: '0.75rem', borderRadius: 'var(--radius-sm)' }}
                    >
                      Briefing <ArrowRight size={12} />
                    </a>
                    <button 
                      onClick={() => setEditingBooking(b)}
                      className="btn btn-secondary"
                      style={{ padding: '6px 10px', fontSize: '0.75rem', borderRadius: 'var(--radius-sm)', display: 'inline-flex', alignItems: 'center' }}
                    >
                      <Edit2 size={12} /> Editar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredBookings.length === 0 && (
              <tr>
                <td colSpan="8" style={{ textAlign: 'center', padding: '30px', color: 'var(--text-muted)' }}>
                  Nenhuma reserva encontrada para os filtros aplicados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ======================================================== */}
      {/* ⚙️ MODAL EDITAR TAXAS E REPASSES */}
      {/* ======================================================== */}
      {isRatesModalOpen && (
        <div className="modal-overlay">
          <form className="modal-content" onSubmit={handleSaveRates}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--text-h)' }}>⚙️ Ajustar Preços e Payouts</h3>
              <button 
                type="button" 
                onClick={() => setIsRatesModalOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <h4 style={{ fontSize: '1rem', color: 'var(--accent)', fontWeight: '600' }}>Preços Base do Tour</h4>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label">Preço Base por Pessoa (R$)</label>
                  <input 
                    type="number" 
                    className="form-control" 
                    value={ratesForm.basePrice}
                    onChange={(e) => setRatesForm({...ratesForm, basePrice: parseInt(e.target.value) || 0})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Taxa Fixa de Intérprete (R$)</label>
                  <input 
                    type="number" 
                    className="form-control" 
                    value={ratesForm.interpreterRate}
                    onChange={(e) => setRatesForm({...ratesForm, interpreterRate: parseInt(e.target.value) || 0})}
                    required
                  />
                </div>
              </div>

              <h4 style={{ fontSize: '1rem', color: '#7a1c4a', fontWeight: '600', marginTop: '10px' }}>Políticas & Operação</h4>
            
            <div className="form-group">
              <label className="form-label">Horário de Liberação das Recordações (Pós-Passeio)</label>
              <input 
                type="time" 
                className="form-control" 
                value={ratesForm.releaseHour}
                onChange={(e) => setRatesForm({...ratesForm, releaseHour: e.target.value})}
                required
              />
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Clientes só conseguem abrir a página de recordações após este horário na data do passeio.
              </span>
            </div>

            <h4 style={{ fontSize: '1rem', color: 'var(--accent-gold)', fontWeight: '600', marginTop: '10px' }}>Valores de Repasse Local (por pessoa)</h4>
              
              <div className="form-group">
                <label className="form-label">Sítio Seu Ladi (Demonstração Açaí)</label>
                <input 
                  type="number" 
                  className="form-control" 
                  value={ratesForm.seuladi}
                  onChange={(e) => setRatesForm({...ratesForm, seuladi: parseInt(e.target.value) || 0})}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Dona Rosa (Almoço)</label>
                <input 
                  type="number" 
                  className="form-control" 
                  value={ratesForm.donarosa}
                  onChange={(e) => setRatesForm({...ratesForm, donarosa: parseInt(e.target.value) || 0})}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">AME Andirobeiras</label>
                <input 
                  type="number" 
                  className="form-control" 
                  value={ratesForm.ame}
                  onChange={(e) => setRatesForm({...ratesForm, ame: parseInt(e.target.value) || 0})}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Dona Nena Chocolate</label>
                <input 
                  type="number" 
                  className="form-control" 
                  value={ratesForm.donanena}
                  onChange={(e) => setRatesForm({...ratesForm, donanena: parseInt(e.target.value) || 0})}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Barqueiros (Transporte)</label>
                <input 
                  type="number" 
                  className="form-control" 
                  value={ratesForm.barqueiro}
                  onChange={(e) => setRatesForm({...ratesForm, barqueiro: parseInt(e.target.value) || 0})}
                  required
                />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', borderTop: '1px solid var(--border)', paddingTop: '16px', marginTop: '10px' }}>
              <button type="button" className="btn btn-secondary" onClick={() => setIsRatesModalOpen(false)}>Cancelar</button>
              <button type="submit" className="btn btn-primary">Salvar Alterações</button>
            </div>
          </form>
        </div>
      )}

      {/* ======================================================== */}
      {/* ✏️ MODAL EDITAR RESERVA INDIVIDUAL */}
      {/* ======================================================== */}
      {editingBooking && (
        <div className="modal-overlay">
          <form className="modal-content" onSubmit={handleSaveBooking}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--text-h)' }}>✏️ Editar Reserva {editingBooking.id}</h3>
              <button 
                type="button" 
                onClick={() => setEditingBooking(null)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem' }}>
              
              <div className="form-group">
                <label className="form-label">Nome do Cliente</label>
                <input 
                  type="text" 
                  className="form-control"
                  value={editingBooking.clientName}
                  onChange={(e) => setEditingBooking({...editingBooking, clientName: e.target.value})}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label">Data do Passeio</label>
                  <input 
                    type="date" 
                    className="form-control"
                    value={editingBooking.date}
                    onChange={(e) => setEditingBooking({...editingBooking, date: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Nº Passageiros</label>
                  <input 
                    type="number" 
                    className="form-control"
                    min="1"
                    value={editingBooking.passengers}
                    onChange={(e) => setEditingBooking({...editingBooking, passengers: parseInt(e.target.value) || 1})}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Roteiro / Rota</label>
                <select 
                  className="form-control"
                  value={editingBooking.tourId}
                  onChange={(e) => setEditingBooking({...editingBooking, tourId: e.target.value})}
                >
                  {TOURS.map(t => (
                    <option key={t.id} value={t.id}>{t.name}</option>
                  ))}
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label">Idioma</label>
                  <select 
                    className="form-control"
                    value={editingBooking.language}
                    onChange={(e) => setEditingBooking({...editingBooking, language: e.target.value})}
                  >
                    <option value="portugues">Português</option>
                    <option value="ingles">Inglês</option>
                    <option value="espanhol">Espanhol</option>
                    <option value="francais">Francês</option>
                    <option value="libras">Libras</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Forma de Pagamento</label>
                  <select 
                    className="form-control"
                    value={editingBooking.paymentMethod}
                    onChange={(e) => setEditingBooking({...editingBooking, paymentMethod: e.target.value})}
                  >
                    <option value="pix">Pix</option>
                    <option value="link">Cartão via Link</option>
                    <option value="paypal">PayPal</option>
                    <option value="mercadopago">Mercado Pago</option>
                    <option value="inter">Inter (Internac.)</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '20px', margin: '8px 0' }}>
                <label className="checkbox-label">
                  <input 
                    type="checkbox" 
                    className="checkbox-input"
                    checked={editingBooking.fichaCompleted}
                    onChange={(e) => setEditingBooking({...editingBooking, fichaCompleted: e.target.checked})}
                  />
                  Ficha do Viajante Entregue
                </label>
              </div>

              {editingBooking.fichaCompleted && (
                <>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div className="form-group">
                      <label className="form-label">Cidade de Origem</label>
                      <input 
                        type="text" 
                        className="form-control"
                        value={editingBooking.originCity || ''}
                        onChange={(e) => setEditingBooking({...editingBooking, originCity: e.target.value})}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">País de Origem</label>
                      <input 
                        type="text" 
                        className="form-control"
                        value={editingBooking.originCountry || ''}
                        onChange={(e) => setEditingBooking({...editingBooking, originCountry: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Alergias / Restrições Alimentares</label>
                    <input 
                      type="text" 
                      className="form-control"
                      value={editingBooking.dietaryRestrictions || ''}
                      onChange={(e) => setEditingBooking({...editingBooking, dietaryRestrictions: e.target.value})}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Contato de Emergência</label>
                    <input 
                      type="text" 
                      className="form-control"
                      value={editingBooking.emergencyContact || ''}
                      onChange={(e) => setEditingBooking({...editingBooking, emergencyContact: e.target.value})}
                    />
                  </div>
                </>
              )}

            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', borderTop: '1px solid var(--border)', paddingTop: '16px', marginTop: '10px' }}>
              <button type="button" className="btn btn-secondary" onClick={() => setEditingBooking(null)}>Cancelar</button>
              <button type="submit" className="btn btn-primary">Salvar Reserva</button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
}
