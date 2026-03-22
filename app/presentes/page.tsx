/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/static-components */
/* eslint-disable react/no-unescaped-entities */
"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Plane, Home as HomeIcon } from "lucide-react";

// --- DADOS MOCKADOS (Com curadoria de imagens sofisticadas) ---
const honeymoonGifts = [
  {
    id: "hm-1",
    title: "Jantar sob as estrelas",
    description: "Nossa primeira noite na lua de mel.",
    price: "R$ 350,00",
    // Foto atmosférica: vinho, luz baixa, textura.
    image:
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "hm-2",
    title: "Massagem para o Casal",
    description: "Um dia de spa para relaxar após o casamento.",
    price: "R$ 500,00",
    // Foto arquitetônica/minimalista de spa
    image:
      "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "hm-3",
    title: "Passeio de Barco",
    description: "Navegando pela costa ao pôr do sol.",
    price: "R$ 800,00",
    // Foto do mar com textura suave, não super saturada
    image:
      "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=800&auto=format&fit=crop",
  },
];

const homeGifts = [
  {
    id: "ho-1",
    title: "Máquina de Café Expresso",
    description: "Para nossas manhãs começarem perfeitas.",
    price: "R$ 950,00",
    image:
      "https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "ho-2",
    title: "Faqueiro Dourado (24 Peças)",
    description: "Elegância para receber nossa família.",
    price: "R$ 420,00",
    image:
      "https://images.unsplash.com/photo-1628557044736-11f8b8941cb1?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "ho-3",
    title: "Enxoval Algodão Egípcio",
    description: "O conforto que nosso novo lar merece.",
    price: "R$ 680,00",
    image:
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=800&auto=format&fit=crop",
  },
];

// --- CONFIGURAÇÃO DE ANIMAÇÕES ---
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

// --- COMPONENTE DE ITEM INDIVIDUAL ---
const GiftItem = ({ item }: { item: any }) => (
  <motion.div
    variants={fadeInUp}
    className="group cursor-pointer flex flex-col"
  >
    {/* A Imagem como obra de arte (Aspect Ratio Vertical) */}
    <div className="relative w-full aspect-[4/5] overflow-hidden mb-6 rounded-sm bg-border/30">
      <Image
        src={item.image}
        alt={item.title}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover transition-transform duration-1000 group-hover:scale-105"
      />
      {/* Overlay sutil para garantir que a foto não grite mais que a interface */}
      <div className="absolute inset-0 bg-primary/5 mix-blend-overlay transition-opacity duration-500 group-hover:opacity-0" />
    </div>

    {/* Os Metadados do Presente */}
    <div className="flex flex-col flex-grow">
      <h3 className="font-serif text-2xl text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
        {item.title}
      </h3>
      <p className="font-sans text-sm font-light text-foreground/60 mb-4 flex-grow">
        {item.description}
      </p>

      {/* Rodapé do item: Preço e Ação */}
      <div className="flex items-center justify-between pt-4 border-t border-border/40">
        <span className="font-sans font-medium text-foreground text-sm tracking-wider">
          {item.price}
        </span>
        <span className="flex items-center gap-2 font-sans font-bold text-[10px] uppercase tracking-[0.2em] text-foreground transition-all duration-300 group-hover:gap-4">
          Presentear <ArrowRight className="w-3 h-3" />
        </span>
      </div>
    </div>
  </motion.div>
);

// --- PÁGINA PRINCIPAL ---
export default function RegistryPage() {
  return (
    <main className="min-h-[100dvh] w-full bg-background selection:bg-primary/20 selection:text-foreground overflow-x-hidden py-24 md:py-32">
      {/* CABEÇALHO DA PÁGINA */}
      <motion.div
        className="max-w-5xl mx-auto px-6 text-center mb-24"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.p
          variants={fadeInUp}
          className="font-sans text-[10px] md:text-xs uppercase tracking-[0.4em] text-foreground/60 font-medium mb-6"
        >
          Lista de Presentes
        </motion.p>
        <motion.h1
          variants={fadeInUp}
          className="text-5xl md:text-7xl font-serif text-foreground mb-8"
        >
          Construindo nosso{" "}
          <span className="italic font-light text-primary">futuro</span>
        </motion.h1>
        <motion.p
          variants={fadeInUp}
          className="font-sans font-light text-base md:text-lg text-foreground/70 max-w-2xl mx-auto leading-relaxed"
        >
          Sua presença é o nosso maior presente. Mas, caso queira nos abençoar
          com algo a mais, preparamos duas listas com muito carinho para nos
          ajudar nesta nova fase.
        </motion.p>
      </motion.div>

      {/* SEÇÃO 1: LUA DE MEL */}
      <motion.section
        className="max-w-7xl mx-auto px-6 mb-32"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <motion.div
          variants={fadeInUp}
          className="flex items-center gap-4 mb-12"
        >
          <Plane className="w-6 h-6 text-primary" strokeWidth={1.5} />
          <h2 className="text-3xl font-serif text-foreground">A Lua de Mel</h2>
          <div className="h-px bg-border flex-grow ml-4 opacity-50" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
          {honeymoonGifts.map((item) => (
            <GiftItem key={item.id} item={item} />
          ))}
        </div>
      </motion.section>

      {/* SEÇÃO 2: PARA O LAR */}
      <motion.section
        className="max-w-7xl mx-auto px-6 mb-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <motion.div
          variants={fadeInUp}
          className="flex items-center gap-4 mb-12"
        >
          <HomeIcon className="w-6 h-6 text-primary" strokeWidth={1.5} />
          <h2 className="text-3xl font-serif text-foreground">Para o Lar</h2>
          <div className="h-px bg-border flex-grow ml-4 opacity-50" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
          {homeGifts.map((item) => (
            <GiftItem key={item.id} item={item} />
          ))}
        </div>
      </motion.section>

      {/* RODAPÉ ELEGANTE */}
      <motion.div
        className="max-w-3xl mx-auto px-6 mt-32 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent mb-12" />
        <h3 className="font-serif text-xl text-foreground mb-2">
          Com amor e gratidão,
        </h3>
        <p className="font-serif italic text-2xl text-primary">
          Elias & Janine
        </p>
      </motion.div>
    </main>
  );
}
