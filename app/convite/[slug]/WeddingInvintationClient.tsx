/* eslint-disable react-hooks/static-components */
/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  Variants,
  useTransform,
  useScroll,
} from "framer-motion";
import {
  Calendar,
  MapPin,
  CheckCircle2,
  XCircle,
  ArrowDown,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

// --- IMPORT DA SERVER ACTION ---
import { submitRSVP } from "@/app/actions/rsvp.action";

// --- TIPAGEM ---
type AttendanceStatus = "pending" | "confirmed" | "declined";

interface Guest {
  _id: string; // Garantindo alinhamento com o MongoDB
  name: string;
  status: AttendanceStatus;
}

interface InvitationData {
  slug: string;
  saudacao: string;
  convidados: Guest[];
}

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

// --- COMPONENTE SPLASH ---
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

// --- COMPONENTE PRINCIPAL (CLIENT) ---
export default function WeddingInvitationClient({
  initialData,
}: {
  initialData: InvitationData;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  // ESTADO DOS CONVIDADOS (Inicializado com os dados do MongoDB)
  const [guests, setGuests] = useState<Guest[]>(initialData.convidados);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const { scrollY } = useScroll();
  const yHero = useTransform(scrollY, [0, 1000], [0, 400]);
  const opacityHero = useTransform(scrollY, [0, 500], [1, 0]);

  const allResponded = guests.every((g) => g.status !== "pending");

  const handleStatusChange = (id: string, newStatus: AttendanceStatus) => {
    setGuests((prev) =>
      prev.map((guest) =>
        guest._id === id ? { ...guest, status: newStatus } : guest,
      ),
    );
  };

  const handleSubmitRSVP = async () => {
    setIsSubmitting(true);

    // Chama a Server Action
    const result = await submitRSVP(initialData.slug, guests);

    setIsSubmitting(false);

    if (result.success) {
      setIsSuccess(true);
      setTimeout(() => {
        router.push("/presentes");
      }, 2000);
    } else {
      alert("Houve um erro ao enviar sua confirmação. Tente novamente.");
    }
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <SplashScreen onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <main className="min-h-[100dvh] w-full bg-background selection:bg-primary/20 selection:text-foreground overflow-x-hidden">
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
                <span className="font-baskerville text-primary font-normal">
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
          <div className="flex justify-center mb-10">
            <p className="font-serif  bg-primary/70 px-10 py-5 font-semibold rounded-xl italic text-black text-lg  drop-shadow-md">
              Para {initialData.saudacao}
            </p>
          </div>

          {/* 4. A Cópia */}
          <motion.p
            variants={fadeInUp}
            className="text-center font-serif italic text-2xl md:text-3xl text-foreground max-w-2xl mx-auto mb-16 px-4 leading-relaxed"
          >
            Com alegria e temor a Deus, convidamos você para testemunhar e
            celebrar a união das nossas vidas em uma só aliança.
          </motion.p>

          {/* 5. Os Dados Logísticos */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-8 mb-32 w-full px-4"
          >
            <div className="flex flex-col items-center gap-2">
              <Calendar
                className="w-5 h-5 text-primary mb-1"
                strokeWidth={1.5}
              />
              <span className="font-sans text-xs uppercase tracking-[0.2em] text-foreground/60">
                Data
              </span>
              <span className="font-serif text-xl text-foreground">
                23.05.2026
              </span>
            </div>

            <div className="hidden sm:block h-12 w-px bg-border" />

            <div className="flex flex-col items-center gap-2 mt-6 sm:mt-0">
              <MapPin className="w-5 h-5 text-primary mb-1" strokeWidth={1.5} />
              <span className="font-sans text-xs uppercase tracking-[0.2em] text-foreground/60">
                Local
              </span>
              <span className="font-serif text-xl text-foreground">
                Parelhas, RN
              </span>
            </div>
          </motion.div>

          {/* 6. RSVP - O Cartão de Resposta */}
          <motion.div
            variants={fadeInUp}
            className="w-full max-w-2xl mx-auto bg-white rounded-3xl p-8 md:p-12 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.08)] border border-border/30 relative overflow-hidden mb-32"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

            <div className="text-center mb-10">
              <h2 className="text-3xl font-serif text-foreground mb-3">
                Responda por favor
              </h2>
              <p className="text-foreground/60 font-sans font-light text-sm max-w-md mx-auto leading-relaxed">
                Confirme quem da sua família nos honrará com a presença até o
                dia{" "}
                <strong className="font-medium text-foreground">
                  23.04.2026
                </strong>
                .
              </p>
            </div>

            {!isSuccess ? (
              <div className="space-y-4">
                {guests.map((guest) => (
                  <div
                    key={guest._id}
                    className="flex flex-col md:flex-row items-center justify-between p-4 md:p-5 rounded-2xl bg-background/50 border border-border/50 gap-4 transition-colors hover:border-primary/30"
                  >
                    <span className="font-serif text-lg text-foreground">
                      {guest.name}
                    </span>

                    <div className="flex gap-2 w-full md:w-auto">
                      <button
                        onClick={() =>
                          handleStatusChange(guest._id, "confirmed")
                        }
                        className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-[11px] font-sans font-bold tracking-widest uppercase transition-all duration-300 border ${
                          guest.status === "confirmed"
                            ? "bg-foreground text-white border-foreground shadow-md"
                            : "bg-transparent text-foreground/60 border-border hover:border-foreground/30 hover:text-foreground"
                        }`}
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" /> Sim
                      </button>

                      <button
                        onClick={() =>
                          handleStatusChange(guest._id, "declined")
                        }
                        className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-[11px] font-sans font-bold tracking-widest uppercase transition-all duration-300 border ${
                          guest.status === "declined"
                            ? "bg-muted text-foreground/50 border-transparent shadow-inner"
                            : "bg-transparent text-foreground/60 border-border hover:border-foreground/30 hover:text-foreground"
                        }`}
                      >
                        <XCircle className="w-3.5 h-3.5" /> Não
                      </button>
                    </div>
                  </div>
                ))}

                <div className="pt-8 text-center">
                  <button
                    disabled={!allResponded || isSubmitting}
                    onClick={handleSubmitRSVP}
                    className={`inline-flex items-center justify-center px-10 py-4 rounded-full font-sans font-bold text-[11px] uppercase tracking-[0.2em] transition-all duration-500 w-full md:w-auto ${
                      !allResponded
                        ? "bg-muted text-foreground/40 cursor-not-allowed border border-transparent"
                        : isSubmitting
                          ? "bg-primary/70 text-white cursor-wait"
                          : "bg-primary text-white hover:bg-foreground hover:shadow-xl hover:-translate-y-0.5"
                    }`}
                  >
                    {isSubmitting ? "Enviando..." : "Confirmar Presença"}
                  </button>
                </div>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
                  <CheckCircle2 className="w-8 h-8" strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-serif text-foreground mb-3">
                  Agradecemos seu retorno
                </h3>
                <p className="text-foreground/60 font-light text-sm max-w-sm mx-auto">
                  Suas respostas foram registradas com sucesso.
                </p>
              </motion.div>
            )}
          </motion.div>
        </main>
      )}
    </>
  );
}
