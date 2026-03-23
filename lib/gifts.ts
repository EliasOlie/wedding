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
      "https://static.lclhome.com.br/public/lcl/imagens/produtos/jogo-de-6-pratos-fundos-stoneware-mahogany-porto-brasil-17330.jpeg",
  },
  {
    id: 2,
    name: "Frigideira antiaderente",
    price: 120,
    image:
      "https://images.tcdn.com.br/img/img_prod/1143540/frigideira_tramontina_turim_aluminio_antiaderente_starflon_vermelho_com_tampa_de_vidro_1_7l_621_1_286ae573862802479c8d8f76fcf2d9df.jpg",
  },
  {
    id: 3,
    name: "Jogo de facas de cozinha",
    price: 130,
    image:
      "https://s3.amazonaws.com/assets.tramontina.com.br/upload/tramon/imagens/CUT/23899060PDM001G.jpg",
  },
  {
    id: 4,
    name: "Assadeira de vidro grande",
    price: 140,
    image:
      "https://images.tcdn.com.br/img/img_prod/1270913/assadeira_de_vidro_marinex_retangular_grande_seletta_c_tampa_3_5l_653_5011_1_3c7f14d485325177c315ae931cde462b.jpg",
  },
  {
    id: 5,
    name: "Kit travessas de vidro",
    price: 150,
    image:
      "https://t62533.vteximg.com.br/arquivos/ids/943256-1000-1000/TRAVESSA.jpg?v=638289127302500000",
  },
  {
    id: 6,
    name: "Jogo de toalhas de banho",
    price: 160,
    image:
      "https://m.media-amazon.com/images/I/81uT0PNhj8L._AC_UF894,1000_QL80_.jpg",
  },
  {
    id: 7,
    name: "Jogo de copos de vidro",
    price: 120,
    image: "https://m.media-amazon.com/images/I/715hvgVy7jL.jpg",
  },
  {
    id: 8,
    name: "Conjunto de potes herméticos",
    price: 130,
    image:
      "https://m.media-amazon.com/images/I/81BoVR79zoL._AC_UF894,1000_QL80_.jpg",
  },
  {
    id: 9,
    name: "Lixeira inox",
    price: 105,
    image:
      "https://images.tcdn.com.br/img/img_prod/780820/lixeira_inox_com_tampa_e_pedal_10_litros_ac_048_flexinox_5740678_1_20200529195933.jpg",
  },

  // --- FAIXA 2 (R$ 150 - R$ 280) ---
  {
    id: 10,
    name: "Liquidificador",
    price: 180,
    image:
      "https://mirandacomputacao.jetassets.com.br/produto/44128-principal.png",
  },
  {
    id: 11,
    name: "Sanduicheira elétrica",
    price: 150,
    image:
      "https://down-br.img.susercontent.com/file/br-11134207-7r98o-mbjgkj1umxrsc7",
  },
  {
    id: 12,
    name: "Cafeteira elétrica",
    price: 200,
    image:
      "https://images.kabum.com.br/produtos/fotos/sync_mirakl/472967/xlarge/Cafeteira-El-trica-Mondial-Dolce-Arome-30-X-caras-Corta-Pingos-800W-220V-Preto-Inox-C-37-Ji-30x_1757625297.jpg",
  },
  {
    id: 13,
    name: "Conjunto de talheres inox",
    price: 220,
    image:
      "https://m.media-amazon.com/images/I/71yNS91ylGL._AC_UF894,1000_QL80_.jpg",
  },
  {
    id: 14,
    name: "Jogo de lençol casal",
    price: 279,
    image:
      "https://d1l2khdhnk6ii8.cloudfront.net/Custom/Content/Products/99/67/996756_jogo-de-cama-alexandre-herchcovitch-queen-percal-180-fios-100-algodao-loft_m6_638902692665489580.webp",
  },
  {
    id: 15,
    name: "Edredom casal",
    price: 250,
    image:
      "https://m.media-amazon.com/images/I/81g-KYbDBKL._AC_UF894,1000_QL80_.jpg",
  },
  {
    id: 16,
    name: "Tapete grande para sala",
    price: 220,
    image:
      "https://casaamarella.com.br/cdn/shop/files/Sce4e231cf6a1488ca36e6dd58d84ae8aN.jpg?v=1695649018&width=2048",
  },
  {
    id: 17,
    name: "Tábua de passar roupa",
    price: 150,
    image:
      "https://www.lojademoveisonline.com.br/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/t/a/tabua-passar-roupa-havai-rv-branco.jpg",
  },

  // --- FAIXA 3 (R$ 250 - R$ 550) ---
  {
    id: 18,
    name: "Batedeira",
    price: 300,
    image:
      "https://itatiaia.vtexassets.com/arquivos/ids/163800/200-Cm--18-.png?v=639041065518300000",
  },
  {
    id: 19,
    name: "Panela de pressão",
    price: 250,
    image:
      "https://m.media-amazon.com/images/I/81P4NbJcaVS._AC_UF894,1000_QL80_.jpg",
  },
  {
    id: 20,
    name: "Jogo de panelas",
    price: 350,
    image:
      "https://gazin-images.gazin.com.br/n0EtdPGSswvCfNhqHu60yCmPQdk=/1920x/filters:format(webp):quality(75)/https://gazin-marketplace.s3.amazonaws.com/midias/imagens/2022/06/jogo-de-panelas-tramontina-antiaderente-5-pecas-sicilia-102206482441.jpg",
  },
  {
    id: 21,
    name: "Air fryer",
    price: 300,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAt4yqb1CFVSrCPeHYhEaET_qKZAO5Z1wU7g&s",
  },
  {
    id: 22,
    name: "Aspirador de pó",
    price: 280,
    image:
      "https://valflex.vteximg.com.br/arquivos/ids/740830-1000-1000/67241_1.jpg?v=638506230632700000",
  },
  {
    id: 23,
    name: "Jogo de panelas antiaderente premium",
    price: 420,
    image:
      "https://m.media-amazon.com/images/I/61gHu7UKd+L._AC_UF894,1000_QL80_.jpg",
  },
  {
    id: 24,
    name: "Mixer ou processador",
    price: 320,
    image:
      "https://m.magazineluiza.com.br/a-static/420x420/kit-mixer-processador-e-batedor-3-em-1-127v-220v-com-copo-700ml-e-acessorios-compacto-pratico-e-versatil-para-cozinha-sortido-preto-ou-branco-startools/bragamagazines/ar0890/ab433b0e976293480091a6672105cf29.jpeg",
  },
  {
    id: 25,
    name: "Micro-ondas",
    price: 550,
    image:
      "https://topmoveis.vtexassets.com/arquivos/ids/169432/FORNO-MICRO-ONDAS-34L-900W-NN-ST66NBRUK-PRETO-PANASONIC.jpg?v=638504299455100000",
  },
  {
    id: 26,
    name: "Forno elétrico",
    price: 500,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0Pwp2XHVyT-f194UTdskGMeh9qkEuLP0how&s",
  },

  // --- ELETRODOMÉSTICOS GRANDES ---
  {
    id: 27,
    name: 'Smart TV 32"',
    price: 1300,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuqL9YlALfpNXVlBZXlvPNxkfjocE-DJFmsQ&s",
  },
  {
    id: 28,
    name: "Máquina de lavar roupa",
    price: 1800,
    image:
      "https://m.media-amazon.com/images/I/41pS08Q7EoL._AC_UF894,1000_QL80_.jpg",
  },
  {
    id: 29,
    name: "Geladeira",
    price: 2500,
    image: "https://m.media-amazon.com/images/I/31xMzsFPtXL.jpg",
  },

  // --- BANHEIRO ---
  {
    id: 30,
    name: "Jogo de toalhas de banho (4 peças)",
    price: 105,
    image:
      "https://cdn.awsli.com.br/2500x2500/941/941355/produto/366589826/jogo-de-toalhas-floren-a-4-pe-as-azul-e-verde-fmaopa0kcb.jpg",
  },
  {
    id: 31,
    name: "Tapete grande para banheiro",
    price: 110,
    image:
      "https://jetex.cdn.magazord.com.br/img/2024/04/produto/5417/capacho-tapete-banheiro-bege-hawaii-02-edantex-jetex.jpg?ims=600x600",
  },
  {
    id: 32,
    name: "Kit banheiro (saboneteira + porta escova)",
    price: 120,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSktntBSLequXAEzk4M_OmNQzf8oCPJqSI9-Q&s",
  },
  {
    id: 33,
    name: "Porta toalhas de parede",
    price: 110,
    image:
      "https://images.tcdn.com.br/img/img_prod/1172145/toalheiro_hotel_de_parede_porta_toalha_duplo_preto_master_101915_2_b6d6787bf469381aed12e2b5ad4bf069.jpg",
  },
  {
    id: 34,
    name: "Kit organizador de banheiro",
    price: 140,
    image:
      "https://m.media-amazon.com/images/I/81NN7Vi6SoL._AC_UF894,1000_QL80_.jpg",
  },

  // --- CAMA E DECORAÇÃO ---
  {
    id: 35,
    name: "Jogo de lençol casal premium",
    price: 300,
    image:
      "https://http2.mlstatic.com/D_NQ_NP_792172-MLB107699342478_032026-O.webp",
  },
  {
    id: 36,
    name: "Protetor de colchão impermeável",
    price: 130,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVq0Z_kMCv7qJAbgDMaPGhxfd1vi5ZJwr2QQ&s",
  },
  {
    id: 37,
    name: "Travesseiro viscoelástico",
    price: 150,
    image:
      "https://m.media-amazon.com/images/I/61T9MO3ik6L._AC_UF894,1000_QL80_.jpg",
  },
  {
    id: 38,
    name: "Colcha casal",
    price: 220,
    image:
      "https://d936f1vbzcg3q.cloudfront.net/Custom/Content/Products/10/09/1009999_colcha-zelo-classic-piquet-favo-fio-tinto-casal-100-algodao_m15_638723740995186641.webp",
  },
  {
    id: 39,
    name: "Cobre leito casal",
    price: 260,
    image:
      "https://images.tcdn.com.br/img/img_prod/1307444/cobre_leito_athenas_dupla_face_casal_padrao_9_1_9d2ffb6ed877777f1f8052c9377174dd.jpg",
  },
  {
    id: 40,
    name: "Fronhas premium (par)",
    price: 110,
    image:
      "https://m.media-amazon.com/images/I/51NjaOyvVlL._AC_UF894,1000_QL80_.jpg",
  },
  {
    id: 41,
    name: "Kit cama completo (lençol + fronhas)",
    price: 300,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk2R7erhRoqGqx16TVl35hbeEfHusuqFaOyA&s",
  },
  {
    id: 42,
    name: "Roupão de banho casal",
    price: 250,
    image:
      "https://down-br.img.susercontent.com/file/br-11134207-7r98o-ly8loqdupkt18e",
  },
  {
    id: 43,
    name: "Toalhas de lavabo (kit)",
    price: 120,
    image:
      "https://emporiodolencol.vtexassets.com/arquivos/ids/176154/kit-toalha-lavabo-roma-buettner-bege.jpg?v=638574395407000000",
  },
  {
    id: 44,
    name: "Tapete grande para quarto",
    price: 220,
    image:
      "https://a-static.mlcdn.com.br/%7Bw%7Dx%7Bh%7D/tapete-grande-quarto-2-metros-pelo-alto-antiderrapante-2x15-essencia-confeccoes/evaenxovais/0001234567890123456789012345/af4dacee27f79a601eb15feb3538a455.jpeg",
  },
  {
    id: 45,
    name: "Teste",
    price: 1,
    image:
      "https://media.istockphoto.com/id/972656164/pt/vetorial/wip-sign-icon.jpg?s=612x612&w=0&k=20&c=ua9bBYSy32XeP3QxU_2Yj5b2C1VcJD9RQJ1Z9q3N92Y=",
  },
];
