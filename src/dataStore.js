// Mock data and localStorage state manager for Monotur Hub

const INITIAL_FAUNA_FLORA = [
  {
    id: "samauma",
    name: "Samaúma / Sumaúma",
    scientific: "Ceiba pentandra",
    category: "flora",
    title: "A Rainha da Amazônia",
    subtitle: "Conexão e ancestralidade: 'Somos Uma'",
    description: "É a maior árvore da floresta, podendo chegar a 70 metros de altura. Seus contrafortes (raízes tabulares chamadas sapopembas) eram usados pelos povos indígenas para comunicação na floresta, batendo em sua base para propagar o som por longas distâncias. Seu nome remete ao sentimento de união com a floresta.",
    img: "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "paxiuba",
    name: "Paxiúba",
    scientific: "Socratea exorrhiza",
    category: "flora",
    title: "A Árvore que Anda",
    subtitle: "Mecanismo único de sobrevivência",
    description: "Conhecida como a 'árvore que anda', ela possui raízes aéreas fortes em forma de cone. Se outra árvore cair sobre ela ou se ela precisar de mais luz solar, ela pode crescer novas raízes na direção favorável e deixar as antigas morrerem, deslocando-se alguns centímetros ao longo do tempo.",
    img: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "tapiba",
    name: "Formiga Tapiba",
    scientific: "Azteca sp.",
    category: "fauna",
    title: "O Repelente Natural",
    subtitle: "Sabedoria das populações ribeirinhas",
    description: "Uma pequena formiga que vive em colônias em árvores. Ao esfregar levemente essas formigas nas mãos e braços, elas liberam um odor ácido que atua como um excelente repelente natural contra mosquitos da floresta. Uma verdadeira demonstração de sobrevivência prática.",
    img: "https://images.unsplash.com/photo-1576176539998-0b37ff11eff1?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "japiim",
    name: "Japiim",
    scientific: "Cacicus cela",
    category: "fauna",
    title: "O Pássaro Imitador",
    subtitle: "Ninhos pendurados em 'condomínios'",
    description: "Famoso por imitar o canto de outros pássaros e até de mamíferos. Eles constroem ninhos em forma de bolsas penduradas em galhos altos, geralmente próximos a ninhos de marimbondos para proteção mútua. Curiosamente, eles são conhecidos por colocar ovos nos ninhos de outros pássaros para que estes os criem.",
    img: "https://images.unsplash.com/photo-1470688946068-6d0d7374eb63?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "cipo-alho",
    name: "Cipó Alho",
    scientific: "Adenocalymma alliaceum",
    category: "flora",
    title: "O Tempero da Floresta",
    subtitle: "Folhas com aroma marcante de alho",
    description: "Um cipó cuja folha esmagada exala um cheiro idêntico ao alho de cozinha. É amplamente utilizado na culinária tradicional da região e possui propriedades medicinais reconhecidas, como ação anti-inflamatória e analgésica.",
    img: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "escada-de-jaboti",
    name: "Cipó Escada de Jaboti",
    scientific: "Bauhinia guianensis",
    category: "flora",
    title: "Cipó Medicinal",
    subtitle: "Aliado contra dores na coluna",
    description: "Este cipó cresce em um formato ondulado que se assemelha a uma escada (daí o nome popular). É muito valorizado na medicina tradicional ribeirinha: seu chá ou infusão é utilizado como um remédio poderoso contra dores na coluna, inflamações nas articulações e problemas renais.",
    img: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "preguica-bentinho",
    name: "Preguiça-de-bentinho",
    scientific: "Bradypus tridactylus",
    category: "fauna",
    title: "A Preguiça Amazônica",
    subtitle: "Vida calma nas copas das árvores",
    description: "Uma espécie de preguiça de três dedos muito comum na região das ilhas de Belém. Possui uma mancha preta e amarela nas costas (nos machos). Vivem no topo das árvores alimentando-se quase exclusivamente de folhas, movendo-se de forma lenta e harmoniosa com o ecossistema.",
    img: "https://images.unsplash.com/photo-1519052537078-e6302a4968d4?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "macaco-de-cheiro",
    name: "Macaco-de-cheiro",
    scientific: "Saimiri sciureus",
    category: "fauna",
    title: "Curioso e Ágil",
    subtitle: "Os pequenos acrobatas dos furos",
    description: "Macacos pequenos e extremamente ágeis que andam em grandes grupos. São facilmente avistados saltando entre os galhos baixos nos igarapés e furos. Têm o focinho preto e manchas brancas ao redor dos olhos, parecendo usar uma máscara.",
    img: "https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?auto=format&fit=crop&q=80&w=400"
  }
];

const INITIAL_PARTNERS = [
  {
    id: "seuladi",
    name: "Sítio Seu Ladi",
    handle: "@vera_chocolate_vc",
    description: "Demonstração do açaí, castanha in natura e chocolate artesanal da família.",
    icon: "TreeDeciduous",
    payoutRate: 40 // R$ por pessoa
  },
  {
    id: "donarosa",
    name: "Restaurante Resto da Ilha (Dona Rosa)",
    handle: "@resto_da_ilha",
    description: "O melhor da culinária ribeirinha, banho de rio e descanso na rede.",
    icon: "Utensils",
    payoutRate: 75 // R$ por pessoa (almoço incluso)
  },
  {
    id: "ame",
    name: "AME Combu (Andirobeiras)",
    handle: "@ame.combu",
    description: "Cosméticos e saberes tradicionais extraídos da semente de andiroba.",
    icon: "Heart",
    payoutRate: 20 // R$ por pessoa
  },
  {
    id: "donanena",
    name: "Filha do Combu (Dona Nena)",
    handle: "@filhadocombu",
    description: "Fábrica de chocolate artesanal 100% orgânico no meio do igarapé.",
    icon: "Gift",
    payoutRate: 35 // R$ por pessoa (inclui degustação)
  },
  {
    id: "barqueiro",
    name: "Associação de Barqueiros / Piloto",
    handle: "@monotour_belem",
    description: "Transporte seguro pelos furos e igarapés da foz do Guamá.",
    icon: "Ship",
    payoutRate: 50 // R$ por pessoa
  }
];

export const TOURS = [
  { id: "combu", name: "Foz do Guamá e Ilha do Combu" },
  { id: "cotijuba", name: "Cotijuba Selvagem & Ruínas" },
  { id: "pordosol", name: "Orla ao Pôr do Sol" }
];

const INITIAL_BOOKINGS = [
  {
    id: "MT-9942",
    date: "2026-06-20",
    clientName: "Marcelle Dumont",
    email: "marcelle.d@gmail.com",
    phone: "+33 6 1234 5678",
    passengers: 3,
    language: "francais",
    paymentMethod: "paypal",
    status: "pago",
    tourId: "combu",
    totalPaid: 1950.00,
    subtotal: 1350.00,
    interpreterFee: 300.00,
    gatewayFee: 78.00,
    originCity: "Paris",
    originState: "Île-de-France",
    originCountry: "França",
    leadSource: "Google Search",
    dietaryRestrictions: "Vegetariana, sem glúten",
    lifeJacketSizes: ["M", "M", "S"],
    imageConsent: true,
    medicalNotes: "Nenhuma",
    emergencyContact: "Pierre Dumont (+33 6 8765 4321)",
    fichaCompleted: true
  },
  {
    id: "MT-1045",
    date: "2026-06-22",
    clientName: "Rodrigo Alencar",
    email: "rodrigo.alencar@yahoo.com.br",
    phone: "(11) 98765-4321",
    passengers: 5,
    language: "portugues",
    paymentMethod: "pix",
    status: "pago",
    tourId: "combu",
    totalPaid: 1750.00,
    subtotal: 1750.00,
    interpreterFee: 0.00,
    gatewayFee: 0.00,
    originCity: "São Paulo",
    originState: "SP",
    originCountry: "Brasil",
    leadSource: "Instagram",
    dietaryRestrictions: "Alergia grave a camarão",
    lifeJacketSizes: ["XL", "L", "M", "M", "S"],
    imageConsent: true,
    medicalNotes: "Usa bombinha de asma",
    emergencyContact: "Ana Alencar (11) 99999-8888",
    fichaCompleted: true
  },
  {
    id: "MT-1120",
    date: "2026-06-27",
    clientName: "John Smith",
    email: "john.smith@outlook.com",
    phone: "+1 202 555 0143",
    passengers: 5,
    language: "ingles",
    paymentMethod: "link",
    status: "pago",
    tourId: "combu",
    totalPaid: 2122.50,
    subtotal: 1750.00,
    interpreterFee: 300.00,
    gatewayFee: 72.50,
    originCity: "Washington D.C.",
    originState: "DC",
    originCountry: "Estados Unidos",
    leadSource: "TripAdvisor",
    dietaryRestrictions: "Intolerância a lactose",
    dietOption: "tradicional",
    lifeJacketSizes: ["L", "M", "M", "S", "S"],
    passengerDetails: [
      { name: "John Smith", size: "L" },
      { name: "Mary Smith", size: "M" },
      { name: "Robert Smith", size: "M" },
      { name: "Alice Smith", size: "S" },
      { name: "Billy Smith", size: "S" }
    ],
    imageConsent: false,
    medicalNotes: "Nenhuma",
    emergencyContact: "Mary Smith (+1 202 555 0199)",
    fichaCompleted: true
  },
  {
    id: "MT-2022",
    date: "2026-06-27",
    clientName: "Mariana Costa",
    email: "mariana.costa@uol.com.br",
    phone: "(91) 98122-3344",
    passengers: 6,
    language: "portugues",
    paymentMethod: "pix",
    status: "pago",
    tourId: "combu",
    totalPaid: 2100.00,
    subtotal: 2100.00,
    interpreterFee: 0.00,
    gatewayFee: 0.00,
    originCity: "São Paulo",
    originState: "SP",
    originCountry: "Brasil",
    leadSource: "Instagram",
    dietaryRestrictions: "Nenhuma",
    dietOption: "vegetariana",
    lifeJacketSizes: ["XL", "L", "M", "M", "M", "S"],
    passengerDetails: [
      { name: "Mariana Costa", size: "XL" },
      { name: "Carlos Costa", size: "L" },
      { name: "Juliana Costa", size: "M" },
      { name: "Felipe Costa", size: "M" },
      { name: "Lucas Costa", size: "M" },
      { name: "Beatriz Costa", size: "S" }
    ],
    imageConsent: true,
    medicalNotes: "Nenhuma",
    emergencyContact: "Carlos Costa (91) 98122-5566",
    fichaCompleted: true
  },
  {
    id: "MT-3033",
    date: "2026-06-27",
    clientName: "Pierre Lefevre",
    email: "pierre.lefevre@gmail.fr",
    phone: "+33 6 9876 5432",
    passengers: 5,
    language: "francais",
    paymentMethod: "paypal",
    status: "pago",
    tourId: "combu",
    totalPaid: 2143.25,
    subtotal: 1750.00,
    interpreterFee: 300.00,
    gatewayFee: 93.25,
    originCity: "Paris",
    originState: "IDF",
    originCountry: "França",
    leadSource: "Google Search",
    dietaryRestrictions: "Alergia grave a camarão",
    dietOption: "tradicional",
    lifeJacketSizes: ["XL", "L", "M", "M", "S"],
    passengerDetails: [
      { name: "Pierre Lefevre", size: "XL" },
      { name: "Sophie Lefevre", size: "L" },
      { name: "Jean Lefevre", size: "M" },
      { name: "Marie Lefevre", size: "M" },
      { name: "Chloe Lefevre", size: "S" }
    ],
    imageConsent: true,
    medicalNotes: "Usa bombinha de asma",
    emergencyContact: "Sophie Lefevre (+33 6 9876 0000)",
    fichaCompleted: true
  },
  {
    id: "MT-1250",
    date: "2026-06-28",
    clientName: "Carla Souza",
    email: "carla.souza@outlook.com",
    phone: "(91) 98111-2222",
    passengers: 4,
    language: "libras",
    paymentMethod: "pix",
    status: "pago",
    tourId: "combu",
    totalPaid: 1700.00,
    subtotal: 1700.00,
    interpreterFee: 300.00,
    gatewayFee: 0.00,
    fichaCompleted: false
  }
];

export const loadState = () => {
  try {
    const faunaFlora = localStorage.getItem("monotur_fauna_flora");
    const partners = localStorage.getItem("monotur_partners");
    const bookings = localStorage.getItem("monotur_bookings");

    let parsedPartners;
    try {
      parsedPartners = partners ? JSON.parse(partners) : INITIAL_PARTNERS;
    } catch {
      parsedPartners = INITIAL_PARTNERS;
    }
    if (!Array.isArray(parsedPartners)) {
      parsedPartners = INITIAL_PARTNERS;
    }
    parsedPartners = parsedPartners.map(p => {
      const match = INITIAL_PARTNERS.find(ip => ip.id === p.id);
      return {
        ...p,
        payoutRate: p.payoutRate !== undefined ? p.payoutRate : (match ? match.payoutRate : 0)
      };
    });

    let parsedBookings;
    try {
      parsedBookings = bookings ? JSON.parse(bookings) : INITIAL_BOOKINGS;
    } catch {
      parsedBookings = INITIAL_BOOKINGS;
    }
    if (!Array.isArray(parsedBookings)) {
      parsedBookings = INITIAL_BOOKINGS;
    }
    parsedBookings = parsedBookings.map(b => ({
      ...b,
      tourId: b.tourId || "combu",
      date: b.date || "2026-06-27",
      passengers: parseInt(b.passengers) || 1,
      subtotal: parseFloat(b.subtotal) || 0,
      interpreterFee: parseFloat(b.interpreterFee) || 0,
      gatewayFee: parseFloat(b.gatewayFee) || 0,
      totalPaid: parseFloat(b.totalPaid) || 0
    }));

    let parsedFaunaFlora;
    try {
      parsedFaunaFlora = faunaFlora ? JSON.parse(faunaFlora) : INITIAL_FAUNA_FLORA;
    } catch {
      parsedFaunaFlora = INITIAL_FAUNA_FLORA;
    }
    if (!Array.isArray(parsedFaunaFlora)) {
      parsedFaunaFlora = INITIAL_FAUNA_FLORA;
    }

    return {
      faunaFlora: parsedFaunaFlora,
      partners: parsedPartners,
      bookings: parsedBookings
    };
  } catch (e) {
    console.error("Error loading localStorage data", e);
    return {
      faunaFlora: INITIAL_FAUNA_FLORA,
      partners: INITIAL_PARTNERS,
      bookings: INITIAL_BOOKINGS
    };
  }
};

export const saveState = (state) => {
  try {
    localStorage.setItem("monotur_fauna_flora", JSON.stringify(state.faunaFlora));
    localStorage.setItem("monotur_partners", JSON.stringify(state.partners));
    localStorage.setItem("monotur_bookings", JSON.stringify(state.bookings));
  } catch (e) {
    console.error("Error saving data to localStorage", e);
  }
};

// Pricing rules (can be edited in admin panel and stored in localStorage)
export const getBasePrice = () => {
  const val = localStorage.getItem("monotur_base_price");
  return val ? parseInt(val) : 350;
};

export const getInterpreterRate = () => {
  const val = localStorage.getItem("monotur_interpreter_rate");
  return val ? parseInt(val) : 300;
};

export const saveBasePrice = (val) => {
  localStorage.setItem("monotur_base_price", val.toString());
};

export const saveInterpreterRate = (val) => {
  localStorage.setItem("monotur_interpreter_rate", val.toString());
};

export const PAYMENT_METHODS = {
  pix: { name: "Pix", feePercent: 0, flatFee: 0 },
  link: { name: "Cartão via Link", feePercent: 3.5, flatFee: 0.50 },
  paypal: { name: "PayPal", feePercent: 4.5, flatFee: 1.00 },
  mercadopago: { name: "Mercado Pago", feePercent: 3.99, flatFee: 0.00 },
  inter: { name: "Inter (Transf. Internacional)", feePercent: 1.5, flatFee: 5.00 }
};

export const calculateTotal = (passengers, language, paymentMethod) => {
  const basePrice = getBasePrice();
  const interpreterRate = getInterpreterRate();
  
  const transportCost = passengers < 5 ? 300 : 0;
  const baseSubtotal = passengers * basePrice;
  const subtotal = baseSubtotal + transportCost;
  
  // Interpreter fee if language is not Portuguese
  const interpreterFee = (language && language !== "portugues") ? interpreterRate : 0;
  
  const rawTotal = subtotal + interpreterFee;
  
  // Gateway fees
  const method = PAYMENT_METHODS[paymentMethod] || PAYMENT_METHODS.pix;
  const gatewayFee = (rawTotal * (method.feePercent / 100)) + method.flatFee;
  
  const totalPaid = parseFloat((rawTotal + gatewayFee).toFixed(2));
  
  return {
    baseSubtotal,
    transportCost,
    subtotal,
    interpreterFee,
    gatewayFee: parseFloat(gatewayFee.toFixed(2)),
    totalPaid
  };
};

export const calculatePartnerPayouts = (booking, partners) => {
  const passengers = booking.passengers || 0;
  let totalLocalPayout = 0;
  
  const breakdown = partners.map(p => {
    const rate = p.payoutRate !== undefined ? p.payoutRate : 0;
    const payout = rate * passengers;
    totalLocalPayout += payout;
    return {
      partnerId: p.id,
      name: p.name,
      amount: payout
    };
  });
  
  // Monotur's net margin
  const subtotal = booking.subtotal || 0;
  const interpreterFee = booking.interpreterFee || 0;
  const baseRevenue = subtotal + interpreterFee;
  const netMonotur = baseRevenue - totalLocalPayout - interpreterFee;
  
  return {
    breakdown,
    totalLocalPayout,
    netMonotur: parseFloat(netMonotur.toFixed(2))
  };
};

export const formatDateSafely = (dateStr) => {
  if (!dateStr || typeof dateStr !== 'string') return '';
  const parts = dateStr.split('-');
  if (parts.length < 3) return dateStr;
  return `${parts[2]}/${parts[1]}/${parts[0]}`;
};

export const getReleaseHour = () => {
  const val = localStorage.getItem("monotur_release_hour");
  return val || "17:00";
};

export const saveReleaseHour = (hour) => {
  localStorage.setItem("monotur_release_hour", hour);
};

export const isMemoriesReleased = (bookingDate) => {
  if (!bookingDate) return false;
  
  const releaseHourStr = getReleaseHour();
  const now = new Date();
  
  const [year, month, day] = bookingDate.split('-').map(Number);
  const [hour, minute] = releaseHourStr.split(':').map(Number);
  
  const releaseTime = new Date(year, month - 1, day, hour, minute, 0);
  
  return now >= releaseTime;
};

