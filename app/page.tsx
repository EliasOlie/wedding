/* eslint-disable react-hooks/static-components */
/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  Variants,
} from "framer-motion";
import { Gift, Calendar, MapPin, ArrowDown } from "lucide-react";
import Image from "next/image";

// --- CONFIGURAÇÃO DE ANIMAÇÕES (STAGGER) ---
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
    transition: {
      staggerChildren: 0.2,
    },
  },
};

// --- COMPONENTES ---

const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 3000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1, ease: "easeInOut" } }}
    >
      <div className="relative overflow-hidden p-10 flex items-center justify-center">
        <motion.h1
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          className="text-8xl md:text-9xl font-serif text-foreground/80 flex items-baseline"
        >
          <span>E</span>

          {/* O "&" EXATO: 
              - Removido o itálico e o font-light.
              - Inserida a classe font-baskerville (ou a equivalente que criarmos).
          */}
          <span className="font-baskerville text-primary mx-4 md:mx-6 font-normal">
            &
          </span>

          <span>J</span>
        </motion.h1>
      </div>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "200px" }}
        transition={{ delay: 0.8, duration: 1.5, ease: "easeInOut" }}
        className="h-[1px] bg-primary/50 mt-4"
      />
    </motion.div>
  );
};

const Countdown = () => {
  const targetDate = new Date("2026-05-23T00:00:00");
  const [timeLeft, setTimeLeft] = useState<{
    dias: number;
    horas: number;
    min: number;
    seg: number;
  } | null>(null);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +targetDate - +new Date();
      if (difference > 0) {
        setTimeLeft({
          dias: Math.floor(difference / (1000 * 60 * 60 * 24)),
          horas: Math.floor((difference / (1000 * 60 * 60)) % 24),
          min: Math.floor((difference / 1000 / 60) % 60),
          seg: Math.floor((difference / 1000) % 60),
        });
      }
    };
    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!timeLeft) return null;

  const Unit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center mx-4 md:mx-8 group cursor-default">
      <span className="text-4xl md:text-6xl font-serif font-light text-foreground group-hover:text-primary transition-colors duration-500">
        {String(value).padStart(2, "0")}
      </span>
      <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-muted-foreground mt-2 font-sans font-bold">
        {label}
      </span>
    </div>
  );

  return (
    <div className="flex flex-wrap justify-center items-center py-10 border-y border-border/40 backdrop-blur-sm">
      <Unit value={timeLeft.dias} label="Dias" />
      <span className="text-2xl text-primary/40 font-serif pb-6">:</span>
      <Unit value={timeLeft.horas} label="Horas" />
      <span className="text-2xl text-primary/40 font-serif pb-6 hidden md:block">
        :
      </span>
      <Unit value={timeLeft.min} label="Min" />
      <span className="text-2xl text-primary/40 font-serif pb-6 hidden md:block">
        :
      </span>
      <Unit value={timeLeft.seg} label="Seg" />
    </div>
  );
};

export default function WeddingPage() {
  const [loading, setLoading] = useState(true);
  const { scrollY } = useScroll();
  const yHero = useTransform(scrollY, [0, 1000], [0, 400]);
  const opacityHero = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <SplashScreen onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <main className="min-h-screen selection:bg-primary/20 selection:text-foreground">
          {/* --- HERO SECTION --- */}
          <section className="relative h-[100dvh] w-full overflow-hidden flex flex-col items-center justify-center">
            {/* Imagem de Fundo Tratada */}
            <motion.div style={{ y: yHero }} className="absolute inset-0 z-0">
              <Image
                src="/bg_0.jpeg"
                alt="Elias e Janine"
                fill
                priority
                quality={100}
                sizes="100vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-[#4B3C46]/20 mix-blend-multiply" />
              <div className="absolute inset-0 bg-[#F9F6F2]/30 mix-blend-color" />
            </motion.div>

            {/* Texto Hero */}
            <motion.div
              style={{ opacity: opacityHero }}
              className="relative z-10 text-center px-4"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              <motion.p
                variants={fadeInUp}
                className="text-white/90 text-xs md:text-sm uppercase tracking-[0.4em] font-sans font-bold mb-6"
              >
                Save the Date
              </motion.p>

              <motion.h1
                variants={fadeInUp}
                className="text-6xl md:text-9xl text-white font-serif mb-2 drop-shadow-2xl"
              >
                Elias{" "}
                <span className="font-baskerville text-primary italic font-light">
                  &
                </span>{" "}
                Janine
              </motion.h1>

              <motion.div
                variants={fadeInUp}
                className="flex flex-col md:flex-row items-center justify-center gap-6 mt-8 text-white/90 font-light tracking-wide"
              >
                <div className="flex items-center gap-2 glass-champagne px-4 py-2 rounded-full border-none bg-white/10 text-black">
                  <Calendar className="w-4 h-4" /> 23.05.2026
                </div>
                <div className="flex items-center gap-2 glass-champagne px-4 py-2 rounded-full border-none bg-white/10 text-black">
                  <MapPin className="w-4 h-4" /> Parelhas, RN
                </div>
              </motion.div>
            </motion.div>

            {/* Scroll Hint */}
            <motion.div
              className="absolute bottom-10 z-10 text-white/50"
              animate={{ y: [0, 10, 0], opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <ArrowDown className="w-6 h-6" />
            </motion.div>
          </section>

          {/* --- COUNTDOWN (Flutuante) --- */}
          <section className="relative z-20 -mt-20 px-4 mb-20">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="max-w-5xl mx-auto bg-background/80 backdrop-blur-xl border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-3xl p-8 md:p-12 text-center"
            >
              <p className="font-serif italic text-2xl text-foreground/80 mb-8">
                Falta pouco para oficializarmos nosso{" "}
                <span className="font-semibold">para sempre</span> em uma
                aliança!
              </p>
              <Countdown />
            </motion.div>
          </section>

          {/* --- NOSSA HISTÓRIA --- */}
          <section className="py-20 px-6 md:px-12 overflow-hidden">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 gap-16 items-center">
                {/* Imagem Artística */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 1 }}
                  className="relative group"
                >
                  <div className="absolute -inset-4 border border-primary/20 rounded-t-full rounded-b-[10rem] translate-x-4 translate-y-4 transition-transform group-hover:translate-x-2 group-hover:translate-y-2 duration-700" />
                  <div className="relative h-[600px] w-full rounded-t-full rounded-b-[10rem] overflow-hidden shadow-2xl">
                    <Image
                      src="/nos.webp"
                      alt="Momentos"
                      fill
                      className="object-cover object-top transition-transform duration-1000 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-primary/10 mix-blend-overlay" />
                  </div>
                </motion.div>

                {/* Texto da História */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.2 }}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-[1px] w-12 bg-primary" />
                    <span className="uppercase tracking-[0.3em] text-xs font-bold text-primary-dark">
                      Sobre Nós
                    </span>
                  </div>
                  <h2 className="text-5xl md:text-6xl font-serif text-foreground mb-8 leading-tight">
                    Um encontro de <br />
                    <span className="italic text-primary/80">
                      fé, propósito e amor.
                    </span>
                  </h2>
                  <div className="space-y-8 text-xl md:text-2xl font-light text-foreground/80 leading-relaxed font-sans">
                    <p>
                      Nosso encontro foi orquestrado por Deus durante a{" "}
                      <span className="font-medium text-foreground">
                        Consciência Cristã de 2025
                      </span>
                      . Não foi coincidência; foi plano divino. Durante esse
                      período, oramos juntos e pedimos o direcionamento do
                      Senhor antes de qualquer passo.
                    </p>

                    <p>
                      Em <span className="italic text-primary">abril</span>, com
                      a graça de Deus, iniciamos nosso relacionamento. Mesmo
                      enfrentando a distância física, a oração constante, os
                      jejuns, o temor a Deus e o amor nos mantiveram ainda mais
                      unidos.
                    </p>

                    <p>
                      Até que, no dia{" "}
                      <span className="font-serif italic text-primary">
                        23/12/2025
                      </span>
                      , o “sim” ao pedido de casamento selou nosso destino.
                      Agora, com alegria, esperamos pelo nosso grande dia,{" "}
                      <strong className="font-medium">23/05/2026</strong>,
                      quando selaremos publicamente a nossa aliança.
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* --- LISTA DE PRESENTES --- */}
          <section className="py-32 bg-secondary/30 relative">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

            <div className="max-w-4xl mx-auto px-4 text-center">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
              >
                <motion.div variants={fadeInUp}>
                  <Gift
                    strokeWidth={1}
                    className="w-12 h-12 text-primary mx-auto mb-6"
                  />
                </motion.div>

                <motion.h2
                  variants={fadeInUp}
                  className="text-4xl md:text-5xl font-serif mb-6 text-foreground"
                >
                  Lista de Presentes
                </motion.h2>

                <motion.p
                  variants={fadeInUp}
                  className="text-lg text-foreground/70 mb-16 max-w-xl mx-auto font-light"
                >
                  Optamos por listas virtuais para facilitar. Seu carinho em
                  forma de presente nos ajudará a construir nosso lar e viver
                  nossa lua de mel.
                </motion.p>

                <div className="flex flex-1">
                  <motion.a
                    href="/presentes"
                    variants={fadeInUp}
                    whileHover={{ y: -8 }}
                    className="group relative bg-background p-10 flex flex-1 rounded-2xl shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 border border-transparent hover:border-primary/40"
                  >
                    {/* Efeito hover de fundo */}

                    <div className="relative z-10 flex flex-1 flex-col">
                      <h3 className="text-3xl font-serif mb-3 text-foreground group-hover:text-primary-dark transition-colors">
                        Presentes!
                      </h3>
                      {/* Texto de descrição mais escuro para melhor contraste */}
                      <p className="text-foreground/70 mb-8 font-medium">
                        Vamos construir o nosso sonho juntos!
                      </p>
                      {/* Botão com contraste aprimorado */}
                      <span className="inline-block px-8 py-3 bg-secondary text-foreground font-bold text-xs uppercase tracking-widest rounded-full group-hover:bg-primary group-hover:text-white transition-all duration-300">
                        VER LISTA
                      </span>
                    </div>
                  </motion.a>
                </div>
              </motion.div>
            </div>
          </section>

          {/* --- FOOTER --- */}
          <footer className="py-20 text-center bg-[#F9F6F2] border-t border-primary/10">
            <h2 className="font-serif text-4xl mb-4 text-foreground/80">
              Elias <span className="text-primary">&</span> Janine
            </h2>
            <p className="font-sans font-bold text-xs tracking-[0.3em] text-primary/60 uppercase mb-8">
              Parelhas • Rio Grande do Norte
            </p>
            <p className="font-serif italic text-sm text-foreground/40">
              Feito com amor para celebrar o amor.
            </p>
          </footer>
        </main>
      )}
    </>
  );
}
