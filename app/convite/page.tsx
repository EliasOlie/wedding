/* eslint-disable react-hooks/static-components */
/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Calendar, MapPin, CheckCircle2, XCircle } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

// --- TIPAGEM DE DADOS PARA O RSVP ---
type AttendanceStatus = "pending" | "confirmed" | "declined";

interface Guest {
  id: string;
  name: string;
  status: AttendanceStatus;
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

// --- COMPONENTE SPLASH ---
const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1, ease: "easeInOut" } }}
    >
      <div className="relative overflow-hidden p-10">
        <motion.h1
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          className="text-8xl md:text-9xl font-serif text-foreground/80"
        >
          E<span className="italic font-light text-primary">&</span>J
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

// --- PÁGINA ÚNICA DO CONVITE ---
export default function WeddingInvitationPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  // ESTADO DOS CONVIDADOS
  const [guests, setGuests] = useState<Guest[]>([
    { id: "1", name: "Roberto Almeida", status: "pending" },
    { id: "2", name: "Camila Almeida", status: "pending" },
    { id: "3", name: "João Pedro Almeida", status: "pending" },
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleStatusChange = (id: string, newStatus: AttendanceStatus) => {
    setGuests((prev) =>
      prev.map((guest) =>
        guest.id === id ? { ...guest, status: newStatus } : guest,
      ),
    );
  };

  const handleSubmitRSVP = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
    router.push("/presentes");
  };

  const allResponded = guests.every((g) => g.status !== "pending");

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <SplashScreen onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <main className="min-h-[100dvh] w-full bg-background selection:bg-primary/20 selection:text-foreground overflow-x-hidden">
          <motion.div
            className="max-w-4xl mx-auto px-6 py-20 md:py-32 flex flex-col items-center"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {/* 1. O Rótulo Superior (Epígrafe) */}
            <motion.div
              variants={fadeInUp}
              className="text-center mb-12 flex flex-col items-center"
            >
              <span className="h-12 w-px bg-primary/40 mb-6 block" />
              <p className="font-sans text-[10px] md:text-xs uppercase tracking-[0.4em] text-foreground/60 font-medium">
                "O Amor Nunca Falha"
              </p>
              <p className="font-serif italic text-sm text-foreground/50 mt-2">
                1 Coríntios 13:8
              </p>
            </motion.div>

            {/* 2. O Título Principal (Restauramos o font-script no e-comercial) */}
            <motion.h1
              variants={fadeInUp}
              className="text-6xl md:text-9xl text-white font-serif mb-2 drop-shadow-2xl"
            >
              Elias <span className="text-primary italic font-light">&</span>{" "}
              Janine
            </motion.h1>

            {/* 3. A Imagem Editorial (Um arco elegante em vez de fundo desfocado) */}
            <motion.div
              variants={fadeInUp}
              className="relative w-full max-w-md aspect-[3/4] mb-16 rounded-t-full rounded-b-md overflow-hidden shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] border-8 border-white/50"
            >
              <Image
                src="https://plus.unsplash.com/premium_photo-1675003662323-cc10e02c4d25?q=80&w=800&auto=format&fit=crop"
                alt="Elias e Janine"
                fill
                priority
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-primary/10 mix-blend-overlay" />
            </motion.div>

            {/* 4. A Cópia */}
            <motion.p
              variants={fadeInUp}
              className="text-center font-serif italic text-2xl md:text-3xl text-foreground max-w-2xl mx-auto mb-16 leading-relaxed"
            >
              Com alegria e temor a Deus, convidamos você para testemunhar e
              celebrar a união das nossas vidas em uma só aliança.
            </motion.p>

            {/* 5. Os Dados Logísticos (Clean e minimalistas) */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-8 mb-32 w-full"
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
                <MapPin
                  className="w-5 h-5 text-primary mb-1"
                  strokeWidth={1.5}
                />
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
              className="w-full max-w-2xl bg-white rounded-3xl p-8 md:p-12 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.08)] border border-border/30 relative overflow-hidden"
            >
              {/* Linha decorativa no topo do cartão RSVP */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

              <div className="text-center mb-10">
                <h2 className="text-3xl font-serif text-foreground mb-3">
                  Responda por favor
                </h2>
                <p className="text-foreground/60 font-sans font-light text-sm max-w-md mx-auto leading-relaxed">
                  Confirme quem da sua família nos honrará com a presença até o
                  dia{" "}
                  <strong className="font-medium text-foreground">
                    01.04.2026
                  </strong>
                  .
                </p>
              </div>

              {!isSuccess ? (
                <div className="space-y-4">
                  {guests.map((guest) => (
                    <div
                      key={guest.id}
                      className="flex flex-col md:flex-row items-center justify-between p-4 md:p-5 rounded-2xl bg-background/50 border border-border/50 gap-4 transition-colors hover:border-primary/30"
                    >
                      <span className="font-serif text-lg text-foreground">
                        {guest.name}
                      </span>

                      <div className="flex gap-2 w-full md:w-auto">
                        <button
                          onClick={() =>
                            handleStatusChange(guest.id, "confirmed")
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
                            handleStatusChange(guest.id, "declined")
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
          </motion.div>
        </main>
      )}
    </>
  );
}
