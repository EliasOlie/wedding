// lib/gifts.ts

export interface Gift {
  id: number;
  name: string;
  price: number;
  image: string;
}

export const gifts: Gift[] = [
  // --- FAIXA 1 (R$ 100 - R$ 160) ---
  {
    id: 1,
    name: "Jogo de pratos",
    price: 105,
    image:
      "https://images.unsplash.com/photo-1603504381577-fb76ce7606e1?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 2,
    name: "Frigideira antiaderente",
    price: 120,
    image:
      "https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 3,
    name: "Jogo de facas de cozinha",
    price: 130,
    image:
      "https://images.unsplash.com/photo-1593618998160-e34014e67546?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 4,
    name: "Assadeira de vidro grande",
    price: 140,
    image:
      "https://images.unsplash.com/photo-1583687841584-8149eeb7fcbe?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 5,
    name: "Kit travessas de vidro",
    price: 150,
    image:
      "https://images.unsplash.com/photo-1620076824349-2d1748cb1519?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 6,
    name: "Jogo de toalhas de banho",
    price: 160,
    image:
      "https://images.unsplash.com/photo-1616627547584-bf28cee262db?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 7,
    name: "Jogo de copos de vidro",
    price: 120,
    image:
      "https://images.unsplash.com/photo-1594246039578-83b632948ca2?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 8,
    name: "Conjunto de potes herméticos",
    price: 130,
    image:
      "https://images.unsplash.com/photo-1588663806740-02a80f0896ab?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 9,
    name: "Lixeira inox",
    price: 105,
    image:
      "https://images.unsplash.com/photo-1585834887309-8d76d6545b7f?auto=format&fit=crop&w=600&q=80",
  },

  // --- FAIXA 2 (R$ 150 - R$ 280) ---
  {
    id: 10,
    name: "Liquidificador",
    price: 180,
    image:
      "https://images.unsplash.com/photo-1585659722983-38ca8e17b3d3?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 11,
    name: "Sanduicheira elétrica",
    price: 150,
    image:
      "https://images.unsplash.com/photo-1626200419188-f15e56e098bd?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 12,
    name: "Cafeteira elétrica",
    price: 200,
    image:
      "https://images.unsplash.com/photo-1520970014086-2208d157c9e2?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 13,
    name: "Conjunto de talheres inox",
    price: 220,
    image:
      "https://images.unsplash.com/photo-1608833959827-023a9d7010a3?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 14,
    name: "Jogo de lençol casal",
    price: 279,
    image:
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 15,
    name: "Edredom casal",
    price: 250,
    image:
      "https://images.unsplash.com/photo-1617325247661-675ab03407bd?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 16,
    name: "Tapete grande para sala",
    price: 220,
    image:
      "https://images.unsplash.com/photo-1528458909336-e6a00f2265f2?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 17,
    name: "Tábua de passar roupa",
    price: 150,
    image:
      "https://images.unsplash.com/photo-1580256081112-e49377338b7f?auto=format&fit=crop&w=600&q=80",
  },

  // --- FAIXA 3 (R$ 250 - R$ 550) ---
  {
    id: 18,
    name: "Batedeira",
    price: 300,
    image:
      "https://images.unsplash.com/photo-1593010530737-1d8213890fb4?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 19,
    name: "Panela de pressão",
    price: 250,
    image:
      "https://images.unsplash.com/photo-1584990347449-a03521b4430e?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 20,
    name: "Jogo de panelas",
    price: 350,
    image:
      "https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 21,
    name: "Air fryer",
    price: 300,
    image:
      "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 22,
    name: "Aspirador de pó",
    price: 280,
    image:
      "https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 23,
    name: "Jogo de panelas antiaderente premium",
    price: 420,
    image:
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 24,
    name: "Mixer ou processador",
    price: 320,
    image:
      "https://images.unsplash.com/photo-1589334547285-b15de033f20f?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 25,
    name: "Micro-ondas",
    price: 550,
    image:
      "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 26,
    name: "Forno elétrico",
    price: 500,
    image:
      "https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?auto=format&fit=crop&w=600&q=80",
  },

  // --- ELETRODOMÉSTICOS GRANDES ---
  {
    id: 27,
    name: 'Smart TV 32"',
    price: 1300,
    image:
      "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 28,
    name: "Máquina de lavar roupa",
    price: 1800,
    image:
      "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 29,
    name: "Geladeira",
    price: 2500,
    image:
      "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?auto=format&fit=crop&w=600&q=80",
  },

  // --- BANHEIRO ---
  {
    id: 30,
    name: "Jogo de toalhas de banho (4 peças)",
    price: 105,
    image:
      "https://images.unsplash.com/photo-1585058097003-888e23431afb?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 31,
    name: "Tapete grande para banheiro",
    price: 110,
    image:
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 32,
    name: "Kit banheiro (saboneteira + porta escova)",
    price: 120,
    image:
      "https://images.unsplash.com/photo-1610555356070-d1fb3d81b9e0?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 33,
    name: "Porta toalhas de parede",
    price: 110,
    image:
      "https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 34,
    name: "Kit organizador de banheiro",
    price: 140,
    image:
      "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=600&q=80",
  },

  // --- CAMA E DECORAÇÃO ---
  {
    id: 35,
    name: "Jogo de lençol casal premium",
    price: 300,
    image:
      "https://images.unsplash.com/photo-1536603831776-e8d19d6dff77?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 36,
    name: "Protetor de colchão impermeável",
    price: 130,
    image:
      "https://images.unsplash.com/photo-1541123437800-141315147817?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 37,
    name: "Travesseiro viscoelástico",
    price: 150,
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 38,
    name: "Colcha casal",
    price: 220,
    image:
      "https://images.unsplash.com/photo-1616047006789-b7af5afb8c20?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 39,
    name: "Cobre leito casal",
    price: 260,
    image:
      "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 40,
    name: "Fronhas premium (par)",
    price: 110,
    image:
      "https://images.unsplash.com/photo-1621508670150-13f683f124c6?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 41,
    name: "Kit cama completo (lençol + fronhas)",
    price: 300,
    image:
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 42,
    name: "Roupão de banho casal",
    price: 250,
    image:
      "https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 43,
    name: "Toalhas de lavabo (kit)",
    price: 120,
    image:
      "https://images.unsplash.com/photo-1618331835717-801e976710b2?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 44,
    name: "Tapete grande para quarto",
    price: 220,
    image:
      "https://images.unsplash.com/photo-1580237072617-771c3ecc4a24?auto=format&fit=crop&w=600&q=80",
  },
];
